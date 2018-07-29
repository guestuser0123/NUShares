import React, { Component } from 'react';
import '../styles/styles_windowview.css';
import CommentBoard from './CommentBoard';
import FormModal from './FormModal';
import AlertBox from './AlertBox';
import { auth } from '../../../firebase/firebase';
import PersonPin from '@material-ui/icons/PersonPin';
import Print from '@material-ui/icons/Print';
import Fastfood from '@material-ui/icons/Fastfood';
import DirectionsCar from '@material-ui/icons/DirectionsCar'
import Warning from '@material-ui/icons/Warning';
import PinDrop from '@material-ui/icons/PinDrop';
import AccessTime from '@material-ui/icons/AccessTime';
import AttachMoney from '@material-ui/icons/AttachMoney';
import Favourite from './Favourite';
import ReplyModal from './ReplyModal';

class WindowView extends Component{
  constructor(props){
    super(props);

    this.state = {
      info: this.props.info,
    }
  }

  render(){
    var commentInfo = {
      author: this.state.info.author,
      key: "transaction/" + this.state.info.type + "/" + this.state.info.key, 
      replier: '',
      msg: '',
      private: false,
    }
    return(
      <div className='windowview-bigWrapper'>

        <div id='windowview-body'>
          <div id='windowview-body-top'>
            <div className={'window-iconContainer ' + this.props.info.service + 'Icon'}>
              <div className='window-iconWrapper'>
              {
                (this.props.info.service === 'printing')
                ?(<Print className='window-icon'/>)
                :(this.props.info.service === 'carpool')
                  ?(<DirectionsCar className='window-icon'/>)
                  :(this.props.info.service === 'food')
                    ?(<Fastfood className='window-icon'/>)
                    :(<Warning className='window-icon'/>)
                }
              </div>     
            </div>
            <div className='window-top-info'>
              <div className='window-top-authorInfo'>
                <PersonPin id='person-icon' className="window-icons"/>
                <div className='window-person'>{this.props.info.who}</div>
              </div>
              <div className='window-what'>
                {this.props.info.what}
              </div>     
            </div>       
          </div>
          <div id='windowview-body-bottom'>
            <div className='window-where'>
              <PinDrop className="window-icons" />
              <div className='window-bottom-text'>{this.props.info.where}</div>
            </div>
            <div className='window-when'>
              <AccessTime className="window-icons" />
              <div className='window-time-text'>{this.props.info.when.slice(0,8)}</div>
              <div className='window-time-text'>{this.props.info.when.slice(8,this.props.info.when.length)}</div>
            </div>
            <div className='window-money'>
              <AttachMoney className="window-icons" />
              <div className='window-bottom-text'>{this.props.info.money}</div>
            </div> 
          </div> 
        </div>

        <div className='window-commentboard'>
          <CommentBoard dataAddress={this.props.info.key} author={this.props.info.author} type={this.props.info.type}/>
        </div>
        <div className='window-icons-wrapper'>
          {
            (auth.currentUser !== null && auth.currentUser.uid===this.state.info.author)
            ?(  
              <div id='edit'><FormModal info={this.state.info} /></div>
            )
            :(<div></div>)
          }
            
          {
            (auth.currentUser !== null && auth.currentUser.uid===this.state.info.author)
            ?(  
              <div id='delete'><AlertBox info={this.state.info}/></div>
            )
            :(<div></div>)
          }

          {
            (auth.currentUser !== null)
            ?(<div id='reply'><ReplyModal info={commentInfo}/></div>)
            :(<div></div>)
          }             
          
          {
            (auth.currentUser !== null)
            ?(<div id='fav'><Favourite index={this.props.index} info={this.state.info} pingBoard={this.props.pingBoard}/></div>)
            :(<div></div>)
          }  
        </div>
      </div>
    );
  }
}

export default WindowView;
