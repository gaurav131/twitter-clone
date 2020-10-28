import ActionTypes from "./actionTypes";
import {saveLikeToggle, saveTweet} from "../utils/api";
import {showLoading, hideLoading} from "react-redux-loading-bar";
import {Tweets} from "../types";

export function receiveTweets(tweets: any) {
  return {
    type: ActionTypes.RECEIVE_TWEETS,
    tweets
  }
}

function addTweet(tweet: Tweets) {
  return{
    type: ActionTypes.ADD_TWEET,
    tweet
  }
}

export function handleAddTweet(text: string, replyingTo: string|null = null) {
  return (dispatch: Function, getState: Function) => {
    const {authedUser}: {authedUser: string} = getState()
    dispatch(showLoading())
    return saveTweet({
      text,
      author: authedUser,
      replyingTo
    }).then((tweet: Tweets) => dispatch(addTweet(tweet)))
        .then(()=>dispatch(hideLoading()))
  }
}

function toggleTweet({id, authedUser, hasLiked}: {id: string, authedUser: string, hasLiked: Boolean}) {
  return {
    type: ActionTypes.TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  }
}

export function handleToggleTweet(info: {id: string, authedUser: string, hasLiked: Boolean}) {
  return (dispatch: Function) => {
    dispatch(toggleTweet(info))
    return saveLikeToggle(info)
        .catch((e: Error) => {
          console.warn('Error in handling tweet: ', e)
          dispatch(toggleTweet(info))
          alert('There was an error liking the tweet. Try again!')
        })
  }
}
