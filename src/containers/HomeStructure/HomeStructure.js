import React, { PureComponent, Fragment } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _isNumber from 'lodash/isNumber'

import css from './homeStructure.scss'

import Button from 'kalashnikov-framework/lib/components/Button'
import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'
import BrandStructureItemsList from 'kalashnikov-framework/lib/components/BrandStructureItemsList'

import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

class HomeStructure extends PureComponent {
  state = {
    bottom: null,
    top: null,
    active: 'bottom' // [top, bottom, bg]
  }

  onHover = item => {
    const { active } = this.state
    if (_isNumber(item)) {
      if (active === 'top' || active === 'bg') {
        this.setState({ bottom: item, active: 'bottom' })
      } else if (active === 'bottom') {
        this.setState({ top: item, active: 'top' })
      }
    } else {
      this.setState({ active: 'bg' })
    }
  }

  unHover = item => {
    if (!item) {
      this.setState({ active: 'bg' })
    }
  }

  render () {
    const { className, isMobile } = this.props
    const { top, active, bottom } = this.state

    return (
      <RemoteDataProvider
        {...{
          request: {
            url: 'home/ctoday.php'
          }
        }}
      >
        {({
          response: { title, paragraph, image, list, buttonText, buttonLink }
        }) => {
          return (
            <div
              {...{
                className: css.block
              }}
            >
              {!isMobile &&
                <Fragment>
                  <div
                    {...{
                      className: classNames(
                        css.image,
                        active === 'bottom' && css.fadeIn,
                        (active === 'top' || active === 'bg') && css.fadeOut
                      ),
                      style: {
                        backgroundImage:
                        bottom !== null && `url(${list[bottom].banner})`
                      }
                    }}
                  />
                  <div
                    {...{
                      className: classNames(
                        css.image,
                        active === 'top' && css.fadeIn,
                        (active === 'bottom' || active === 'bg') && css.fadeOut
                      ),
                      style: {
                        backgroundImage: top !== null && `url(${list[top].banner})`
                      }
                    }}
                  />
                </Fragment>
              }
              <MainAsideSection
                {...{
                  isMobile,
                  separator: true,
                  title,
                  background: image,
                  theme: 'black',
                  reverse: true,
                  description: paragraph,
                  className: classNames(className, css.container),
                  asideChildren: !isMobile && (
                    <Button
                      {...{
                        className: css.structurebutton,
                        title: buttonText,
                        link: buttonLink,
                        icon: <MdKeyboardArrowRight />
                      }}
                    />
                  )
                }}
              >
                <BrandStructureItemsList
                  {...{
                    onHover: item => {
                      this.onHover(item)
                    },
                    unHover: () => {
                      this.unHover()
                    },
                    isMobile,
                    className: isMobile
                      ? css.mobile_structurelist
                      : css.structurelist,
                    list
                  }}
                />
              </MainAsideSection>
            </div>
          )
        }}
      </RemoteDataProvider>
    )
  }
}

HomeStructure.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default HomeStructure
