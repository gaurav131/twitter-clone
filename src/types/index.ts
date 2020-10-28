import ActionTypes from "../actions/actionTypes";

export interface Action {
  type: ActionTypes,
  users: Array<any>,
  tweets: Tweets,
  id: string,
  hasLiked: Boolean,
  authedUser: string,
  tweet: Tweets
}

export interface Users {
  [key: string]: {id: string, name: string, avatarURL: string, tweets: Array<string>}
}
export interface Tweets {
  [key: string]: {id: string, text: string, author: string, timestamp: number,
                            likes: Array<string>, replies: Array<string>, replyingTo: string}
}
export interface State {
  users: Users,
  tweets: Tweets,
  authedUser?: String
}