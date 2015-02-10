import Marty from 'marty'
import UserStore from '../../stores/UserStore'

export default Marty.createStateMixin({
  listenTo: UserStore,
  getState() {
    return {
      user: UserStore.getUser()
    }
  }
})

