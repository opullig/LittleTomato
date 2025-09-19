import React, {useState, useEffect, useCallback} from 'react';
import {Text, StatusBar, ScrollView, TouchableOpacity, StyleSheet, RefreshControl, LogBox} from 'react-native';

import SearchBar from '../../components/Bars/SearchBar';
import BarNavigation from '../../components/Bars/BarNavigation';
import Card from '../../components/Card';

import api from '../../services/api';

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }


function Professional({ navigation }){
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#6C91E0');
    LogBox.ignoreAllLogs(true);
    
    const [products, setProducts] = useState('');
    const [filter, setFilter] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);
    
    useEffect(() => {
        onRefresh();
        populateView();
    }, [])
    
    async function populateView(){
        const { data } = await api.get('/products');
        setProducts(data);
    }

    function selectedItem(item){
        navigation.navigate('UpdateProduct', item);
    }

    function addProducts(){ navigation.navigate('AddProduct'); }
    
    return(
        <>
            <SearchBar value={filter}  onChangeText={setFilter}/>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.container}>
                <TouchableOpacity style={styles.viewButton} onPress={addProducts}>
                
                    <Text style={styles.textButton}>Adicionar Produto</Text>
                </TouchableOpacity>
                {products.length == 0 ? <Text>Sem Items Cadastrados</Text> : products.map((product, index) => {
                    const name = product.name.toLowerCase();
                    if(name.match(filter.toLowerCase())){
                        return(
                            <Card key={index} name={product.name} id={product.id}
                                price={product.price} description={product.description} 
                                priceOff={product.price_off ? product.price_off : '0'}
                                category={product.category}
                                status={product.status} showAmount={true}
                                select={selectedItem} amount={product.amount}
                                />
                        )
                    }
                })}
            </ScrollView>
            <BarNavigation />
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f0f0f0'
    },
    icon:{
        resizeMode:'contain',
        width: 16,
        height: 16,
        marginRight: 5,
    },

    textButton:{
        fontSize: 18,
        color: '#3A435C',
    },

    viewButton:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        padding: 12,
    },
});

export default Professional;