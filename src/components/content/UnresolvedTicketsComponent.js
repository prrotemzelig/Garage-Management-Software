import React from 'react';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite/no-important';
import CardComponent from './CardComponent';

const styles = StyleSheet.create({
    itemTitle: {
        fontFamily: 'Alef Hebrew',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: '0.2px',
        color: '#252733'
    },
    itemValue: {
        color: '#9FA2B4'
    }
});

class UnresolvedTicketsComponent extends React.Component {

    renderStat(title, value) {
        return (<Row flexGrow={1} horizontal="space-between" vertical="center">
            <span className={css(styles.itemTitle)}>{title}</span>
            <span className={css(styles.itemTitle, styles.itemValue)}>{value}</span>
        </Row>);
    }

    render() {
        return (
            <CardComponent containerStyles={this.props.containerStyles} title="כרטיסים פתוחים"
                link="ראה פרטים" 
                items={[
                    this.renderStat('מזדה 3 לבנה', 1111111),
                    this.renderStat('יונדאי i10 שחורה', 1111111),
                    this.renderStat('פגו אדומה', 1111111),
                    this.renderStat('אאודי כסופה', 1111111)
                ]}
            />
        );
    }
}
//subtitle="Group:" subtitleTwo="Support"

export default UnresolvedTicketsComponent;
