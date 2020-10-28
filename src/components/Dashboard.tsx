import React from "react";
import {connect} from "react-redux";
import {Tweets} from "../types";
import Tweet from "./Tweet";

interface Props {
  dispatch: Function,
  tweetsIds: Array<String>
}

class Dashboard extends React.Component<Props>{
  render(): React.ReactNode {
    console.log(this.props)
    return (
        <div>
          <h3 className='center'>Your Timeline</h3>
          <ul className='dashboard-list'>
            {this.props.tweetsIds.map((id: String)=>(
                <li key={id.toString()}>
                  <Tweet id={id.toString()}/>
                </li>
            ))}
          </ul>
        </div>
    )
  }
}

function matchStateToProps({tweets}: {tweets: Tweets}) {

  return {

    tweetsIds: Object.keys(tweets).sort((a, b)=>tweets[b].timestamp - tweets[a].timestamp)
  }
}

export default connect(matchStateToProps)(Dashboard)