import ActionTypes from "./actionTypes";

export function receiveUsers(users: Array<any>) {
  return {
    type: ActionTypes.RECEIVE_USERS,
    users
  }
}