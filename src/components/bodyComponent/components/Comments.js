import React, { Component } from 'react';
import { db, auth } from '../../../firebase/firebase';
import '../styles/styles_comments.css';
import Delete from '@material-ui/icons/Delete';
import ReplyModal from './ReplyModal';
import * as moment from 'moment';

class Comments extends Component{
  constructor(props){
    super(props);
    this.state = {
      msg: "",
      username: "",
      loading: false,
      rights: this.props.rights,
      rights2: this.props.rights2,
    };
    this.remove = this.remove.bind(this);
    this.renderNormal = this.renderNormal.bind(this);
    this.renderAccepted = this.renderAccepted.bind(this);
    this.accept = this.accept.bind(this);
    this.convertTime = this.convertTime.bind(this);
  }


  accept(){
    var fullDataAddress = this.props.info.key;
    var acceptRef = db.ref(fullDataAddress);
    acceptRef.update({
      accept: true,
    });
  }

  remove(){
    var ref = db.ref(this.props.info.key);
    ref.remove();
  }

  convertTime(time){
    var dateTime = time;
    var year = dateTime.slice(12,dateTime.length);
    var month = dateTime.slice(6,8)-1;
    var day = dateTime.slice(9,11);
    var hour = dateTime.slice(0,2);
    var min = dateTime.slice(3,5);
    return moment({y: year, M: month, d: day, h: hour, m: min }).fromNow();
  }

  renderNormal(){
    return (
      <div>
        <div className="commentText">{this.props.info.msg}</div>
        {
          (auth.currentUser !== null && auth.currentUser.uid === this.props.info.replier)
          ?(<div>
              <Delete onClick={this.remove} className="button-danger"/>
              <div id='comment-edit-btn'><ReplyModal info={this.props.info}/></div>
            </div>)
          :(<div></div>)
        }
        {
          (auth.currentUser !== null && auth.currentUser.uid === this.props.info.author && this.props.info.author !== this.props.info.replier)
          ?(<button onClick={this.accept} className="button-accept">ACCEPT</button>)
          :(<div></div>)
        }
        {
          ((this.props.info.author !== this.props.info.replier && auth.currentUser === null) || 
            (this.props.info.author !== this.props.info.replier && auth.currentUser.uid !== this.props.info.author))
          ?(<button className='comment-status' disabled>Pending</button>)
          :(<div/>)
        }
      </div>
    );
  }

  renderAccepted(){
    return (
      <div>
        <div className="commentText">{this.props.info.msg}</div>
        <button className='comment-status' id='comment-status-accepted' disabled>Accepted</button>
      </div>
    );
  }

  render(){
    if(this.state.loading){
      return(
        <div></div>
      );
    }else{
      return(
        <div className={"commentWrapper "+this.state.rights2+" "+this.state.rights}>
          <div className='commentHeader'>
            <div className="authorInfo">{this.props.info.username} {this.convertTime(this.props.info.time)}</div>
          </div>
          <div className="commentContainer">
            {
              (this.props.info.accepted)
              ?(<div>{this.renderAccepted()}</div>)
              :(<div>{this.renderNormal()}</div>)                
            }
          </div>
        </div>
      );
    }
  }
}

export default Comments;
