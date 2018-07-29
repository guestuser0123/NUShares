import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { db, auth } from '../../../firebase/firebase';
import '../styles/styles_favourite.css';
import { watchFile } from 'fs';

class Favourite extends React.Component {
    state = {
        openLike: false,
        openUnlike: false,
        like: false,
        loading: false,
    };

    handleClickOpenLike = () => {
        this.setState({ openLike: true });
        this.handleAdd();
    };

    handleClickOpenUnlike = () => {
        this.setState({ openUnlike: true });
    };

    handleClose = () => {
        this.setState({ openLike: false, openUnlike: false, });
    };

    handleAdd = () => {
        var tempAddress = "transaction/" + this.props.info.type + "/";
        // update user dashboard references
        var dashRef = db.ref("users/"+auth.currentUser.uid+"/dash/"+this.props.info.key.replace(tempAddress, ''));
        dashRef.update({
            address: this.props.info.key,
            type: this.props.info.type,
        });
        this.setState({like: !this.state.like});
    };

    handleRemove = () => {
        var tempAddress = "transaction/" + this.props.info.type + "/";
        // update user dashboard references
        var dashRef = db.ref("users/"+auth.currentUser.uid+"/dash/"+this.props.info.key.replace(tempAddress, ''));
        dashRef.remove();
        this.setState({like: !this.state.like});
        this.props.pingBoard(this.props.index);
        this.handleClose();
    };

    componentDidMount(){
        this.setState({loading: true});
        var tempRef = 'transaction/'+this.props.info.type+'/';
        this.dashRef = db.ref('users/'+auth.currentUser.uid+'/dash/'+this.props.info.key.replace(tempRef,''));
        var that = this;
        this.dashRef.on("value", function(snapshot) {
            var like = snapshot.exists();
            that.setState({
                like: like,
                loading: false,
            });
        });  
    }
    
    componentWillUnmount(){
        this.dashRef.off('value');
    }

    render(){
        return (
            (this.state.loading)
            ?(<div></div>)
            :(
                <div className='fav-wrapper'>
                    {
                        (this.state.like)
                        ?(
                            <div className='icon-container'>
                                <div className='icon'>
                                    <Favorite className='fav' onClick={this.handleClickOpenUnlike}/>
                                    <span className='fav-label'>Favourite</span>
                                    <span className="tooltiptext">Added to Dashboard</span>
                                </div>
                            </div>
                        )
                        :(
                            <div className='icon-container'>
                                <div className='icon'>
                                    <FavoriteBorder className='nofav' onClick={this.handleClickOpenLike}/>
                                    <span className='fav-label'>Favourite</span>
                                    <span className="tooltiptext">Add to Dashboard</span>
                                </div>
                            </div>
                        )
                    }

                    <Dialog className='fav-dialog'
                            open={this.state.openUnlike}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure you want to remove from this your dashboard?"}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleRemove} color="primary" autoFocus>
                                Continue
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog className='fav-dialog'
                            open={this.state.openLike}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Added to Dashboard!"}</DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )
        );
    }
}

export default Favourite;