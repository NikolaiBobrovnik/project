import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import css from './homePage.scss'

// import Information from 'containers/Information/Information'
import FormSubscribe from 'containers/FormSubscribe/FormSubscribe'
// import News from 'containers/News/News'
import HomeHero from 'containers/HomeHero/HomeHero'
import HomeDirections from 'containers/HomeDirections/HomeDirections'
import HomeStructure from 'containers/HomeStructure/HomeStructure'
import HomeCareer from 'containers/HomeCareer/HomeCareer'
import HomePoster from 'containers/HomePoster/HomePoster'

class HomePage extends PureComponent {
  render () {
    const { isMobile } = this.props

    return (
      <div
        {...{
          className: classNames(
            css.wrapper,
            isMobile ? css.mobile : css.desktop
          )
        }}
      >
        <HomeHero
          {...{ isMobile, className: isMobile ? css.heroMobile : css.hero }}
        />
        <HomeDirections {...{ isMobile, className: css.directions }} />
        <HomeStructure {...{ isMobile, className: css.structure }} />
        <HomeCareer {...{ isMobile, className: css.career }} />
        {/* <News {...{ isMobile, className: css.news }} /> */}
        <HomePoster {...{ isMobile, className: css.poster }} />
        <FormSubscribe {...{ isMobile }} />
        {/* <Information {...{ isMobile, className: css.information }} /> */}
      </div>
    )
  }
}

HomePage.defaultProps = {
  isMobile: false
}

HomePage.propTypes = {
  isMobile: PropTypes.bool,
  popupsActions: PropTypes.object,
  popupsState: PropTypes.object
}

export default HomePage
