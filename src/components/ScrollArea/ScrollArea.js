import React, { PureComponent } from 'react'
import Scrollbar from 'react-scrollbar/dist/no-css'
import 'react-scrollbar/dist/css/scrollArea.css'

import { isBrowser } from 'utils'

export default class ScrollArea extends PureComponent {
  render () {
    if (isBrowser) {
      return (
        <Scrollbar
          {...this.props}
        />
      )
    } else {
      return null
    }
  }
}
