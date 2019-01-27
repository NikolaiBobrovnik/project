import React, { PureComponent, Fragment } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import { withRouter } from 'react-router-dom'

import css from './careerVacancyInnerPage.scss'
import classNames from 'classnames'

import BrandHeroBanner from 'kalashnikov-framework/lib/components/BrandHeroBanner'
import VacanciesInnerLayout from 'kalashnikov-framework/lib/components/VacanciesInnerLayout'
import FormSubscribe from 'containers/FormSubscribe/FormSubscribe'
// import Information from 'containers/Information/Information'
import PropTypes from 'prop-types'
import FormVacancy from 'containers/FormVacancy/FormVacancy'
import FormNewVacancy from 'containers/FormNewVacancy/FormNewVacancy'
import VacanciesSimilar from 'containers/VacanciesSimilar/VacanciesSimilar'
import { isBrowser } from 'utils'

@withRouter
class CareerVacancyInnerPage extends PureComponent {
  render () {
    const { isMobile, match, match: { params: { code } } } = this.props
    return (
      <div
        {...{
          className: classNames(
            css.wrapper,
            isMobile ? css.mobile : css.desktop
          )
        }}
      >
        <RemoteDataProvider
          {...{
            request: {
              url: '/career/vacancy.php',
              params: {
                code
              }
            },
            reducerKey: 'VacancyDetail'
          }}
        >
          {({
            response: {
              vacanciesInner,
              vacanciesInner: { breadcrumbs, name, rubric, text, city, newForm }
            }
          }) => {
            return (
              <Fragment>
                <BrandHeroBanner
                  {...{
                    blockPaddingBottom: 's',
                    isBrowser,
                    title: name,
                    image: '',
                    backgroundColor: 'transparent',
                    color: 'black',
                    parallax: false,
                    isMobile,
                    textPaddingTop: isMobile ? 's' : 's',
                    titleSize: isMobile ? 's' : 'm',
                    breadcrumbs,
                    titleUppercase: false,
                    className: isMobile ? css.mobileheroBanner : css.heroBanner
                  }}
                />
                <div {...{ className: css.container }}>
                  {rubric && <p {...{ className: css.text }}>{rubric}</p>}
                  {text && <div {...{ className: css.text }}>{text}</div>}
                  <VacanciesInnerLayout
                    {...{
                      isMobile,
                      vacanciesInner,
                      className: css.vacancies_container
                    }}
                  />
                </div>
                {!newForm
                  ? <FormVacancy {...{ isMobile, code, vacancyName: name, vacancyCity: city }} />
                  : <FormNewVacancy {...{ isMobile, code, vacancyName: name, vacancyCity: city }} />
                }
              </Fragment>
            )
          }}
        </RemoteDataProvider>
        <VacanciesSimilar {...{ isMobile, match, className: css.vacancies }} />
        <FormSubscribe {...{ isMobile, className: css.subscribe }} />
        {/* <Information {...{ isMobile }} /> */}
      </div>
    )
  }
}

CareerVacancyInnerPage.propTypes = {
  response: PropTypes.object,
  match: PropTypes.object,
  isMobile: PropTypes.bool
}

export default CareerVacancyInnerPage
