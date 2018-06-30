import React, { Component } from 'react';
import FormModal from './FormModal'
import LandingBoardController from './LandingBoardController';
import '../styles/styles_bodycomponent.css';

class BodyComponent extends Component {
  render() {
    var emptyInfo = {
      who:"",
      what:'',
      where:'',
      when:'',
      money:'',
      type:'',
      key:'',
      id:'',
      service: ''
    }
    return (
      <div id="body-wrapper">
        <div id="body-formModal">
            <FormModal info={emptyInfo}/>
        </div>
        <div>
            <LandingBoardController />
        </div>
      </div>
    );
  }
}

export default BodyComponent;
