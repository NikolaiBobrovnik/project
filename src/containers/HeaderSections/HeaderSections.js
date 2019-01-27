import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PopupsActions from 'containers/Popups/_service/PopupsActions'
import toJS from 'HOC/toJS'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

import css from './headerSections.scss'

import FirstLevelList from 'kalashnikov-framework/lib/components/Structure&Sections/FirstLevelList'
import SecondLevelList from 'kalashnikov-framework/lib/components/Structure&Sections/SecondLevelList/SecondLevelList'

function mapStateToProps (state) {
  return {
    footerState: state.get('footer'),
    popupsState: state.get('popups'),
    headerSectionsState: state.getIn(['remoteData', 'HeaderSections'])
  }
}

function mapDispatchToProps (dispatch) {
  return {
    popupsActions: bindActionCreators(PopupsActions, dispatch)
  }
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
export default class HeaderSections extends Component {
  state = {
    firstList: 0,
    secondList: null,
    thirdList: null
  }

  changeListNum = (name, number) => {
    this.setState({ [name]: number })
  }

  componentWillUnmount () {
    this.props.popupsActions.closePopup('sectionsPopup')
  }

  componentWillMount () {
    this.props.popupsActions.openPopup('sectionsPopup')
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.firstList !== nextState.firstList) {
      this.setState({ secondList: null })
    }
  }

  render () {
    const {
      props: {
        hash,
        popupsState: { sectionsPopup },
        headerSectionsState: { response: { list = [] } = {}, empty } = {}
      },
      state: { firstList, secondList, thirdList }
    } = this

    if (
      (hash === '#production' || hash === '#use') &&
      sectionsPopup &&
      Object.keys(list).length > 0
    ) {
      const type = hash.replace('#', '')
      let sections = {}

      list.map(data => {
        return (sections[data.code] = { list: data.list, title: data.title })
      })

      return (
        <div
          {...{
            className: css.block
          }}
        >
          {sections[type].list.map(({ banner }, key) => {
            return (
              <div
                {...{
                  className: classNames(css.banner, {
                    [css.active]: firstList === key
                  }),
                  key,
                  style: { backgroundImage: `url(${banner})` }
                }}
              />
            )
          })}
          {sections[type].list[firstList].list &&
          sections[type].list[firstList].list.map(({ banner }, key) => {
            return (
              <div
                {...{
                  className: classNames(css.banner, css.bannerTwo, {
                    [css.active]: secondList === key
                  }),
                  key,
                  style: { backgroundImage: `url(${banner})` }
                }}
              />
            )
          })}
          <div
            {...{
              className: css.container
            }}
          >
            {!empty && (
              <Fragment>
                <FirstLevelList
                  {...{
                    className: css.firstLevelList,
                    list: sections[type].list,
                    selectedItem: firstList,
                    changeListNum: this.changeListNum,
                    type,
                    contacts: false,
                    socials: false,
                    showCounter: true
                  }}
                />
                {sections[type].list[firstList].list && (
                  <SecondLevelList
                    {...{
                      list: sections[type].list[firstList].list,
                      selectedItem: secondList,
                      changeListNum: this.changeListNum,
                      type,
                      theme: 'secondList'
                    }}
                  />
                )}
                {secondList !== null &&
                  sections[type].list[firstList].list &&
                  sections[type].list[firstList].list[secondList] &&
                  sections[type].list[firstList].list[secondList].list && (
                  <SecondLevelList
                    {...{
                      list:
                          sections[type].list[firstList].list[secondList].list,
                      selectedItem: thirdList,
                      changeListNum: this.changeListNum,
                      type,
                      theme: 'thirdList'
                    }}
                  />
                )}
              </Fragment>
            )}
          </div>
        </div>
      )
    } else return null
  }
}

HeaderSections.propTypes = {
  footerState: PropTypes.object,
  hash: PropTypes.string,
  headerSectionsActions: PropTypes.object,
  headerSectionsState: PropTypes.object,
  history: PropTypes.object,
  popupsActions: PropTypes.object,
  popupsState: PropTypes.object,
  location: PropTypes.object
}
