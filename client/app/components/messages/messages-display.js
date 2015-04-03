import React from 'react'
import MessageBox from './message-box'

export default React.createClass({
  render() {
    if (this.props.activity.type === 'list') {
      return <ListDisplay {...this.props} />
    } else {
      return <CategoricalMessageDisplay {...this.props} />
    }
  }
})

var CategoricalMessageDisplay = React.createClass({
  displayName: 'CategoricalMessageDisplay',
  render() {
    var categorizedMessages = this.props.messages.reduce((result, mess) => {
      var key = mess.get('category') || 'is'
      var list = Array.isArray(result[key]) ? result[key] : []
      result[key] = list.concat([mess])
      return result
    }, {})

    var categoryDisplays = this.props.categories.map((cat, index) => {
      return <MessageCategory key={index} type={this.props.activity.type} category={cat} messages={categorizedMessages[cat.value] || []} />
    })

    return (
      <div className="row MessageList">
        {categoryDisplays}
      </div>
    )
  }
})

var MessageCategory = React.createClass({
  displayName: 'MessageCategory',
  render() {
    var className = `MessageList__${this.props.type}_category`
    var messages = this.props.messages.map((mess) => {
      return <MessageBox key={mess.get('id')} message={mess} />
    })
    return (
      <div className={className}>
        <h4 className={className + "--header"}>
          {this.props.category.value}
        </h4>
        <div className={className + '--container'}>
          {messages}
        </div>
      </div>
    )
  }
})

var ListDisplay = React.createClass({
  displayName: 'MessageListDisplay',
  render() {
    var items = this.props.messages.map((mess, index) => {
      return (
        <li className="list-group-item" key={index}>
          <p>{mess.get('payload')}</p>
          <small>{(new Date(mess.get('createDate'))).toDateString()}</small>
        </li>
      )
    })
    return (
      <div className="row MessageList">
        <ol className="MessageList__list list-group">
          {items}
        </ol>
      </div>
    )
  }
})

