import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import { withNavigation } from 'react-navigation';

import FoodIcon from '../assets/food.png';
import DrinkIcon from '../assets/Drink.png';
import FruitIcon from '../assets/Fruit.png';

function Card({ name, description, price, select, id, priceOff, status = '', amount, category, showAmount=false }){
    
    let slicedPrice = 0
    
    function chooseItem(){
        if(priceOff != 0)
            price = (price - (price*priceOff)).toFixed(2);
        select({
            id,
            name,
            price,
            description,
            priceOff,
            status,
            amount,
            category
        })
    }

    price = price.toFixed(2);
    if(priceOff != 0)
        slicedPrice = price - (price * priceOff); 
    return (
        <TouchableOpacity onPress={chooseItem} style={status ? styles.cardItemActivated : styles.cardItemDeactivated}>
            <View style={styles.cardBackImage}>
                <Image source={category.match('Mercearia') ? FoodIcon : category.match('Bebida') ? DrinkIcon : FruitIcon} style={styles.cardImage}/>
            </View>
            <View style={styles.cardBackText}>
                <Text style={styles.cardTitle}>{name.length > 20 ? name.substring(0,20)+"..." : name}</Text>
                <Text style={styles.cardDesc}>{description.length > 50 ? description.substring(0,50)+"..." : description}</Text>
                <View style={styles.statusView}>
                    {showAmount ? <Text>{`Qtd:${amount}`}</Text> : <></>}
                    {status ? <></> : <Text> Desativado</Text> }
                </View>
                {priceOff != 0 ? 
                    <View style={styles.viewPriceOff}>
                    <Text style={styles.cardPriceOff}>R$ {price.replace('.',',')} -{(priceOff*100).toFixed(1)}%</Text> 
                    <Text style={styles.cardSlicedPrice}>R$ {slicedPrice.toFixed(2).replace('.',',')}</Text>
                    </View>
                    :
                    <View style={styles.viewPrice}>
                        <Text style={styles.cardPrice}>R$ {price.replace('.',',')}</Text>
                    </View>
                }
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardBackText:{ flex: 1,},
    cardItemActivated:{
        flexDirection:'row',
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10,
        height: 120,
    },
    cardItemDeactivated:{
        flexDirection:'row',
        backgroundColor: 'grey',
        margin: 10,
        borderRadius: 10,
        height: 120,
    },
    cardBackImage:{
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#1E2F5C',
        padding: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        width: 95,
    },
    cardImage:{
        resizeMode: "contain",
        width: 64,
        height: 64, 
    },
    cardTitle:{
        fontSize: 22,
        fontWeight: "900",
        margin: 3,
    },
    cardDesc:{
        fontSize: 14,
        color: '#b3b3b3',
        marginLeft: 14,
        marginRight: 10,
        height: 35,
        textAlign:"justify"

    },
    viewPrice:{
        flex: 1,
        paddingRight: 15,
    },
    cardPrice:{
     
     textAlign: "right",
     textAlignVertical: "bottom",
     fontSize: 18,
    },
    viewPriceOff:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 15,
        backgroundColor: '#68C03F',
        borderBottomEndRadius: 10
    },
    cardPriceOff:{
        color: '#3d3d3d',
        fontSize: 11,
        marginRight: 10,

    },
    cardSlicedPrice:{
        fontSize: 18,
        color: '#f0f0f0'
    },
    button:{
        backgroundColor: '#1E2F5C',
        width:'90%',
        height: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 10,
    },
    buttonText:{
        color: '#f0f0f0',
        fontWeight: 'bold',
    },
    statusView:{
        flexDirection: 'row',
        paddingLeft: 5,
    },
});
export default withNavigation(Card);