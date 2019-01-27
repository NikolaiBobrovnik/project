import React, { PureComponent } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import css from './pskkLaboratoryPage.scss'

import FormSubscribe from 'containers/FormSubscribe/FormSubscribe'
import ActivitiesCardsList from 'kalashnikov-framework/lib/components/ActiivitiesCardsList'
import LaboratoryDocumentation from 'containers/LaboratoryDocumentation/LaboratoryDocumentation'
import LaboratorySlider from 'containers/LaboratorySlider/LaboratorySlider'
import LaboratoryTask from 'containers/LaboratoryTask/LaboratoryTask'
import LaboratoryTraining from 'containers/LaboratoryTraining/LaboratoryTraining'
import LaboratoryPoster from 'containers/LaboratoryPoster/LaboratoryPoster'
import HeroBanner from 'containers/HeroBanner/HeroBanner'
import PopupReviewButton from 'containers/PopupReviewButton/PopupReviewButton'
// import Information from 'containers/Information/Information'

class PskkLaboratoryPage extends PureComponent {
  render () {
    const { isMobile } = this.props
    return (
      <div {...{
        className: classNames(
          css.wrapper,
          isMobile ? css.mobile : css.desktop
        )
      }}>
        <PopupReviewButton />
        <HeroBanner
          {...{
            isMobile,
            url: 'pskk/lab.php',
            reducerKey: 'lab',
            className: isMobile ? css.banner_mobile : css.banner_desktop
          }}
        />
        <LaboratoryDocumentation {...{ isMobile, className: css.documentation_container }} />
        <div {...{ className: css.documentation_wrapper }}>
          <LaboratorySlider {...{ isMobile, className: css.slider_container }} />
        </div>
        <LaboratoryTask {...{ isMobile, className: css.task_container }} />
        <LaboratoryTraining {...{ isMobile, className: css.training_container }} />
        <LaboratoryPoster {...{ isMobile }} />
        <FormSubscribe {...{ isMobile, className: css.subscribe }} />
        {/* <Information {...{ isMobile, className: css.information }} /> */}
        <RemoteDataProvider
          {...{
            request: {
              url: 'pskk/lab.php'
            },
            reducerKey: 'lab'
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

PskkLaboratoryPage.propTypes = {
  response: PropTypes.object,
  isMobile: PropTypes.bool
}

export default PskkLaboratoryPage
