import React, { Component } from 'react';
import '../styles/styles_scroll.css';

class ScrollButton extends Component {
    constructor(props){
        super(props);
        this.scrollFunction = this.scrollFunction.bind(this);
        this.topFunction = this.topFunction.bind(this);
    }

    scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("myBtn").style.display = "block";
        } else {
            document.getElementById("myBtn").style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollFunction.bind(this));
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollFunction.bind(this));
    }
        
    render(){
        return(
            <div>
                <button onClick={this.topFunction} id="myBtn" title="Go to top">Top</button>
            </div>
        );
    }
}

export default ScrollButton;