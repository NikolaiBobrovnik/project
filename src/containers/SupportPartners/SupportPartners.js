import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withViewContext } from 'HOC/ViewContext/ViewContext'
import PropTypes from 'prop-types'
import css from './supportPartners.scss'
import FormPartners from 'containers/FormPartners/FormPartners'
import { withRemoteData } from 'remote-data-provider'

@withViewContext
@withRemoteData({
  request: {
    url: 'pages/help.php'
  },
  reducerKey: 'help'
})
export default class SupportPartners extends PureComponent {
  render () {
    const {
      isMobile,
      className,
      response: { partners, partners: { statement = {} } }
    } = this.props
    const { description, enterToProgram, enterDsc, citiesTitle, citiesDescription } = statement
    return (
      <div
        className={classNames(
          className,
          css.wrapper,
          isMobile ? css.mobile : css.desktop
        )}
      >
        <div className={css.info_block}>
          <div className={css.width_limiter}>
            <p dangerouslySetInnerHTML={{ __html: description }} />
            <p
              className={css.cities_title}
              dangerouslySetInnerHTML={{ __html: enterToProgram }}
            />
            <p dangerouslySetInnerHTML={{ __html: enterDsc }} />
            <p
              className={css.cities_title}
              dangerouslySetInnerHTML={{ __html: citiesTitle }}
            />
            <p dangerouslySetInnerHTML={{ __html: citiesDescription }} />
          </div>
        </div>
        <FormPartners data={partners} className={css.form_block} />
      </div>
    )
  }

  static propTypes = {
    isMobile: PropTypes.bool,
    className: PropTypes.any,
    response: PropTypes.object
  }
}
