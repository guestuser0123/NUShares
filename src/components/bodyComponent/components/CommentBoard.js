import React, { Component } from 'react';
import Comments from './Comments';
import { db, auth } from '../../../firebase/firebase';
import '../styles/styles_commentboard.css';

class CommentBoard extends Component{
  constructor(props){
    super(props);
    this.state = {
      comments: [],
    };
    this.create = this.create.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.eachComment = this.eachComment.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  create(text){
    var newComment = {
      msg: text,
      key: "empty",
      accepted: false,
      editing: true,
      author: this.props.author,
      replier: auth.currentUser.uid,
      time: (new Date()).toLocaleString(),
    }
    var arr = this.state.comments;
    arr.push(newComment);
    this.setState({comments: arr});
  }

  removeComment(i){
    var arr = this.state.comments;
    arr.splice(i,1);
    this.setState({comments: arr});
  }

  updateComment(newText, i){
    var arr = this.state.comments;
    arr[i].msg = newText;
    arr[i].time = (new Date()).toLocaleString();
    this.setState({comments: arr});
  }

  eachComment(text,i){
     return(
      <Comments key={i}
                index={i}
                info={this.state.comments[i]}
                updateCommentText={this.updateComment}
                deleteFromBoard={this.removeComment}
                dataAddress={this.props.dataAddress}>
        {text}
      </Comments>
     );
  }

  componentWillMount(){
    this.firebaseRef = db.ref('transaction/' + this.props.dataAddress + '/Comments');
    var that = this;
    this.firebaseRef.on("value", function(snapshot){
      var comments = [];
      snapshot.forEach(function(data){
        var eachComment = {
          msg: data.val().msg,
          key: data.val().key,
          accepted: data.val().accept,
          author: data.val().author,
          replier: data.val().replier,
          editing: false,
          username: 'empty',
          time: data.val().time,
        }
        
        comments.push(eachComment);
        // 'this' means something else since you are inside the snapshot now
        that.setState({comments: comments});
      })
    })
  }

  componentWillUnmount(){
    this.firebaseRef.off('value');
  }

  render(){
    return (
      <div id="bigBoard">
        <div className="board">
          {
            this.state.comments.map(this.eachComment)
          }
        </div>
        {
          (auth.currentUser === null)
          ? (<div></div>)
          : (<button onClick={this.create.bind(null, '')} className="button-create">REPLY</button>)
        }        
      </div>
    );
  }
}

export default CommentBoard;
