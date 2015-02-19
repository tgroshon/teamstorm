import React from 'react'
import typeahead from 'typeahead.js'
import ActionCreators from '../../action-creators'

export default React.createClass({
  
  apiMatches(q, done) {
    console.log('API matching')
    ActionCreators.searchUsers(q, (users) => {
      console.log('action creator callback')
      done(users.map((user) => {
        return {
          value: user.firstName + ' ' + user.lastName,
          obj: user
        }
      }))
    })
  },

	componentDidMount: function(){
    console.log('Typeahead Mounted')
		var element = this.getDOMNode()
		$(element).typeahead({
		  minLength: 3,
		  highlight: true
		},
		{
		  name: 'team-autocomplete',
		  displayKey: 'value',
		  source: this.apiMatches,
		})
		
		$(element).on('typeahead:selected', function(jquery, option){
      console.log('Selected', option)
		})
	},
	
	componentWillUnmount: function(){
		var element = this.getDOMNode()
		$(element).typeahead('destroy')
    console.log('Typeahead destroyed')
	},

	render: function(){
		return (
			<input type="search" name="search" ref="input" className="form-control typeahead structuremap-search" placeholder="Search the application container" />
		)
	}
})

