//Imports =========================================================================================
import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Platform,
    Button,
    ActivityIndicator
} from 'react-native';
//React Navigation
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../redux/action/cartActions';
import * as productActions from '../../redux/action/productActions';
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
    //State for if the Screen is Loading
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    //Use Redux to get the PRODUCTS list
    const products = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();



    //FETCH PRODUCTS FROM HTTP SERVER DATABASE ====================================================
    //The loadProducts handler, which will attempt to fetch the Products from the specified database HTTP
    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            //Dispatch the fetchProducts Redux-Action
            await dispatch(productActions.fetchProducts());
        } catch (error) {
            setError(error.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsRefreshing, setError]);

    //Create an useEffect function which will run when the screen is visited (Since the dependency of 'dispatch' will never change)
    useEffect(() => {
        setIsLoading(true);
        //Call the loadProducts Handler to attempt to load all Products from the database
        loadProducts().then(setIsLoading(false));
    }, [dispatch, loadProducts]);
    //END OF: FETCH PRODUCTS ======================================================================



    //REACT-NAVIGATION LISTENERS ==================================================================
    useEffect(() => {
        const willFocusListener = props.navigation.addListener('willFocus', () => {
            loadProducts();
        });

        //Return the Clean-up Function
        return () => {
            willFocusListener.remove();
        };
    }, [loadProducts]);
    //END OF: REACT-NAVIGATION LISTENERS ==========================================================



    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title
            }
        });
    }



    //Return a JSX Component Object if the 'error' constant is defined
    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An Error occured!</Text>
                <Button
                    title='Try again'
                    onPress={loadProducts}
                    color={Colors.primary}
                />
            </View>
        );
    }
    //Return a JSX Component Object that will represent the 'Loading Spinner' (ActivityIndicator) while the app is loading
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }
    //Return a Text Component when the List of Products is Empty
    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found...</Text>
            </View>
        );
    }



    //Return JSX Component =================================================================================================
    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});