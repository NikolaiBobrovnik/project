import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './laboratorySlider.scss'

import PhotoSlider from 'kalashnikov-framework/lib/components/PhotoSlider'
import QuantityContainerLayout from 'kalashnikov-framework/lib/components/QuantityContainerLayout'
// import QuantityContainerLayout from 'kalashnikov-framework/lib/components/QuantityContainerLayout'
import classNames from 'classnames'

// import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

const LaboratoryDocumentation = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: 'pskk/lab.php'
        },
        reducerKey: 'lab'
      }}
    >
      {({ response: { slider: { title, description, items, quantity } } }) => {
        return (
          <div {...{
            className: classNames(
              className,
              css.wrapper,
              isMobile ? css.mobile : css.desktop
            )
          }}>
            <PhotoSlider
              {...{
                arrow: 'left',
                isMobile,
                className: css.slider,
                items,
                textPosition: false
              }}
            />
            <QuantityContainerLayout {...{ className: css.quantity_container, quantity }} />
          </div>
        )
      }}
    </RemoteDataProvider>
  )
}

LaboratoryDocumentation.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default LaboratoryDocumentation
