import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { db } from '../../../firebase/firebase';
import '../styles/styles_alertbox.css';
import Delete from '@material-ui/icons/Delete';

class AlertBox extends React.Component {
  state = {
    open: false,
    deleted: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRemove = () => {
    var fullDataAddress = "transaction/" + this.props.info.type + "/" + this.props.info.key;
    var commentRef = db.ref(fullDataAddress);
    commentRef.update({
      what: "This " + this.props.info.type + " has been removed... T_T",
      utc: Date.now() + 2.88*(Math.pow(10, 7)) + 900000,
      who: "N.A.",
      when: "",
      where: "N.A.",
      money: "N.A.",
      service: "N.A."
    });
    this.handleClose();
    this.setState({deleted: true});
  };

  renderDelete() {
    return (
      <div className='alert-wrapper'>
        <div className='alert-icon'>
          <Delete id="alert-delete" onClick={this.handleClickOpen}/>
          <span className='alert-label'>Remove</span>
          <Dialog
            id='delete-modal-content'
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Remove this post?</DialogTitle>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleRemove} color="primary" autoFocus>
                Proceed
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }

  renderDeleted(){
    return(
      <div></div>
    );
  }

  render(){
    if(this.state.deleted){
      return(
        this.renderDeleted()
      );
    }else{
      return(
        this.renderDelete()
      );
    }
  }
}

export default AlertBox;