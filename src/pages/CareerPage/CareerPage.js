import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import toJS from 'HOC/toJS'
import classNames from 'classnames'

import css from './сareerPage.scss'

import HeroBanner from 'containers/HeroBanner/HeroBanner'
import CareerTextBefore from 'containers/CareerTextBefore/CareerTextBefore'
import CareerTextAfter from 'containers/CareerTextAfter/CareerTextAfter'
import CareerBrand from 'containers/CareerBrand/CareerBrand'
// import SocialsBlock from 'containers/SocialsBlock/SocialsBlock'
import CareerVacancy from 'containers/CareerVacancy/CareerVacancy'
import CareerProfi from 'containers/CareerProfi/CareerProfi'
import CareerCause from 'containers/CareerCause/CareerCause'
import CareerStudents from 'containers/CareerStudents/CareerStudents'
import NavBar from 'containers/NavBar/NavBar'
import Officess from 'containers/Officess/Officess'
import FormVacancy from 'containers/FormVacancy/FormVacancy'
import Training from 'containers/Training/Training'
// import FormContacts from 'containers/FormContacts/FormContacts'
// import Information from 'containers/Information/Information'
// import CareerDocumentation from 'containers/CareerDocumentation/CareerDocumentation'

function mapStateToProps (state) {
  return {
    navBar: state.getIn(['remoteData', 'CareerBanner', 'response', 'navBar'])
  }
}

@withRouter
@connect(mapStateToProps)
@toJS
class CareerPage extends PureComponent {
  componentWillMount () {
    // если открываем страницу, а params пустой, то открываем первый таб
    if (!this.props.match.params.iCode) {
      this.props.history.push('/career/career')
    }
  }

  componentWillReceiveProps (nextProps) {
    // если изменяется страница, а params пустой, то открываем первый таб
    if (!nextProps.match.params.iCode) {
      this.props.history.push('/career/career')
    }
  }
  render () {
    console.log('CareerPage render')
    const {
      props: {
        isMobile,
        match: {
          params: {
            iCode
          }
        },
        navBar
      }
    } = this
    return (
      <div {...{
        className: classNames(
          css.wrapper,
          isMobile ? css.mobile : css.desktop
        )
      }}>
        <HeroBanner
          {...{
            // axiosInstance: false,
            isMobile,
            url: '/career/tabs.php',
            reducerKey: 'CareerBanner',
            className: isMobile ? css.banner_mobile : css.banner_desktop,
            bannerProps: {
              navBar: true,
              parallaxHeight: '70rem',
              blockPaddingBottom: isMobile ? 'm' : 'l'
            },
            breadcrumbsFromTabs: [
              { link: '/career/', title: 'Карьера' }
            ],
            code: iCode
          }}
        />
        <NavBar
          {...{
            code: iCode,
            isMobile,
            navBar
          }}
        />
        {iCode === 'career' && (
          <Fragment>
            {/* <CareerDocumentation {...{ isMobile }} /> */}
            <CareerTextBefore {...{ isMobile }} />
            <CareerBrand {...{ isMobile }} />
            <CareerTextAfter {...{ isMobile }} />
          </Fragment>
        )}
        {iCode === 'vacancy' && (
          <Fragment>
            <CareerVacancy {...{ isMobile }} />
            <FormVacancy
              {...{
                isMobile,
                vacancyName: 'Без вакансии',
                className: css.formVacancy,
                customAgreeLabel: false,
                showHhLink: true,
                showComeFrom: false
              }}
            />
          </Fragment>
        )}
        {iCode === 'profi' && (
          <CareerProfi {...{ isMobile, className: css.container }} />
        )}
        {iCode === 'cause' && (
          <CareerCause {...{ isMobile, className: css.container }} />
        )}
        {iCode === 'students' && (
          <CareerStudents {...{ isMobile, className: css.container }} />
        )}
        {iCode === 'contacts' && (
          <div {...{ className: css.container_form }}>
            {/* <FormContacts
              {...{
                onlyForm: true,
                className: css.contacts,
                requestUrl: '/career/contacts.php',
                reducerKey: 'careerContacts',
                form: 'careerContacts',
                isMobile
              }}
            /> */}
            <div {...{ id: 'Maps', className: css.container_address }}>
              <Officess {...{ isMobile }} />
            </div>
          </div>
        )}
        {iCode === 'training' && (
          <Training {...{ isMobile }} />
        )}
        {/* <SocialsBlock {...{ isMobile, className: css.subscribe }} /> */}
        {/* <Information {...{ isMobile }} /> */}
      </div>
    )
  }
}

CareerPage.defaultProps = {
  isMobile: false
}

CareerPage.propTypes = {
  response: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  isMobile: PropTypes.bool,
  navBar: PropTypes.object
}

export default CareerPage
