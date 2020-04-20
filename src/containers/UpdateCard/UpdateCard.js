/*

import React, { Component } from 'react';
import './UpdateCard.module.css'

class BodyData extends Component {

state = {
    query: '',
    data: [],
    searchString:[]
}
handleOnInputChange = (event) => {
	const query = event.target.value;
            this.setState({ query, loading: true, message: ''  } );
};


render() {
    return (
        <div className="search-box">
          <div style={{direction: "rtl" ,color: "gray" }}> 
            <form>
                <input 
                type="text" 
                id="filter" 
                placeholder="הכנס מספר רכב"  
                value2={this.state.query}
                onChange={this.handleOnInputChange}
                />
            </form>
          </div>
        </div>
        
    )
    console.log("line 16 " + this.state.query);

  }
}


export default BodyData;
*/
import React, { Component } from 'react'
import './UpdateCard.module.css'

class Search extends Component {
 state = {
   query: '',
 }

 handleInputChange = () => {
   this.setState({
     query: this.search.value
    
    })
    console.log("line 209 " + this.state.query);
 }

 render() {
   return (
    <div className="search-box">
    <div style={{direction: "rtl" ,color: "gray" }}> 
      <form>
          <input 
          type="text" 
          id="filter" 
          placeholder="הכנס מספר רכב"  
          value2={this.state.query}
          onChange={this.handleInputChange}
          ref={input => this.search = input}
          />
      </form>
    </div>
  </div>
   )
 }
}

export default Search