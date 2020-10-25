import ActionTypes from "./actionTypes";

export function setAuthedUser(id: String) {
  return {
    type: ActionTypes.SET_AUTH_USER,
    id
  }
}