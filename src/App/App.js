import React, { Component } from 'react'
import Helmet from 'react-helmet'
import ElasticAdaptive from 'HOC/ElasticAdaptive'
import 'normalize.css'
import 'styles/common.scss'
import css from './app.scss'

import Header from 'containers/Header/Header'
import Popups from 'containers/Popups/Popups'
import Footer from 'containers/Footer/Footer'
import Body from 'App/Body'
import { ViewContext } from 'HOC/ViewContext/ViewContext'
import PopupReviewButton from 'containers/PopupReviewButton/PopupReviewButton'
import ReCaptcha from 'containers/ReCaptcha/ReCaptcha'

class App extends Component {
  render () {
    return (
      <ElasticAdaptive>
        <ViewContext.Provider value={false}>
          <Helmet {...{ defaultTitle: 'Калашников' }} />
          <div {...{ className: css.wrapper }}>
            <Header />
            <PopupReviewButton />
            <div {...{ className: css.container }}>
              <Body />
            </div>
            <Footer />
            <Popups {...{ isMobile: false }} />
            <ReCaptcha />
          </div>
        </ViewContext.Provider>
      </ElasticAdaptive>
    )
  }
}

export default App
