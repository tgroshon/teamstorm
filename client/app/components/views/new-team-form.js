import React from 'react'

export default React.createClass({
  displayName: 'NewTeamForm',

  getActivity() {
    return {
      title: this.refs.title.getValue(),
      type: this.refs.type.getValue(),
      teamId: this.refs.team.getValue()
    }
  },

  render() {
    return
  }

})
