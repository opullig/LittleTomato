import React, {useState} from 'react'
import { KeyboardAvoidingView, Image, StyleSheet, ToastAndroid, View, StatusBar, LogBox, ScrollView } from 'react-native'

import Logo from '../../assets/logo.png'

import Inputs from '../../components/Form/Inputs';
import Button from '../../components/Form/Button';
import api from '../../services/api';

export default function NewUser({ navigation}){

    StatusBar.setBarStyle('light-content');
    LogBox.ignoreAllLogs(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    function back(){
        navigation.navigate('Login')
    }

    async function createNewUser(){
        ToastAndroid.show('Enviando dados, Aguarde...', ToastAndroid.LONG);

        if(password.length !=0 && confirmPassword.length != 0){
            if(password === confirmPassword){
                try{

                    const response = await api.post('/users', {name, email, password}).catch(e => console.error(e))
                    ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
                    navigation.navigate('Login');
                }catch(e){
                    ToastAndroid.show('Não foi possível realizar o Cadastro',ToastAndroid.SHORT);
                }
            }
        }
    }

    return (
        <ScrollView style={styles.viewMax} >
        <KeyboardAvoidingView >
        <View style={styles.container}>

                <Image source={Logo} style={styles.logo}/>
                <Inputs name='name' placeholder='Nome' onChangeText={setName} value={name} />
                <Inputs name='email' placeholder='E-mail' onChangeText={setEmail} value={email}/>
                <Inputs name='password' placeholder='Senha' onChangeText={setPassword} value={password} security={true}/>
                <Inputs name='ConfirmPassword' placeholder='Repetir a Senha' onChangeText={setConfirmPassword} value={confirmPassword} security={true}/>
                <View style={styles.buttonContainer}>
                    <Button onpress={createNewUser} text='Cadastrar' style={'white'}/>
                    <Button onpress={back} text='Voltar' style={'white'} />
                </View>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
        );
}

const styles = StyleSheet.create({
    viewMax:{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#6C91E0',
        flex: 1,
    },
    container:{
        alignItems: 'center',
        paddingHorizontal: 5,
        marginBottom: 30,
    },
    logo:{
        resizeMode:"contain",
        width: 240,
        height: 100,
        marginLeft: 15,
    },
    buttonContainer:{
        marginTop: 10,
        width: '100%',
        height: 110,
        justifyContent: "space-between",
        alignItems: "center",
    },
});