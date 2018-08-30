import React, { Component } from 'react';
import { auth, db } from '../../firebase/firebase';
import './styles_profile.css';
import Settings from '@material-ui/icons/SettingsRounded';
import { PasswordForgetForm } from './pwForget';
import PasswordChangeForm from './pwChange';

class ChangeAccDetails extends Component {
    constructor(props){
        super(props);
        this.changeUsername = this.changeUsername.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.state = {
            id: this.props.uid,
            username: '',
        }
    }

    handleChangeUser(e){
        this.setState({username: e.target.value});
    }

    changeUsername(){
        this.userRef = db.ref('users/'+this.state.id);
        this.userRef.update({
            username: this.state.username,
        })
    }

    // Gets the username base on UID
    componentWillMount(){
        this.firebaseRef = db.ref('users/' + this.state.id);
        var that = this;
        this.firebaseRef.once("value", function(snapshot){
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
            <div className='profile-acc'>
                <div className='profile-acc-header'>
                    ACCOUNT SETTINGS
                </div>
                <PasswordForgetForm />
                <PasswordChangeForm />
                <form onSubmit={this.changeUsername}>
                    <label for='newUser'>NEW USERNAME</label>
                    <input id='newUser' value={this.state.username} onChange={this.handleChangeUser} placeholder='No username set yet...'></input>
                    <button type='submit'>CHANGE USERNAME</button>
                </form>
            </div> 
        );
    }
}

export default ChangeAccDetails;
