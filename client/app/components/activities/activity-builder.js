import React from 'react'
import { Input } from 'react-bootstrap'

const CATEGORY_PATTERN = /^cat*/

export default React.createClass({
  displayName: 'ActivityBuilder',

  getInitialState() {
    return {
      type: '2col'
    }
  },
  
  handleChange(event) {
    this.setState({
      type: this.refs.type.getValue()
    })
  },

  getCategories() {
    return _.filter(this.refs, (val, key) => {
      return !!key.match(CATEGORY_PATTERN)
    }).map((input) => {
      return {order: input.props.order, value: input.getValue()}
    })
  },

  getFormData() {
    return {
      type: this.refs.type.getValue(),
      categories: this.getCategories()
    }
  },

  render() {
    if (!this.props.enabled) {
      return <div className="form-group" />
    }

    var categories
    if (this.state.type === '2col') {
      categories = [1,2]
    } else if (this.state.type === '4x4') {
      categories = [1,2,3,4]
    } else {
      categories = []
    }

    var categoryInputs = categories.map((num) => {
      return <Input key={num} order={num} type="text" ref={'cat' + num} label={'Category ' + num} />
    })

    return (
      <div className="form-group">
        <Input type="select" ref="type" label='Type' onChange={this.handleChange} defaultValue="2col">
          <option value="2col">2 Column</option>
          <option value="4x4">4x4 Grid</option>
          <option value="list">List</option>
        </Input>
        {categoryInputs}
      </div>
    )
  }
})
