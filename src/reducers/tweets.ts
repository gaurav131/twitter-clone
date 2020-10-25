import {Action} from "../types";
import ActionTypes from "../actions/actionTypes";

export default function users(state = {}, action: Action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      }
    default:
      return state
  }
}