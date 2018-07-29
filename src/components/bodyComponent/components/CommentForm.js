import React, { Component } from 'react';
import '../styles/styles_commentform.css';
import { auth, db } from '../../../firebase/firebase';
import Send from '@material-ui/icons/Send';
import * as moment from 'moment';

class CommentForm extends Component {

    constructor(props){
        super(props);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleAuth = this.handleAuth.bind(this);
        this.save = this.save.bind(this);

        this.state = {
            comment: this.props.info.msg,
            info: this.props.info,
            username: '',
            private: this.props.info.private,
        };
    }

    handleCommentChange(e){
        this.setState({ comment: e.target.value });
    }

    handleAuth(){
        this.setState({
            private: !this.state.private,
        });
    }

    // Gets the username base on UID
    componentDidMount(){
        this.firebaseRef = db.ref('users/' + auth.currentUser.uid);
        var that = this;
        this.firebaseRef.once("value", function(snapshot){
        var username = snapshot.val().username;
            // 'this' means something else since you are inside the snapshot now
            that.setState({ username: username });
        })
    }

    componentWillUnmount(){
        this.firebaseRef.off('value');
    }

    save(){
        // If an empty text, dont save/make changes
        if(this.state.comment !== ''){
            var fullDataAddress = null;
            // New Comment
            if(this.props.info.replier === ''){
                fullDataAddress = this.props.info.key + "/Comments";
                var commentRef = db.ref(fullDataAddress);
                var newcommentRef = commentRef.push();
                newcommentRef.set({
                    msg: this.state.comment,
                    key: fullDataAddress + "/" + newcommentRef.key,
                    accept: false,
                    author: this.props.info.author,
                    replier: auth.currentUser.uid,
                    username: this.state.username,
                    time: moment().format("HH:mm MM DD YYYY").toString(),
                    private: this.state.private,
                });
            }else{
                // Update Existing commment
                fullDataAddress = this.props.info.key;
                commentRef = db.ref(fullDataAddress);
                commentRef.update({
                    msg: this.state.comment,
                    time: moment().format("HH:mm MM DD YYYY").toString(),
                    private: this.state.private,
                });
            }
    
        }
        this.props.closeModal();
    }

    render(){
        return (
            <div className='comment-wrapper'>
                <h1 id="comment-header">Leave a Comment</h1>
                <textarea value={this.state.comment} placeholder='Type your comment here' onChange={this.handleCommentChange}></textarea>
                <div className='commentForm-controls'>
                    <label className="commentForm-checkbox">Private
                        <input type="checkbox" checked={this.state.private} onChange={this.handleAuth}/>
                        <span className="checkmark"></span>
                        <span className="tooltiptext">Only you and the author of this offer/request post can view this comment</span>
                    </label>
                    <div id='send-wrapper' onClick={this.save}>
                        <p>Send</p>
                        <Send id='send-btn'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentForm;
