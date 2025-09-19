import React, {useEffect, useState} from 'react';
import { Text, StyleSheet, View, LogBox } from 'react-native'
import  AsyncStorage  from '@react-native-async-storage/async-storage'
import NumericInput from 'react-native-numeric-input';

import DefaultBar from '../../components/Bars/DefaultBar';
import Buttom from '../../components/Form/Button';

function ConfirmItem({ navigation }){
    LogBox.ignoreAllLogs(true);
    
    const [item, setItem] = useState('');
    const [amount, setAmount] = useState(1);
    

    useEffect(() => {
        let isCancelled = false;
        const runAsync = async () => {
          try {
            if (!isCancelled) {
                setItem(navigation.state.params);
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
    })
    
    function back(){
        navigation.navigate('MainUser');
    }
    
    async function addToCart(){
        const response = await AsyncStorage.getItem('cart');
        const dataArray = [];
        const data = {};
        data.id = item.id;
        data.price = item.price;
        data.name = item.name;
        if(item.price_off)
        data.price_off = item.price_off;
        data.amount = amount;

        const jsonString = JSON.stringify(data);
        dataArray.push(jsonString);
        
        if(response == null){
            await AsyncStorage.setItem('cart', JSON.stringify(dataArray));
        }else{
            const oldData = await AsyncStorage.getItem('cart');
            const parseData = JSON.parse(oldData);
            parseData.map(data => dataArray.push(data));
            await AsyncStorage.setItem('cart', JSON.stringify(dataArray));
        }  
        navigation.navigate('MainUser');   
    }

    return(
        <>
            <DefaultBar title={item.name} onPress={back} back={true} />
            <View style={style.content}>
                <View style={style.viewBanner}>
                    <Text style={{fontSize:18, color:'#FFF', fontWeight:'bold'}}>Confirme a quantidade</Text>
                </View>
                <Text style={style.textDescription}>{item.description}</Text>
                <Text style={style.priceText}>R$ {item.price ? item.price.replace('.',',') : <></>}</Text>
            <View style={style.btnNum}>
                <NumericInput onChange={ amount => setAmount(amount)} initValue={1} minValue={1} maxValue={10} rounded={true}/>
            </View>
            <View style={style.btnView}>
                <Buttom text='Confirmar' onpress={addToCart}/>
            </View>
            </View>
        </>
    );
}

const style = StyleSheet.create({
    content:{
        flex: 1,
    },
    cardImage:{
        resizeMode: "contain",
        width: 128,
        height: 128, 
    },
    textDescription:{
        margin: 10,
        fontSize: 14,
        textAlign: 'justify',
        width: '90%'
    },
    priceText:{
        textAlign:'right',
        marginRight: 25,
        fontSize: 18,
        fontWeight: 'bold',
        color:'green',
    },
    btnView:{
        marginTop: 90,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btnNum:{
        marginLeft: 15,

    },
    viewBanner:{
        backgroundColor:'#1E2F5C',
        alignItems: 'center',
        padding: 10,
    },

});

export default ConfirmItem;