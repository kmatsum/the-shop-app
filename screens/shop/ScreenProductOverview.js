//Imports =========================================================================================
import React from 'react';
import {
    StyleSheet,
    FlatList,
    Platform,
    Button
} from 'react-native';
//React Navigation
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../redux/action/cartActions';
//Constant Imports
import Colors from '../../constants/Colors';
//Custom Components
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';



//Navigation Options =======================================================================================================
ScreenProductsOverview.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'All Products',
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
                    title='Cart'
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navigationData.navigation.navigate('Cart');
                    }}
                    iconSize={23}
                />
            </HeaderButtons>
        ),
    }
}



//Main Function ============================================================================================================
export default function ScreenProductsOverview(props) {
    //Use Redux to get the PRODUCTS list
    const products = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title
            }
        });
    }



    //Return JSX Component =================================================================================================
    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) =>
                <ProductItem
                    imageUrl={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                    }}
                >
                    <Button
                        title='Details'
                        color={Colors.primary}
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title);
                        }}
                    />
                    <Button
                        title='Add to Cart'
                        color={Colors.primary}
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item));
                        }}
                    />
                </ProductItem>
            }
        />
    );
}

//Styling ==================================================================================================================
const styles = StyleSheet.create({

});