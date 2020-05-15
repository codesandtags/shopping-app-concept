import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';

type Props = {
  navigation: StackNavigationProp;
};

const UserProductsScreen = (props: Props) => {
    return (
        <View style={styles.screen}>
            <Text>Welcome to this UserProductsScreen</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default UserProductsScreen;