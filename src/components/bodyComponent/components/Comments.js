import React, { Component } from 'react';
import { base } from '../base';
import '../styles/styles_comments.css';

// TODO: Double check on the remove function (dubious)

class Comments extends Component{
  constructor(props){
    super(props);
    this.state = {
      msg: "",
      editing: false,
    };
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
    this.renderNormal = this.renderNormal.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  edit(){
    this.setState({editing: true});
  }

  remove(){
    this.props.deleteFromBoard(this.props.index);

    var ref = base.ref(this.props.keyState);
    ref.remove();
  }

  save(){
    this.props.updateCommentText(this.refs.newText.value, this.props.index);
    this.setState({editing: false});

    var fullDataAddress = null;
    if(this.props.keyState==="empty"){
      fullDataAddress = "transaction/" + this.props.dataAddress + "/Comments";
      var commentRef = base.ref(fullDataAddress);
      var newcommentRef = commentRef.push();
      newcommentRef.set({
        msg: this.refs.newText.value,
        key: fullDataAddress + "/" + newcommentRef.key
      });
    }else{
      fullDataAddress = this.props.keyState;
      commentRef = base.ref(fullDataAddress);
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
      </div>
    );
  }

  renderForm(){
    return (
      <div className="commentContainer">
         <textarea ref="newText" defaultValue={this.props.children}></textarea>
         <button onClick={this.save} className="button-success">Save</button>
      </div>
    );
  }

  render(){
    if(this.state.editing){
      return this.renderForm();
    }else{
      return this.renderNormal();
    }
  }
}

export default Comments;
