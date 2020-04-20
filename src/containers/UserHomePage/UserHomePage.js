import React, { Component } from 'react';
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
        marginTop: 30
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
    
    render() { 
        return ( 
            <Column style= {{marginRight: "20px", marginTop: "40px"}}>
            <Row className={css(styles.cardsContainer)} wrap flexGrow={1} horizontal="space-between" breakpoints={{ 768: 'column' }}>
                <Row className={css(styles.cardRow)} wrap flexGrow={1} horizontal="space-between" breakpoints={{ 384: 'column' }}>
                    <MiniCardComponent className={css(styles.miniCardContainer)} title="משימות" value="60" />
                    <MiniCardComponent className={css(styles.miniCardContainer)} title="משימות" value="16" />
                </Row>
                <Row className={css(styles.cardRow)} wrap flexGrow={1} horizontal="space-between" breakpoints={{ 384: 'column' }}>
                    <MiniCardComponent className={css(styles.miniCardContainer)} title="כרטיסים שנפתחו" value="43" />
                    <MiniCardComponent className={css(styles.miniCardContainer)} title="כרטיסים שנסגרו" value="64" />
                </Row>
            </Row>
          
            <Row horizontal="space-between" className={css(styles.lastRow)} breakpoints={{ 1024: 'column' }}>
                <UnresolvedTicketsComponent containerStyles={styles.unresolvedTickets} />
                <TasksComponent containerStyles={styles.tasks} />
            </Row>
        </Column>  
        )
    }
}
export default UserHomePage;



