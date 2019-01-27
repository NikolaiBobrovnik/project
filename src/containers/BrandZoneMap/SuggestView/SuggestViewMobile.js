import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as BrandZoneActions from 'containers/BrandZoneMap/_service/BrandZoneActions'
import toJS from 'HOC/toJS'
import BrandZoneSearch from 'kalashnikov-framework/lib/components/BrandZones/BrandZoneSearch'
import {getNearCityId} from '../_service/BrandZoneActions'

function mapStateToProps (state) {
  return {
    brandZoneCitiesState: state.getIn(['brandZone', 'cities'])
  }
}

function mapDispatchToProps (dispatch) {
  return {
    brandZoneActions: bindActionCreators(BrandZoneActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@toJS
export default class SuggestView extends Component {
  state = {
    suggestView: undefined,
    oldRequestsList: [],
    completeList: [],
    query: '',
    queryValue: ''
  }

  componentDidUpdate (prevProps, prevState) {
    // if (!this.props.yMaps && nextProps.yMaps) {
    //   let suggestView = new this.state.yMaps.SuggestView('suggest')
    //   this.setState({suggestView})
    // }
    if (prevState.query !== this.state.query) {
      const { yMaps } = this.props
      if (yMaps) {
        yMaps.suggest(this.state.query).then((items) => {
          this.setState({ completeList: items })
        })
      }
    }
    if (prevState.queryValue !== this.state.queryValue) {
      const { yMaps } = this.props
      if (yMaps) {
        yMaps.geocode(this.state.queryValue).then(
          (res) => {
            let coord = res.geoObjects.get(0).geometry.getCoordinates()
            let cities = this.props.brandZoneCitiesState
            let nearCityId = getNearCityId({ yMaps, coord, cities })
            this.props.brandZoneActions.changeUserLocation({ value: coord })
            this.props.brandZoneActions.changeCity({ id: nearCityId })
          },
          (err) => {
            console.log(err)
          }
        )
      }
    }
  }

  onCompleteListItemClick = (query) => {
    console.log('клик по', query['displayName'])
    this.setState({
      ...this.state,
      query: query['displayName'],
      queryValue: query['value']
    })
  }
  onInputChange = (e) => {
    this.setState({
      ...this.state,
      query: e.target.value
    })
  }
  onSearchButtonClick = () => {
    this.setState({
      ...this.state,
      queryValue: this.state.query
    })
  }

  render () {
    console.log('SuggestView')
    const { yMaps } = this.props
    if (!yMaps) {
      return false
    }
    const { query, oldRequestsList, completeList } = this.state
    const {
      onInputChange,
      onCompleteListItemClick,
      onSearchButtonClick
    } = this

    return (
      <BrandZoneSearch
        {...{
          isMobile: true,
          query,
          oldRequestsList,
          completeList,
          onInputChange,
          onCompleteListItemClick,
          onSearchButtonClick
        }}
      />
    )
  }
}

SuggestView.propTypes = {
  brandZoneActions: PropTypes.object,
  brandZoneCitiesState: PropTypes.object,
  yMaps: PropTypes.any
}
