//import React from 'react';
import React, {Component} from 'react';
import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';


const styles = StyleSheet.create({
    avatar: {
        height: 35,
        width: 35,
        borderRadius: 50,
        marginLeft: 14,
        border: '1px solid #DFE0EB',
    },
    container: {
        height: 40,
        width: '98%',        
        marginBottom: '20px',
        '@media (max-width: 999px)': {
            width: '95%'
        }
    },
    cursorPointer: {
        cursor: 'pointer'
    },
    name: {
        marginLeft:10,
        fontFamily: 'Alef Hebrew',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        textAlign: 'right',
        letterSpacing: 0.2,
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },
    nameDark: {
        color: 'white'
    },
    separator: {
        borderLeft: '1px solid #DFE0EB',
        marginLeft: 32,
        marginRight: 32,
        height: 32,
        width: 2,
        '@media (max-width: 768px)': {
            marginLeft: 12,
            marginRight: 12
        }
    },
    title: {
        fontFamily: 'Alef Hebrew',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: '30px',
        letterSpacing: 0.3,
      //  position: 'fixed',
        '@media (max-width: 768px)': {
            marginRight: 25, // marginLeft: 36
            //position: 'fixed'

        },
        '@media (max-width: 468px)': {
            fontSize: 20,
            //position: 'fixed'
        },
        '@media (min-width: 769px)': {
            position: 'fixed'

        }
    },
 
    iconStyles: {
        cursor: 'pointer',
        marginLeft: 25,
        '@media (max-width: 768px)': {
            marginLeft: 12
        }
    }
});

//function HeaderComponent(props) {
class Header extends Component {



    render(){


        const { icon, title, ...otherProps } = this.props;

    return (
        <Row className={css(styles.container)} vertical="center" horizontal="space-between" {...otherProps}>
            <Row vertical="center" style={{position: "left"}}>

            <span className={css(styles.title)} >ברוכים הבאים לתוכנה לניהול מוסך  </span>
               </Row>
      
        </Row>
    )
    }
}


Header.propTypes = {
    title: string
};


export default Header;