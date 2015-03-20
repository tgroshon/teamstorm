import keyMirror from 'react/lib/keyMirror'

export var ActionTypes = keyMirror({
  'EDIT_MESSAGE': null,
  'NEW_MESSAGE': null,
  'STORE_MESSAGES': null,
  'GET_MESSAGE_STREAM': null,
  'STOP_MESSAGE_STREAM': null,
  'KILL_MESSAGE_CACHE': null,
  'PENDING_MESSAGE_REQUEST': null,
  'STORE_ACTIVITIES': null,
  'NEW_ACTIVITY': null,
  'PENDING_ACTIVITY_REQUEST': null,
  'LOGOUT': null,
  'FAILED_AUTH': null,
  'STORE_USER': null,
  'STORE_SEARCHED_USERS': null,
  'PENDING_AUTH_REQUEST': null,
  'STORE_SEARCH_RESULTS': null,
  'STORE_TEAMS': null,
  'PENDING_TEAM_REQUEST': null,
  'ERR_HTTP_USER_UPDATE': null,
  'ERR_HTTP_POST_USER': null,
  'ERR_HTTP_POST_MESSAGE': null,
  'ERR_HTTP_POST_ACTIVITY': null,
  'ERR_HTTP_POST_TEAM': null,
  'ERR_DECODE_TOKEN': null,
  'CLEAR_ERR': null,
})

export var ActivityTypes = keyMirror({
  'deliverable': null,
  'discussion': null,
  'issue': null,
})
