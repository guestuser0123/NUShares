import React, { Component } from 'react';
import Cards from './Cards';
import { db, auth } from '../../../firebase/firebase';
import '../styles/styles_board.css';
import '../styles/styles_dash.css';
import Loading from './Loading';
import { SignInLink } from '../.././pages/signIn';

class DashBoard extends Component{
  constructor(props){
    super(props);
    this.eachCard = this.eachCard.bind(this);
    this.contains = this.contains.bind(this);
    this.checkTiming = this.checkTiming.bind(this);
    this.renderCollection = this.renderCollection.bind(this);
    this.increaseItemCount = this.increaseItemCount.bind(this);
    this.ping = this.ping.bind(this);
    this.state = {
      transactionList: "empty",
      service: this.props.service,
      loaded: false,
      dummy: '',
    };
  }

  componentWillMount(){
    if(auth.currentUser === null){
      return;
    }
    this.firebaseRef = db.ref("users/"+auth.currentUser.uid+"/dash/");
    var that = this;
    var addressList = [];
    var newList = {};
    this.firebaseRef.once("value", function(snapshot){
      snapshot.forEach(function(data){
        var info = data.val().address;
        addressList.unshift(info);
      });
    });

    this.firebaseRef = db.ref("transaction/");
    this.firebaseRef.on("value", function(snapshot){
      var transactionList = [];
      snapshot.forEach(function(bigData){
        bigData.forEach(function(data){

          if(that.contains(addressList, data.key)){
            var info = {
              what: data.val().what,
              who: data.val().who,
              when: data.val().when,
              where: data.val().where,
              money: data.val().money,
              type: data.val().type,
              service: data.val().service,
              key: data.val().key,
              dateTime: data.val().dateTime,
              //key: Object.keys(snapshot.val())[transactionList.length],
              author: data.val().author,
              commentSize: data.val().Comments
            }
    
            if(typeof info.commentSize === "undefined"){
              info.commentSize = 0;
            }else{
              info.commentSize = Object.keys(info.commentSize).length;
            }
            
            var dash = {
              address: data.key,
            }
            transactionList.unshift(info);
            newList[data.key] = dash;
          }
        });
      
      });
      // 'this' means something else since you are inside the snapshot now
      that.setState({transactionList: transactionList});
      db.ref('users/'+auth.currentUser.uid).update({dash: newList});      
    });
  }

  componentWillUnmount(){
    if(this.firebaseRef !== undefined){
      this.firebaseRef.off('value');
    }    
  }

  contains(arr, key){
    for(var i = 0; i < arr.length; i++){
      if(arr[i] === key){
        return true;
      }
    }
    return false;
  }

  checkTiming(info){
    if(this.props.time === 'any'){
      return true;
    }

    // Get the UTC locale time
    var currentDateTime = (new Date()).toLocaleString();
    var year = currentDateTime.slice(6,10);
    var month = currentDateTime.slice(3,5) - 1;
    var day = currentDateTime.slice(0,2);
    var hour = currentDateTime.slice(12,14);
    var min = currentDateTime.slice(15,17);
    currentDateTime = Date.UTC(year, month, day, hour, min);
    currentDateTime += (this.props.time * 3.6 * (Math.pow(10, 6)));
    
    if(info.utc <= currentDateTime){
      return true;
    }else{
      return false;
    }
  }

  increaseItemCount(){
    this.setState({itemCount: this.state.itemCount+6});
  }

  eachCard(info, i){
    if(info === undefined){
      return;
    }

    if(this.props.service !== "all"){
      if(info.service === this.props.service){
        if(info.what.toLowerCase().includes(this.props.search.toLowerCase())){
          if(this.checkTiming(info)){
            return(
              <Cards key={i} index={i} info={info} pingBoard={this.ping}/>
            );
          }          
        }        
      }
    }else{
      if(info.what.toLowerCase().includes(this.props.search.toLowerCase())){
        if(this.checkTiming(info, this.state.time)){
          return(
            <Cards key={i} index={i} info={info} pingBoard={this.ping}/>
          );
        } 
      }        
    }
  }

  ping(index){
    var newList = this.state.transactionList;
    console.log(newList);
    newList.splice(index,1);
    console.log(newList);
    this.setState({transactionList: newList});
  }

  renderCollection(info, i){
    if(this.props.service !== "all"){
      if(info.service === this.props.service){
        if(info.what.toLowerCase().includes(this.props.search.toLowerCase())){
          if(this.checkTiming(info)){
            return(
              info
            );
          }          
        }        
      }
    }else{
      if(info.what.toLowerCase().includes(this.props.search.toLowerCase())){
        if(this.checkTiming(info, this.state.time)){
          return(
            info
          );
        }
      }        
    }
  }


  render() {
    if(auth.currentUser === null){
      return(
        <div className='dash-empty-wrapper'>
          <span>Sign in to view and edit your dashboard</span>
          <div id='login-link'><SignInLink/></div>
        </div>
      );
    }else{
      if(typeof this.state.transactionList === 'string'){
        return(
          <div className='progress-tracker'><Loading /></div>
        );
      }else if(this.state.transactionList.length === 0){
        return (
          <div id='board-empty-wrapper'>
            <span>There are no items in your Dashboard at the moment...</span>
          </div>
        );
      }else{
        var loadingList = this.state.transactionList.filter(this.renderCollection).slice(0,this.state.itemCount);
        if(loadingList.length === 0){
          return (
            <div id='board-empty-wrapper'>
              <span>Your search did not match anything....</span>
            </div>
          );
        }else{
          return (
            <div>
              <div id="board-container">
                { loadingList.map(this.eachCard) }
              </div>
              {
                (this.state.transactionList.length > this.state.itemCount)
                ?(<div className='board-extend-btn'>
                    <button onClick={this.increaseItemCount}>View more</button>
                  </div>)
                :(<div/>)
              }
            </div>
          );
        }
      }    
    }
  }
}

export default DashBoard;
