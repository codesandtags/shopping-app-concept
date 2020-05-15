import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { useSelector } from 'react-redux';
import { Product } from '../../models/Product';
import { RootState } from '../../models/ProductsState';
import Colors from '../../constants/Colors';
import ProductItem from '../../components/ProductItem';
import { Cart, ProductDetail } from '../../navigation/routes';

type Props = {
    navigation: StackNavigationProp;
};

const ProductsOverviewScreen = (props: Props) => {
    const availableProducts = useSelector((state: RootState) => {
        return state.products.availableProducts
    });
    const renderProduct = (listItem: ListRenderItemInfo<Product>) => {
        return <ProductItem
            product={listItem.item}
            onViewDetail={() => {
                props.navigation.navigate(ProductDetail, {
                    product: listItem.item
                })
            }}
            onAddToCart={() => {
                props.navigation.navigate(Cart)
            }}
        />
    };

    return (
        <View style={styles.screen}>
            <FlatList
                style={styles.productsList}
                data={availableProducts}
                renderItem={renderProduct}
            />
        </View>
    )
};

ProductsOverviewScreen.navigationOptions = () => {
    return {
        title: 'All products'
    }
}

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
    },
    productsList: {
        borderWidth: 0,
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: '10%',
    },
});

export default ProductsOverviewScreen;