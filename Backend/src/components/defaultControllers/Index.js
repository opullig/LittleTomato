const connection = require('../../database/connection');
const verify = require('../../components/verificator/Index');
const message = require('../../components/messages/Index');

module.exports ={
    
    async index(req, res, table){
        try{
            const data = await connection(table).select('*');
            verify.response(data, res);
        }catch(e){message.serverError(e,res);}
    },

    async show(req, res, table){
        const {id} = req.params;
        verify.params([id], res);
        
        try{
            const data = await connection(table).where({ id }).select('*').first('*');
            verify.response(data, res);

        }catch(e){message.serverError(e,res);}
    },

    async toggle(req, res, table){
        const { access_key } = req.headers;
        const { id }  = req.body;

        verify.params([access_key, id], res);

        try{

            let { status }  =   await connection(table).where({id}).select('status').first('status');
            
            status == 1 ? status = 0 : status = 1;
            
            await connection(table).where({id}).update({status})
            message.updateSuccess(res);
        
        }catch(e){message.serverError(e,res)}
       }
}