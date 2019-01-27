import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRemoteData } from 'remote-data-provider'
import toJS from 'HOC/toJS'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

import css from './aboutPeoplePage.scss'

import AboutPeople from 'containers/AboutPeople/AboutPeople'
import FormSubscribe from 'containers/FormSubscribe/FormSubscribe'
// import Information from 'containers/Information/Information'
import BreadCrumbs from 'kalashnikov-framework/lib/components/BreadCrumbs'
import AboutBiography from 'containers/AboutBiography/AboutBiography'

const options = {
  request: {
    url: '/about/people.php',
    reducerKey: 'aboutPeople'
  }
}

@withRouter
@toJS
@withRemoteData(options)
class AboutPeoplePage extends PureComponent {
  render () {
    const {
      isMobile,
      response: { title, breadcrumbs },
      match: { params: { code } }
    } = this.props
    breadcrumbs.unshift({link: '/', title: 'Главная'})

    return (
      <div {...{
        className: classNames(
          css.wrapper,
          isMobile ? css.mobile : css.desktop
        )
      }}>
        <div>
          <BreadCrumbs {...{
            className: css.container,
            breadcrumbs,
            theme: 'card',
            isMobile,
            code
          }} />
          {title &&
          <h2
            {...{
              className: css.title,
              dangerouslySetInnerHTML: { __html: title }
            }}
          />
          }
        </div>
        {code && <AboutBiography {...{ isMobile, code: code }} />}
        <div>
          <AboutPeople {...{ isMobile, className: css.people, code }} />
          <FormSubscribe {...{ isMobile, className: css.subscribe }} />
        </div>
        {/* <Information {...{ isMobile }} /> */}
      </div>
    )
  }
}

AboutPeoplePage.defaultProps = {
  isMobile: false,
  breadcrumbs: []
}

AboutPeoplePage.propTypes = {
  match: PropTypes.object,
  response: PropTypes.object,
  isMobile: PropTypes.bool,
  breadcrumbs: PropTypes.array
}

export default AboutPeoplePage
