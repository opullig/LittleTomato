const connection = require('../database/connection');
const verify = require('../components/verificator/Index');
const message = require('../components/messages/Index');

const TABLE_SYSTEM_LOG = 'system_log';

module.exports ={ 
   async index(req, res){
        try{
            const result = await connection(TABLE_SYSTEM_LOG).select('*').orderBy('date', 'desc');
            verify.response(result, res);
        }catch(e){ message.serverError(e, res); }
    },
    async storage(req, res){
        const { access_key, date, occurence} = req.body;
        verify.params([access_key, date, occurence],res)
        
        try{
            const result = await connection(TABLE_SYSTEM_LOG).returning('id').insert({
                access_key,
                date,
                occurence
            });
            
            message.storageSuccess(res,result);

        }catch(e){ message.serverError(e, res); }
    },
}