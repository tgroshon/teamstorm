import React from 'react'
import {Input} from 'react-bootstrap'

export default React.createClass({
  displayName: 'MessageInputArea',

  getInitialState() {
    var err = this.props.error
    return {
      // For initialization in case of error, not synchronization
      payload: !!err ? err.get('data').payload : ''
    }
  },

  handleCreate(event) {
    event.preventDefault()
    this.props.onCreate(event)
  },

  getFormData() {
    var categorySelect = this.refs.messageInputCategory
    return {
      text: this.refs.messageInputTextarea.getDOMNode().value,
      category: categorySelect ? categorySelect.getDOMNode().value : null
    }
  },

  componentWillReceiveProps(newProps) {
    this.setState({
      errorState: !!newProps.error,
      payload: !!newProps.error ? newProps.error.get('data').payload : ''
    })
  },

  clearForm() {
    this.refs.messageInputTextarea.getDOMNode().value = ''
  },

  handleTextInput(e) {
    this.setState({
      payload: e.target.value
    })
  },

  render() {
    var categories
    if (this.props.categories && this.props.categories.length !== 0) {
      var categoryOptions = this.props.categories.map((cat, index) => {
        return (
          <option key={index} value={cat.value}>{cat.value}</option>
        )
      })
      categories = (
        <div className="form-group">
          <select className="form-control MessageInputArea__category" ref="messageInputCategory">
            {categoryOptions}
          </select>
        </div>
      )
    }

    let errorClass = this.state.errorState ? 'has-error' : ''

    return (
      <div className={"row MessageInputArea form-group " + errorClass}>
        <textarea
          className="form-control MessageInputArea__textarea"
          ref="messageInputTextarea"
          value={this.state.payload}
          onChange={this.handleTextInput}
          rows="3"
          maxLength="140"
          placeholder="Enter your message..."
        />
        <div className="MessageInputArea__controls form-inline">
          {categories}
          <div className="form-group">
            <button ref="messageInputButton"
              onClick={this.handleCreate}
              className="btn btn-primary MessageInputArea__button"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    )
  }
})
