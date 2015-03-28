import React from 'react'
import Router, {RouteHandler, Link} from 'react-router'
import UserActions from '../../actions/users'

function parseQueryString( queryString ) {
  var params = {}, queries, temp, i, l
  queries = queryString.split("&")

  for ( i = 0, l = queries.length; i < l; i++ ) {
    temp = queries[i].split('=');
    params[temp[0]] = temp[1];
  }
  return params
}

export default React.createClass({
  statics: {
    willTransitionTo: function(transition) {
      var hashUrl = window.location.hash
      var queryString = hashUrl.substring(hashUrl.indexOf('?') + 1)
      var query = parseQueryString(queryString)
      UserActions.userFromToken(query.token)
      transition.redirect('/')
    }
  },

  render() {
    return <div />
  }
})
