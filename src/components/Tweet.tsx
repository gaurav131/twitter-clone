import React from "react";
import {connect} from "react-redux";
import {State} from "../types";
import {formatTweet, formatDate} from "../utils/helpers";
import { TiArrowBackOutline } from 'react-icons/ti'
import { TiHeartOutline } from 'react-icons/ti'
import { TiHeartFullOutline } from 'react-icons/ti'
import {handleToggleTweet} from "../actions/tweets";
import {Link, withRouter, RouteComponentProps} from "react-router-dom";

interface Props  extends RouteComponentProps{
  authedUser: any,
  tweet: {id: string, name: string, avatar: string, timestamp:string, text:string, hasLiked:boolean, likes:any, replies:any, parent:any}| null,
  id: string,
  dispatch: Function
}

class Tweet extends React.Component<Props>{

  toParent = (e: React.MouseEvent, id: string)=>{
    e.preventDefault()
    this.props.history.push(`/tweet/${id}`)
  }
  handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    const {dispatch, tweet, authedUser} = this.props
    if (tweet !== null){
      dispatch(handleToggleTweet({id: tweet.id, authedUser, hasLiked: tweet.hasLiked} ))
    }
  }

  render(): React.ReactNode {
    // console.log(this.props)
    if (this.props.tweet === null){
      return <p>This tweet doesn't exists</p>
    }
    const {
      name, avatar, timestamp, text, hasLiked, likes, replies, parent, id
    } = this.props.tweet
    return (
        <Link to={`tweet/${id}`} className='tweet'>
          <img src={avatar} className='avatar' alt={'avatar of '+name}/>
          <div className='tweet-info'>
            <div>
              <span>{name}</span>
              <div>{formatDate(timestamp)}</div>
              {parent && (
                  <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                    Replying to @{parent.author}
                  </button>
              )}
              <p>{text}</p>
            </div>
            <div className='tweet-icons'>
              <TiArrowBackOutline className='tweet-icon'/>
              <span>{replies!==0 && replies}</span>
              <button className='heart-button' onClick={this.handleLike}>
                {hasLiked?<TiHeartFullOutline color='#e0245e' className='tweet-icon'/>: <TiHeartOutline className='tweet-icon'/>}
              </button>
              <span>{likes!==0 && likes}</span>
            </div>
          </div>
        </Link>
    );
  }
}

function mapStateToProps(state: State, {id}:{id: string}) {
  let {authedUser, users, tweets} = state
  let tweet = tweets[id]
  const parentTweet = tweet? tweets[tweet.replyingTo? tweet.replyingTo.toString(): '']: null
  return {
    authedUser,
    tweet: tweet?formatTweet(tweet, users[tweet.author.toString()], authedUser, parentTweet): null
  }
}

export default withRouter(connect(mapStateToProps)(Tweet))