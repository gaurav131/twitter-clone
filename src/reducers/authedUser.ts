import {Action} from "../types";
import ActionTypes from "../actions/actionTypes";

export default function users(state = null, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_AUTH_USER:
      return action.id
    default:
      return state
  }
}