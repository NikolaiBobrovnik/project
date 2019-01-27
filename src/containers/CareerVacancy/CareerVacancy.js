import React, { Component } from 'react'
import { withRemoteData } from 'remote-data-provider'
import toJS from 'HOC/toJS'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import filter from 'lodash/filter'

import css from './careerVacancy.scss'
import classNames from 'classnames'

import TabsScrollLayout from 'kalashnikov-framework/lib/components/TabsScrollLayout'
import LinkCardList from 'kalashnikov-framework/lib/components/LinkCardList'
import Selector from 'kalashnikov-framework/lib/components/Selector'
import Input from 'kalashnikov-framework/lib/components/InputNew'

function mapStateToProps (state) {
  return {
    baseFontSize: state.get('elasticAdaptive')
  }
}

let options = {
  request: {
    url: 'career/vacancies.php'
  },
  reducerKey: 'careerVacancies'
}

@connect(mapStateToProps)
@toJS
@withRemoteData(options)
class CareerVacancy extends Component {
  state = {
    city: '',
    brand: '',
    items: '',
    search: '',
    direction: '',
    newItems: null,
    citiesOptions: [],
    brandOptions: [],
    directionOptions: []
  }

  changeSelector = (filter, label) => {
    this.setState({ [filter]: label })
  }

  componentWillMount () {
    this.setState({ items: this.props.response.vacancies.items })
  }

  filterItems = (items, city, brand, search, direction) => {
    let newItems = []
    let directionFilteredItems = filter(items, function (o) {
      return (
        (direction.length ? direction.indexOf(o.title) !== -1 : true)
      )
    })
    const directionFilteredItemsCopy = directionFilteredItems.map(a => Object.assign({}, a))

    for (let i = 0; i < Object.keys(directionFilteredItems).length; i++) {
      if (directionFilteredItems[i].linkItem) {
        let filteredItems = filter(directionFilteredItems[i].linkItem, function (o) {
          return (
            (city.length ? city.indexOf(o.city) !== -1 : true) &&
            (brand.length ? brand.indexOf(o.brand) !== -1 : true) &&
            (search.length
              ? o.linkText.toLowerCase().indexOf(search.toLowerCase()) !== -1
              : true)
          )
        })

        if (filteredItems.length) {
          directionFilteredItemsCopy[i].linkItem = filteredItems
          newItems.push(directionFilteredItemsCopy[i])
        }
      }
    }
    this.setState({ newItems })
  }

  getOptions = () => {
    const {
      state: { citiesOptions, brandOptions, directionOptions },
      props: {
        response: {
          vacancies: { items },
          cities: { items: citiesItems },
          brands: { items: brandItems }
        }
      }
    } = this

    citiesItems.forEach(element => {
      citiesOptions.push({ value: element, label: element })
    })
    brandItems.forEach(element => {
      brandOptions.push({ value: element, label: element })
    })
    items.forEach(element => {
      if (element.linkItem && element.linkItem.length > 0) {
        directionOptions.push({ value: element.title, label: element.title })
      }
    })

    this.setState({
      citiesOptions,
      brandOptions,
      directionOptions
    })
  }

  componentWillUpdate (nextProps, nextState, nextContext) {
    if (
      this.state.city !== nextState.city ||
      this.state.brand !== nextState.brand ||
      this.state.search !== nextState.search ||
      this.state.direction !== nextState.direction
    ) {
      this.filterItems(
        nextState.items,
        nextState.city,
        nextState.brand,
        nextState.search,
        nextState.direction
      )
    }
  }

  componentDidMount () {
    this.getOptions()
  }

  render () {
    const {
      state: {
        newItems,
        citiesOptions,
        brandOptions,
        directionOptions
      },
      props: {
        isMobile,
        baseFontSize: { curFontSize },
        response: { vacancies: { items } }
      }
    } = this

    return (
      <div
        {...{
          className: classNames(css.wrapper, {
            [css.mobile]: isMobile,
            [css.desktop]: !isMobile
          })
        }}
      >
        <TabsScrollLayout
          {...{
            isMobile,
            showHideGroupProps: {
              showHide: true,
              color: 'black',
              size: isMobile ? 's' : 'm'
            },
            asideChildren: (
              <div
                {...{
                  className: isMobile ? css.selectorsMobile : css.selectors
                }}
              >
                <Input
                  {...{
                    label: '',
                    name: 'search',
                    placeholder: 'Поиск',
                    type: 'text',
                    required: false,
                    input: {
                      onChange: e => {
                        this.setState({ search: e.target.value })
                      }
                    },
                    className: css.searchInput
                  }}
                />
                {directionOptions.length !== 0 && (
                  <Selector
                    {...{
                      className: css.selector,
                      options: directionOptions,
                      placeholderText: 'Профессиональная сфера',
                      textTransform: 'none',
                      changeSelect: ({label}) => {
                        this.changeSelector('direction', label)
                      }
                    }}
                  />
                )}
                {citiesOptions.length !== 0 && (
                  <Selector
                    {...{
                      className: css.selector,
                      options: citiesOptions,
                      placeholderText: 'Город',
                      textTransform: 'none',
                      changeSelect: ({label}) => {
                        this.changeSelector('city', label)
                      }
                    }}
                  />
                )}
                {brandOptions.length !== 0 && (
                  <Selector
                    {...{
                      className: css.selector,
                      options: brandOptions,
                      placeholderText: 'Компания',
                      textTransform: 'none',
                      changeSelect: ({label}) => {
                        this.changeSelector('brand', label)
                      }
                    }}
                  />
                )}
              </div>
            ),
            asideProps: {
              reverse: true
            },
            offsetBottom: 1.5 * curFontSize,
            offset: 8 * curFontSize,
            id: 'vacancy',
            mainItem: [<LinkCardList {...{ borderAfterLast: true }} />],
            items: newItems !== null ? newItems : items,
            wrapShowHideGroup: false
          }}
        />
      </div>
    )
  }
}

CareerVacancy.propTypes = {
  response: PropTypes.object,
  isMobile: PropTypes.bool,
  baseFontSize: PropTypes.object
}

export default CareerVacancy
