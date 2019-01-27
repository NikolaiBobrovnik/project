import { PureComponent } from 'react'
import { withRemoteData } from 'remote-data-provider'
import { API_RECAPTCHA } from 'constants/API'
import { KEY_RECAPTCHA } from 'constants/RDP_KEYS'
import { loadReCaptcha } from 'react-recaptcha-v3'

const reCaptchaRDPOptions = {
  stateKey: KEY_RECAPTCHA,
  reducerKey: KEY_RECAPTCHA,
  request: {
    url: API_RECAPTCHA
  }
}

@withRemoteData(reCaptchaRDPOptions)
export default class ReCaptcha extends PureComponent {
  componentDidMount () {
    loadReCaptcha(this.props[KEY_RECAPTCHA].response.key)
  }

  render () {
    return null
  }
}
