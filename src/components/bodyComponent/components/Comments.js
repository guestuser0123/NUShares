import React, { Component } from 'react';
import { db } from '../../../firebase/firebase';
import '../styles/styles_comments.css';

// TODO: Double check on the remove function (dubious)

class Comments extends Component{
  constructor(props){
    super(props);
    this.state = {
      msg: "",
      editing: this.props.editing,
      accepted: this.props.accepted,
    };
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
    this.renderNormal = this.renderNormal.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.accept = this.accept.bind(this);
  }

  edit(){
    this.setState({editing: true});
  }

  accept(){
    this.setState({accepted: true});

    var fullDataAddress = this.props.keyState;
    var acceptRef = db.ref(fullDataAddress);
    acceptRef.update({
      accept: true,
    });
  }

  remove(){
    this.props.deleteFromBoard(this.props.index);

    var ref = db.ref(this.props.keyState);
    ref.remove();
  }

  save(){
    this.props.updateCommentText(this.refs.newText.value, this.props.index);
    this.setState({editing: false});

    var fullDataAddress = null;
    if(this.props.keyState==="empty"){
      fullDataAddress = "transaction/" + this.props.dataAddress + "/Comments";
      var commentRef = db.ref(fullDataAddress);
      var newcommentRef = commentRef.push();
      newcommentRef.set({
        msg: this.refs.newText.value,
        key: fullDataAddress + "/" + newcommentRef.key,
        accept: false
      });
    }else{
      fullDataAddress = this.props.keyState;
      commentRef = db.ref(fullDataAddress);
      commentRef.update({
        msg: this.refs.newText.value,
      });
    }
  }

  renderNormal(){
    return (
      <div className="commentContainer">
        <div className="commentText">{this.props.children}</div>
        <button onClick={this.remove} className="button-danger">Remove</button>
        <button onClick={this.edit} className="button-primary">Edit</button>
        <button onClick={this.accept} className="button-accept">ACCEPT</button>
      </div>
    );
  }

  renderForm(){
    return (
      <div className="commentContainer">
         <textarea ref="newText" placeholder="Type your reply here" defaultValue={this.props.children}></textarea>
         <button onClick={this.save} className="button-success">Save</button>
      </div>
    );
  }

  renderAccepted(){
    return (
      <div className="commentContainer">
        <div className="commentText">{this.props.children}</div>
        <button className="button-accepted">ACCEPTED</button>
      </div>
    );
  }

  render(){
    if(this.state.editing){
      return this.renderForm();
    }else{
      if(this.state.accepted){
        return this.renderAccepted();
      }else{
        return this.renderNormal();
      }
    }
  }
}

export default Comments;
