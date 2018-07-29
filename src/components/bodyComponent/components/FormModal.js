import React, { Component } from 'react';
import '../styles/styles_form_modal.css';
import Forms from './Forms';
import Edit from '@material-ui/icons/Edit';

class FormModal extends Component{
  constructor(props){
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.outsideClick = this.outsideClick.bind(this);
    this.renderClick = this.renderClick.bind(this);
    this.renderUnclick = this.renderUnclick.bind(this);

    this.state = {
      info: this.props.info,
      clicked: false
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
    var modal = document.getElementById('modalBox');
    if(e.target === modal){
      //document.getElementById('modalBox').style.display = 'none';
      this.setState({clicked: false});
    }
  }

  renderClick(){
    if(this.props.info.key !== ""){
      return(
        <div>
          <div className='edit-icon-wrapper'>
            <div className="bigWrapper">
              <Edit id="modalButtonEdit"
                      onClick={this.openModal}/>
              <span className="edit-label">Edit</span>
            </div>
          </div>
          <div id="modalBox" onClick={this.outsideClick}>
            <div id="modalContent">
              <span id="closeButton"
                    onClick={this.closeModal}>&times;</span>

                <Forms info={this.state.info}></Forms>

            </div>
          </div>
        </div>
      );
    }else{
      return(
        <div className="createWrapper">
          <button id="modalButton" onClick={this.outsideClick}>CREATE</button>

          <div id="modalBox" onClick={this.outsideClick}>
            <div id="modalContent">
              <span id="closeButton"
                    onClick={this.closeModal}>&times;</span>

                <Forms info={this.state.info}></Forms>

            </div>
          </div>
        </div>
      );
    }
  }

  renderUnclick(){
    if(this.props.info.key !== ""){
      return(
        <div className='edit-icon-wrapper'>
          <div className="bigWrapper">
            <Edit id="modalButtonEdit"
                    onClick={this.openModal}/>
            <span className="edit-label">Edit</span>
          </div>
        </div>
      );
    }else{
      return(
        <div className="createWrapper">
          <button id="modalButton"
                  onClick={this.openModal}>CREATE</button>
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

export default FormModal;
