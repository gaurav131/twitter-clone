import ActionTypes from "./actionTypes";
export function receiveTweets(tweets: any) {
  return {
    type: ActionTypes.RECEIVE_TWEETS,
    tweets
  }
}
