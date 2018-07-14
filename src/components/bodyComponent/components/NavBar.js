import React, { Component } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';
import '../styles/styles_navbar.css';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.changeService = this.changeService.bind(this);
        this.updateBtns = this.updateBtns.bind(this);
        this.state = {
            open: false,
            services: "all",
        }
    }

    handleToggle(){
        var change = !(this.state.open);
        this.setState({open: change});
    };

    handleClose(e){
        /*if(e.target.className.includes("menu-list-btns")){
            return;
        }*/
        this.setState({open: false});
    };

    changeService(e){
        this.props.updateService(e.target.id);
        this.updateBtns(e);

        var tag = e.target.id;
        tag = tag.charAt(0).toUpperCase() + tag.slice(1) + "  &#9662;";
        document.getElementById("menu-list-label").innerHTML = tag;
        this.handleClose(e);
    };

    updateBtns(e){
        var btnContainer = document.getElementById("menu-list-collapse");
        var btns = btnContainer.getElementsByClassName("menu-list-btns");

        for (var i = 0; i < btns.length; i++) {
            if(btns[i].id === e.target.id){
                btns[i].className = "menu-list-btns active";
            }else{
                btns[i].className = "menu-list-btns";
            }
        }


    }

    render() {
        const { open } = this.state;

        return (
            <div>
                <ClickAwayListener onClickAway={this.handleClose}>
                    <div>
                        <button
                            type="button"
                            onClick={this.handleToggle}
                            className="menu-list-btns"
                            id="menu-list-label">
                            Categories  &#9662;
                        </button>
                    </div>

                    <Collapse in={open} id="menu-list-collapse" style={{ transformOrigin: '0 0 0' }}>
                        <button className="menu-list-btns active" id="all" onClick={this.changeService}>All Services</button>
                        <button className="menu-list-btns" id="food" onClick={this.changeService}>Food</button>
                        <button className="menu-list-btns" id="carpool" onClick={this.changeService}>Carpool</button>
                        <button className="menu-list-btns" id="printing" onClick={this.changeService}>Printing</button>
                    </Collapse>
      
                </ClickAwayListener>
            </div>
        );
    }
}

export default NavBar;