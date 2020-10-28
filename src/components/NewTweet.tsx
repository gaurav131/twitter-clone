import React from "react";
import {connect} from "react-redux";
import {handleAddTweet} from "../actions/tweets";
import {Redirect} from 'react-router-dom';
interface Props {
  dispatch: Function,
  id?: string
}

class NewTweet extends React.Component<Props>{
  state = {
    text: '',
    toHome: false
  }
  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    this.setState({
      text,
    })
  }
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const {text} = this.state
    const {dispatch} = this.props
    const id = "id" in this.props? this.props.id: null
    dispatch(handleAddTweet(text, id))
    this.setState({
      text: '',
      toHome: !id
    })
  }
  render(): React.ReactNode {
    const {text, toHome} = this.state
    if (toHome){
      return <Redirect to={'/'}/>
    }
    const tweetLeft = 280 - text.length
    return (
        <div>
          <h3 className='center'>Compose New Tweet</h3>
          <form className='new-tweet' onSubmit={this.handleSubmit}>
            <textarea className='textarea' placeholder='Whats happening?' value={text} onChange={this.handleChange} maxLength={280}>
            </textarea>
            {tweetLeft <= 100 && (
                <div className='tweet-length'>char left:{tweetLeft}</div>
            )}
            <button className='btn' type='submit' disabled={text==='' && tweetLeft>=0}>
              Submit
            </button>
          </form>
        </div>
    );
  }
}

export default connect()(NewTweet)