import React, { Component } from 'react';
import '../styles/styles_windowview.css';
import CommentBoard from './CommentBoard';
import FormModal from './FormModal';

class WindowView extends Component{
  constructor(props){
    super(props);
    this.state = {
      info: this.props.info
    }
  }
  render(){
    return(
      <div className='windowview-bigWrapper'>

        <FormModal info={this.state.info} />

        <div id='windowview-body'>
          Who:<h3>{this.props.info.who}</h3>
          What:<h3>{this.props.info.what}</h3>
          Where:<h3>{this.props.info.where}</h3>
          When:<h3>{this.props.info.when}</h3>
          Additonal Costs:<h3>{this.props.info.money}</h3>
          <hr />

          <div>
            <h2>Comments:</h2>
          </div>
          <CommentBoard dataAddress={this.props.info.type + "/" + this.props.info.key} />
        </div>
      </div>
    );
  }
}

export default WindowView;
