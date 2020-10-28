import {Action, Tweets} from "../types";
import ActionTypes from "../actions/actionTypes";

export default function users(state: Tweets = {}, action: Action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      }
    case ActionTypes.TOGGLE_TWEET:

      return {
        ...state,
        [action.id]: {...state[action.id],
          likes: action.hasLiked? state[action.id].likes
              .filter((uid) => uid !==action.authedUser): state[action.id].likes.concat([action.authedUser])}
      }
    case ActionTypes.ADD_TWEET:
      const {tweet} = action
      let replyingTo = {}
      console.log("action", action)
      console.log(tweet)
      if (tweet.replyingTo !== null){
        replyingTo = {
          [tweet.replyingTo.toString()]: {
            ...state[tweet.replyingTo.toString()],
            replies: state[tweet.replyingTo.toString()].replies.concat([tweet.id.toString()])
          }
        }
      }
      return {
        ...state,
        [action.tweet.id.toString()]: action.tweet,
        ...replyingTo
      }
    default:
      return state
  }
}