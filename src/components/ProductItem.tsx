import { Product } from '../models/Product';
import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { Button } from 'react-native-paper';
import { FONT_BOLD, FONT_REGULAR } from '../constants/Fonts';

type Props = {
    product: Product,
    onViewDetail: any,
    onAddToCart: any
};

const ProductItem = (props: Props) => {
    const product: Product = props.product;

    return (
        <View style={styles.productContainer}>
            <Image source={{uri: product.imageUrl}} style={styles.productImage}/>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
            <View style={styles.productActions}>
                <Button
                    style={styles.productButton}
                    icon="camera"
                    mode="contained"
                    uppercase={false}
                    onPress={props.onViewDetail}>
                    See details
                </Button>
                <Button
                    style={styles.productButton}
                    color={Colors.primaryColor}
                    icon="cart"
                    mode="contained"
                    uppercase={false}
                    onPress={props.onAddToCart}>
                    Add to cart
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        borderColor: Colors.gray,
        elevation: 3,
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
        shadowColor: Colors.black,
        shadowOpacity: 0.3,
        marginVertical: 20,
        width: '100%',
        paddingBottom: 0
    },
    productImage: {
        width: '100%',
        height: 200
    },
    productActions: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    productTitle: {
        marginTop: 12,
        fontSize: 16,
        textAlign: 'center',
        color: Colors.secondaryColor,
        fontFamily: FONT_BOLD
    },
    productPrice: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 12,
        fontFamily: FONT_REGULAR
    },
    productButton: {
        width: '50%',
        borderRadius: 0,
    }
});

export default ProductItem;