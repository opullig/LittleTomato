import React , {useState} from 'react';
import { StyleSheet, View, ToastAndroid, Picker, LogBox } from 'react-native';

import DefaultBar from '../../components/Bars/DefaultBar';
import Input from '../../components/Form/Inputs';
import Button from '../../components/Form/Button';

import api from '../../services/api';

function AddProducts({ navigation }){
    LogBox.ignoreAllLogs(true);
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
        
    async function insertItem(){
        const data = { name, description, price, category};
            await api.post('/products', data);
            ToastAndroid.showWithGravity('Produto adicionado com sucesso', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            navigation.navigate('MainProfessional');
    }
    
    function back(){
        navigation.navigate('MainProfessional');
    }
    
    return (
        <>
            <DefaultBar back={true} onPress={back} title='Adicionar Produtos'/>
            <View style={styles.container}>    
                <Input placeholder='Nome' name='name' value={name} onChangeText={setName} />
                <Input placeholder='Descrição' name='description' value={description} onChangeText={setDescription}/>
                <Input placeholder='Preço' name='price' value={price} onChangeText={setPrice} type='numeric'/>
                <View style={styles.view}>
                <Picker  selectedValue={category} onValueChange={(data) => setCategory(data)} >
                    <Picker.Item label='Selecione' value=''/>
                    <Picker.Item label='Horti-Fruti' value='Horti-Fruti'/>
                    <Picker.Item label='Mercearia' value='Mercearia'/>
                    <Picker.Item label='Bebidas' value='Bebidas'/>
                </Picker>
                </View>
                { name != '' && description != '' && price != '' && category != '' ?
                    <Button onpress={insertItem} text='Cadastrar Produto' />
                    :
                    <></>
                }
            </View>
        </>
    );

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
    },
    view:{ width: '100%'}
});

export default AddProducts;