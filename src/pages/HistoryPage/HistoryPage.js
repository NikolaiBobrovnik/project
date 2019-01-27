import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRemoteData } from 'remote-data-provider'
import Swiper from 'react-id-swiper'
import classNames from 'classnames'
import { isBrowser } from 'utils'

import css from './historyPage.scss'

import BrandHeroBanner from 'kalashnikov-framework/lib/components/BrandHeroBanner'

import { PAGE_ABOUT, PAGE_HISTORY } from 'pages/Routes'

@withRemoteData({
  request: {
    url: '/about/history.php'
  },
  reducerKey: 'history'
})
class HistoryPage extends PureComponent {
  constructor (props) {
    super(props)
    this.swiper = React.createRef()
  }

  state = {
    activeIndex: 0,
    activeImage: 1
  }

  componentDidMount () {
    if (!document.body.classList.contains('overflow_hidden')) {
      document.body.classList.add('overflow_hidden')
    }
  }

  componentWillUnmount () {
    if (document.body.classList.contains('overflow_hidden')) {
      document.body.classList.remove('overflow_hidden')
    }
  }

  render () {
    const {
      props: { response: { items, title } },
      state: { activeIndex, activeImage }
    } = this

    return (
      <div {...{ className: css.page }}>
        <Swiper
          {...{
            ref: this.swiper,
            speed: 600,
            direction: 'vertical',
            slidesPerView: 'auto',
            // slidesPerView: 0.8,
            containerClass: classNames(css.swiper),
            mousewheel: true,
            on: {
              slideChangeTransitionStart: () =>
                this.swiper &&
                this.setState({
                  activeIndex: this.swiper.current.swiper.activeIndex,
                  activeImage:
                    this.swiper.current.swiper.activeIndex === 0
                      ? 1
                      : this.swiper.current.swiper.activeIndex
                })
            }
          }}
        >
          <div {...{ className: css.hero }}>
            <BrandHeroBanner
              {...{
                isBrowser,
                title: title,
                image: '',
                backgroundColor: 'transparent',
                color: 'black',
                parallax: false,
                blockPaddingBottom: 'xs',
                textPaddingTop: 'm',
                titleSize: 'l',
                breadcrumbs: [
                  { title: 'О концерне', link: PAGE_ABOUT },
                  { title: 'История', link: PAGE_HISTORY }
                ],
                className: css.heroBanner
              }}
            />
          </div>
          {items.map(({ title, paragraph, year }, key) => {
            return (
              <div {...{ className: css.slide, key }}>
                <div {...{ className: css.leftBlock }}>
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
                </div>
              </div>
            )
          })}
        </Swiper>
        <div
          {...{
            className: classNames(css.imageBlock, {
              [css.disabled]: activeIndex === 0
            })
          }}
        >
          {items.map(({ image }, key) => {
            return (
              <div
                {...{
                  key,
                  className: classNames(css.image, {
                    [css.active]: activeImage === ++key
                  }),
                  style: { backgroundImage: `url(${image})` }
                }}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

HistoryPage.defaultProps = {
  response: {}
}

HistoryPage.propTypes = {
  // code: PropTypes.string,
  response: PropTypes.object
}

export default HistoryPage
