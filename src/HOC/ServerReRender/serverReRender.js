import AsyncActionController from 'HOC/ServerReRender/AsyncActionController'

export default async function serverReRender ({
  render = undefined,
  maxRenders = 10,
  controller = new AsyncActionController()
}) {
  if (typeof render !== 'function') {
    throw new Error('serverReRender: render argument must be a function!')
  }
  let rendersCount = 0
  let result
  let error
  let stop
  do {
    rendersCount++
    await controller.getCompletePromise()
    try {
      result = await new Promise(resolve => {
        const stopFn = (newResult = result) => {
          stop = true
          resolve(newResult)
        }
        render(resolve, stopFn)
      })
    } catch (e) {
      error = e
    }
  } while (
    !error && !stop &&
    rendersCount < maxRenders &&
    controller.hasIncompleteActions()
  )
  const stats = {
    renders: rendersCount,
    actions: controller.asyncAllCount
  }
  return { result, error, stats }
}
