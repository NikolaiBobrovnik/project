import React, { Component, Fragment } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  PAGE_HOME,
  PAGE_ABOUT,
  PAGE_ABOUT_INFORMATION,
  PAGE_ABOUT_DISCLOSURE_INFO,
  PAGE_ABOUT_PEOPLE,
  PAGE_ACTIVITIES,
  PAGE_CAREER,
  PAGE_INVESTORS,
  PAGE_PRESS_CENTER,
  PAGE_PSKK,
  PAGE_PSKK_KAIDZEN,
  PAGE_PSKK_LABORATORY,
  PAGE_SUBSCRIBE,
  PAGE_UNSUBSCRIBE,
  PAGE_SEARCH,
  PAGE_CONTACTS,
  PAGE_CORRUPTION,
  PAGE_HISTORY,
  PAGE_SUPPORT
} from './Routes'

import HomePage from './HomePage/HomePage'
import AboutPage from './AboutPage/AboutPage'
import AboutInformationPage from './AboutInformationPage/AboutInformationPage'
import AboutPeoplePage from './AboutPeoplePage/AboutPeoplePage'
import ActivityPage from './ActivityPage/ActivityPage'
import ActivityInnerPage from './ActivityInnerPage/ActivityInnerPage'
import CareerPage from './CareerPage/CareerPage'
import CareerVacancyInnerPage from './CareerVacancyInnerPage/CareerVacancyInnerPage'
import DetailPage from './DetailPage/DetailPage'
import InvestorsPage from './InvestorsPage/InvestorsPage'
import CorruptionPage from './CorruptionPage/CorruptionPage'
import AboutDisclosureInfoPage from './InfoPage/InfoPage'
import PressCenterPage from './PressCenterPage/PressCenterPage'
import PressCenterInnerPage from './PressCenterInnerPage/PressCenterInnerPage'
import PskkPage from './PskkPage/PskkPage'
import PskkKaidzenPage from './PskkKaidzenPage/PskkKaidzenPage'
import PskkLaboratoryPage from './PskkLaboratoryPage/PskkLaboratoryPage'
import SearchPage from './SearchPage/SearchPage'
import SubscribePage from './SubscribePage/SubscribePage'
import Page404 from 'pages/Page404/Page404'
import ContactsPage from 'pages/ContactsPage/ContactsPage'
import HistoryMobilePage from 'pages/HistoryPage/HistoryMobilePage'
import SupportPage from 'pages/SupportPage/SupportPage'

