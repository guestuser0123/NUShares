import React, { Component } from 'react';
import '../styles/styles_cards.css';
import WindowView from './WindowView';

class Cards extends Component{
  constructor(props){
    super(props);
    this.detailedView = this.detailedView.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.outsideClick = this.outsideClick.bind(this);
  }

  detailedView(){
    document.getElementsByClassName('card-modalBox')[this.props.info.id-1]
            .style
            .display = 'block';
  }

  closeModal(){
    document.getElementsByClassName('card-modalBox')[this.props.info.id-1]
            .style
            .display = 'none';
  }

  outsideClick(e){
    var modal = document.getElementsByClassName('card-modalBox')[this.props.info.id-1];
    if(e.target === modal){
      document.getElementsByClassName('card-modalBox')[this.props.info.id-1]
              .style
              .display = 'none';
    }
  }

  render(){
    return(
      <div>
        <div className="card" onClick={this.detailedView}>
          <div id="card-msg">{this.props.info.what}</div>
          <div id="card-service"># {this.props.info.service}</div>
        </div>

        <div className="card-modalBox" onClick={this.outsideClick}>
          <div className="card-modalContent">
            <span className="card-closeButton"
                  onClick={this.closeModal}>&times;
            </span>
            <WindowView info={ this.props.info } />
          </div>
        </div>

      </div>
    );
  }
}

export default Cards;
