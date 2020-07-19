import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from '../../axios-cards';
import * as actions from '../../store/actions/index';
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
 
componentDidMount(){
    this.props.onFetchNotification(this.props.token, this.props.userId, this.props.branchNumber,this.props.UserKey); 
    this.props.onFetchCloseCards(this.props.token, this.props.userId,this.props.branchNumber);
  }

componentWillUnmount() {
    this.setTheStates('');
}

setTheStates = () => {
  this.setState({term: ''});
}

  onInputChange(term){
    const name = this.props.searchBoxName || undefined
    this.setState({term});
    if(this.props.onSearchTermChange){
      this.props.onSearchTermChange({name,term})
    }
  }

    render() {
      // console.log(this.props.showHistorySearchModel);
      const name = this.props.searchBoxName || undefined
        return (
          <div>
            {this.props.showHistorySearchModel === true ?
            <div className="search-box">
              <div style={{direction: "rtl" ,color: "gray"}}>
                <input 
                name={name} className="search-input" 
                id="search" 
                type="text" autocomplete="off"
                placeholder="הכנס מספר רישוי" 
                value2={this.state.term}
                onChange={event=>this.onInputChange(event.target.value)} 
                onKeyPress={this.props.onKeyPress|| null}/>
                <SearchIcon style={{ fontSize: 25 }} />
              </div>
            </div>
            :null
            }
            <div> 
              {this.state.term.length >=7 &&  this.state.term.length <=8 ?
              <Search
                value={this.state.term}
                />
                : null}
            </div>
          </div>
        );
    }
}
 
//export default SearchBar;

const mapStateToProps = state => { // here we get the state and return a javascript object
  return {
      token: state.auth.token,
      userId: state.auth.userId,
      branchNumber: state.auth.branchNumber,
      UserKey: state.auth.userKey,
      showHistorySearchModel: state.card.showHistorySearchModel
  };
};

const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
  return {
      // onFetchCloseCards: (token,userId,branchNumber) => dispatch( actions.fetchCloseCards(token, userId,branchNumber) ),
      onFetchCloseCards: (token,userId,branchNumber) => dispatch( actions.fetchCloseCards(token, userId,branchNumber)),
      onFetchNotification: (token, userId,branchNumber,userKey)=>dispatch(actions.fetchNotification(token, userId,branchNumber,userKey))
  };
};

export default connect( mapStateToProps, mapDispatchToProps)( SearchBar, axios  );