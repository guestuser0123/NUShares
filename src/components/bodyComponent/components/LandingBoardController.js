import React, { Component } from 'react';
import LandingBoard from './LandingBoard';

class LandingBoardController extends Component{
  constructor(props){
    super(props);
    this.filterOffer = this.filterOffer.bind(this);
    this.filterRequest = this.filterRequest.bind(this);

    this.state = {
      type: "offer"
    };
  }

  filterOffer(e){
    this.setState({ type: e.target.value });
  }

  filterRequest(e){
    this.setState({ type: e.target.value });
  }

  render(){
    return(
      <div id="landing-board-wrapper">

        <div id="typefilter-wrapper">
          <label>Offers</label>
          <input type="radio"
                 value="offer"
                 name="type"
                 onChange={this.filterOffer} required/>

          <label>Requests</label>
          <input type="radio"
                 value="request"
                 name="type"
                 onChange={this.filterRequest} />
        </div>

        <LandingBoard type={this.state.type} />

      </div>
    );
  }
}

export default LandingBoardController;
