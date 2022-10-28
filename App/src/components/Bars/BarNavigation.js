import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, AsyncStorage} from 'react-native';
import { withNavigation } from 'react-navigation';

import MarketIcon from '../../assets/market.png';
import CartIcon from '../../assets/cart.png';
import SetupIcon from '../../assets/setup.png';
import OrderIcon from '../../assets/billIcon.png';


function BarNavigation({ navigation }){

    const [professional, setProfessional] = useState('');
    
    useEffect(() => {
        AsyncStorage.getItem('access').then(data => setProfessional(data)).catch();  
    },[]);

    function toPage(page){
        navigation.navigate(page);
    }


    if(professional == null){

        return (
            <View style={styles.containerBottom}>
            <TouchableOpacity onPress={() => toPage('MainUser')} style={styles.buttonBottom} >
                <Image source={MarketIcon} style={styles.iconBottom}/>
                <Text style={styles.textBottom}>Produtos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toPage('Cart')} style={styles.buttonBottom} >
                <Image source={CartIcon} style={styles.iconBottom}/>
                <Text style={styles.textBottom}>Carrinho</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toPage('Options')} style={styles.buttonBottom} >
                <Image source={SetupIcon} style={styles.iconBottom}/>
                <Text style={styles.textBottom}>Opções</Text>
            </TouchableOpacity>
        </View>
        );
    }else{
        return (
            <View style={styles.containerBottom}>
                <TouchableOpacity style={styles.buttonBottom} onPress={() => toPage('MainProfessional')}>
                    <Image source={MarketIcon} style={styles.iconBottom} />
                    <Text style={styles.textBottom}>Produtos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBottom} onPress={() => toPage('ProfessionalOrders')}>
                    <Image source={CartIcon} style={styles.iconBottom} />
                    <Text style={styles.textBottom}>Pedidos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBottom} onPress={() => toPage('Records')}>
                    <Image source={OrderIcon} style={styles.iconBottom} />
                    <Text style={styles.textBottom}>Notas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBottom} onPress={() => toPage('Options')}>
                    <Image source={SetupIcon} style={styles.iconBottom} />
                    <Text style={styles.textBottom}>Opções</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerBottom:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#6C91E0',
        height: 60,
        
    },
    iconBottom:{
        resizeMode: "contain",
        width: 28,
        height: 28,
    },
    buttonBottom:{
       justifyContent: 'center',
       alignItems: 'center',
       margin: 5, 
    },
    textBottom:{
        color: '#f0f0f0',
        fontSize: 12,
        fontWeight: 'bold',
    },

});

export default withNavigation(BarNavigation);