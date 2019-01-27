import React, { Component } from 'react'
import Helmet from 'react-helmet'
import ElasticAdaptive from 'HOC/ElasticAdaptive'
import 'normalize.css'
import 'styles/common.scss'
import css from './appMobile.scss'

import Header from 'containers/Header/Header'
import Popups from 'containers/Popups/Popups'
import FooterMobile from 'containers/Footer/FooterMobile'
import BodyMobile from 'App/BodyMobile'
import { ViewContext } from 'HOC/ViewContext/ViewContext'
import ReCaptcha from 'containers/ReCaptcha/ReCaptcha'

class App extends Component {
  render () {
    return (
      <ElasticAdaptive type='mobile'>
        <ViewContext.Provider value>
          <Helmet
            defaultTitle='Калашников'
            // titleTemplate='%s — react-boilerplate'
            /* meta={[
              { property: 'og:title', content: 'react-boilerplate' },
              { property: 'og:type', content: 'website' }
            ]} */
          />
          <div
            {...{
              className: css.wrapper
            }}
          >
            <Header {...{ isMobile: true }} />
            <div
              {...{
                className: css.container
              }}
            >
              <BodyMobile />
            </div>
            <FooterMobile />
            <Popups {...{ isMobile: true }} />
            <ReCaptcha />
          </div>
        </ViewContext.Provider>
      </ElasticAdaptive>
    )
  }
}

export default App
