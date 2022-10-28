const connection = require('../database/connection');
const verify = require('../components/verificator/Index');
const message = require('../components/messages/Index');

const tableOrders = 'orders';

module.exports = {

    async index(req, res){
        const { status } = req.params
        verify.params([status], res);        

        try{
            const orders = await connection(tableOrders).where({ status }).select('*').orderBy('date', 'asc');
            verify.response(orders, res);

        }catch(e){ message.serverError(e,res); }
    },

    async update(req,res){
        const {order_number} = req.params;
        const { status } = req.body;

        verify.params([order_number,status], res);
        
        try{
            await connection(tableOrders).where({ order_number }).update({ status });    
            message.updateSuccess(res);
        
        }catch(e){ message.serverError(e,res); } 
    }

}