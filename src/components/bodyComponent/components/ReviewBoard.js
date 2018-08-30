import React, { Component } from 'react';
import Reviews from './Reviews';
import { db } from '../../../firebase/firebase';
import ReviewModal from './ReviewModal';
import '../styles/styles_reviewboard.css';

class ReviewBoard extends Component{
    constructor(props){
        super(props);
        this.state = {
            reviews: [],
        };
        this.eachReview = this.eachReview.bind(this);
    }

    eachReview(text,i){
            return(
                <Reviews    key={i}
                            index={i}
                            info={this.state.reviews[i]}
                            uid={this.props.uid}/>
            );    
    }

    componentWillMount(){
        this.reviewsRef = db.ref('users/' + this.props.uid + '/Reviews');
        var that = this;
        this.reviewsRef.on("value", function(snapshot){
        var reviews = [];
        var totalRating = 0;
        snapshot.forEach(function(data){
            var eachReview = {
                msg: data.val().msg,
                author: data.val().author,
                rating: data.val().rating,
                address: data.val().address,
            }
            
            reviews.unshift(eachReview);
            totalRating += eachReview.rating;
        });
            // 'this' means something else since you are inside the snapshot now
            that.setState({reviews: reviews});
            that.props.updateStats(totalRating, reviews.length);
        });
    }

    componentWillUnmount(){
        this.reviewsRef.off('value');
    }

    render(){
        const info = {
            msg: '',
            author: '',
            address: '',
            rating: 0,
        };
        if(this.state.reviews.length === 0){
            return(
                <div className='reviewBoard-wrapper'>
                    <div className='review-board'>
                        <p id='emptyHeader'>0 REVIEWS</p>
                        <p>Waiting for someone to write a review ...</p>                    
                    </div>
                    <div className='review-Modal'>
                        <ReviewModal uid={this.props.uid} info={info}/>   
                    </div>
                </div> 
            );
        }else if(typeof this.state.reviews !== 'string'){
            return (
                <div className='reviewBoard-wrapper'>
                    <div className="review-board">
                    {
                        this.state.reviews.map(this.eachReview)
                    }
                    </div>
                    <div className='review-Modal'>
                        <ReviewModal uid={this.props.uid} info={info}/>   
                    </div>
                </div>  
            );
        }
    }
}

export default ReviewBoard;
