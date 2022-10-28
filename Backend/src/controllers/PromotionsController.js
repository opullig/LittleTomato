const connection = require('../database/connection');
const verify = require('../components/verificator/Index');
const message = require('../components/messages/Index');

const { index } = require('../components/defaultControllers/Index');

const TABLE_PROMOTIONS = 'promotions';

module.exports = {

    async index(req, res){ index(req,res,TABLE_PROMOTIONS) },

    async show(req, res){
        const { id } = req.params;
        verify.params([id], res)
        
        try{
            const result = await connection(TABLE_PROMOTIONS).where({ product: id }).select('*');
            verify.response(result, res)
        
        }catch(e){ message.serverError(e,res) }
    },

    async storage(req, res){
        const {product, price_off} = req.body;
        verify.params([product, price_off], res);
        verify.duplicity({table: TABLE_PROMOTIONS, columnName: 'product', param:product}, res);
        
        try{

            const result = await connection(TABLE_PROMOTIONS).returning('id').insert({
                product,
                price_off
            });

            message.storageSuccess(res, result);

        }catch(e){ message.serverError(e, res) }

    },

    async update(req, res){
        const { id } = req.params;
        const { price_off } = req.body;
        verify.params([id, price_off],res)        

        try{

            await connection(TABLE_PROMOTIONS).where({product: id}).update({price_off});
            message.updateSuccess(res);

        }catch(e){ message.serverError(e, res) }

    },
    
    async delete(req, res){
        const { id } = req.params;
        verify.params([id], res);
                
        try{
            await connection(TABLE_PROMOTIONS).where({ product: id }).delete();
            message.ok(res);
        }catch(e){ message.serverError(e, res) }
    }

}