import React, { Component } from 'react';
import '../styles/styles_cards.css';
import WindowView from './WindowView';
import SmsFailed from '@material-ui/icons/SmsFailed';
import Print from '@material-ui/icons/Print';
import Fastfood from '@material-ui/icons/Fastfood';
import DirectionsCar from '@material-ui/icons/DirectionsCar'
import Warning from '@material-ui/icons/Warning';

class Cards extends Component{
  constructor(props){
    super(props);
    this.detailedView = this.detailedView.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.outsideClick = this.outsideClick.bind(this);
    this.renderClick = this.renderClick.bind(this);
    this.renderUnclick = this.renderUnclick.bind(this);
    this.checkWhat = this.checkWhat.bind(this);

    this.state = {
      clicked: false
    }
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

  checkWhat(text){
    if(text.length < 70){
      return text;
    }else{
      return text.slice(0,71) + ' . . . ';
    }
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
      <div className='card-wrapper' onClick={this.detailedView}>
        <div className={"card-left "+this.props.info.service}>
          <div className='icon-wrapper'>
            {
              (this.props.info.service === 'printing')
              ?(<Print className='bigIcon' id='card-print-icon'/>)
              :(this.props.info.service === 'carpool')
                ?(<DirectionsCar className='bigIcon' id='card-carpool-icon'/>)
                :(this.props.info.service === 'food')
                  ?(<Fastfood className='bigIcon' id='card-food-icon'/>)
                  :(<Warning className='bigIcon' id='card-nothing-icon'/>)
            }
          </div>
          <div id="card-service"># {this.props.info.service}</div>
        </div>
        <div className='card-right'>
          <div id="card-msg"><span id='card-text'>{this.checkWhat(this.props.info.what)}</span></div>
          <div id="card-smallInfo">
            <div id="card-comments">{this.props.info.commentSize}</div>
            <SmsFailed id="card-icon"/>
          </div>
        </div>
      </div>
    );
  }

  renderClick(){
    return(
      <div>
        <div className='card-wrapper' onClick={this.detailedView}>
          <div className={"card-left " + this.props.info.service}>
            <div className='icon-wrapper'>
              {
                (this.props.info.service === 'printing')
                ?(<Print className='bigIcon' id='card-print-icon'/>)
                :(this.props.info.service === 'carpool')
                  ?(<DirectionsCar className='bigIcon' id='card-carpool-icon'/>)
                  :(this.props.info.service === 'food')
                    ?(<Fastfood className='bigIcon' id='card-food-icon'/>)
                    :(<Warning className='bigIcon' id='card-nothing-icon'/>)
              }
            </div>
            <div id="card-service"># {this.props.info.service}</div>
          </div>
          <div className='card-right'>
            <div id="card-msg"><span id='card-text'>{this.checkWhat(this.props.info.what)}</span></div>
            <div id="card-smallInfo">
              <div id="card-comments">{this.props.info.commentSize}</div>
              <SmsFailed id="card-icon"/>
            </div>
          </div>
        </div>

        <div id="card-modalBox" onClick={this.outsideClick}>
          <div className="card-modalContent">
            <span className="card-closeButton"
                  onClick={this.closeModal}>&times;
            </span>
            <WindowView key={this.props.index} index={this.props.index} info={ this.props.info } pingBoard={this.props.pingBoard}/>
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
