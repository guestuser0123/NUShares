import React, { Component } from 'react';
import '../styles/styles_landingboard.css';
import OfferBoard from './OfferBoard';
import RequestBoard from './RequestBoard';

class LandingBoard extends Component{
  constructor(props){
    super(props);
    this.filterNone = this.filterNone.bind(this);
    this.filterCarpool = this.filterCarpool.bind(this);
    this.filterFood = this.filterFood.bind(this);
    this.filterPrinting = this.filterPrinting.bind(this);
    this.renderRequest = this.renderRequest.bind(this);
    this.renderOffer = this.renderOffer.bind(this);

    this.state = {
      type: this.props.type,
      service: "all"
    };
  }

  filterNone(e){
    this.setState({ service: e.target.value });
  }

  filterFood(e){
    this.setState({ service: e.target.value });
  }

  filterCarpool(e){
    this.setState({ service: e.target.value });
  }

  filterPrinting(e){
    this.setState({ service: e.target.value });
  }

  renderOffer(){
    return(
      <div className="landing-board-wrapper">

        <div className="landing-board-ServiceFilter">
          <label>All Services</label>
          <input type="radio"
                 value="all"
                 name="service"
                 onChange={this.filterNone} required/>

          <label>Food</label>
          <input type="radio"
                 value="food"
                 name="service"
                 onChange={this.filterFood} />

         <label>Carpool</label>
         <input type="radio"
                value="carpool"
                name="service"
                onChange={this.filterCarpool} />

         <label>Printing</label>
         <input type="radio"
                value="printing"
                name="service"
                onChange={this.filterPrinting} />
        </div>

        <div className='landing-board-CardsBoard'>
          <OfferBoard type={this.state.type} service={this.state.service} />
        </div>

      </div>
    );
  }

  renderRequest(){
    return(
      <div className="landing-board-wrapper">

        <div className="landing-board-ServiceFilter">
          <label>All Services</label>
          <input type="radio"
                 value="all"
                 name="service"
                 onChange={this.filterNone} required/>

          <label>Food</label>
          <input type="radio"
                 value="food"
                 name="service"
                 onChange={this.filterFood} />

         <label>Carpool</label>
         <input type="radio"
                value="carpool"
                name="service"
                onChange={this.filterCarpool} />

         <label>Printing</label>
         <input type="radio"
                value="printing"
                name="service"
                onChange={this.filterPrinting} />
        </div>

        <div className='landing-board-CardsBoard'>
          <RequestBoard type={this.state.type} service={this.state.service} />
        </div>

      </div>
    );
  }

  render(){
    if(this.props.type === "offer"){
      return(
        this.renderOffer()
      );
    }else{
      return(
        this.renderRequest()
      );
    }
  }
}

export default LandingBoard;
