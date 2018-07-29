import React, { Component } from 'react';
import '../styles/styles_replymodal.css';
import CommentForm from './CommentForm';
import Reply from '@material-ui/icons/Reply';
import Edit from '@material-ui/icons/Edit';

class ReplyModal extends Component{
  constructor(props){
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.outsideClick = this.outsideClick.bind(this);
    this.renderClick = this.renderClick.bind(this);
    this.renderUnclick = this.renderUnclick.bind(this);

    this.state = {
      info: this.props.info,
      clicked: false,
    }
  }

  openModal(){
    //document.getElementById('modalBox').style.display = 'block';
    this.setState({clicked: true});
  }

  closeModal(){
    //document.getElementById('modalBox').style.display = 'none';
    this.setState({clicked: false});
  }

  outsideClick(e){
    var modal = document.getElementById('reply-modalBox');
    if(e.target === modal){
        //document.getElementById('modalBox').style.display = 'none';
        this.setState({clicked: false});
    }
  }

  renderClick(){
    if(this.props.info.replier !== ''){
      return(
        <div>
            <Edit id='reply-edit-btn' onClick={this.openModal}/>
            <div id="reply-modalBox" onClick={this.outsideClick}>
                <div id="reply-modalContent">
                    <span   id="reply-closeButton"
                            onClick={this.closeModal}>&times;</span>
                <CommentForm closeModal={this.closeModal} info={this.state.info}/>
                </div>
            </div>
        </div>
      );
    }else{
      return(
        <div className="reply-wrapper">
            <div className='reply-icon-container'>
                <div className="reply-icon-wrapper">
                    <Reply className='reply-icon' onClick={this.openModal}/>
                    <span className='reply-label'>Reply</span>    
                </div>
            </div>
            <div id="reply-modalBox" onClick={this.outsideClick}>
                <div id="reply-modalContent">
                <span id="reply-closeButton"
                        onClick={this.closeModal}>&times;</span>
                <CommentForm closeModal={this.closeModal} info={this.state.info}/>
                </div>
            </div>
        </div>
      );
    }
  }

  renderUnclick(){
    if(this.props.info.replier !== ''){
        return(
            <Edit id='reply-edit-btn' onClick={this.openModal}/>
        );
    }else{
        return(
                <div className='reply-icon-container'>
                    <div className="reply-icon-wrapper">
                        <Reply className='reply-icon' onClick={this.openModal}/>
                        <span className='reply-label'>Reply</span>    
                    </div>
                </div>
        );
    }
  }

  render(){
    if(this.state.clicked){
        return this.renderClick();
    }else{
        return this.renderUnclick();
    }
  }
}

export default ReplyModal;
