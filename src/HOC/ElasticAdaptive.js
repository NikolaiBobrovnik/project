import React from 'react'
import toJS from './toJS'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { SET_CURRENT_FONT_SIZE } from 'reducers/elasticAdaptive'
import $ from 'jquery'
import { isBrowser } from 'utils'

function mapStateToProps (state) {
  return {
    state: state.getIn(['elasticAdaptive', 'config'])
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCurFontSize: ({ curFontSize }) => (dispatch({
      type: SET_CURRENT_FONT_SIZE,
      payload: { curFontSize }
    }))
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@toJS
export default class ElasticAdaptive extends React.Component {
  componentWillMount () {
    if (isBrowser) {
      this.changeSize()
      window.addEventListener('resize', this.changeSize)
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.changeSize)
  }

  changeSize = () => {
    const { type, setCurFontSize } = this.props
    const html = document.documentElement
    const { baseSize, baseWidth, widthLimit } = this.props.state[type]
    let width = $(window).width()
    if (widthLimit) {
      width = Math.min(width, widthLimit)
    }

    const curFontSize = width / baseWidth * baseSize
    html.style.fontSize = curFontSize + 'px'
    setCurFontSize({ curFontSize })
  }

  render () {
    return this.props.children
  }
}

ElasticAdaptive.propTypes = {
  type: PropTypes.oneOf(['desktop', 'mobile']),
  state: PropTypes.object,
  children: PropTypes.node,
  setCurFontSize: PropTypes.func
}

ElasticAdaptive.defaultProps = {
  type: 'desktop'
}
