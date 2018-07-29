import React, { Component } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';
import '../styles/styles_time.css';

class Time extends Component {
    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.changeTiming = this.changeTiming.bind(this);
        this.updateBtns = this.updateBtns.bind(this);
        this.state = {
            open: false,
            timing: "all",
        }
    }

    handleToggle(){
        var change = !(this.state.open);
        this.setState({open: change});
    };

    handleClose(e){
        /*if(e.target.className.includes("time-list-btns")){
            return;
        }*/
        this.setState({open: false});
    };

    changeTiming(e){
        this.props.updateTiming(e.target.id);
        this.updateBtns(e);

        var tag = e.target.value;
        tag = tag + "  &#9662;";
        document.getElementById("time-list-label").innerHTML = tag;
        this.handleClose(e);
    };

    updateBtns(e){
        var btnContainer = document.getElementById("time-list-collapse");
        var btns = btnContainer.getElementsByClassName("time-list-btns");

        for (var i = 0; i < btns.length; i++) {
            if(btns[i].id === e.target.id){
                btns[i].className = "time-list-btns timeActive";
            }else{
                btns[i].className = "time-list-btns";
            }
        }


    }

    render() {
        const { open } = this.state;

        return (
            <div>
                <ClickAwayListener onClickAway={this.handleClose}>
                    <div id='time-label-wrapper'>
                        <button
                            type="button"
                            onClick={this.handleToggle}
                            className="time-list-btns"
                            id="time-list-label">
                            Any Time  &#9662;
                        </button>
                        <span className="tooltiptext">Filter base on due-time E.g. Expire within the next 3 hours</span>

                         <Collapse in={open} id="time-list-collapse" style={{ transformOrigin: '0 0 0' }}>
                            <button className="time-list-btns" id="1" value='1 hour' onClick={this.changeTiming}>1 hour</button>
                            <button className="time-list-btns" id="3" value='3 hours' onClick={this.changeTiming}>3 hours</button>
                            <button className="time-list-btns" id="6" value='6 hours' onClick={this.changeTiming}>6 hours</button>
                            <button className="time-list-btns timeActive" value='Any Time' id="any" onClick={this.changeTiming}>Any Time</button>
                        </Collapse>  
                                         
                    </div>                

                </ClickAwayListener>
            </div>
        );
    }
}

export default Time;