import React, { Component } from 'react';
import '../styles/styles_windowview.css';
import CommentBoard from './CommentBoard';
import FormModal from './FormModal';
import AlertBox from './AlertBox';

class WindowView extends Component{
  constructor(props){
    super(props);
    this.displayDateTime = this.displayDateTime.bind(this);

    this.state = {
      info: this.props.info
    }
  }

  displayDateTime(){
    var dateTime = this.props.info.when;
    var year = dateTime.slice(0,4);
    var month = dateTime.slice(5,7);
    var day = dateTime.slice(8,10);
    var time = dateTime.slice(11,dateTime.length);

    switch(month){
      case "01":
        month = "Jan";
        break;
      case "02":
        month = "Feb";
        break;
      case "03":
        month = "Mar";
        break;
      case "04":
        month = "Apr";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "Jun";
        break;
      case "07":
        month = "Jul";
        break;
      case "08":
        month = "Aug";
        break;
      case "09":
        month = "Sep";
        break;
      case "10":
        month = "Oct";
        break;
      case "11":
        month = "Nov";
        break;
      case "12":
        month = "Dec";
        break;
      default:
        month = "NIL";
    }
    dateTime = time + "  " + day + " " + month + " " + year;
    return dateTime;
  }

  render(){
    return(
      <div className='windowview-bigWrapper'>
        <div>
          <AlertBox info={this.state.info}/>  
        </div>

        <FormModal info={this.state.info} />
        

        <div id='windowview-body'>
          Who:<h3>{this.props.info.who}</h3>
          What:<h3>{this.props.info.what}</h3>
          Where:<h3>{this.props.info.where}</h3>
          When:<h3>{this.displayDateTime()}</h3>
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
