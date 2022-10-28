const connection = require('../database/connection');
const verify = require('../components/verificator/Index');
const message = require('../components/messages/Index');

const TABLE_PRODUCTS = 'products';

module.exports = {

    async updateAmount(req,res){
        
        const { id } = req.params;
        let { amount, operator } = req.body;

        verify.params([id, amount ], res);

        try{

            const tbAmount = await connection(TABLE_PRODUCTS).where({ id }).select('amount').first('amount');
            
            if(operator.match('plus')){
                amount = tbAmount.amount + amount;
            }else if(operator.match('minus')){
                amount = tbAmount.amount - amount;
            }
            await connection(TABLE_PRODUCTS).where({ id }).update({ amount })
            
            message.updateSuccess(res);
            
        }catch(e){ message.serverError(e,res) }    
    },
}