import React from 'react';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import Logo from '../../assets/icon-logo';
import Iconcolumns from '../../assets/icon-columns';

const styles = StyleSheet.create({
    container: {
        display: 'block'
       // marginLeft: 32,
        //marginRight: 32
    },
    title: {
        fontFamily: 'Alef Hebrew',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 19,
        lineHeight: '24px',
        letterSpacing: '0.4px',
        color: 'white',
        marginRight: 12
    }
    //        opacity: 0.7,

    //color: '#A4A6B3',
});

function LogoComponent() {
    return (
        <Row className={css(styles.container)} horizontal="center" vertical="center">
         
            <span className={css(styles.title)}>סרגל כלים</span>
          <Iconcolumns fill={'white'}/>
        </Row>
    );
}

export default LogoComponent;

//  <Logo />
