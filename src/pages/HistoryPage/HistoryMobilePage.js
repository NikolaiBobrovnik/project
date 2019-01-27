import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRemoteData } from 'remote-data-provider'
import classNames from 'classnames'
import { isBrowser } from 'utils'

import css from './historyMobilePage.scss'

import BrandHeroBanner from 'kalashnikov-framework/lib/components/BrandHeroBanner'

import { PAGE_ABOUT, PAGE_HISTORY } from 'pages/Routes'

@withRemoteData({
  request: {
    url: 'about/history.php'
  },
  reducerKey: 'history'
})
class HistoryMobilePage extends PureComponent {
  renderMobile () {
    const {
      props: { isMobile, response: { items, title } }
    } = this

    return (
      <div {...{ className: css.page }}>
        <BrandHeroBanner
          {...{
            isBrowser,
            title: title,
            image: '',
            backgroundColor: 'transparent',
            color: 'black',
            parallax: false,
            isMobile,
            blockPaddingBottom: 'xs',
            textPaddingTop: 's',
            titleSize: 's',
            breadcrumbs: [
              { title: 'О концерне', link: PAGE_ABOUT },
              { title: 'История', link: PAGE_HISTORY }
            ],
            className: css.mobileheroBanner
          }}
        />
        {items.map(({ title, paragraph, year, image, imageText }, key) => {
          return (
            <div {...{ className: css.slide, key }}>
              <p {...{ className: css.year }}>
                {year}
              </p>
              <div {...{ className: css.text }}>
                <h3
                  {...{
                    className: css.title,
                    dangerouslySetInnerHTML: { __html: title }
                  }}
                />
                <p
                  {...{
                    className: css.paragraph,
                    dangerouslySetInnerHTML: { __html: paragraph }
                  }}
                />
              </div>
              <div
                {...{
                  className: classNames(css.image),
                  style: {
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }
                }}
              />
              {imageText &&
              <div {...{ className: css.imageText }}> {imageText} </div>
              }
            </div>
          )
        })}
      </div>
    )
  }

  render () {
    return (
      <div {...{
        className: css.wrapperMobile
      }}
      >
        {this.renderMobile()}
      </div>
    )
  }
}

HistoryMobilePage.defaultProps = {
  isMobile: false,
  response: {}
}

HistoryMobilePage.propTypes = {
  // code: PropTypes.string,
  isMobile: PropTypes.bool,
  response: PropTypes.object
}

export default HistoryMobilePage
