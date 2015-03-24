import React from 'react'
import RadioGroup from './radio-group'

export default React.createClass({
  displayName: 'MessageInputArea',

  handleCreate(event) {
    this.props.onCreate(event)
  },

  getFormData() {
    return {
      text: this.refs.messageInputTextarea.getDOMNode().value,
      category: this.refs.messageInputCategory.getCheckedValue()
    }
  },

  clearForm() {
    this.refs.messageInputTextarea.getDOMNode().value = ''
  },

  render() {
    var categories = this.props.categories.map((cat) => {
      return (
        <label key={cat.order} className="MessageInputArea__category">
          <input type="radio" value={cat.value} /> {cat.value}
        </label>
      )
    })

    return (
      <div className="row MessageInputArea">
        <textarea
          className="form-control MessageInputArea__textarea"
          ref="messageInputTextarea"
          rows="3"
          maxLength="140"
          placeholder="Enter your message..."
         />
        <RadioGroup name="categories" ref="messageInputCategory">
          {categories}
        </RadioGroup>
        <button ref="messageInputButton"
          onClick={this.handleCreate}
          className="btn btn-primary MessageInputArea__button">
          Post
        </button>
      </div>
    )
  }
})
