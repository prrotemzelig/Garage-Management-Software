import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite/no-important';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        border: '1px solid #DFE0EB',
        borderRadius: 4,
        padding: '24px 32px 12px 32px'
    },
    containerMobile: {
        padding: '12px 16px 6px 16px !important'
    },
    itemContainer: {
        marginLeft: -32,
        marginRight: -32,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
        minHeight: 5,
       // maxHeight: 22,
        borderBottom: '1px solid #DFE0EB',
        ':last-child': {
            borderBottom: 'none'
        }
    },
    itemContainerMobile: {
        marginLeft: -16,
        marginRight: -16,
        paddingLeft: 16,
        paddingRight: 16
    },
    link: {
        fontFamily: 'Alef Hebrew',    
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: '0.2px',
        color: '#3751FF',
        textAlign: 'right',
        cursor: 'pointer'
    },
    subtitle: {
        fontFamily: 'Alef Hebrew',  
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12,
        lineHeight: '16px',
        letterSpacing: '0.1px',
        color: '#9FA2B4'
    },
    subtitle2: {
        color: '#252733',
        marginLeft: 2
    },
    title: {
        fontFamily: ' Alef Hebrew', 
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 19,
        lineHeight: '24px',
        letterSpacing: '0.4px',
        color: '#252733'
    },

    titleDark: {
        fontFamily: ' Alef Hebrew', 
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 19,
        lineHeight: '24px',
        letterSpacing: '0.4px',
        color: 'white'
    }

});

class CardComponent extends React.Component {

    renderItem(item, index) {
        return (<Column flexGrow={1} className={css(styles.itemContainer)} key={`item-${index}`}
            breakpoints={{ 426: css(styles.itemContainerMobile) }}>
            {item}
        </Column>);
    }
//className={css(styles.title)}
    render() {
        const { title, link, subtitle, subtitleTwo, items, containerStyles } = this.props;
        return (
            <Column flexGrow={1} className={css(styles.container, containerStyles)} breakpoints={{ 426: css(styles.containerMobile) }}>
                <Row horizontal="space-between">
                    <Column>
                        <span className={this.props.backgroundColor==='light' ?
                        css(styles.title)
                        : css(styles.title, styles.titleDark)} >{title}</span>
                        <Row style={{ marginTop: 8, marginBottom: 16 }}>
                            <span className={css(styles.subtitle)}>{subtitle}</span>
                            {subtitleTwo && <span className={css(styles.subtitle, styles.subtitle2)}>{subtitleTwo}</span>}
                        </Row>
                    </Column>
                    <span className={css(styles.link)}>{link}</span>
                </Row>
                {items.map(this.renderItem)}
            </Column>
        );
    }
}

const mapStateToProps = state => { // here we get the state and return a javascript object
    return {
        backgroundColor: state.auth.backgroundColor

    };
  };

export default connect(mapStateToProps)(CardComponent);

