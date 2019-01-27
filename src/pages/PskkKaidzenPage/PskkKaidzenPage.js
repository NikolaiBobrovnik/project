import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './pskkKaidzenPage.scss'

import FormSubscribe from 'containers/FormSubscribe/FormSubscribe'
import ActivitiesCardsList from 'kalashnikov-framework/lib/components/ActiivitiesCardsList'
// import Information from 'containers/Information/Information'
import KaidzenHuntingMoments from 'containers/KaidzenHuntingMoments/KaidzenHuntingMoments'
import KaidzenDocumentation from 'containers/KaidzenDocumentation/KaidzenDocumentation'
import KaidzenСompetition from 'containers/KaidzenСompetition/KaidzenСompetition'
import HeroBanner from 'containers/HeroBanner/HeroBanner'
import PopupReviewButton from 'containers/PopupReviewButton/PopupReviewButton'

class PskkKaidzenPage extends PureComponent {
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
        <PopupReviewButton />
        <HeroBanner
          {...{
            isMobile,
            url: 'pskk/kaidzen.php',
            reducerKey: 'kaidzen',
            className: isMobile ? css.banner_mobile : css.banner_desktop
          }}
        />
        <KaidzenDocumentation
          {...{ isMobile, className: css.documentation_container }}
        />
        <KaidzenHuntingMoments
          {...{ isMobile, className: css.hunting_container }}
        />
        <KaidzenСompetition {...{ isMobile }} />
        <FormSubscribe {...{ isMobile, className: css.subscribe }} />
        {/* <Information {...{ isMobile, className: css.information }} /> */}
        <RemoteDataProvider
          {...{
            request: {
              url: 'pskk/kaidzen.php'
            },
            reducerKey: 'kaidzen'
          }}
        >
          {({ response: { list } }) => {
            return (
              <ActivitiesCardsList
                {...{
                  isMobile,
                  list,
                  masonry: false,
                  withSeparator: true
                }}
              />
            )
          }}
        </RemoteDataProvider>
      </div>
    )
  }
}

PskkKaidzenPage.propTypes = {
  response: PropTypes.object,
  isMobile: PropTypes.bool
}

export default PskkKaidzenPage
