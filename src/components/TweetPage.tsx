import React from "react";
import {connect} from "react-redux";
import {State} from "../types";
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";

interface Props{
  id: string,
  replies: Array<any>,
  dispatch: Function
}

class TweetPage extends React.Component<Props>{
  render(): React.ReactNode {
    const {id, replies} = this.props

    return (
        <div>
          <Tweet id={id}/>
          <NewTweet id={id}/>
          {replies.length !==0 && <h3 className={'center'}>Replies</h3>}
          <ul>
            {replies.map((replyId)=>(
                <li key={replyId}>
                  <Tweet id={replyId}/>
                </li>
            ))}
          </ul>
        </div>
    );
  }
}

function mapStateToProps({authedUser, tweets, users}: State, props: {match: {params: {id: string}}}) {
  const {id} = props.match.params
  return {
    id,
    replies: !tweets[id]? []: tweets[id].replies.sort((a, b) => tweets[b].timestamp-tweets[a].timestamp)
  }
}

export default connect(mapStateToProps)(TweetPage)