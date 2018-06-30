import React from 'react';
import PropTypes from 'prop-types';
import OfferBoard from './OfferBoard';
import RequestBoard from './RequestBoard';
import { withStyles } from '@material-ui/core';
import '../styles/styles_landingboard.css';

const styles = theme => ({
    MenuList: {
        width: '200px',
    },
    menuItem: {
      '&:focus': {
        backgroundColor: '#ededed',
        borderRight: '3px solid red',
      },
    },
    primary: {},
    icon: {},
});

class LandingBoard extends React.Component {
    constructor(props) {
        super(props);
        this.filterNone = this.filterNone.bind(this);
        this.filterCarpool = this.filterCarpool.bind(this);
        this.filterFood = this.filterFood.bind(this);
        this.filterPrinting = this.filterPrinting.bind(this);
        this.renderOffer = this.renderOffer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            services: 'all'
        }
    }
    filterNone() {
        this.setState({ services: "all" });
        this.handleChange();
    }

    filterFood() {
        this.setState({ services: "food" });
        this.handleChange();
    }

    filterCarpool() {
        this.setState({ services: "carpool" });
        this.handleChange();
    }

    filterPrinting() {
        this.setState({ services: "printing" });
        this.handleChange();
    }

    handleChange(){ 
        var btnContainer = document.getElementById("landing-board-nav");
        var btns = btnContainer.getElementsByClassName("landing-board-btns");

        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
                var current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        }
    }

    renderOffer() {
        return ( 
            <div className="landing-board-wrapper">
                <div id = "landing-board-nav">
                    <button className = "landing-board-btns active" onClick = { this.filterNone }>
                        All Services
                    </button>  
                    <button className = "landing-board-btns" onClick = { this.filterFood }>
                        Food
                    </button>  
                    <button className = "landing-board-btns" onClick = { this.filterCarpool }>
                        Carpool
                    </button>  
                    <button className = "landing-board-btns" onClick = { this.filterPrinting }>
                        Printing
                    </button>  
                </div>      
                <div className="landing-board-content"> 
                    <OfferBoard service = { this.state.services } />  
                </div>
            </div>
        );
    }

    renderRequest() {
        return ( 
            <div className="landing-board-wrapper">
                <div id = "landing-board-nav">
                    <button className = "landing-board-btns active" onClick = { this.filterNone }>
                        All Services
                    </button>  
                    <button className = "landing-board-btns" onClick = { this.filterFood }>
                        Food
                    </button>  
                    <button className = "landing-board-btns" onClick = { this.filterCarpool }>
                        Carpool
                    </button>  
                    <button className = "landing-board-btns" onClick = { this.filterPrinting }>
                        Printing
                    </button>  
                </div>      
                <div className="landing-board-content"> 
                    <RequestBoard service = { this.state.services } />  
                </div>
            </div>
        );
    }

    render() {
        if (this.props.type === "offer") {
            return (
                this.renderOffer()
            );
        } else {
            return (
                this.renderRequest()
            );
        }
    }
}

LandingBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingBoard);