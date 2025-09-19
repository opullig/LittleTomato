import React, {useEffect, useState} from 'react';
import { Text, View, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, StatusBar, ToastAndroid, LogBox } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import api from '../../services/api';

import Input from '../../components/Form/Inputs';
import Button from '../../components/Form/Button';

export default function Login({ navigation }){
    LogBox.ignoreAllLogs(true);

    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');

    StatusBar.setBarStyle('light-content');

    useEffect(() => {
        findUser();
      }, []);

    async function findUser(){
        const hasUser = await AsyncStorage.getItem('user');
        const hasProfessional = await AsyncStorage.getItem('access');

        if(hasProfessional != null && hasUser != null){
            navigation.navigate('MainProfessional');
        }else if(hasUser != null && hasProfessional == null){
            navigation.navigate('MainUser');
        }
    };

    async function handleSubmit(){
        const params = {headers: {email, password}};
        
        try{
            ToastAndroid.showWithGravity('Conectando...', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            const response = await api.get('/auth',params);
            const {id, access_key, name} = response.data;

            if(access_key != null)
                await AsyncStorage.setItem('access', access_key);
           
            await AsyncStorage.setItem('user', id);
            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('email', email);

            ToastAndroid.showWithGravity('Login efetuado com sucesso', ToastAndroid.LONG, ToastAndroid.BOTTOM);
            if(access_key != null){
                navigation.navigate('MainProfessional');
            }else if(id != null){
                navigation.navigate('MainUser');
            }
            
        }catch(e){
            ToastAndroid.showWithGravity('Usuário ou Senha não encontrados', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            console.error(e);
        }   
    }

    function newUser(){
        navigation.navigate('NewUser')
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.form}>
                <Input name='Login' placeholder='E-mail' onChangeText={setEmail} value={email}/>
                <Input name='Password' placeholder='Senha' onChangeText={setPassword} value={password} security={true}/>
                <Button onpress={handleSubmit} text='Acessar' style={'white'}/>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity onPress={newUser}>
                    <Text style={styles.link}>Novo Cadastro</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#6C91E0',
        paddingHorizontal: 10,
    },
    logo:{
        resizeMode:"contain",
        width: 240,
        height: 100,
    },
    form:{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'stretch',
        marginTop: 15,
    },
    link: {
        marginTop: 25,
        textDecorationLine: 'underline',
        color:'#f0f0f0',
        fontWeight: 'bold'
    },
    bottom:{
        justifyContent: 'flex-end',
        height: 90,
    }
});
