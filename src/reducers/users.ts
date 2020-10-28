import {Action} from "../types";
import ActionTypes from "../actions/actionTypes";

export default function users(state = {}, action: Action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    default:
      return state
  }
}