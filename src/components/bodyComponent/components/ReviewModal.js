import React, { Component } from 'react';
import '../styles/styles_reviewmodal.css';
import ReviewForm from './ReviewForm';
import RateReview from '@material-ui/icons/RateReview';
import Edit from '@material-ui/icons/Edit';
import { auth } from '../../../firebase/firebase';

class ReviewModal extends Component{
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
    var modal = document.getElementById('review-modalBox');
    if(e.target === modal){
        //document.getElementById('modalBox').style.display = 'none';
        this.setState({clicked: false});
    }
  }

  renderClick(){
    if(this.props.info.msg !== ''){
      return(
        <div>
            <Edit id='review-edit-btn' onClick={this.openModal}/>
            <div id="review-modalBox" onClick={this.outsideClick}>
                <div id="review-modalContent">
                    <span   id="review-closeButton"
                            onClick={this.closeModal}>&times;</span>
                <ReviewForm uid={this.props.uid} closeModal={this.closeModal} info={this.props.info}/>
                </div>
            </div>
        </div>
      );
    }else{
      return(
        <div className="review-wrapper">
            <div className='review-icon-container'>
                <div className="review-icon-wrapper">
                    <RateReview className='review-icon' onClick={this.openModal}/>
                    <span className='review-label'>Review</span>    
                </div>
            </div>
            <div id="review-modalBox" onClick={this.outsideClick}>
                <div id="review-modalContent">
                <span id="review-closeButton"
                        onClick={this.closeModal}>&times;</span>
                <ReviewForm uid={this.props.uid} closeModal={this.closeModal} info={this.props.info}/>
                </div>
            </div>
        </div>
      );
    }
  }

  renderUnclick(){
    if(this.props.info.msg !== ''){
        return(
            <div>
            {
                (auth.currentUser !== null && auth.currentUser.uid===this.props.info.author)
                ?(<Edit id='review-edit-btn' onClick={this.openModal}/>)
                :(<div/>)
            }
            </div>
        );
    }else{
        return(
            <div>
            {
                (auth.currentUser !== null && auth.currentUser.uid!==this.props.uid)
                ?(<div className='review-icon-container'>
                    <div className="review-icon-wrapper">
                        <RateReview className='review-icon' onClick={this.openModal}/>
                        <span className='review-label'>Review</span>    
                    </div>
                </div>)
                :(<div/>)
            }
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

export default ReviewModal;
