import {createAppContainer, createSwitchNavigator} from 'react-navigation';

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

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        MainUser,
        MainProfessional,
        NewUser,
        Cart,
        CartItem,
        Orders,
        CloseOrder,
        Options,
        Account,
        Location,
        AddProfessional,
        OptionOrders,
        DetailsOrder,
        AddProduct,
        UpdateProduct,
        Records,
        ProfessionalOrders,
        DetailsProfessionalOrders,
        OpenRecord,
        RecordItem,
        Sales,
    })
);

export default Routes;