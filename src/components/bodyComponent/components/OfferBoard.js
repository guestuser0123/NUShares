import React, { Component } from 'react';
import Cards from './Cards';
import { base } from '../base';
import '../styles/styles_board.css';

class OfferBoard extends Component{
  constructor(props){
    super(props);
    this.eachCard = this.eachCard.bind(this);

    this.state = {
      transactionList: [],
      service: this.props.service,
    };
  }

  componentWillMount(){
    this.firebaseRef = base.ref("transaction/offer");
    var that = this;
    this.firebaseRef.on("value", function(snapshot){
      var transactionList = [];
      snapshot.forEach(function(data){
        var info = {
          id: transactionList.length + 1,
          what: data.val().what,
          who: data.val().who,
          when: data.val().when,
          where: data.val().where,
          money: data.val().money,
          type: data.val().type,
          service: data.val().service,
          key: Object.keys(snapshot.val())[transactionList.length]
        }

        transactionList.push(info);
        // 'this' means something else since you are inside the snapshot now
        that.setState({transactionList: transactionList});
      });
    });
  }

  eachCard(info, i){
    if(this.props.service !== "all"){
      if(info.service === this.props.service){
        return(
          <Cards key={i} index={i} info={info} />
        );
      }
    }else{
      return(
        <Cards key={i} index={i} info={info} />
      );
    }
  }

  render() {
    return (
      <div id="board-container">
        { this.state.transactionList.map(this.eachCard) }
      </div>
    );
  }
}

export default OfferBoard;
