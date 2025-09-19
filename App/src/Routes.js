import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Login from './pages/Login/Index';
import MainUser from './pages/Main/User';
import MainProfessional from './pages/Main/Professional';
import NewUser from './pages/User/NewUser';
import Cart from './pages/Cart/Index';
import CartItem from './pages/Cart/ConfirmItem'
import Orders from './pages/Orders/Index';
import CloseOrder from './pages/Orders/CloseOrder';
import DetailsOrder from './pages/Orders/Details';
import ProfessionalOrders from './pages/Orders/ProfessionalOrders';
import DetailsProfessionalOrders from './pages/Orders/DetailsProfessionalOrders';
import Options from './pages/Options/Index';
import Account from './pages/Options/Account';
import Location from './pages/Options/Locations';
import AddProfessional from './pages/Options/AddProfessional';
import OptionOrders from './pages/Options/Orders';
import AddProduct from './pages/Products/AddProduct';
import UpdateProduct from './pages/Products/UpdateProduct';
import Records from './pages/Records/Index';
import OpenRecord from './pages/Records/OpenRecord';
import RecordItem from './pages/Records/RecordItem';
import Sales from './pages/Options/Sales';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="MainUser" component={MainUser} />
                <Stack.Screen name="MainProfessional" component={MainProfessional} />
                <Stack.Screen name="NewUser" component={NewUser} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="CartItem" component={CartItem} />
                <Stack.Screen name="Orders" component={Orders} />
                <Stack.Screen name="CloseOrder" component={CloseOrder} />
                <Stack.Screen name="DetailsOrder" component={DetailsOrder} />
                <Stack.Screen name="ProfessionalOrders" component={ProfessionalOrders} />
                <Stack.Screen name="DetailsProfessionalOrders" component={DetailsProfessionalOrders} />
                <Stack.Screen name="Options" component={Options} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="Location" component={Location} />
                <Stack.Screen name="AddProfessional" component={AddProfessional} />
                <Stack.Screen name="OptionOrders" component={OptionOrders} />
                <Stack.Screen name="AddProduct" component={AddProduct} />
                <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
                <Stack.Screen name="Records" component={Records} />
                <Stack.Screen name="OpenRecord" component={OpenRecord} />
                <Stack.Screen name="RecordItem" component={RecordItem} />
                <Stack.Screen name="Sales" component={Sales} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}    