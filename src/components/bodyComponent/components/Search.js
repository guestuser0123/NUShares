import React, { Component } from 'react';
import '../styles/styles_search.css';

class Search extends Component{
    constructor(props){
        super(props);
        this.updateContent = this.updateContent.bind(this);
        this.state={
            content: '',
        }
    }

    updateContent(e){
        this.setState({content: e.target.value});
        this.props.filterWhat(e.target.value);
    }

    render(){
        return(
            <div id="search-input">
                <input type="text"
                       placeholder="Search for something . . . "
                       value={this.state.content} 
                       onChange={this.updateContent} />
                
            </div>
        );
        
    }
}

export default Search;