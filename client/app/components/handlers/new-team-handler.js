import React from 'react'
import TokenInput, {Option as ComboboxOption} from 'react-tokeninput'
import {without, uniq} from 'lodash'
import UserStore from '../../stores/user-store'
import ActionCreators from '../../action-creators'

export default React.createClass({
  
  displayName: 'NewTeam',

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

  handleChange(value) {
    this.setState({
      selected: value
    })
  },

  handleRemove(value) {
    var selectedOptions = uniq(without(this.state.selected,value))
    this.handleChange(selectedOptions)
  },

  handleSelect(value, combobox) {
    if(typeof value !== 'string') {
      var selected = uniq(this.state.selected.concat([value]))
      this.setState({
        selected: selected,
        selectedToken: null
      })
      this.handleChange(selected)
    }
  },

  handleInput(userInput) {
    if (userInput === '') {
      return this.setState({options: []})
    }
    ActionCreators.searchUsers(userInput)
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
      <div className="input-group">
        <input type="text" name="name" ref="nameInput" className="form-control" placeholder="Team name..." />
        <TokenInput
          onChange={this.handleChange}
          onInput={this.handleInput}
          onSelect={this.handleSelect}
          onRemove={this.handleRemove}
          selected={this.state.selected}
          menuContent={options}
        />
        <button className="btn btn-success">
          <span className="glyphicon glyphicon-plus" aria-hidden="true" />
          Create
        </button>
      </div>
		)
	}
})

