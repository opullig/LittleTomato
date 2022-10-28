import React, {useEffect, useState} from 'react';
import { LogBox, Text, View, StyleSheet, ToastAndroid } from 'react-native';

import DefaultBar from '../../components/Bars/DefaultBar';
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Inputs';

import api from '../../services/api';

export default function RecordItem({ navigation }){
    LogBox.ignoreAllLogs(true);

    const [product, setProduct] = useState('');
    const [record, setRecord] = useState('');
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        let isCancelled = false;
        const runAsync = async () => {
          try {
            if (!isCancelled) { 
                setProduct(navigation.state.params.product);
                setRecord(navigation.state.params.record);
            }
          } catch (e) {
            if (!isCancelled) { throw e; }
          }
        };
        runAsync();
        return () => {
          isCancelled = true;
        };
    },[])

    async function insertItem(){
        try{
          let amountT = amount.replace(/[^,.0-9\s]/g, '');
          await api.post('/records/item',{product: product.id, amount: amountT,record_number: record.record_number})
          ToastAndroid.showWithGravity('Inserido com Sucesso', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
          back(record); 
        }catch(e){
          console.error(e);
          ToastAndroid.showWithGravity('Não foi possível', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
    }

    function back(data){
        navigation.navigate('OpenRecord', data)
    }

    return(
        <>
            <DefaultBar back={true} title='Produto' onPress={() => back(record)}/>
            <View style={styles.container}>
              {product.length != 0 ?
                  <View style={styles.viewTitle}>
                      <Text style={styles.title}>{product.name}</Text>
                      <Text style={styles.price}> R${product.price.toFixed(2).replace('.',',')}</Text>
                  </View>
                  : <></>
              }
              <Input type='numeric' name='amount' onChangeText={setAmount} value={amount} placeholder='Quantidade'/>
              <View style={styles.buttonContainer}>
                <Button text='Adicionar Produto'  onpress={insertItem}/>
              </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#f0f0f0',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  viewTitle:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 20,
  },
  title:{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1E2F5C',
    marginBottom: 5,
  },
  price:{
    color: '#68C03F',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  buttonContainer:{
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});