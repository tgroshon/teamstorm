import React from 'react'
import Router, { Link } from 'react-router'
import TeamStore from '../../stores/team-store'

export default React.createClass({

  mixins: [Router.State],

  getInitialState() {
    return {
      team: TeamStore.get(this.getParams().teamId)
    }
  },

  storeUpdate() {
    this.setState({
      team: TeamStore.get(this.getParams().teamId)
    })
  },

  componentWillMount() {
    TeamStore.on('change', this.storeUpdate)
  },

  componentWillReceiveProps() {
    this.setState({
      team: TeamStore.get(this.getParams().teamId)
    })
  },

  componentWillUnmount() {
    TeamStore.removeListener('change', this.storeUpdate)
  },

  render() {
    var team = this.state.team
    if (!team) {
      return <div />
    }

    return (
      <div>
        <h1>
          {team.get('name')}
        </h1>
      </div>
    )
  }
})

