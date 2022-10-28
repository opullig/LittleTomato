const connection = require('../database/connection');
const verify = require('../components/verificator/Index');
const message = require('../components/messages/Index');

const TABLE_ORDER_ITEMS = 'order_items';

module.exports={
  
    async index(req,res){
        const { order_number } = req.params;
        verify.params([order_number], res);

        try{
            const order = await connection(TABLE_ORDER_ITEMS).where({order_number}).select('*').orderBy('id','asc');
            verify.response(order,res);

        }catch(e){ message.serverError(e, res); }
    },

    async storage(req,res){
        const { name, amount, price, order_number, product } = req.body;
        verify.params([name, amount, price, order_number, product], res);
                
        try{

            const result  = await connection(TABLE_ORDER_ITEMS).returning('id').insert({
                name,
                amount,
                price,
                order_number,
                product
            })

            message.storageSuccess(res, result);

        }catch(e){message.serverError(e,res)}
    }
};