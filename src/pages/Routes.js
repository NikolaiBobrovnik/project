import React, { Component, Fragment } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

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
import SubscribePage from './SubscribePage/SubscribePage'
import SupportPage from './SupportPage/SupportPage'
import SearchPage from './SearchPage/SearchPage'
import Page404 from 'pages/Page404/Page404'
import HistoryPage from 'pages/HistoryPage/HistoryPage'
import ContactsPage from 'pages/ContactsPage/ContactsPage'

export const PAGE_HOME = '/'
export const PAGE_ABOUT = '/about/'
export const PAGE_ABOUT_INFORMATION = '/about/information/'
export const PAGE_ABOUT_DISCLOSURE_INFO = '/about/disclosure_info/'
export const PAGE_ABOUT_PEOPLE = '/about/people/'
export const PAGE_ACTIVITIES = '/activity/'
export const PAGE_CAREER = '/career/'
export const PAGE_INVESTORS = '/investors/'
export const PAGE_CORRUPTION = '/corruption/'
export const PAGE_PRESS_CENTER = '/press-center/'
export const PAGE_PSKK = '/production_system/'
export const PAGE_PSKK_KAIDZEN = '/production_system/kaidzen/'
export const PAGE_PSKK_LABORATORY = '/production_system/laboratory/'
export const PAGE_SUPPORT = '/support/'
export const PAGE_SEARCH = '/search'
export const PAGE_SUBSCRIBE = '/subscribe/'
export const PAGE_UNSUBSCRIBE = '/unsubscribe/'
export const PAGE_HISTORY = '/about/history/'
export const PAGE_CONTACTS = '/contacts/'

@withRouter
export default class Routes extends Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    return (
      <Switch>
        {/* главная */}
        <Route {...{ exact: true, path: PAGE_HOME, component: HomePage }} />

        {/* о концерне */}
        <Route {...{ exact: true, path: PAGE_ABOUT, component: AboutPage }} />
        <Route
          {...{
            exact: true,
            path: PAGE_ABOUT_INFORMATION,
            component: AboutInformationPage
          }}
        />
        <Route
          {...{
            exact: true,
            path: PAGE_ABOUT_DISCLOSURE_INFO,
            component: AboutDisclosureInfoPage
          }}
        />
        <Route
          {...{
            exact: true,
            path: PAGE_ABOUT_PEOPLE,
            component: AboutPeoplePage
          }}
        />
        <Route
          {...{ path: `${PAGE_ABOUT_PEOPLE}:code`, component: AboutPeoplePage }}
        />

        {/* деятельность */}
        <Route
          {...{ exact: true, path: PAGE_ACTIVITIES, component: ActivityPage }}
        />
        <Route
          {...{
            exact: true,
            path: `${PAGE_ACTIVITIES}:iCode`,
            component: ActivityInnerPage
          }}
        />
        <Route
          {...{ path: `${PAGE_ACTIVITIES}:iCode/:code`, component: DetailPage }}
        />

        {/* пресс-центр */}
        <Route
          {...{
            exact: true,
            path: PAGE_PRESS_CENTER,
            component: PressCenterPage
          }}
        />
        <Route
          {...{
            exact: true,
            path: `${PAGE_PRESS_CENTER}:iCode`,
            component: PressCenterPage
          }}
        />
        <Route
          {...{
            path: `${PAGE_PRESS_CENTER}:iCode/:code`,
            component: PressCenterInnerPage
          }}
        />

        {/* карьера */}
        <Route {...{ exact: true, path: PAGE_CAREER, component: CareerPage }} />
        <Route
          {...{
            exact: true,
            path: `${PAGE_CAREER}:iCode`,
            component: CareerPage
          }}
        />
        <Route
          {...{
            path: `${PAGE_CAREER}:iCode/:code`,
            component: CareerVacancyInnerPage
          }}
        />

        {/* пскк */}
        <Route {...{ exact: true, path: PAGE_PSKK, component: PskkPage }} />
        <Route
          {...{
            exact: true,
            path: PAGE_PSKK_KAIDZEN,
            component: PskkKaidzenPage
          }}
        />
        <Route
          {...{
            exact: true,
            path: PAGE_PSKK_LABORATORY,
            component: PskkLaboratoryPage
          }}
        />

        {/* инвесторы */}
        <Route {...{ path: PAGE_INVESTORS, component: InvestorsPage }} />

        {/* противодействие коррупции */}
        <Route {...{ path: PAGE_CORRUPTION, component: CorruptionPage }} />

        {/* подписка/отписка на рассылку */}
        <Route
          {...{
            path: PAGE_SUBSCRIBE,
            children: ({ location: { search } }) => (
              <Fragment>
                {search ? (
                  <SubscribePage {...{ subscribe: true }} />
                ) : (
                  <SearchPage />
                )}
              </Fragment>
            )
          }}
        />
        <Route
          {...{
            path: PAGE_UNSUBSCRIBE,
            children: () => <SubscribePage {...{ subscribe: false }} />
          }}
        />
        {/* поддержка */}
        <Route
          {...{
            exact: true,
            path: PAGE_SUPPORT,
            component: SupportPage
          }}
        />
        <Route
          {...{ path: `${PAGE_SUPPORT}:iCode`, component: SupportPage }}
        />
        <Route {...{ path: PAGE_SEARCH, component: SearchPage }} />
        <Route {...{ path: PAGE_HISTORY, component: HistoryPage }} />
        <Route {...{ exact: true, path: PAGE_CONTACTS, component: ContactsPage }} />
        <Route
          {...{
            path: `${PAGE_CONTACTS}:code`,
            component: ContactsPage
          }}
        />
        <Route {...{ path: '*', component: Page404 }} />
      </Switch>
    )
  }
}

Routes.propTypes = {
  location: PropTypes.object
}
