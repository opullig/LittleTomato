const { Router } = require('express');

const routes = Router();

const auth = require('./controllers/AuthController');
const locations = require('./controllers/LocationsController');
const logs = require('./controllers/LogsControllers');
const orderItem = require('./controllers/OrderItemsController');
const orders = require('./controllers/OrdersController');
const pendings = require('./controllers/PendingOrdersController');
const productAmount = require('./controllers/ProductsAmountController');
const products = require('./controllers/ProductsController');
const professional = require('./controllers/ProfessionalController');
const promotions = require('./controllers/PromotionsController');
const recordItem = require('./controllers/RecordItemsController');
const records = require('./controllers/RecordsController');
const users = require('./controllers/UsersController');
const sales = require('./controllers/SalesController');

routes.get('/users', users.index);
routes.get('/users/only/:id', users.show);
routes.post('/users', users.storage);
routes.put('/users/update/:id', users.update);
routes.put('/users/active', users.toggle);

routes.get('/professionals', professional.index)
routes.get('/professionals/only/:id', professional.show);
routes.post('/professionals', professional.storage);
routes.delete('/professionals/delete/:id', professional.delete);

routes.get('/locations', locations.index);
routes.get('/locations/only/:id', locations.show);
routes.post('/locations', locations.storage);
routes.put('/locations/update/:id', locations.update);
routes.delete('/locations/delete/:id', locations.delete);

routes.get('/products', products.index);
routes.get('/products/only/:id', products.show);
routes.post('/products', products.storage);
routes.put('/products/update/:id', products.update);
routes.put('/products/active', products.toggle);

routes.put('/products/amount/:id', productAmount.updateAmount);

routes.get('/orders', orders.index);
routes.get('/orders/only/:order_number', orders.show);
routes.post('/orders', orders.storage);

routes.get('/orders/pendings/:status', pendings.index);
routes.put('/orders/pendings/update/:order_number', pendings.update);

routes.get('/orders/item/:order_number', orderItem.index);
routes.post('/orders/item', orderItem.storage);

routes.get('/records', records.index);
routes.get('/records/only/:record_number', records.show);
routes.post('/records', records.storage);
routes.put('/records/update/:record_number', records.upate);

routes.get('/records/item/:record_number', recordItem.index);
routes.post('/records/item', recordItem.storage);
routes.delete('/records/item/:id', recordItem.delete)

routes.get('/auth', auth.auth);

routes.get('/promotions', promotions.index);
routes.get('/promotions/only/:id', promotions.show);
routes.post('/promotions', promotions.storage);
routes.put('/promotions/update/:id', promotions.update);
routes.delete('/promotions/delete/:id', promotions.delete);

routes.get('/system/logs', logs.index);
routes.post('/system/logs', logs.storage);

routes.get('/sales', sales.index);
routes.post('/sales', sales.storage);

module.exports = routes;