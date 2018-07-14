import React, { Component } from 'react';
import { db, auth } from '../../../firebase/firebase';
import '../styles/styles_comments.css';

// TODO: Double check on the remove function (dubious)

class Comments extends Component{
  constructor(props){
    super(props);
    this.state = {
      msg: "",
      editing: this.props.info.editing,
      accepted: this.props.info.accepted,
      username: "",
    };
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
    this.renderNormal = this.renderNormal.bind(this);
    this.renderAccepted = this.renderAccepted.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.accept = this.accept.bind(this);
    this.getUsername = this.getUsername.bind(this);
  }

  edit(){
    this.setState({editing: true});
  }

  accept(){
    this.setState({accepted: true});

    var fullDataAddress = this.props.info.key;
    var acceptRef = db.ref(fullDataAddress);
    acceptRef.update({
      accept: true,
    });
  }

  remove(){
    this.props.deleteFromBoard(this.props.index);
    var ref = db.ref(this.props.info.key);
    ref.remove();
  }

  save(){
    this.props.updateCommentText(this.refs.newText.value, this.props.index);
    this.setState({editing: false});

    var fullDataAddress = null;
    if(this.props.info.key==="empty"){
      fullDataAddress = "transaction/" + this.props.dataAddress + "/Comments";
      var commentRef = db.ref(fullDataAddress);
      var newcommentRef = commentRef.push();
      newcommentRef.set({
        msg: this.refs.newText.value,
        key: fullDataAddress + "/" + newcommentRef.key,
        accept: false,
        author: this.props.info.author,
        replier: this.props.info.replier,
        time: (new Date()).toLocaleString(),
      });
    }else{
      fullDataAddress = this.props.info.key;
      commentRef = db.ref(fullDataAddress);
      commentRef.update({
        msg: this.refs.newText.value,
      });
    }
  }

  getUsername(){
    this.firebaseRef = db.ref('users/' + this.props.info.replier);
    var that = this;
    this.firebaseRef.once("value", function(snapshot){
      var username = snapshot.val() && snapshot.val().username;
        // 'this' means something else since you are inside the snapshot now
        that.setState({username: username});
    })
  }

  componentWillUnmount(){
    this.firebaseRef.off('value');
  }

  renderNormal(){
    return (
      <div>
        <div className="commentText">{this.props.info.msg}</div>
        {
          (auth.currentUser !== null && auth.currentUser.uid === this.props.info.replier)
          ?(<div>
              <button onClick={this.remove} className="button-danger">Remove</button>
              <button onClick={this.edit} className="button-primary">Edit</button>
            </div>)
          :(<div></div>)
        }
        {
          (auth.currentUser !== null && auth.currentUser.uid === this.props.info.author)
          ?<button onClick={this.accept} className="button-accept">ACCEPT</button>
          :<div></div>
        }
      </div>
    );
  }

  renderForm(){
    return (
      <div>
         <textarea ref="newText" placeholder="Type your reply here" defaultValue={this.props.info.msg}></textarea>
         <button onClick={this.save} className="button-success">Save</button>
      </div>
    );
  }

  renderAccepted(){
    return (
      <div>
        <div className="commentText">{this.props.info.msg}</div>
        <button className="button-accepted">ACCEPTED</button>
      </div>
    );
  }

  render(){
    this.getUsername();

    return(
      <div className="commentWrapper">
        <div className="commentContainer">
          {
            (this.state.editing)
            ? (<div>{this.renderForm()}</div>)
            : (
                (this.state.accepted)
                ?(<div>{this.renderAccepted()}</div>)
                :(<div>{this.renderNormal()}</div>)
              )
          }
        </div>
        <div className="authorInfo">{this.state.username} {this.props.info.time.slice(0,17)}</div>
      </div>
    );
  }
}

export default Comments;
