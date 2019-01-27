import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import css from './brandZoneCity.scss'
import _ from 'lodash/core'
import BrandZoneCityFW from 'kalashnikov-framework/lib/components/BrandZones/BrandZoneCity'

import * as BrandZoneActions from 'containers/BrandZoneMap/_service/BrandZoneActions'
import toJS from 'HOC/toJS'

function mapStateToProps (state) {
  return {
    citiesBrandZoneState: state.getIn(['brandZone', 'cities']),
    userLocationBrandZoneState: state.getIn(['brandZone', 'userLocation'])
  }
}

function mapDispatchToProps (dispatch) {
  return {
    brandZoneActions: bindActionCreators(BrandZoneActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@toJS
export default class BrandZoneCity extends Component {
  render () {
    const { list, currentCity } = this.props.citiesBrandZoneState
    const { isAjax } = this.props.userLocationBrandZoneState
    if (!currentCity) {
      return null
    }
    let cities = _.sortBy(list, ['title', 'counter'])
    return (
      <div style={{opacity: isAjax ? '0' : '1'}}>
        <BrandZoneCityFW
          {...{
            isMobile: true,
            city: list[currentCity].titlePrepositional,
            onCityClick: (id) => {
              this.props.brandZoneActions.changeCity({ id })
            },
            list: {
              activeId: currentCity,
              items: cities
            }
          }}
        />
      </div>
    )
  }
}

BrandZoneCity.propTypes = {
  brandZoneActions: PropTypes.object,
  citiesBrandZoneState: PropTypes.object,
  userLocationBrandZoneState: PropTypes.object
}
