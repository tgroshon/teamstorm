import React from 'react'
import UserStore from '../../stores/user-store'
import TeamStore from '../../stores/team-store'
import UserActions from '../../actions/users'
import TeamActions from '../../actions/teams'
import { without, uniq } from 'lodash'
import TokenInput, {Option as ComboboxOption} from 'react-tokeninput'

function addUserAbbrName(user) {
  return Object.assign({
    name: user.firstName + ' ' + user.lastName.charAt(0) + '.'
  }, user)
}

export default React.createClass({
  displayName: 'NewTeamForm',

  isInitialRender: true,

  getInitialState() {
    let members = this.props.team 
      ? this.props.team.members.map(addUserAbbrName)
      : []
    return {
      selected: members,
      options: UserStore.getSearchResults()
    }
  },

  storeChange() {
    this.setState({
      options: UserStore.getSearchResults()
    })
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
    var selectedOptions = uniq(without(this.state.selected, value))
    this.tokenHandleChange(selectedOptions)
  },

  tokenHandleSelect(value, combobox) {
    if(typeof value !== 'string') {
      var selected = uniq(this.state.selected.concat([value]), 'id')
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

  renderComboboxOptions() {
    return this.state.options.map(potentialMember => {
      if (!potentialMember.name) {
        potentialMember = addUserAbbrName(potentialMember)
      }
      if (!potentialMember.displayName) {
        potentialMember.displayName = potentialMember.firstName + ' ' + potentialMember.lastName + 
          ' (' + potentialMember.email + ')'
      }
      return (
        <ComboboxOption key={potentialMember.id} value={potentialMember}>
          {potentialMember.displayName}
        </ComboboxOption>
      );
    });
  },

  render() {
    let selectedMembers = this.state.selected
    let title = this.props.team ? this.props.team.name : ''
    let memberOptions = this.state.options.length
      ? this.renderComboboxOptions()
      : []

    return (
      <div className="col-md-6 form-group">
        <input type="text" name="name" ref="nameInput" className="form-control" placeholder="Team name..." defaultValue={title}/>
        <TokenInput
          className="form-control"
          onChange={this.tokenHandleChange}
          onInput={this.tokenHandleInput}
          onSelect={this.tokenHandleSelect}
          onRemove={this.tokenHandleRemove}
          menuContent={memberOptions}
          selected={selectedMembers}
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
