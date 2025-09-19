import React, {useEffect, useState, useCallback} from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, RefreshControl, LogBox } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage'

import api from '../../services/api';
import BarNavigation from '../../components/Bars/BarNavigation';
import DefaultBar from '../../components/Bars/DefaultBar';
import Button from '../../components/Form/Button';


const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function Cart({ navigation }){
    LogBox.ignoreAllLogs(true);
    
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState('');
    const [productList, setProductList] = useState('');
    const [payments, setPayments] = useState('Dinheiro');
    const [locations, setLocations] = useState('');
    const [location, setLocation] = useState('');
    const [user, setUser] = useState('');
    
    let cost = 0;
    let dataLocations = '';


    useEffect(() => {
        let isCancelled = false;
        const runAsync = async () => {
          try {
            if (!isCancelled) {
                onRefresh();
                getUser();
                   
            }
          } catch (e) {
            if (!isCancelled) {
              throw e;
            }
          }
        };
        runAsync();
        return () => {
          isCancelled = true;
        };
    }, []);

    useEffect(() => {
        let isCancelled = false;
        const runAsync = async () => {
          try {
            if (!isCancelled) {
                getLocation();
                
            }
          } catch (e) {
            if (!isCancelled) {
              throw e;
            }
          }
        };
        runAsync();
        return () => {
          isCancelled = true;
        };
                
    }, [user]);

    useEffect(() =>{
        populateView();
    }, [productList]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => {
            populateView();
            setRefreshing(false)});
    }, []);

    function getUser(){
        AsyncStorage.getItem('user').then(data => {
            return setUser(data);
        });
    }

    async function populateView(){
        let data = [];
        AsyncStorage.getItem('cart').then( rawData => {
            if(rawData == null)
                return '';
            const parseData = JSON.parse(rawData);
            parseData.map(item => data.push(JSON.parse(item)))
            setProductList(data.length);
            return setProducts(data);
        });
    }

    async function getLocation(){
        try{ 
            dataLocations = await api.get('/locations', {'headers':{
                'Content-Type':'application/json',
                id: user
            }});
            setLocation(`${dataLocations.data[0].address} ${dataLocations.data[0].complement}`);
        }catch(e){
            return setLocation('');
        }
        return setLocations(dataLocations.data);
    }
    
    async function removeOnly(index){
        const stringfyData = []
        products.splice(index, 1); 
        products.map(item => stringfyData.push(JSON.stringify(item)));
        await AsyncStorage.setItem('cart', JSON.stringify(stringfyData));
        setProducts(products);
        setProductList(products.data);
    }
    
    function closeOrder(){ 
        cost = cost.toFixed(2);
        const data = {payment: payments, location: location, products: products, user: user, cost};
        navigation.navigate('CloseOrder', data); 
    }

    return(
      <>
            <DefaultBar title='Carrinho'/>
            <View style={ styles.container }>
            <View style={styles.warningView}>
                <Text style={styles.warningText}>*Após o pedido ser liberado para entrega, existe um prazo de 48 horas pra ser entregue.</Text>
            </View>
            <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
              {products.length == 0 ? <Text>Carrinho Vazio</Text> : products.map((item,index) => {
                  cost += (item.price*item.amount);
                  
                    return (
                        <TouchableOpacity key={index} style={styles.itemList} onPress={() => removeOnly(index)}>
                            <Text style={styles.itemListText}>{`${item.amount}x  ${item.name.substring(0,25)}`}</Text>
                            <Text style={styles.itemListText}>{`R$ ${item.price.replace('.',',')}`}</Text>
                        </TouchableOpacity>
                    );
                    })}
                <Text style={styles.itemListTextTotal}>Total:     R$ {cost.toFixed(2).replace('.',',')}</Text>
            </ScrollView>
            <View style={styles.viewPayment}>
                <Text style={styles.label}>Pagamento</Text>
            </View> 
            <View style={styles.viewPayment}>
                <Text style={styles.label}>Local de Entrega</Text>
            </View>
            <View style={styles.viewButton}>
            {products.length != 0 && location != '' ? <Button onpress={closeOrder} text='Fechar Pedido'/> : <Text></Text>}
            </View>
            </View>
            <BarNavigation />
        </>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f0f0f0',
        padding: 10
    },
    warningView:{
        margin: 5,
    },
    warningText:{
        fontSize: 13,
        fontStyle: 'italic',
        color: '#3856A8',
    },
    itemList:{
        margin: 10,
        flexDirection: "row",
        flex:1,
        justifyContent:"space-between",
    },
    itemListText:{
        fontSize: 16,
        fontWeight: "bold",
    },
    itemListTextTotal:{
        fontSize: 16,
        fontWeight: "bold",
        color:'#68C03F',
        textAlign:'center',
        marginTop: 20
    },
    viewPayment:{
        marginHorizontal: 10,
        marginBottom: 2
    },
    label:{
        color:'#a2a2a2',
        fontSize: 12,
    },
    viewButton:{
        marginTop: 10,
        marginBottom: 45,
        alignItems: 'center',
    },

});

export default Cart;