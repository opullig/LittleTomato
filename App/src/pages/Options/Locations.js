import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ToastAndroid, AsyncStorage, Text, TouchableOpacity, LogBox, ScrollView, KeyboardAvoidingView } from 'react-native';

import BarDefault from '../../components/Bars/DefaultBar';
import Input from '../../components/Form/Inputs';
import Button from '../../components/Form/Button';

import api from '../../services/api';

function Locations({navigation}){
    LogBox.ignoreAllLogs(true);

    const [location, setLocation] = useState('');
    const [id, setId] = useState('');
    const [user, setUser] = useState('');
    const [address, setAddress] = useState('');
    const [complement, setComplement] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(data => setUser(data));
        if(navigation.state.params != 0){
            setLocation(navigation.state.params);
        }

    }, []);

    useEffect(() => {
        if(location != null){
            setAddress(location.address);
            setComplement(location.complement);
            setId(location.id);
            setCity(location.city);
        }
    },[location])

    async function storageLocation(){
        if(address.length != 0){
            if(user != null){
                await api.post('/locations',{address, complement, city , user});
                ToastAndroid.show('Cadastrado com Sucesso', ToastAndroid.SHORT);
                back();
            }
        }
    }

    async function updateLocation(){
        if(address.length != 0){
            await api.put(`/locations/update/${id}`, {address, complement, city});
            ToastAndroid.show('Atualizado com Sucesso', ToastAndroid.SHORT);
            back();
        }
    }

    async function deleteLocation(){
        try{
            await api.delete(`/locations/delete/${id}`);
            ToastAndroid.show('Removido com Sucesso', ToastAndroid.SHORT);
        }catch(e){
            ToastAndroid.show('Não foi possível remover', ToastAndroid.SHORT)
        }
        back();

    }

    function back(){
        navigation.navigate('Options');
    }

    return(
        <>  
            <BarDefault title={ location != null ? 'Local' : 'Novo Local'} back={true} onPress={back} />
            <ScrollView style={styles.maxView}>
                <KeyboardAvoidingView>
                <View style={styles.container}>
                    <Input  name={'address'} placeholder={'Endereço'} onChangeText={setAddress} value={address}/>
                    <Input name={'complement'} placeholder={'Complemento'} onChangeText={setComplement} value={complement}/>
                    <Input name={'city'} placeholder={'Cidade'} onChangeText={setCity} value={city}/>
                    <Button text={location != null ? 'Atualizar Local' : 'Cadastrar Local'} onpress={location != null ? updateLocation : storageLocation}/>
                    {location != null ?
                    <View style={styles.removeLink}>
                        <TouchableOpacity onPress={deleteLocation}>
                            <Text style={styles.removeTextLink}>Remover Local</Text>
                        </TouchableOpacity>
                    </View>
                    : <></>
                    }
                </View>            
                </KeyboardAvoidingView>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    maxView:{
        backgroundColor: '#f0f0f0',
        flex:1,
    },
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        marginVertical: 40,
        
        paddingHorizontal: 10,
    },
    removeLink:{
        marginTop: 110,
    },
    removeTextLink:{
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
        textDecorationLine: 'underline',
    },
});

export default Locations;