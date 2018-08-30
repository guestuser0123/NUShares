import React, { Component } from 'react';
import { db, auth } from '../../../firebase/firebase';
import Star from '@material-ui/icons/Star';
import Delete from '@material-ui/icons/Delete';
import ReviewModal from './ReviewModal';
import '../styles/styles_review.css';

class Reviews extends Component{
    constructor(props){
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
        this.state = {
            info: this.props.info,
        }
    }

    handleRemove(){
        const reviewRef = db.ref(this.props.info.address);
        reviewRef.remove();
    }

    render(){
        return(
            <div className='review-Container'>
                <div className='review-Left star'>
                    <div className='review-Rating'>{this.props.info.rating}</div>
                    <div className='review-IconContainer'>
                        <div className='review-IconWrapper'><Star id='star'/></div>
                    </div>
                </div>
                <div className='review-Right'>
                    <div className='review-msg'>{this.props.info.msg}</div>
                    {
                        (auth.currentUser!==null && auth.currentUser.uid === this.props.info.author)
                        ?(<div className='review-AdminControls'>
                            <div className='review-delete' onClick={this.handleRemove}>
                                <Delete/>
                            </div>
                            <ReviewModal uid={this.props.uid} info={this.props.info}/>
                        </div>)
                        :(<div/>)
                    }
                </div>
            </div>
        );
    }
}

export default Reviews;