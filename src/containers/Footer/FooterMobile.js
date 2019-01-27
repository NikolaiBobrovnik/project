import React, { PureComponent, Fragment } from 'react'
import toJS from 'HOC/toJS'
import { withRouter } from 'react-router-dom'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './footerMobile.scss'
import classNames from 'classnames'

import PhoneBlock from 'kalashnikov-framework/lib/components/PhoneBlock'
import Copyright from 'kalashnikov-framework/lib/components/Copyright'
import Socials from 'kalashnikov-framework/lib/components/Socials'
import FooterNavigation from 'kalashnikov-framework/lib/components/FooterNavigation'

import MdArrow from 'react-icons/lib/md/keyboard-arrow-right'

@withRouter
@toJS
class Footer extends PureComponent {
  state = {
    showFullText: false
  }

  showMore () {
    this.setState({
      showFullText: !this.state.showFullText
    })
  }
  render () {
    const { location: { pathname } } = this.props
    const { showFullText } = this.state
    return (
      <RemoteDataProvider
        {...{
          request: {
            url: '/footer/footer_menu.php'
          },
          reducerKey: 'footer'
        }}
      >
        {({
          response: {
            data: {
              navigation,
              navigationCatalog,
              navigationThird,
              copyright,
              socials,
              contacts: { text, tel, email }
            }
          }
        }) => {
          return (
            <Fragment>
              <footer {...{ className: css.wrapper }}>
                <div {...{ className: css.container }}>
                  {navigationCatalog &&
                  <FooterNavigation
                    {...{
                      isMobile: true,
                      className: css.link_catalog,
                      pathname,
                      navigation: navigationCatalog
                    }}
                  />
                  }
                  {navigationThird &&
                  <FooterNavigation
                    {...{
                      isMobile: true,
                      className: css.link_catalog,
                      pathname,
                      navigation: navigationThird
                    }}
                  />
                  }
                  <button
                    {...{
                      className: classNames({
                        [css.button]: !showFullText,
                        [css.button_close]: showFullText
                      }),
                      onClick: ::this.showMore
                    }}
                  >
                    <span>Концерн Калашников</span>
                    <MdArrow
                      {...{
                        className: classNames({
                          [css.arrow]: !showFullText,
                          [css.arrow_close]: showFullText
                        })
                      }}
                    />
                  </button>
                  {showFullText && (
                    <FooterNavigation
                      {...{
                        className: classNames(css.container_close, {
                          [css.animationUp]: showFullText,
                          [css.animationDown]: !showFullText
                        }),
                        pathname,
                        navigation: navigation,
                        isMobile: true
                      }}
                    />
                  )}
                  <div {...{ className: css.container_contacts }}>
                    <PhoneBlock
                      {...{
                        isMobile: true,
                        tel,
                        text,
                        size: 'm',
                        color: 'white',
                        className: css.phoneBlock
                      }}
                    />
                    <Socials
                      {...{
                        isMobile: true,
                        theme: 'white',
                        items: socials,
                        className: css.socials
                      }}
                    />
                  </div>
                </div>
                <Copyright
                  {...{ isMobile: true, className: css.container_copyright, copyright }}
                />
              </footer>
            </Fragment>
          )
        }}
      </RemoteDataProvider>
    )
  }
}

Footer.propTypes = {
  location: PropTypes.any
}

export default Footer
