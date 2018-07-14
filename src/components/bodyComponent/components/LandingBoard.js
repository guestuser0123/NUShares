import React from 'react';
import OfferBoard from './OfferBoard';
import RequestBoard from './RequestBoard';
import '../styles/styles_landingboard.css';
import NavBar from './NavBar';
import FormModal from './FormModal'
import Search from './Search';

/*const styles = theme => ({
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
});*/

class LandingBoard extends React.Component {
    constructor(props) {
        super(props);
        this.renderOffer = this.renderOffer.bind(this);
        this.renderRequest = this.renderRequest.bind(this);
        this.changeService = this.changeService.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.state = {
            services: this.props.services,
            search: "",
        }
    }

    changeService(newService){
        this.setState({services: newService});
    }

    updateSearch(newSearch){
        this.setState({search: newSearch});
    }

    renderOffer(emptyInfo) {
        return ( 
            <div className="landing-board-wrapper">
                <div id="landing-board-searchArea">
                    <div id="landing-board-nav">
                        <NavBar updateService={this.changeService} />
                    </div>
                    <div id="landing-board-search">
                        <Search filterWhat={this.updateSearch} />
                    </div>    
                    <div id="landing-board-create">
                        <FormModal info={emptyInfo} />
                    </div>                            
                </div> 
                <div className="landing-board-content"> 
                    <OfferBoard service={this.state.services} search={this.state.search}/>  
                </div>
            </div>
        );
    }

    renderRequest(emptyInfo) {
        return ( 
            <div className="landing-board-wrapper">
                <div id="landing-board-searchArea">
                    <div id="landing-board-nav">
                        <NavBar updateService={this.changeService} />
                    </div>
                    <div id="landing-board-search">
                        <Search filterWhat={this.updateSearch} />
                    </div>    
                    <div id="landing-board-create">
                        <FormModal info={emptyInfo} />
                    </div>          
                </div>     
                <div className="landing-board-content"> 
                    <RequestBoard service={this.state.services} search={this.state.search}/>  
                </div>
            </div>
        );
    }

    render() {
        var emptyInfo = {
            who:"",
            what:'',
            where:'',
            when:'',
            money:'',
            type:'',
            key:'',
            id:'',
            service: ''
        }

        if (this.props.type === "offer") {
            return (
                this.renderOffer(emptyInfo)
            );
        } else {
            return (
                this.renderRequest(emptyInfo)
            );
        }
    }
}

export default LandingBoard;
