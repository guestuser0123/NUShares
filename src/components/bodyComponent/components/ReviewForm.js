import React, { Component } from 'react';
import '../styles/styles_commentform.css';
import { auth, db } from '../../../firebase/firebase';
import Send from '@material-ui/icons/Send';
import * as moment from 'moment';
import StarRatings from 'react-star-ratings';

class ReviewForm extends Component {

    constructor(props){
        super(props);
        this.handleReviewChange = this.handleReviewChange.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.save = this.save.bind(this);

        this.state = {
            msg: this.props.info.msg,
            info: this.props.info,
            username: '',
            rating: this.props.info.rating,
        };
    }

    handleReviewChange(e){
        this.setState({ msg: e.target.value });
    }

    handleRating(newRating, name){
        this.setState({
            rating: newRating,
        });
    }

    save(){
        // If an empty text, dont save/make changes
        if(this.state.msg !== ''){
            var fullDataAddress = null;
            // New Review
            if(this.props.info.author === ''){
                fullDataAddress = "users/"+this.props.uid+"/Reviews";
                var reviewRef = db.ref(fullDataAddress);
                var newReviewRef = reviewRef.push();
                newReviewRef.set({
                    msg: this.state.msg,
                    address: fullDataAddress + "/" + newReviewRef.key,
                    author: auth.currentUser.uid,
                    time: moment().format("HH:mm MM DD YYYY").toString(),
                    rating: this.state.rating,
                });
            }else{
                // Update Existing Review
                fullDataAddress = this.props.info.address;
                reviewRef = db.ref(fullDataAddress);
                reviewRef.update({
                    msg: this.state.msg,
                    time: moment().format("HH:mm MM DD YYYY").toString(),
                    rating: this.state.rating,
                });
            }
    
        }
        this.props.closeModal();
    }

    render(){
        return (
            <div className='comment-wrapper'>
                <h1 id="comment-header">Leave a Review</h1>
                <textarea value={this.state.msg} placeholder='Type your review here' onChange={this.handleReviewChange}></textarea>
                <div className='commentForm-controls'>
                    <div className="reviewForm-Rating">
                        <StarRatings    rating={this.state.rating}
                                        starRatedColor="#ff1a1a"
                                        changeRating={this.handleRating}
                                        numberOfStars={5}
                                        id='rating'/>
                    </div>
                    <div id='send-wrapper' onClick={this.save}>
                        <p>Send</p>
                        <Send id='send-btn'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReviewForm;
