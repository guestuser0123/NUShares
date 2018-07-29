import React from 'react';
import OfferBoard from './OfferBoard';
import RequestBoard from './RequestBoard';
import DashBoard from './Dashboard';
import '../styles/styles_landingboard.css';
import NavBar from './NavBar';
import FormModal from './FormModal'
import Search from './Search';
import Time from './Time';

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
        this.changeService = this.changeService.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.updateTiming = this.updateTiming.bind(this);
        this.state = {
            services: this.props.services,
            search: "",
            time: "any",
        }
    }

    changeService(newService){
        this.setState({services: newService});
    }

    updateSearch(newSearch){
        this.setState({search: newSearch});
    }

    updateTiming(newTiming){
        this.setState({time: newTiming});
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

        return (          
            <div className="landing-board-wrapper">
                <div id='landing-baord-searchWrapper'>
                    <div id="landing-board-searchArea">
                        <div id="landing-board-nav">
                            <NavBar updateService={this.changeService} />
                        </div>
                        <div id="landing-board-search">
                            <Search filterWhat={this.updateSearch} />
                        </div>    
                        <div id="landing-board-time">
                            <Time updateTiming={this.updateTiming} />
                        </div>
                        <div id="landing-board-create">
                            <FormModal info={emptyInfo} />
                        </div>          
                    </div>   
                </div>  
                <div className="landing-board-content"> 
                    {
                        (this.props.type==='offer')
                        ?(  
                            <OfferBoard service={this.state.services} 
                                        search={this.state.search} 
                                        time={this.state.time}/>
                        )
                        :(this.props.type==='request')
                            ?(  
                                <RequestBoard   service={this.state.services} 
                                                search={this.state.search} 
                                                time={this.state.time}/>
                            )
                            :(
                                <DashBoard  service={this.state.services} 
                                            search={this.state.search} 
                                            time={this.state.time}/>
                            )
                    }  
                </div>
            </div>
        );
    }
}

export default LandingBoard;
