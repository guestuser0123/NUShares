import React, { Component } from 'react';
import Comments from './Comments';
import { db, auth } from '../../../firebase/firebase';
import '../styles/styles_commentboard.css';
import Forum from '@material-ui/icons/Forum';

class CommentBoard extends Component{
  constructor(props){
    super(props);
    this.state = {
      comments: [],
    };
    this.eachComment = this.eachComment.bind(this);
  }

  eachComment(text,i){
    var rights = "";
    var rights2 = "";
    if(this.state.comments[i].replier === this.state.comments[i].author){
      rights += " admin";
    }
    
    if(auth.currentUser !== null && this.state.comments[i].replier === auth.currentUser.uid){
      rights = " user" + rights;
      rights2 = " user"
    }

    if((!this.state.comments[i].private) 
      || ((auth.currentUser !== null)
          && ((auth.currentUser.uid === this.state.comments[i].author) || (this.state.comments[i].replier === auth.currentUser.uid))
      )){  
        return(
              <Comments key={i}
                        index={i}
                        rights={rights}
                        rights2={rights2}
                        type={this.props.type}
                        info={this.state.comments[i]}
                        updateCommentText={this.updateComment}
                        deleteFromBoard={this.removeComment}
                        dataAddress={this.props.dataAddress}>
                {text}
              </Comments>
        );      
      }    
  }

  componentWillMount(){
    this.commentsRef = db.ref('transaction/' + this.props.type + '/' + this.props.dataAddress + '/Comments');
    var that = this;
    this.commentsRef.on("value", function(snapshot){
      var comments = [];
      snapshot.forEach(function(data){
        var eachComment = {
          msg: data.val().msg,
          key: data.val().key,
          accepted: data.val().accept,
          author: data.val().author,
          replier: data.val().replier,
          username: data.val().username,
          time: data.val().time,
          private: data.val().private,
        }
        
        comments.push(eachComment);
      });
        // 'this' means something else since you are inside the snapshot now
        that.setState({comments: comments});
    });
  }

  componentWillUnmount(){
    this.commentsRef.off('value');
  }

  render(){
    return (
      <div>
          <div className='commentboard-header'>
            <Forum id='forum-icon'/><span id='comment-title'>Comments</span>
          </div>
          <div className="board">
          {
            this.state.comments.map(this.eachComment)
          }
        </div>   
      </div>  
    );
  }
}

export default CommentBoard;
