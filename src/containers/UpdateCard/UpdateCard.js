import React, { Component } from 'react'
import './UpdateCard.css'
import Search from './SearchEngine.js';
import SearchIcon from "@material-ui/icons/Search";


class SearchBar extends Component {
  
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
              <div style={{direction: "rtl" ,color: "gray"}}>
                <input 
                name={name} className="search-input" 
                id="search" 
                type="text" autocomplete="off"
                placeholder="הכנס מספר רכב" 
                value2={this.state.term}
                onChange={event=>this.onInputChange(event.target.value)} 
                onKeyPress={this.props.onKeyPress|| null}/>
                <SearchIcon style={{ fontSize: 25 }} />
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