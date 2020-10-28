import React, {Fragment} from "react";
import {connect} from "react-redux";
import {handleInitialData} from "../actions/shared";
import Dashboard from "./Dashboard";
import {State} from "../types";
import LoadingBar from "react-redux-loading-bar";
import NewTweet from "./NewTweet";
import Tweet from "./Tweet";
import TweetPage from "./TweetPage";
import {BrowserRouter, Route} from "react-router-dom";
import Nav from "./Nav";

interface Props {
  dispatch: Function
  loading: Boolean
}

class App extends React.Component<Props> {
  componentDidMount(): void {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
        <BrowserRouter>
          <Fragment>
            <LoadingBar/>
            <div className={'container'}>
              <Nav/>
              {this.props.loading? null:
                  <div>
                    <Route path={'/'} exact component={Dashboard}/>
                    <Route path={'/tweet/:id'} exact component={TweetPage}/>
                    <Route path={'/new'} exact component={NewTweet}/>
                  </div>
              }
            </div>
          </Fragment>
        </BrowserRouter>
    );
  }
}

function mapStateToProps(state: State) {
  const {authedUser} = state
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
