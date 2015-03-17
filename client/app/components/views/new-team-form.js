import React from 'react'
import UserStore from '../../stores/user-store'
import UserActions from '../../actions/users'
import {without, uniq} from 'lodash'
import TokenInput, {Option as ComboboxOption} from 'react-tokeninput'

export default React.createClass({
  displayName: 'NewTeamForm',

  getInitialState() {
    return {
      selected: [],
      options: []
    };
  },

  componentWillMount() {
    UserStore.on('searchresults', this.storeChange)
  },

  componentWillUnmount() {
    UserStore.removeListener('searchresults', this.storeChange)
  },

  getFormData() {
    return {
      members: this.state.selected,
      name: this.refs.nameInput.getDOMNode().value
    }
  },

  tokenHandleChange(value) {
    this.setState({
      selected: value
    })
  },

  tokenHandleRemove(value) {
    var selectedOptions = uniq(without(this.state.selected,value))
    this.tokenHandleChange(selectedOptions)
  },

  tokenHandleSelect(value, combobox) {
    if(typeof value !== 'string') {
      var selected = uniq(this.state.selected.concat([value]))
      this.setState({
        selected: selected,
        selectedToken: null
      })
      this.tokenHandleChange(selected)
    }
  },

  tokenHandleInput(userInput) {
    if (userInput === '') {
      return this.setState({options: []})
    } else if (userInput.length > 2) {
      UserActions.searchUsers(userInput)
    }
  },

  storeChange() {
    this.setState({options: UserStore.getSearchResults()})
  },

  renderComboboxOptions() {
    return this.state.options.map((user) => {
      if (!user.name) {
        user.name = user.firstName + ' ' + user.lastName.charAt(0) + '.'
      }
      if (!user.displayName) {
        user.displayName = user.firstName + ' ' + user.lastName + ' (' + user.email + ')'
      }
      return (
        <ComboboxOption
          key={user.id}
          value={user}
        >{user.displayName}</ComboboxOption>
      );
    });
  },

  render() {
    var options = this.state.options.length ? this.renderComboboxOptions() : [];
    return (
      <div className="col-md-6 form-group">
        <input type="text" name="name" ref="nameInput" className="form-control" placeholder="Team name..." />
        <TokenInput
          onChange={this.tokenHandleChange}
          onInput={this.tokenHandleInput}
          onSelect={this.tokenHandleSelect}
          onRemove={this.tokenHandleRemove}
          selected={this.state.selected}
          className="form-control"
          menuContent={options}
        />
        <button className="btn btn-success" onClick={this.props.onCreate}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true" />
          Create
        </button>
        <button className="btn btn-danger" onClick={this.props.onCancel}>
          <span className="glyphicon glyphicon-minus" aria-hidden="true" />
          Cancel
        </button>
      </div>
    )
  }

})
