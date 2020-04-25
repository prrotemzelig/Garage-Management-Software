import React, { Component } from 'react'
import './UpdateCard.css'
import { FaSearch } from 'react-icons/fa';
import Search from './SearchEngine.js';


class SearchBar extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      term:'',
      counter:0
      };
    this.handleClick = this.handleClick.bind(this);
  }
 
  handleClick(event) {
    const id = event.target.id;
    this.state.counter=1;
  }
  onInputChange(term){
    const name = this.props.searchBoxName || undefined
    this.setState({term});
    if(this.props.onSearchTermChange){
      this.props.onSearchTermChange({name,term})
    }
  }
  

/**
 * .search-icon {
    float: left;
    color: #000;
    size: 30px;
    width: 10px;
    border-radius: 8px;
  }
  
  <div className="search-icon">
                <FaSearch></FaSearch>
              </div> 
 */
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
            <button id="unique-id" onClick={this.handleClick}><FaSearch></FaSearch></button>
            </div>
            <div>
              <Search
                value={this.state.term}
                data={this.state.counter}
                />
            </div>
          </div>

        );
    }
}

 
export default SearchBar;

