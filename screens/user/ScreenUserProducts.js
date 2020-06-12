//React Imports
import React from 'react';
import {
    StyleSheet,
    Platform,
    FlatList,
    View,
    Button,
} from 'react-native';
//Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../redux/action/productActions';
//React Navigation
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//Constant Imports
import Colors from '../../constants/Colors';
//Custom Component Imports
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';



//Navigation Options =======================================================================================================
ScreenUserProducts.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navigationData.navigation.toggleDrawer();
                    }}
                    iconSize={23}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Add'
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navigationData.navigation.navigate('EditProduct');
                    }}
                    iconSize={23}
                />
            </HeaderButtons>
        ),
    };
};



//Main Function ============================================================================================================
export default function ScreenUserProducts(props) {
    //Point a Variable to the useDispatch() React Hook
    const dispatch = useDispatch();
    //Get the current user's products that they own
    const userProducts = useSelector((state) => state.products.userProducts);

    //GO TO EDIT PRODUCT SCREEN FUNCTION =====
    function editProductHandler(productId) {
        props.navigation.navigate('EditProduct', { productId: productId });
    }

    //Return JSX Component =================================================================================================
    return (
        <FlatList
            data={userProducts}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
                <ProductItem
                    title={itemData.item.title}
                    imageUrl={itemData.item.imageUrl}
                    price={itemData.item.price}
                    onSelect={() => {
                        editProductHandler(itemData.item.id);
                    }}
                >
                    <Button
                        title='Edit'
                        color={Colors.primary}
                        onPress={() => {
                            editProductHandler(itemData.item.id);
                        }}
                    />
                    <Button
                        title='Delete'
                        color='red'
                        onPress={() => {
                            dispatch(productActions.deleteProduct(itemData.item.id));
                        }}
                    />
                </ProductItem>
            )}
        />
    );
}

