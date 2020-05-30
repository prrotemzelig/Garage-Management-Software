import React from 'react';
import { bool, func, string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import { NavLink } from 'react-router-dom';

const styles = StyleSheet.create({
    activeBar: {
        height: 56,
        width: 3,
        backgroundColor: '#DDE2FF',
        position: 'absolute',
        right: 0 //left
    },
    activeContainer: {
        backgroundColor: 'rgba(221,226,255, 0.08)'
    },
    activeTitle: {
        color: '#DDE2FF'
    },
    container: {
        height: 56,
        cursor: 'pointer',
        ':hover': {
            backgroundColor: 'rgba(221,226,255, 0.08)'
        },
        paddingLeft: 32,
        paddingRight: 32
    },
    title: {
        fontFamily: 'Alef Hebrew',
        fontWeight: '600',
        fontSize: '20px',
        lineHeight: '20px',
        letterSpacing: '0.2px',
        color: '#A4A6B3',
        marginRight: 24 //
    }
});

function MenuItemComponent(props) {
    const { active, icon, title,link, ...otherProps } = props;
    const Icon = icon;
    return (
      

        <Row className={css(styles.container, active && styles.activeContainer)} vertical="center" href={link} {...otherProps}>
            {active && <div className={css(styles.activeBar)}></div>}
            <Icon fill={active && "#DDE2FF"} opacity={!active && "0.4"} />
            <span className={css(styles.title, active && styles.activeTitle)}>{title}</span>
        </Row>
        
    );
}


// const MenuItemComponent = (props) => (

    
        
//     <Row className={css(styles.container, this.props.active && styles.activeContainer)} vertical="center" {...props.otherProps}>
//         {props.active && <div className={css(styles.activeBar)}></div>}
    
//         <span className={css(styles.title, props.active && styles.activeTitle)}>{props.title}</span>
       
//     </Row>
    
// );


MenuItemComponent.propTypes = {
    active: bool,
    icon: func,
    title: string
};

export default MenuItemComponent;




// import React from 'react';
// import { bool, func, string } from 'prop-types';
// import { Row } from 'simple-flexbox';
// import { StyleSheet, css } from 'aphrodite';
// import { NavLink } from 'react-router-dom';

// const styles = StyleSheet.create({
//     activeBar: {
//         height: 56,
//         width: 3,
//         backgroundColor: '#DDE2FF',
//         position: 'absolute',
//         right: 0 //left
//     },
//     activeContainer: {
//         backgroundColor: 'rgba(221,226,255, 0.08)'
//     },
//     activeTitle: {
//         color: '#DDE2FF'
//     },
//     container: {
//         height: 56,
//         cursor: 'pointer',
//         ':hover': {
//             backgroundColor: 'rgba(221,226,255, 0.08)'
//         },
//         paddingLeft: 32,
//         paddingRight: 32
//     },
//     title: {
//         fontFamily: 'Assistant',
//         fontWeight: '600',
//         fontSize: '20px',
//         lineHeight: '20px',
//         letterSpacing: '0.2px',
//         color: '#A4A6B3',
//         marginRight: 24 //
//     }
// });

// function MenuItemComponent(props) {
//     const { active, icon, title, ...otherProps } = props;
//     const Icon = icon;
//     return (
        
//         <Row className={css(styles.container, active && styles.activeContainer)} vertical="center" {...otherProps}>
//             {active && <div className={css(styles.activeBar)}></div>}
//             <Icon fill={active && "#DDE2FF"} opacity={!active && "0.4"} />
//             <span className={css(styles.title, active && styles.activeTitle)}>{title}</span>
           
//         </Row>
        
//     );
// }

// MenuItemComponent.propTypes = {
//     active: bool,
//     icon: func,
//     title: string
// };

// export default MenuItemComponent;
