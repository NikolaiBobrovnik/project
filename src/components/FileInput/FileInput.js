import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import css from './fileInput.scss'

import MdInsertDriveFile from 'react-icons/lib/md/insert-drive-file'
import MdClose from 'react-icons/lib/md/close'

class FileInput extends PureComponent {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  state = {
    fileName: '',
    fileSize: null,
    error: ''
  }

  onChange (e) {
    const { input: { onChange }, sizeLimit } = this.props
    const { error } = this.state

    const file = e.target.files[0]
    const fileSize = (file.size * 0.000001).toFixed(1)

    if (fileSize > sizeLimit) {
      this.setState({error: `Файл должен быть не более ${sizeLimit}мб`})
    } else {
      if (error) {
        this.setState({error: ''})
      }

      onChange(file)
      console.log(file)

      if (file) {
        this.setState({fileName: file.name, fileSize: `${fileSize} мб`})
      }
    }
  }

  deleteFile = () => {
    const { input: { onChange } } = this.props
    onChange('')
    this.setState({fileName: '', fileSize: ''})
  }

  render () {
    const { id, accept, text, multiple } = this.props
    const { fileName, fileSize, error } = this.state
    if (fileName) {
      return <div {...{className: css.file}}>
        <p {...{className: css.name}}>
          {fileName}
          <br />
          <small {...{className: css.size}}>
            {fileSize}
          </small>
        </p>
        <button {...{className: css.closeButton, onClick: this.deleteFile}}>
          <MdClose />
        </button>
      </div>
    } else {
      return (
        <label {...{ htmlFor: id, className: css.label }}>
          <MdInsertDriveFile {...{ className: css.icon }} />
          <span {...{ className: css.text, dangerouslySetInnerHTML: {__html: text} }} />
          <input
            {...{
              className: css.input,
              id,
              type: 'file',
              onChange: this.onChange,
              accept,
              multiple
            }}
          />
          {error &&
            <p {...{className: css.error}}>{error}</p>
          }
        </label>
      )
    }
  }
}

FileInput.defaultProps = {
  input: {},
  multiple: false
}

FileInput.propTypes = {
  text: PropTypes.string,
  input: PropTypes.object,
  id: PropTypes.string,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  sizeLimit: PropTypes.number
}

export default FileInput
