import React, {useEffect, useState, useCallback} from 'react'
import { StyleSheet, StatusBar, Text, ScrollView, RefreshControl, View, LogBox } from 'react-native';


import api from '../../services/api';

import BarNavigation from '../../components/Bars/BarNavigation';
import Card from '../../components/Card';
import SearchBar from '../../components/Bars/SearchBar'

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

export default function Main({navigation}){
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#6C91E0');
    LogBox.ignoreAllLogs(true);
    
    const [products, setProducts] = useState('');
    const [filter, setFilter] = useState('');
    const [promotions, setPromotions] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isHFruti, setIsHFruti] = useState(false);
    const [isGrocery, setIsGrocery] = useState(false);
    const [isDrink, setIsDrink] = useState(false);
    
    function selectedItem(item){
        navigation.navigate('CartItem',item)
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            populateView();
            setRefreshing(false)
        });
    }, []);


   useEffect(() => {
        onRefresh();
        getPromotions();
    }, [])

    useEffect(() => {
        const data = []
        if(isSelected == true){
            products.map(product => {
                if(product.price_off){
                    data.push(product);
                }
            });
            setProducts(data);
        }else{
            populateView();
        }
           
    },[isSelected]);

    useEffect(() => {
        const data = []
        if(isDrink == true){
            products.map(product => {
                if(product.category.match('Bebida')){
                    data.push(product);
                }
            });
            setProducts(data);
        }else{
            populateView();
        }
           
    },[isDrink]);

    useEffect(() => {
        const data = []
        if(isGrocery == true){
            products.map(product => {
                if(product.category.match('Mercearia')){
                    data.push(product);
                }
            });
            setProducts(data);
        }else{
            populateView();
        }
           
    },[isGrocery]);

    useEffect(() => {
        const data = []
        if(isHFruti == true){
            products.map(product => {
                if(product.category.match('Horti-Fruti')){
                    data.push(product);
                }
            });
            setProducts(data);
        }else{
            populateView();
        }
           
    },[isHFruti]);

    async function populateView(){
        const { data } = await api.get('/products');
        const products = []
        if(data.length != 0){
            data.map(product => {
                if(product.status == true && product.amount > 0)
                products.push(product);
            }
            )
        }
        setProducts(products);
    }

    async function getPromotions(){
        const result = await api.get('/promotions');
        setPromotions(result.data);
    }    
    return(
        <>
        <SearchBar onChangeText={setFilter} value={filter}/>
            
        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}> 
            {products.length != 0 ? products.map(product => {

                                let name = product.name.toLowerCase();
                                const loFilter = filter.toLowerCase();
                                if(name.match(loFilter)){
                                    return (<Card key={product.id} id={product.id} name={product.name} description={product.description} category={product.category}
                                    price={product.price} showAmount={false} amount={product.amount} select={selectedItem} priceOff={product.price_off ? product.price_off : '0' } status={product.status} />)
                                    }
                                }
                                ) : <Text>Sem Items</Text>}
        </ScrollView>
        <BarNavigation />
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f0f0f0', 
    },
    containerFilter:{
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#6C91E0',
        paddingLeft: 10,
        paddingBottom: 5,
    },
    selectFilter:{
        backgroundColor:'white',
        marginRight: 10,
        
    },
    filterText:{
        color: '#f0f0f0',
        fontWeight:'bold'
    },

})