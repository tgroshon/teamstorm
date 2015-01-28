import Marty from 'marty'

export default Marty.createConstants({
  Message: [
    'EDIT_MESSAGE',
    'NEW_MESSAGE',
    'RECEIVE_MESSAGES',
    'GET_MESSAGE_STREAM',
    'STOP_MESSAGE_STREAM'
  ],
  Activity: [
    'RECEIVE_ACTIVITIES',
    'NEW_ACTIVITY',
  ]
})

