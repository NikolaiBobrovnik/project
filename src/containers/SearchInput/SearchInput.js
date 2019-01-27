import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import toJS from 'HOC/toJS'
import qs from 'qs'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { getFormValues } from 'redux-form/immutable'

import css from './searchInput.scss'

import Button from 'kalashnikov-framework/lib/components/Button'
import InputWithButton from 'components/InputWithButton/InputWithButton'

import MdSearch from 'react-icons/lib/md/search'

function mapStateToProps (state) {
  return {
    formState: getFormValues('searchInputForm')(state) || {}
  }
}

@withRouter
@connect(mapStateToProps)
@toJS
class SearchInput extends PureComponent {
  // отправляем поисковый запрос из инпута
  onSubmit = () => {
    const {
      formState: {
        searchInput
      }
    } = this.props
    if (searchInput) {
      this.props.history.push({
        pathname: '/search',
        search: qs.stringify({ query: searchInput })
      })
    }
  }

  render () {
    const { className } = this.props

    return (
      <InputWithButton
        {...{
          inputPlaceholder: 'Введите запрос для поиска',
          onSubmit: this.onSubmit,
          form: 'searchInputForm',
          inputName: 'searchInput',
          inputType: 'text',
          button: (
            <Button
              {...{
                color: 'black',
                type: 'submit',
                background: 'none',
                iconPosition: 'center',
                icon: <MdSearch />,
                onClick: this.onSubmit
              }}
            />
          ),
          className: classNames(className, css.searchInput)
        }}
      />
    )
  }
}

SearchInput.propTypes = {
  searchInputActions: PropTypes.object,
  searchInputState: PropTypes.object,
  showSearch: PropTypes.bool,
  className: PropTypes.string,
  history: PropTypes.object,
  formState: PropTypes.object
}

export default SearchInput
