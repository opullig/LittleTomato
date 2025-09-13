import React, {useState, useEffect} from 'react';
import { Text, ToastAndroid, View, StyleSheet, TouchableOpacity, LogBox, ScrollView, KeyboardAvoidingView} from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage'

import DefaultBar from '../../components/Bars/DefaultBar';
import Input from '../../components/Form/Inputs';
import Button from '../../components/Form/Button';
import api from '../../services/api';
import { Picker } from '@react-native-community/picker';

function UpdateProduct({ navigation }){
    LogBox.ignoreAllLogs(true);
    
    const [product, setProduct] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [promotion, setPromotion] = useState(0);
    const [category, setCategory] = useState('');
    const [access_key, setAccess_key] = useState('');


    useEffect(() => {
            setProduct(navigation.state.params);
            AsyncStorage.getItem('access').then(key => setAccess_key(key));
    },[])

    useEffect(() => {
        const {id, name, description, price, status, priceOff, category} = product;
        setId(id);
        setName(name);
        setDescription(description);
        setPrice(price);
        setStatus(status);
        setPromotion(priceOff);
        setCategory(category);
    }, [product])
    
    function back(){ navigation.navigate('MainProfessional') }
    
    async function toggleProduct(){
        await api.put(`/products/active`,{id},{
            'headers':{
                'content-type':'application/json', 
                'access_key':access_key
            },})
        status == 1 ? setStatus(0) : setStatus(1)
    }

    async function updateProduct(){
        const id = product.id;
        try{
            await api.put(`/products/update/${id}`,{name, description, price, category})
            ToastAndroid.showWithGravity('Atualizado com sucesso', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            navigation.navigate('MainProfessional')
        }catch(e){
            ToastAndroid.showWithGravity('Ocorreu um erro', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            console.error(e);
            navigation.navigate('MainProfessional');
        }
    }

    async function updatePromotion(){
        await api.put(`/promotions/update/${id}`, { price_off: promotion});
        back();
    }

    async function addPromotion(){
        await api.post('/promotions', {product: id, price_off: promotion});
        back();
    }

    async function deletePromotion(){
        await api.delete(`/promotions/delete/${id}`);
        back();
    }

    function back(){
        navigation.navigate('MainProfessional');
    }

        return(
            <>
                <DefaultBar back={true} onPress={back} title='Atualizar Produto'/>
                <ScrollView style={styles.page}>
                <KeyboardAvoidingView>
                 <View style={styles.container}>
                    <View style={styles.inputView}>
                        <Text style={styles.labelText}>Nome</Text>
                        <Input value={name} onChangeText={setName} name={'name'} placeholder='Nome'/>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.labelText}>Descrição</Text>
                        <Input value={description} onChangeText={setDescription} name={'description'} placeholder='Descrição do produto'/>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.labelText}>Preço</Text>
                        <Input value={price} onChangeText={setPrice} name={'price'} placeholder='Preço' type='numeric'/>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.textQtd}>{`Quantidade: ${product.amount}`}</Text>
                    </View>
                    <View style={styles.viewButtonStatus}>
                        <TouchableOpacity onPress={toggleProduct}>
                            <Text style={styles.textButtonStatus}>{status ? 'Desativar Produto' : 'Ativar produto'} </Text>
                        </TouchableOpacity>
                        {status ? <Text style={styles.textOn}>Ativado</Text> : <Text style={styles.textOff}>Desativado</Text>}
                    </View>
                    <View style={styles.inputView}>
                        <Text>{`Categoria: ${category}`}</Text>
                        <Picker  selectedValue={category} onValueChange={(data) => setCategory(data)} >
                            <Picker.Item label='Tipo de Produto' value=''/>
                            <Picker.Item label='Horti-Fruti' value='Horti-Fruti'/>
                            <Picker.Item label='Mercearia' value='Mercearia'/>
                            <Picker.Item label='Bebidas' value='Bebidas'/>
                        </Picker>
                    </View>
                    <View style={styles.promotionView}>
                        <Text>Desconto de: {(promotion*100).toFixed(1)}%</Text>
                        <Picker selectedValue={promotion} onValueChange={(data) => setPromotion(data)} >
                            <Picker.Item label='Desconto' value='0'/>
                            <Picker.Item label='5%' value='0.05'/>
                            <Picker.Item label='10%' value='0.10'/>
                            <Picker.Item label='15%' value='0.15'/>
                            <Picker.Item label='20%' value='0.20'/>
                            <Picker.Item label='25%' value='0.25'/>
                            <Picker.Item label='30%' value='0.30'/>
                            <Picker.Item label='35%' value='0.35'/>
                            <Picker.Item label='40%' value='0.40'/>
                        </Picker>
                        {product.priceOff != 0 ? 
                        <View style={styles.viewButtonsPromotion}>
                            <TouchableOpacity onPress={deletePromotion}>
                                <Text style={styles.textDelete}>Excluir Desconto</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={updatePromotion}>
                                <Text style={styles.textUpdate}>Atualizar Desconto</Text> 
                            </TouchableOpacity>
                        </View>
                        : promotion > 0 ?
                        <View style={styles.viewButtonsPromotion}>
                            <TouchableOpacity onPress={addPromotion}>
                                <Text style={styles.textUpdate}>Adicionar Desconto</Text>
                            </TouchableOpacity>
                        </View>
                        : <></>
                        }
                    </View>
                    <Button text='Atualizar Dados' onpress={updateProduct}/>
                </View>
                </KeyboardAvoidingView>
                </ScrollView>
            </>
        );

};

const styles = StyleSheet.create({
    page:{
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingTop: 10,
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 25,
    },
    inputView:{
        width: '100%',
    },
    labelText:{
        color: '#3A435C',
        fontSize: 12,
        fontStyle: 'italic',
    },
    viewButtonStatus:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    textButtonStatus:{
        fontWeight: 'bold',
        fontStyle:"italic",
        color: '#3A435C',
        textDecorationLine: 'underline',
    },
    textQtd:{
        marginBottom: 30,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#3A435C',
    },
    promotionView:{
        width: '100%',
        marginBottom: 30,
    },
    viewButtonsPromotion:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textDelete:{
        color: 'red',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 16,
    },
    textUpdate:{
        color: '#4970DC',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 16,
    },
    textOff:{color: '#838383', fontSize: 16},
    textOn:{color: '#4970DC', fontSize: 16}

});

export default UpdateProduct