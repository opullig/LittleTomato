const connection = require('../database/connection');
const verify = require('../components/verificator/Index');
const message = require('../components/messages/Index');
const generator = require('../components/generator/Index');

const TABLE_ORDERS = 'orders';

module.exports={

    async index(req,res){
        const { id } = req.headers;
        verify.params([id],res);

        try{
            const orders = await connection(TABLE_ORDERS).where({user: id}).select('*').orderBy('date', 'asc');
            verify.response(orders, res);
        }catch(e){ message.serverError(e,res) }    
    },

    async show(req,res){
        const { order_number } = req.params;
        verify.params([order_number], res);
        
        try{

            const order = await connection(TABLE_ORDERS).where({ order_number }).select('*').first('*');
            verify.response(order,res);
        
        }catch(e){ message.serverError(e, res); }
    },

    async storage(req,res){ 

      const { user, address, date, total_price, payment } = req.body;
        verify.params([user, address, date, total_price, payment],res)
        const order_number = generator.key();
        try{
        
            await connection(TABLE_ORDERS).returning('order_number').insert({
              order_number,
              user,
              address,
              date,
              total_price,
              payment
            })
            
            message.storageSuccess(res, order_number);

        }catch(e){ message.serverError(e,res); }  
    }
};