import React, { Component } from 'react';
import '../styles/styles_forms.css';
import { auth, db } from '../../../firebase/firebase';
import DateTime from 'react-datetime';
import '../../../../node_modules/react-datetime/css/react-datetime.css';
import * as moment from 'moment';

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
    this.getWhen = this.getWhen.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.momentToString = this.momentToString.bind(this);
    this.momentToDatetime = this.momentToDatetime.bind(this);

    this.state = {
      editingTime: false,
      who: this.props.info.who,
      what: this.props.info.what,
      when: this.props.info.when,
      where: this.props.info.where,
      money: this.props.info.money,
      type: this.props.info.type,
      service: this.props.info.service,
      key: this.props.info.key,
      dateTime: this.props.info.dateTime,
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
    var moment = e;
    if(typeof moment === 'string'){
      return;
    }
    this.setState({ when: e});
  }

  handleTypeChange(e){
    this.setState({ type: e.target.value });
  }

  handleServiceChange(e){
    this.setState({ service: e.target.value });

  }
  
  // Gets the username base on UID
  componentDidMount(){
    if(auth.currentUser === null){
      return;
    }

    this.firebaseRef = db.ref('users/' + auth.currentUser.uid);
    var that = this;
    this.firebaseRef.once("value", function(snapshot){
    var username = snapshot.val().username;
        // 'this' means something else since you are inside the snapshot now
        that.setState({ who: username });
    })
  }

  componentWillUnmount(){
    if(this.firebaseRef !== undefined){
      this.firebaseRef.off('value');
    }      
  }

  saveMessage(who,what,where,when,money,type,service,author,utc,dateTime){
    if(this.state.key !== ""){
      // existing data change from offer to request or vice versa
      if(this.state.type !== this.props.info.type){
        var oldAddressRef = db.ref('transaction/'+this.props.type+'/'+this.state.key); 
        oldAddressRef.remove();
      }else{
        // existing data remains same type
        var address = 'transaction/'+this.state.type+'/'+this.state.key;
        var transactionRef = db.ref(address);
        transactionRef.update({
          who: who,
          what: what,
          when: when,
          dateTime: dateTime,
          where: where,
          money: money,
          type: type,
          service: service,
          author: author,
          utc: utc,
          key: (transactionRef.toString().slice(50)).replace(type+'/',''),
        }); 
        return;
      }       
    }
    // new data
    transactionRef = db.ref("transaction/" + this.state.type);
    var newTransactionRef = transactionRef.push();
    newTransactionRef.set({
      who: who,
      what: what,
      where: where,
      when: when,
      dateTime: dateTime,
      money: money,
      type: type,
      service: service,
      author: author,
      utc: utc,
      key: (newTransactionRef.toString().slice(50)).replace(type+'/',''),
    });
  }

  onSubmit(e){
    e.preventDefault();

    if(this.state.when !== ''){
      var who = this.state.who;
      var where = this.state.where;
      var money = this.state.money;
      var what = this.state.what;
      var when = this.momentToString();
      var type = this.state.type;
      var utc= this.getUTC();
      var service = this.state.service;
      var author = auth.currentUser.uid;
      var dateTime = this.momentToDatetime();
  
      this.saveMessage(who, what, where, when, money, type, service, author, utc, dateTime);
  
      document.getElementById('alertMsg-forms').style.display = 'block';
      /*setTimeout(function(){
        document.getElementById('alertMsg-forms').style.display = 'none';
      }, 3000);*/
  
      //document.getElementById('submissionForm').reset();
    }else{
      document.getElementById('errorMsg-forms').style.display = 'block';
      setTimeout(function(){
        document.getElementById('errorMsg-forms').style.display = 'none';
      }, 3000);
    }
  }

  getWhen(){
    if(this.state.when === ''){
      var newMoment = moment();
      this.setState({when: moment()});
      return newMoment;
    }else if(typeof this.state.when === 'string'){
      var dateTime = this.state.dateTime;
      var year = dateTime.slice(12,dateTime.length);
      var month = dateTime.slice(6,8);
      var day = dateTime.slice(9,11);
      var hour = dateTime.slice(0,2);
      var min = dateTime.slice(3,5);
      var newMoment = moment({y: year, M: month, d: day, h: hour, m: min });
      this.setState({when: newMoment});
      return newMoment;
    }else{
      return this.state.when;
    }
  }

  momentToDatetime(){
    var moment = this.state.when;
    return moment.format("HH:mm MM DD YYYY").toString();
  }

  momentToString(){
    if(typeof this.state.when === 'string'){
      return this.state.when;
    }
    var moment = this.state.when;
    return moment.format("h:mm A ddd, MMM D 'YY").toString();
  }

  getUTC(){
    var dateTime = this.momentToDatetime();
    var year = dateTime.slice(12,dateTime.length);
    var month = dateTime.slice(6,8) - 1;
    var day = dateTime.slice(9,11);
    var hour = dateTime.slice(0,2);
    var min = dateTime.slice(3,5);
    return Date.UTC(year, month, day, hour, min);
  }

  render(){
    return (
      <div id="container-forms" onClick={this.checkClick}>
        <h1 id="header-forms">NUShares</h1>
        <div id="wrapper-forms">
          <div id="alertMsg-forms">Sent Successfully!</div>
          <div id="errorMsg-forms">Invalid date-time input</div>
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

            <div>
              <label>Meeting Time</label>
              <div className='container' noValidate>
                <DateTime value={this.getWhen()}
                          id='when'
                          onChange={this.handleTimeChange}
                          inputProps={{ required: true }}
                          dateFormat="DD/MM/YYYY"
                />
              </div>
            </div>

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
              <label>Meeting / Collection Point</label>
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
                  <option value={"carpool"}>Carpool</option>
                  <option value={"food"}>Food</option>
                  <option value={"printing"}>Printing</option>
                  <option value={"notes"}>Notes/Textbooks</option>
                  <option value={"events"}>Events/Manpower</option>
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
