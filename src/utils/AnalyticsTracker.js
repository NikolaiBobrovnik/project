import isFunction from 'lodash/isFunction'
import get from 'lodash/get'

class AnalyticsTracker {
  fixGoogle (params) {
    console.log(
      'AnalyticsTracker Utils',
      'Попытка фиксировать в аналитику',
      params
    )
    if (isFunction(get(window, 'ga'))) {
      console.log('AnalyticsTracker Utils', 'window.ga существует', window.ga)
      return window.ga('send', params)
    }
  }

  fixYandex (name) {
    console.log('AnalyticsTracker Utils', 'Попытка фиксировать в метрику', name)
    if (isFunction(get(window, 'yaCounter47894105.reachGoal'))) {
      console.log(
        'AnalyticsTracker Utils',
        'window.yaCounter47894105.reachGoal существует функция такая',
        window.yaCounter47894105
      )
      return window.yaCounter47894105.reachGoal(name)
    }
  }
}
export default new AnalyticsTracker()