@withRouter
export default class Routes extends Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    const isMobile = true

    return (
      <Switch>
        {/* главная */}
        <Route
          {...{
            exact: true,
            path: PAGE_HOME,
            children: () => (
              <HomePage {...{ subscribe: false, isMobile }} />
            )
          }}
        />

        {/* о концерне */}
        <Route
          {...{
            exact: true,
            path: PAGE_ABOUT,
            children: () => <AboutPage {...{ isMobile }} />
          }}
        />
        <Route
          {...{
            exact: true,
            path: PAGE_ABOUT_DISCLOSURE_INFO,
            children: () => <AboutDisclosureInfoPage {...{ isMobile }} />
          }}
        />
        <Route
          {...{
            exact: true,
            path: PAGE_ABOUT_INFORMATION,
            children: () => <AboutInformationPage {...{ isMobile }} />
          }}
        />
        <Route
          {...{
            exact: true,
            path: PAGE_HISTORY,
            children: () => <HistoryMobilePage {...{ isMobile }} />
          }}
        />
        <Route
          {...{
            exact: true,
            path: PAGE_ABOUT_PEOPLE,
            children: () => <AboutPeoplePage {...{ isMobile }} />
          }}
        />
        <Route
          {...{
            path: `${PAGE_ABOUT_PEOPLE}:code`,
            children: () => <AboutPeoplePage {...{ isMobile }} />
          }}
        />

        {/* деятельность */}
        <Route
          {...{
            exact: true,
            path: PAGE_ACTIVITIES,
            children: () => <ActivityPage {...{ isMobile }} />
          }}
        />
        <Route
          {...{
            exact: true,
            path: `${PAGE_ACTIVITIES}:iCode`,
            children: () => <ActivityInnerPage {...{ isMobile }} />
          }}
        />
        <Route
          {...{
            exact: true,
            path: `${PAGE_ACTIVITIES}:iCode/:code`,
            children: () => <DetailPage {...{ isMobile }} />
          }}
        />
        {/* поддержка */}
        <Route
          {...{
            exact: true,
            path: PAGE_SUPPORT,
            children: ({ match }) => (
              <SupportPage {...{ match, isMobile }} />
            )
          }}
        />
        <Route
          {...{
            exact: true,
            path: `${PAGE_SUPPORT}:iCode`,
            children: ({ match }) => <SupportPage {...{ match, isMobile }} />
          }}
        />
        {/* пресс-центр */}
        <Route
          {...{
            exact: true,
            path: PAGE_PRESS_CENTER,
            children: ({ match }) => (
              <PressCenterPage {...{ match, isMobile }} />
            )
          }}
        />
        <Route
          {...{
            exact: true,
            path: `${PAGE_PRESS_CENTER}:iCode`,
            children: ({ match }) => (
              <PressCenterPage {...{ match, isMobile }} />
            )
          }}
        />
        <Route
          {...{
            exact: true,
            path: `${PAGE_PRESS_CENTER}:iCode/:code`,
            children: () => <PressCenterInnerPage {...{ isMobile }} />
          }}
        />

        {/* карьера */}
        <Route
          {...{
            exact: true,
            path: PAGE_CAREER,
            children: () => <CareerPage {...{ isMobile }} />
          }}
        />
        <Route
          {...{
            exact: true,
            path: `${PAGE_CAREER}:iCode`,
            children: () => <CareerPage {...{ isMobile }} />
          }}
        />
        <Route
          {...{
            exact: true,
            path: `${PAGE_CAREER}:iCode/:code`,
            children: () => <CareerVacancyInnerPage {...{ isMobile }} />
          }}
        />

        {/* пскк */}
        <Route
          {...{
            exact: true,
            path: PAGE_PSKK,
            children: () => <PskkPage {...{ isMobile }} />
          }}
        />
        <Route
          {...{
            exact: true,
            path: PAGE_PSKK_KAIDZEN,
            children: () => <PskkKaidzenPage {...{ isMobile }} />
          }}
        />
        <Route
          {...{
            exact: true,
            path: PAGE_PSKK_LABORATORY,
            children: () => <PskkLaboratoryPage {...{ isMobile }} />
          }}
        />

        {/* инвесторы */}
        <Route
          {...{
            exact: true,
            path: PAGE_INVESTORS,
            children: () => <InvestorsPage {...{ isMobile }} />
          }}
        />

        {/* противодействие коррупции */}
        <Route
          {...{
            exact: true,
            path: PAGE_CORRUPTION,
            children: () => <CorruptionPage {...{ isMobile }} />
          }}
        />

        {/* подписка/отписка на рассылку */}
        <Route
          {...{
            path: PAGE_SUBSCRIBE,
            children: ({ location: { search } }) => (
              <Fragment>
                {search ? (
                  <SubscribePage {...{ subscribe: true, isMobile }} />
                ) : (
                  <SearchPage {...{ isMobile }} />
                )}
              </Fragment>
            )
          }}
        />
        <Route
          {...{
            path: PAGE_UNSUBSCRIBE,
            children: () => (
              <SubscribePage {...{ subscribe: false, isMobile }} />
            )
          }}
        />

        {/* поиск */}
        <Route
          {...{
            path: PAGE_SEARCH,
            children: () => (
              <SearchPage {...{ isMobile }} />
            )
          }}
        />
        <Route {...{ exact: true, path: PAGE_CONTACTS, component: ContactsPage }} />
        <Route
          {...{
            path: `${PAGE_CONTACTS}:code`,
            component: ContactsPage
          }}
        />

        {/* 404 */}
        <Route
          {...{
            path: '*',
            children: () => (
              <Page404 />
            )
          }}
        />
      </Switch>
    )
  }
}

Routes.propTypes = {
  location: PropTypes.object
}
