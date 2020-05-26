import React, { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { TextInput } from 'react-native-paper';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/CustomHeaderButton';
import { Product } from '../../models/Product';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../store/actions/productsActions';
import FormStyles from '../../styles/Forms';

type Props = {
    navigation: StackNavigationProp;
};

const EditProductScreen = (props: Props) => {
    const editedProduct: Product = props.navigation.getParam('product');
    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState(editedProduct ? editedProduct.price.toString() : '');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');
    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        const product: Product = {
            title,
            imageUrl,
            price: Number(price),
            description,
            id: (editedProduct) ? editedProduct.id : '',
            ownerId: (editedProduct) ? editedProduct.ownerId : ''
        };
        if (editedProduct) {
            dispatch(updateProduct(product))
        } else {
            dispatch(createProduct(product))
        }
        props.navigation.goBack();
    }, [dispatch, editedProduct, title, imageUrl, price, description]);
    useEffect(() => {
        console.log('Exceuted...');
        props.navigation.setParams({submit: submitHandler});
    }, [submitHandler]);

    return (
        <KeyboardAvoidingView style={{flex: 1}}  behavior="padding" keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.screen}>
                    <View style={FormStyles.formControl}>
                        <TextInput
                            mode="outlined"
                            label="Title"
                            value={title}
                            style={styles.textInput}
                            onChangeText={value => setTitle(value)}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                        />
                    </View>
                    <View style={FormStyles.formControl}>
                        <TextInput
                            mode="outlined"
                            label="Image URL"
                            value={imageUrl}
                            style={styles.textInput}
                            onChangeText={value => setImageUrl(value)}
                            returnKeyType="next"
                            autoCapitalize="none"
                        />
                    </View>
                    {
                        editedProduct
                            ? null
                            : (
                                <View style={FormStyles.formControl}>
                                    <TextInput
                                        mode="outlined"
                                        label="Price"
                                        value={price}
                                        style={styles.textInput}
                                        onChangeText={value => setPrice(value)}
                                        keyboardType="decimal-pad"
                                        returnKeyType="next"
                                    />
                                </View>
                            )
                    }
                    <View style={FormStyles.formControl}>
                        <TextInput
                            mode="outlined"
                            label="Description"
                            value={description}
                            style={styles.textInput}
                            onChangeText={value => setDescription(value)}
                            numberOfLines={2}
                            multiline
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

EditProductScreen.navigationOptions = (props: Props) => {
    const title = props.navigation.getParam('product') ? 'Edit Product' : 'Add Product';
    const submit = props.navigation.getParam('submit');

    return {
        title: title,
        headerRight: (navigationProperties: any) => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title='Save'
                        iconName="save"
                        onPress={submit}
                    />
                </HeaderButtons>
            )
        }
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        padding: 0,
    },
    label: {
        marginVertical: 5,
    },
});

export default EditProductScreen;