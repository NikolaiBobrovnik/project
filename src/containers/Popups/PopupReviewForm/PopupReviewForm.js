import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PopupsActions from 'containers/Popups/_service/PopupsActions'
import toJS from 'HOC/toJS'
import PropTypes from 'prop-types'
import TextArea from 'components/TextArea/TextArea'
import { required } from 'utils/Form/validate'
import { axiosAPI } from 'Services/axiosInstances'
import qs from 'qs'

import css from './popupReviewForm.scss'

import PopupWrapper from 'kalashnikov-framework/lib/components/Popups/PopupWrapper'
import Button from 'kalashnikov-framework/lib/components/ButtonNew'

import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

function mapDispatchToProps (dispatch) {
  return {
    popupsActions: bindActionCreators(PopupsActions, dispatch)
  }
}

@connect('', mapDispatchToProps)
@toJS
class PopupReviewForm extends PureComponent {
  state = {
    success: false,
    error: false,
    successTitle: '',
    successText: ''
  }

  render () {
    const {
      props: { popupsActions: { closePopup }, handleSubmit },
      state: { success }
    } = this

    const submit = values => {
      let content = values.toJS()
      axiosAPI
        .post('/form/report.php', qs.stringify(content))
        .then(response => {
          const { result } = response.data
          if (result) {
            this.setState({
              success: true,
              error: false
            })
          } else {
            this.setState({ success: false, error: true })
          }
        })
    }

    return (
      <PopupWrapper
        {...{
          defaultInner: true,
          onClose: () => {
            closePopup('popupReviewForm')
          },
          className: css.popupReviewForm,
          title: success ? 'Спасибо!' : 'Написать отзыв',
          footer: success ? (
            null
          ) : (
            <Button
              {...{
                htmlFor: 'reviewFormButton',
                title: 'Отправить отзыв',
                icon: <MdKeyboardArrowRight />
              }}
            />
          )
        }}
      >
        {!success ? (
          <form {...{ onSubmit: handleSubmit(submit) }}>
            <Field
              {...{
                name: 'comment',
                type: 'text',
                component: TextArea,
                label: 'комментарий',
                validate: [required],
                className: css.textArea
              }}
            />
            <input
              {...{
                type: 'submit',
                hidden: true,
                id: 'reviewFormButton'
              }}
            />
          </form>
        ) : (
          <p {...{className: css.paragraph}}>Ваш отзыв отправлен</p>
        )}
      </PopupWrapper>
    )
  }
}

PopupReviewForm.propTypes = {
  popupsActions: PropTypes.object,
  handleSubmit: PropTypes.func
}

export default reduxForm({
  form: 'popupReviewForm' // a unique name for the form
})(PopupReviewForm)
