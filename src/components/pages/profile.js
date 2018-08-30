import React, { Component } from 'react';
import AccountDetails from './AccountDetails';
import { auth } from '../../firebase/firebase';
import ReviewBoard from '../bodyComponent/components/ReviewBoard';
import ChangeAccDetails from './ChangeAccDetails';

class ProfilePage extends Component{
    constructor(props){
        super(props);
        this.updateReviewStats = this.updateReviewStats.bind(this);
        this.state = {
            uid: this.props.location.state.uid,
            currentUser: '',
            avgRating: '',
            reviewCount: '',
            showAccDetails: this.props.showAccPage,
        }
    }

    updateReviewStats(totalRating, reviewCount){
        this.setState({ 
                        avgRating: Math.floor(totalRating/reviewCount), 
                        reviewCount: reviewCount,
                    });
    }

    componentDidMount(){
        if(auth.currentUser !== null) {
            this.setState({currentUser: auth.currentUser.uid});
        }   
    }

    render(){
        return (
            <div className='profile-page-body'>
                <div className="profile-left">
                    <div className='profile-display'>
                        <AccountDetails uid={this.state.uid} 
                                        avgRating={this.state.avgRating}
                                        reviewCount={this.state.reviewCount}/>
                    </div>
                    <div className='profile-acc-controls'>
                    {
                        (this.props.showAccPage)
                        ?(<ChangeAccDetails uid={this.props.uid}/>)
                        :(<div/>)
                    }
                    </div>
                </div>
                <div className='profile-reviewBoard'>
                    <ReviewBoard uid={this.state.uid} updateStats={this.updateReviewStats}/>
                </div>
            </div>  
        );
    }
    }

export default ProfilePage;
