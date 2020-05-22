import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import moment from 'moment';

import Colors from '../constants/Colors';
import { FONT_BOLD, FONT_BOLD_WEIGHT } from '../constants/Fonts';
import CartItem from './CartItem';

type Props = {
    orderItem: any,
};

const OrderItem = (props: Props) => {
    const orderItem = props.orderItem;
    const readableDate = moment(orderItem.date).format('MMMM Do YYYY, hh:mm');
    const [showDetails, setShowDetails ] = useState(false);

    console.log('Order Item', props.orderItem);

    return (
        <View style={styles.orderItemContainer}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${orderItem.totalAmount.toFixed(2)}</Text>
                <Text style={styles.date}>{readableDate}</Text>
            </View>
            <Button
                style={styles.buttonDetails}
                color={Colors.primaryColor}
                icon={showDetails ? 'arrow-up' : 'arrow-down'}
                mode="contained"
                uppercase={false}
                onPress={() => {
                    setShowDetails(!showDetails);
                }}>
                { showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
            {
                showDetails && <View>
                    {orderItem.items.map((item: any) => {
                        return (
                            <CartItem
                                showBorderBox={false}
                                key={item.productId}
                                cartItem={item}
                                removeItem={() => {}}
                                deletableItem={false}
                            />
                        );
                    })}
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    orderItemContainer: {
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        borderColor: Colors.gray,
        elevation: 3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        shadowColor: Colors.black,
        shadowOpacity: 0.3,
        marginVertical: 10,
        width: '100%',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    summary: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: FONT_BOLD_WEIGHT
    },
    date: {
        fontSize: 12,
        color: Colors.secondaryColor
    },
    buttonDetails: {}
});

export default OrderItem;