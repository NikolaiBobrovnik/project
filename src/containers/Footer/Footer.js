import React, { PureComponent, Fragment } from 'react'
import toJS from 'HOC/toJS'
import { withRouter } from 'react-router-dom'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './footer.scss'

import PhoneBlock from 'kalashnikov-framework/lib/components/PhoneBlock'
import EmailBlock from 'kalashnikov-framework/lib/components/EmailBlock'
import Copyright from 'kalashnikov-framework/lib/components/Copyright'
import Socials from 'kalashnikov-framework/lib/components/Socials'
import FooterNavigation from 'kalashnikov-framework/lib/components/FooterNavigation'
import LogoSlider from 'containers/LogoSlider/LogoSlider'

@withRouter
@toJS
class Footer extends PureComponent {
  render () {
    const {
      props: {
        location: { pathname }
      }
    } = this

    if (pathname.indexOf('history') !== 1) {
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
                        className: css.link,
                        pathname,
                        navigation: navigationCatalog
                      }}
                    />
                    }
                    {navigation &&
                    <FooterNavigation
                      {...{
                        className: css.link_catalog,
                        pathname,
                        navigation: navigation
                      }}
                    />
                    }
                    {navigationThird &&
                    <FooterNavigation
                      {...{
                        className: css.link_catalog,
                        pathname,
                        navigation: navigationThird
                      }}
                    />
                    }
                    <div {...{ className: css.container_contacts }}>
                      <PhoneBlock
                        {...{
                          tel,
                          text,
                          size: 'm',
                          color: 'white',
                          className: css.phoneBlock
                        }}
                      />
                      <EmailBlock {...{ className: css.email, email }} />
                      <Socials
                        {...{
                          theme: 'white',
                          items: socials,
                          className: css.socials
                        }}
                      />
                    </div>
                  </div>
                  <div {...{ className: css.container_logo }}>
                    <LogoSlider />
                  </div>
                  <Copyright
                    {...{ className: css.container_copyright, copyright }}
                  />
                </footer>
              </Fragment>
            )
          }}
        </RemoteDataProvider>
      )
    } else return null
  }
}

Footer.propTypes = {
  location: PropTypes.any
}

export default Footer
