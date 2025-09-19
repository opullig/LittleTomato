import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function Card({ 
  name, description, price, select, id, priceOff = 0, 
  status = '', amount = 0, category, showAmount = false, targetScreen 
}) {
  const navigation = useNavigation();
  let numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  let slicedPrice = 0;

  if (priceOff !== 0) {
    slicedPrice = numericPrice - numericPrice * priceOff;
  }

  const chooseItem = () => {
    const itemData = {
      id, name, price: numericPrice, description, priceOff, status, amount, category
    };

    select(itemData);

    if (targetScreen) {
      navigation.navigate(targetScreen, itemData);
    }
  };

  // Escolhe ícone da categoria
  const getCategoryIcon = () => {
    if (category.toLowerCase().includes('mercearia')) return FoodIcon;
    if (category.toLowerCase().includes('bebida')) return DrinkIcon;
    return FruitIcon;
  };

  return (
    <TouchableOpacity 
      onPress={chooseItem} 
      style={status ? styles.cardItemActivated : styles.cardItemDeactivated}
    >
      <View style={styles.cardBackText}>
        <Text style={styles.cardTitle}>{name.length > 20 ? name.substring(0, 20) + "..." : name}</Text>
        <Text style={styles.cardDesc}>{description.length > 50 ? description.substring(0, 50) + "..." : description}</Text>
        <View style={styles.statusView}>
          {showAmount && <Text>{`Qtd:${amount}`}</Text>}
          {!status && <Text> Desativado</Text>}
        </View>
        {priceOff !== 0 ? (
          <View style={styles.viewPriceOff}>
            <Text style={styles.cardPriceOff}>
              R$ {numericPrice.toFixed(2).replace('.', ',')} -{(priceOff * 100).toFixed(1)}%
            </Text>
            <Text style={styles.cardSlicedPrice}>R$ {slicedPrice.toFixed(2).replace('.', ',')}</Text>
          </View>
        ) : (
          <View style={styles.viewPrice}>
            <Text style={styles.cardPrice}>R$ {numericPrice.toFixed(2).replace('.', ',')}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardBackText:{ flex: 1 },
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
  statusView:{
    flexDirection: 'row',
    paddingLeft: 5,
  },
});

export default Card;
