import React, { Component } from 'react';
import '../styles/styles_forms.css';
import { base } from '../base';

class Forms extends Component {

  constructor(props){
    super(props);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMoneyChange = this.handleMoneyChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleServiceChange = this.handleServiceChange.bind(this);
    this.saveMessage = this.saveMessage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      who: this.props.info.who,
      what: this.props.info.what,
      when: this.props.info.when,
      where: this.props.info.where,
      money: this.props.info.money,
      type: this.props.info.type,
      service: this.props.info.service,
      key: this.props.info.key
    };
  }

  handleNameChange(e){
    this.setState({ who: e.target.value });
  }

  handleEventChange(e){
    this.setState({ what: e.target.value });
  }

  handlePlaceChange(e){
    this.setState({ where: e.target.value });
  }

  handleMoneyChange(e){
    this.setState({ money: e.target.value });
  }

  handleTimeChange(e){
    this.setState({ when: e.target.value });
  }

  handleTypeChange(e){
    this.setState({ type: e.target.value });
  }

  handleServiceChange(e){
    this.setState({ service: e.target.value });
  }

  saveMessage(who,what,where,when,money,type,service){
    var transactionRef = null;
    var address = null;
    if(type==="offer"){
        address = "transaction/offer";
    }else{
        address = "transaction/request";
    }

    if(this.state.key !== ""){
      address = address + "/" + this.state.key;
      transactionRef = base.ref(address);
      transactionRef.update({
        who: this.state.who,
        what: this.state.what,
        when: this.state.when,
        where: this.state.where,
        money: this.state.money,
        type: this.state.type,
        service: this.state.service
      });
    }else{
      transactionRef = base.ref(address);
      var newTransactionRef = transactionRef.push();
      newTransactionRef.set({
        who: who,
        what: what,
        where: where,
        when: when,
        money: money,
        type: type,
        service: service
      });
    }
  }

  onSubmit(e){
    e.preventDefault();

    var who = this.state.who;
    var where = this.state.where;
    var money = this.state.money;
    var what = this.state.what;
    var when = this.state.when;
    var type = this.state.type;
    var service = this.state.service;

    this.saveMessage(who, what, where, when, money, type, service);

    document.getElementById('alertMsg-forms').style.display = 'block';
    /*setTimeout(function(){
      document.getElementById('alertMsg-forms').style.display = 'none';
    }, 3000);*/

    //document.getElementById('submissionForm').reset();
  }

  render(){
    const {input} = this.state;
    return (
      <div id="container-forms">
        <div id="wrapper-forms">
          <h1 id="header-forms">NUShares</h1>
          <div id="alertMsg-forms">Sent Successfully!</div>
          <form id="submissionForm" onSubmit={this.onSubmit}>
            <p>
              <label>Name/ID</label>
              <input type="text"
                     id='who'
                     value={this.state.who}
                     placeholder="Enter your name here"
                     onChange={this.handleNameChange}
                     required>
              </input>
            </p>

            <p>
              <label>What</label>
              <textarea
                     id='what'
                     value={this.state.what}
                     placeholder="E.g. Can help dabao Macs"
                     onChange={this.handleEventChange}
                     required>
              </textarea>
            </p>

            <p>
              <label>When</label>
              <input type="text"
                     name='when'
                     value={this.state.when}
                     id='when'
                     placeholder="Enter a date &/or time here"
                     onChange={this.handleTimeChange}
                     required>
              </input>
            </p>

            <p>
              <label>Where</label>
              <textarea
                     name='where'
                     value={this.state.where}
                     id='where'
                     placeholder="E.g. Collect at CLB"
                     onChange={this.handlePlaceChange}
                     required>
              </textarea>
            </p>

            <p id="radioBox-type-forms">
              <label>Offer</label>
              <input type="radio"
                     value="offer"
                     name="type"
                     onChange={this.handleTypeChange}
                     required />
              <label>Request</label>
              <input type="radio"
                     value="request"
                     name="type"
                     onChange={this.handleTypeChange} />
            </p>

            <p id="radioBox-service-forms">
              <label>Food</label>
              <input type="radio"
                     value="food"
                     name="service"
                     onChange={this.handleServiceChange}
                     required />
              <label>Carpool</label>
              <input type="radio"
                     value="carpool"
                     name="service"
                     onChange={this.handleServiceChange} />
              <label>Printing</label>
              <input type="radio"
                     value="printing"
                     name="service"
                     onChange={this.handleServiceChange} />
            </p>

            <p>
              <label>Extra costs (Optional)</label>
              <input type="text"
                     value={this.state.money}
                     id='money'
                     placeholder="E.g. extra 50 cents"
                     onChange={this.handleMoneyChange}>
              </input>
            </p>

            <p className="full">
              <button type="submit">Submit</button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Forms;
