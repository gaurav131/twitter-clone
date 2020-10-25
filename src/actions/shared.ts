import {getInitialData} from "../utils/api";
import {receiveUsers} from "./users";
import {receiveTweets} from "./tweets";
import {setAuthedUser} from "./authedUser";

const AuthID = 'tylermcginnis'

export function handleInitialData() {
  return (dispatch: Function)=>{
    return getInitialData().then(({users, tweets}) => {
      dispatch(receiveUsers(users))
      dispatch(receiveTweets(tweets))
      dispatch(setAuthedUser(AuthID))
    })
  }
}
