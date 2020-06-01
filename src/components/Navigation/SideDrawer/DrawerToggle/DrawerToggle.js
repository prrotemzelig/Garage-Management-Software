import React from 'react';
import IconBurger from '../../../../assets/icon-burger';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({


    // burgerIcon: {
    //     cursor: 'pointer',
    //     position: 'absolute',
    //     right: 24,
    //     top: 34,

    burgerIcon: {
        cursor: 'pointer',
        position: 'absolute',
        right: 10,
        top: 12,
        //right: 24,
       // top: 34,
        '@media (min-width: 999px)': {
            display: 'none'

        }
    }
});

const drawerToggle = (props) => (
    <div className={css(styles.burgerIcon)} onClick={props.clicked}>
        <IconBurger />
    </div>
);

export default drawerToggle;