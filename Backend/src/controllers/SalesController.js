const connection = require('../database/connection');
const message = require('../components/messages/Index');

const TABLE_SALES = 'sales';

module.exports = {
    
    async index(req,res){
        const sales = await connection(TABLE_SALES).select(['name','date','amount']);
        return res.json(sales);
    },

    async storage(req,res){
        const {name, amount, date} = req.body;

        try{
            
            await connection(TABLE_SALES).insert({
                name,
                amount,
                date,
            })
            
            message.storageSuccess(res);
            
        }catch(e){ message.serverError(e,res) }    

    }
}