import React, { useEffect } from 'react';
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
import { Button } from 'react-native-paper';
import ButtonStyles from '../../styles/Buttons';
import { fetchProducts } from '../../store/actions/productsActions';

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
        >
            <Button
                style={ButtonStyles.productButton}
                icon="camera"
                mode="contained"
                uppercase={false}
                onPress={() => {
                    props.navigation.navigate(ProductDetail, {
                        product: listItem.item
                    })
                }}>
                See details
            </Button>
            <Button
                style={ButtonStyles.productButton}
                color={Colors.primaryColor}
                icon="cart"
                mode="contained"
                uppercase={false}
                onPress={() => {
                    dispatch(addToCart(listItem.item));
                }}>
                Add to cart
            </Button>
        </ProductItem>
    };

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

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
        paddingVertical: 10,
        flex: 1,
        width: '90%',
        alignSelf: 'center'
    },
    productsList: {
        borderWidth: 0,
        width: '100%',
        alignSelf: 'center',
    },
});

export default ProductsOverviewScreen;