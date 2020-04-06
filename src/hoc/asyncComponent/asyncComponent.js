import React, { Component } from 'react';

//importComponent -> this function will use this dynamic import syntax and given us a promise where we eventually get the component we want it to load and where we then render this component
const asyncComponent = (importComponent) => { // take a function as an input 
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount () {
            importComponent() // executes this function here
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }
        
        render () {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;