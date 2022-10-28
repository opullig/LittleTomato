const connection = require('../database/connection');
const verify = require('../components/verificator/Index');
const message = require('../components/messages/Index');

const TABLE_RECORD_ITEMS = 'record_items'
module.exports = {
    
    async index(req,res){
        const { record_number } = req.params; 
       verify.params([record_number], res);
        
       try{

            const result = await connection(TABLE_RECORD_ITEMS).where({ record_number }).select('*').orderBy('id', 'asc');
            verify.response(result, res);
        
        }catch(e){ message.serverError(e, res) }
    },

    async storage(req,res){
        const { product, amount, record_number} = req.body;
        verify.params([product, amount, record_number], res)
        
        try{

            const result = await connection(TABLE_RECORD_ITEMS).returning('id').insert({
                product,
                amount,
                record_number
            });
            message.storageSuccess(res, result);
        
        }catch(e){ message.serverError(e, res) }
    },

    async delete(req,res){
        const { id } = req.params;

        verify.params([id], res);
            
        try{

            await connection(TABLE_RECORD_ITEMS).where({ id }).delete();
            message.ok(res);   
        
        }catch(e){ message.serverError(e, res) }
    }
}