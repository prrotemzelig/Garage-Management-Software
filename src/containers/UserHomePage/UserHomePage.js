import React, { Component } from 'react';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-cards';
import * as actions from '../../store/actions/index';

//import classes from './openingPage.module.css';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite/no-important';
import MiniCardComponent from '../../components/content/MiniCardComponent';
import UnresolvedTicketsComponent from '../../components/content/UnresolvedTicketsComponent';
import TasksComponent from '../../components/content/TasksComponent';

const styles = StyleSheet.create({
    cardsContainer: {
        marginRight: -30,
        marginTop: -30,
        flexFlow: 'row wrap'
    },
    //row wrap
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    },
    miniCardContainer: {
        flexGrow: 1,
        marginRight: 30,
        '@media (max-width: 768px)': {
            marginTop: 30,
            maxWidth: 'none',
        }
    },
    todayTrends: {
        marginTop: 30
    },
    lastRow: {
        marginTop: 30,
        display: 'block'
    },
    unresolvedTickets: {
        marginRight: 30,
        direction: 'rtl',
        '@media (max-width: 1024px)': {
            marginRight: 0
        }
    },
    tasks: {
        marginTop: 0,
        direction: 'rtl',
        '@media (max-width: 1024px)': {
            marginTop: 30
        }
    }
});


class UserHomePage extends Component {

    componentDidMount() { // we want to fetch all the cards. so for doing that, I need to implement componentDidMount
        this.props.onFetchCards(this.props.token, this.props.userId, this.props.branchNumber);
        this.props.onFetchCloseCards(this.props.token, this.props.userId,this.props.branchNumber);
      }
    
    render() { 
        return ( 
            <Column style= {{marginRight: "20px", marginTop: "10px",marginLeft: "20px"}}>
            <Row className={css(styles.cardsContainer)} wrap flexGrow={1} horizontal="space-between" breakpoints={{ 768: 'column' }}>
                <Row className={css(styles.cardRow)} wrap flexGrow={1} horizontal="space-between" breakpoints={{ 384: 'column' }}>
                    <MiniCardComponent className={css(styles.miniCardContainer)} backgroundColor= "#4db6ac" title="  משימות בעשייה" value={this.props.userTasksDOING.length} />
                    <MiniCardComponent className={css(styles.miniCardContainer)} backgroundColor= "#4dd0e1" title="משימות לעשות" value={this.props.userTasksTODO.length} />
                </Row>
                <Row className={css(styles.cardRow)} wrap flexGrow={1} horizontal="space-between" breakpoints={{ 384: 'column' }}>
                    <MiniCardComponent className={css(styles.miniCardContainer)} backgroundColor= "#4fc3f7" title="כרטיסים שנסגרו" value={this.props.closeCards.length} />
                    <MiniCardComponent className={css(styles.miniCardContainer)} backgroundColor= "#64b5f6" title="כרטיסים שנפתחו" value={this.props.cards.length} />
                </Row>
            </Row>

          
            <Row horizontal="space-between" style={{display: "block"}} className={css(styles.lastRow)} breakpoints={{ 1024: 'column' }}>
                <TasksComponent containerStyles={styles.tasks} />
            </Row>
        </Column>  
        )
    }
}

const mapStateToProps = state => { // here we get the state and return a javascript object
    return {
        cards: state.card.cards, // we get my cards from state. we state cards we are reaching out to the card reducer and with cards we then reach out to cards property in the state of my reducer 
        closeCards: state.card.closeCards,
        loading: state.card.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        branchNumber: state.auth.branchNumber,
        userTasksTODO: state.task.todo,
        userTasksDOING: state.task.doing

    };
  };
  
  const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
    return {
      
      onFetchCards: (token,userId,branchNumber) => dispatch( actions.fetchCards(token, userId,branchNumber) ),
      onFetchCloseCards: (token,userId,branchNumber) => dispatch( actions.fetchCloseCards(token, userId,branchNumber) )

    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(UserHomePage,axios));
//export default UserHomePage;





{/* <Row horizontal="space-between" className={css(styles.lastRow)} breakpoints={{ 1024: 'column' }}>
<UnresolvedTicketsComponent containerStyles={styles.unresolvedTickets} />
<TasksComponent containerStyles={styles.tasks} />
</Row>
 */}
