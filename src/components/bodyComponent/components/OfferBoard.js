import React, { Component } from 'react';
import Cards from './Cards';
import { db } from '../../../firebase/firebase';
import '../styles/styles_board.css';

class OfferBoard extends Component{
  constructor(props){
    super(props);
    this.eachCard = this.eachCard.bind(this);

    this.state = {
      transactionList: "empty",
      service: this.props.service,
      loaded: false
    };
  }

  componentWillMount(){
    this.firebaseRef = db.ref("transaction/offer");
    var that = this;
    this.firebaseRef.on("value", function(snapshot){
      var transactionList = [];
      snapshot.forEach(function(data){
        var info = {
          what: data.val().what,
          who: data.val().who,
          when: data.val().when,
          where: data.val().where,
          money: data.val().money,
          type: data.val().type,
          service: data.val().service,
          key: Object.keys(snapshot.val())[transactionList.length],
          author: data.val().author,
          commentSize: data.val().Comments
        }

        if(typeof info.commentSize === "undefined"){
          info.commentSize = 0;
        }else{
          info.commentSize = Object.keys(info.commentSize).length;
        }

        transactionList.unshift(info);
        // 'this' means something else since you are inside the snapshot now
        that.setState({transactionList: transactionList});
      });
    });
  }

  componentWillUnmount(){
    this.firebaseRef.off('value');
  }

  eachCard(info, i){
    if(this.props.service !== "all"){
      if(info.service === this.props.service){
        if(info.what.toLowerCase().includes(this.props.search.toLowerCase())){
          return(
            <Cards key={i} index={i} info={info}/>
          );
        }        
      }
    }else{
      if(info.what.toLowerCase().includes(this.props.search.toLowerCase())){
        return(
          <Cards key={i} index={i} info={info}/>
        );
      }        
    }
  }

  render() {
    if(typeof this.state.transactionList === 'string'){
      return(
        <div></div>
      );
    }else if(this.state.transactionList.length === 0){
      return (
        <h2>There are no offers at the moment...</h2>
      );
    }else{
      return (
        <div id="board-container">
          { this.state.transactionList.map(this.eachCard) }
        </div>
      );
    }    
  }
}

export default OfferBoard;
