const initialAsyncData = {
  completed: false,
  error: false
}

const defaultOptions = {
  maxAsyncActionDuration: undefined,
  serverOnly: true
}

const isBrowser = typeof window !== 'undefined'

export default class AsyncActionController {
  asyncData = {}
  asyncPendingCount = 0
  asyncAllCount = 0
  asyncCompletePromise = Promise.resolve()
  asyncCompleteResolve = () => null

  constructor (options = {}) {
    this.options = Object.assign({}, defaultOptions, options)
  }

  createDefferPromise () {
    let asyncResolve
    const promise = new Promise(resolve => {
      asyncResolve = resolve
    })
    const resolve = (fromTimeout = false) => {
      if (asyncResolve) {
        asyncResolve()
      } else if (!fromTimeout) {
        setTimeout(this.asyncCompleteResolve, 0, true)
      }
    }
    return { promise, resolve }
  }

  createAsyncCompletePromise () {
    const deffer = this.createDefferPromise()
    this.asyncCompletePromise = deffer.promise
    this.asyncCompleteResolve = deffer.resolve
  }

  incrementCounter () {
    if (this.asyncPendingCount === 0) {
      this.createAsyncCompletePromise()
    }
    this.asyncAllCount++
    this.asyncPendingCount++
  }

  decrementCounter () {
    this.asyncPendingCount--
    if (this.asyncPendingCount === 0) {
      this.asyncCompleteResolve()
    }
  }

  createAsyncData (id) {
    this.asyncData[id] = { ...initialAsyncData, ...this.createDefferPromise() }
    this.asyncData[id].promise.then(() => this.decrementCounter())
    this.incrementCounter()
    if (this.options.maxAsyncActionDuration) {
      setTimeout(() => {
        if (!this.asyncData[id].completed) {
          const error = new Error('ServerReRenderController: max async action duration exceeded')
          this.completeAction(id, error)
        }
      }, this.options.maxAsyncActionDuration)
    }
  }

  checkAsyncData (id) {
    if (!id) throw new Error('ServerReRenderController: id argument is required')
    if (!this.asyncData[id]) this.createAsyncData(id)
  }

  isDisabled () {
    return this.options.serverOnly && isBrowser
  }

  setAsyncData (id, data = {}) {
    this.checkAsyncData(id)
    if (data.completed) {
      this.asyncData[id].resolve()
    }
    Object.assign(this.asyncData[id], data)
  }

  startAction (id) {
    if (this.isDisabled()) return
    this.checkAsyncData(id)
  }

  completeAction (id, error) {
    if (this.isDisabled()) return
    this.setAsyncData(id, { completed: true, error })
  }

  createActionInstance (id) {
    return {
      start: () => this.startAction(id),
      complete: error => this.completeAction(id, error)
    }
  }

  getCompletePromise () {
    return this.asyncCompletePromise
  }

  getActionPromise (id) {
    return this.asyncData[id] ? this.asyncData[id].promise : Promise.resolve()
  }

  hasAction (id) {
    return Boolean(this.asyncData[id])
  }

  hasIncompleteActions () {
    return this.asyncPendingCount !== 0
  }
}
