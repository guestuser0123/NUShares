import React from 'react';
import LandingBoard from './LandingBoard';
import Tabs from './Tabs';
import '../styles/styles_landingboardcontroller.css';


class LandingBoardController extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: 'offer'
    };
  }

  render(){
    return(
      <div id='landing-board-controller-wrapper'>
        <div id="landing-board-controller-tab">
          <Tabs active={this.state.active}
                onChange={active => this.setState({active})}>

            <div key='offer'>Offers</div>
            <div key='request'>Requests</div>
          </Tabs>
        </div>
        <div id='landing-board-controller-content'>
          <LandingBoard type={this.state.active} services={"all"}/>
        </div>
      </div>
    );
  }
}

export default LandingBoardController;
