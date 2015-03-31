import React from 'react'
import {Input} from 'react-bootstrap'

export default React.createClass({
  displayName: 'MessageInputArea',

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

  clearForm() {
    this.refs.messageInputTextarea.getDOMNode().value = ''
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

    return (
      <div className="row MessageInputArea">
        <textarea
          className="form-control MessageInputArea__textarea"
          ref="messageInputTextarea"
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
