import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import Colors from '../../constants/Colors';
import { Button } from 'react-native-paper';
import { FONT_REGULAR } from '../../constants/Fonts';

type Props = {
    navigation: StackNavigationProp;
};

const ProductDetailScreen = (props: Props) => {
    const product = props.navigation.getParam('product');

    return (
        <ScrollView style={styles.screen}>
            <Image source={{uri: product.imageUrl}} style={styles.productImage}/>
            <View style={styles.productDetailContainer}>
                <Button
                    style={styles.productButton}
                    color={Colors.primaryColor}
                    icon="cart"
                    mode="contained"
                    uppercase={false}
                    onPress={() => {
                    }}>
                    Add to cart
                </Button>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
            </View>
        </ScrollView>
    )
};

ProductDetailScreen.navigationOptions = (props: Props) => {
    const product = props.navigation.getParam('product');

    return {
        title: product.title
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    productDetailContainer: {
        width: '90%',
        alignSelf: 'center',
        padding: 10,
    },
    productImage: {
        width: '100%',
        height: 300
    },
    productButton: {
        width: '50%',
        borderRadius: 0,
        marginVertical: 12,
        alignSelf: 'center'
    },
    productPrice: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 12,
        fontFamily: FONT_REGULAR
    },
    productDescription: {
        fontFamily: FONT_REGULAR
    }
});

export default ProductDetailScreen;