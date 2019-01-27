import React, { PureComponent } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './vacanciesSimilar.scss'
import classNames from 'classnames'

import VacanciesSimilar from 'kalashnikov-framework/lib/components/VacanciesSimilar'

class VacanciesSimilarContainer extends PureComponent {
  render () {
    const { className, isMobile, match: { params: { code } } } = this.props
    return (
      <RemoteDataProvider
        {...{
          request: {
            url: '/career/vacancy.php',
            params: {
              code
            }
          },
          exCollectorPath: 'vacanciesInner',
          exCollectorChangeableRequest: ['params.code']
        }}
      >
        {({ response: { vacanciesInner: { vacancies } } }) => {
          return (
            <div {...{
              className: classNames(css.wrapper, {
                [css.mobile]: isMobile,
                [css.desktop]: !isMobile
              })
            }}>
              {vacancies &&
              <VacanciesSimilar
                {...{
                  className,
                  vacancies,
                  isMobile
                }}
              />
              }
            </div>
          )
        }}
      </RemoteDataProvider>
    )
  }
}

VacanciesSimilarContainer.propTypes = {
  response: PropTypes.object,
  match: PropTypes.object,
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default VacanciesSimilarContainer
