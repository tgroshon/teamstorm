import keyMirror from 'react/lib/keyMirror'

export default {
  Message: keyMirror({
    'EDIT_MESSAGE': null,
    'NEW_MESSAGE': null,
    'RECEIVE_MESSAGES': null,
    'GET_MESSAGE_STREAM': null,
    'STOP_MESSAGE_STREAM': null,
    'KILL_MESSAGE_CACHE': null,
  }),
  Activity: keyMirror({
    'RECEIVE_ACTIVITIES': null,
    'NEW_ACTIVITY': null,
  }),
  User: keyMirror({
    'RESTORE_SESSION': null,
    'LOGIN': null,
    'LOGOUT': null,
    'RECEIVE_USER': null,
    'RECEIVE_TOKEN': null,
    'CREATE_USER': null,
    'RECEIVE_SEARCHED_USERS': null,
    'SEARCH_USERS': null
  }),
  Team: keyMirror({
    'RECEIVE_TEAMS': null,
  })
}

export var strings = {
  types: {
    activity: {
      discussion: 'discussion',
      deliverable: 'deliverable',
      issue: 'issue'
    }
  }
}
