import React, { Component } from 'react';
import '../styles/styles_cards.css';
import WindowView from './WindowView';

class Cards extends Component{
  constructor(props){
    super(props);
    this.detailedView = this.detailedView.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.outsideClick = this.outsideClick.bind(this);
    this.renderClick = this.renderClick.bind(this);
    this.renderUnclick = this.renderUnclick.bind(this);

    this.state = {
      clicked: false
    }
  }

  getPos(){
    return this.props.index;
  }

  detailedView(){
    /*document.getElementsByClassName('card-modalBox')[this.getPos()]
            .style
            .display = 'block';*/
    this.setState({clicked: true});
  }

  closeModal(){
    /*document.getElementsByClassName('card-modalBox')[this.getPos()]
            .style
            .display = 'none';*/
            this.setState({clicked: false});
  }

  outsideClick(e){
    var modal = document.getElementById('card-modalBox');
    if(e.target === modal){
      /*document.getElementsByClassName('card-modalBox')[this.getPos()]
              .style
              .display = 'none';*/
              this.setState({clicked: false});
    }
  }

  renderUnclick(){
    return(
      <div>
        <div className="card" onClick={this.detailedView}>
          <div id="card-msg">{this.props.info.what}</div>
          <div id="card-service"># {this.props.info.service}</div>
        </div>
      </div>
    );
  }

  renderClick(){
    return(
      <div>
        <div className="card" onClick={this.detailedView}>
          <div id="card-msg">{this.props.info.what}</div>
          <div id="card-service"># {this.props.info.service}</div>
        </div>

        <div id="card-modalBox" onClick={this.outsideClick}>
          <div className="card-modalContent">
            <span className="card-closeButton"
                  onClick={this.closeModal}>&times;
            </span>
            <WindowView key={this.getPos} index={this.getPos} info={ this.props.info } />
          </div>
        </div>

      </div>
    );
  }

  render(){
    if(this.state.clicked){
      return this.renderClick();
    }else{
      return this.renderUnclick();
    }
  }
}

export default Cards;
