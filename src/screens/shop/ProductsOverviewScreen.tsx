import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../models/Product';
import { RootState } from '../../models/ProductsState';
import Colors from '../../constants/Colors';
import ProductItem from '../../components/ProductItem';
import { Cart, ProductDetail } from '../../navigation/routes';
import { addToCart } from '../../store/actions/cartActions';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';

type Props = {
    navigation: any;
};

const ProductsOverviewScreen = (props: Props) => {
    const availableProducts = useSelector((state: RootState) => {
        return state.products.availableProducts
    });
    const dispatch = useDispatch();
    const renderProduct = (listItem: ListRenderItemInfo<Product>) => {
        return <ProductItem
            product={listItem.item}
            onViewDetail={() => {
                props.navigation.navigate(ProductDetail, {
                    product: listItem.item
                })
            }}
            onAddToCart={() => {
                dispatch(addToCart(listItem.item));
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

ProductsOverviewScreen.navigationOptions = (props: Props) => {
    return {
        title: 'All products',
        headerLeft: (navigationProperties: any) => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title='Menu'
                        iconName="menu"
                        onPress={() => {
                            props.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            )
        },
        headerRight: (navigationProperties: any) => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title='Cart'
                        iconName="shopping-cart"
                        onPress={() => {
                            props.navigation.navigate(Cart);
                        }}
                    />
                </HeaderButtons>
            )
        }
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