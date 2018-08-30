import React, { Component } from 'react';
import { db } from '../../firebase/firebase';
import './styles_profile.css';
import PersonPin from '@material-ui/icons/PersonPin';

class AccountDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.uid,
            username: '',
            avgRating: this.props.avgRating,
            reviewCount: this.props.reviewCount,
        }
    }

    // Gets the username base on UID
    componentWillMount(){
        this.firebaseRef = db.ref('users/' + this.state.id);
        var that = this;
        this.firebaseRef.on("value", function(snapshot){
            var username = snapshot.val().username;
            // 'this' means something else since you are inside the snapshot now
            that.setState({ 
                username: username,
            });
        });
    }

    componentWillUnmount(){
        this.firebaseRef.off('value');
    }

    render() {
        
        return (
            <div className='profile-userInfo'>
                <div className='profile-userIcon'>
                    <div className='profile-iconWrapper'>
                        <PersonPin id='profile-icon'/>
                    </div>
                </div>
                <div className='profile-userControl'>
                    <p className='acc-username'>{this.state.username}</p>
                    <div className='profile-reviewLabel'>
                        {
                            (this.props.avgRating === '')
                            ?(<div/>)
                            :(<div className='acc-review'>
                                <div className='ratingCount-label'>{this.props.avgRating + " rating"}</div>
                                <div className='reviewCount-label'>{this.props.reviewCount + " reviews"}</div>
                            </div>)
                        }
                    </div>
                </div>
            </div>

        );
    }
}

export default AccountDetails;
