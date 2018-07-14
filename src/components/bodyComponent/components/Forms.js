import React, { Component } from 'react';
import '../styles/styles_forms.css';
import { auth, db } from '../../../firebase/firebase';
// import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
    this.convertDateTime = this.convertDateTime.bind(this);
    this.getWhen = this.getWhen.bind(this);
    this.getUTC = this.getUTC.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      who: this.props.info.who,
      what: this.props.info.what,
      when: this.props.info.when,
      where: this.props.info.where,
      money: this.props.info.money,
      type: this.props.info.type,
      service: this.props.info.service,
      key: this.props.info.key,
      utc: ''
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

  saveMessage(who,what,where,when,money,type,service,author){
    var transactionRef = null;
    var address = null;
    if(type==="offer"){
        address = "transaction/offer";
    }else{
        address = "transaction/request";
    }

    if(this.state.key !== ""){
      address = address + "/" + this.state.key;
      transactionRef = db.ref(address);
      transactionRef.update({
        who: who,
        what: what,
        when: when,
        where: where,
        money: money,
        type: type,
        service: service,
        author: author,
        utc: this.getUTC()
      });
    }else{
      transactionRef = db.ref(address);
      var newTransactionRef = transactionRef.push();
      newTransactionRef.set({
        who: who,
        what: what,
        where: where,
        when: when,
        money: money,
        type: type,
        service: service,
        author: author,
        utc: this.getUTC()
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
    var author = auth.currentUser.uid;

    this.saveMessage(who, what, where, when, money, type, service, author);

    document.getElementById('alertMsg-forms').style.display = 'block';
    /*setTimeout(function(){
      document.getElementById('alertMsg-forms').style.display = 'none';
    }, 3000);*/

    //document.getElementById('submissionForm').reset();
  }

  getWhen(){
    if(this.state.when === ''){
      return this.convertDateTime();
    }else{
      return this.state.when;
    }
  }

  convertDateTime(){
    var currentDateTime = (new Date()).toLocaleString();
    var month = currentDateTime.slice(3,5);
    var day = currentDateTime.slice(0,2);
    var year = currentDateTime.slice(6,10);
    var time = currentDateTime.slice(12,currentDateTime.length);

    return year + "-" + month + "-" + day + "T" + time;
  }

  getUTC(){
    var dateTime = this.state.when;
    var year = dateTime.slice(0,4);
    var month = dateTime.slice(5,7) - 1;
    var day = dateTime.slice(8,10);
    var hour = dateTime.slice(11,13);
    var min = dateTime.slice(14,16);
    return Date.UTC(year, month, day, hour, min);
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

            <div>
              <label>When</label>
              <div className='container' noValidate>
                <TextField
                  id="datetime-local"
                  type="datetime-local"
                  defaultValue={this.getWhen()}
                  className='textField'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleTimeChange}
                />
              </div>
            </div>

            <p></p>

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

            <p>
              <label>Extra costs (Optional)</label>
              <input type="text"
                     value={this.state.money}
                     id='money'
                     placeholder="E.g. extra 50 cents"
                     onChange={this.handleMoneyChange}>
              </input>
            </p>

            <p className="forms-select">
              <label>Type</label>
              <select required
                      value={this.state.type}
                      onChange={this.handleTypeChange}>
                <option value="">Select form type</option>
                <option value={"offer"}>Offer</option>
                <option value={"request"}>Request</option>
              </select>
            </p>

            <p className="forms-select">
              <label>Services</label>
                <select required
                        value={this.state.service}
                        onChange={this.handleServiceChange}>
                  <option value="">Select service type</option>
                  <option value={"food"}>Food</option>
                  <option value={"carpool"}>Carpool</option>
                  <option value={"printing"}>Printing</option>
                </select>
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
