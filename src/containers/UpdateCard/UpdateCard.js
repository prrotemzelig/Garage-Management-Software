import React, { Component } from 'react'
import './UpdateCard.css'
import Search from './SearchEngine.js';


class SearchBar extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      term:'',
      };
  }
 

  onInputChange(term){
    const name = this.props.searchBoxName || undefined
    this.setState({term});
    if(this.props.onSearchTermChange){
      this.props.onSearchTermChange({name,term})
    }
  }
  

    render() {
      const name = this.props.searchBoxName || undefined
        return (
          <div>
          <div className="search-box">
            <div style={{direction: "rtl" ,color: "gray" }}>
              <input 
              name={name} className="search-input" 
              id="search" 
              type="text" 
              placeholder="הכנס מספר רכב" 
              value2={this.state.term}
              onChange={event=>this.onInputChange(event.target.value)} 
              onKeyPress={this.props.onKeyPress|| null}/>
            </div>
            
          </div>
          <div>  
              <Search
                value={this.state.term}
                />
            </div>
          </div>

        );
    }
}

 
export default SearchBar;

