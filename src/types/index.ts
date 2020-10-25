import ActionTypes from "../actions/actionTypes";

export interface Action {
  type: ActionTypes,
  users: Array<any>,
  tweets: Array<any>,
  id: String
}

export interface State {
  users: {},
  tweets: {},
  id: String
}