//Imports =========================================================================================
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from 'react-native';
//Redux Imports
import { useSelector } from 'react-redux';
//Custom Components
import ProductItem from '../../components/shop/ProductItem';



//Navigation Option Setup
ScreenProductsOverview.navigationOptions = {
    title: 'All Products',
}



//Main Component Function ==================================================================================================
export default function ScreenProductsOverview(props) {
    //Use Redux to get the PRODUCTS list
    const products = useSelector((state) => state.products.availableProducts);

    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) =>
                <ProductItem
                    imageUrl={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={() => {
                        props.navigation.navigate({
                            routeName: 'ProductDetail',
                            params: {
                                productId: itemData.item.id,
                                productTitle: itemData.item.title
                            }
                        });
                    }}
                    onAddToCart={() => { }}
                />
            }
        />
    );
}

//Styling
const styles = StyleSheet.create({

});