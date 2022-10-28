const connection = require('../database/connection');
const verify = require('../components/verificator/Index');
const message = require('../components/messages/Index');
const generator = require('../components/generator/Index');

const TABLE_RECORDS = 'records';

module.exports={
    async index(req,res){
        try{

            const result = await connection(TABLE_RECORDS).select('*').orderBy('date', 'asc');
            verify.response(result, res);
        
        }catch(e){ message.serverError(e, res) }
    },

    async show(req,res){
        const{ record_number } = req.params;
        verify.params([record_number], res);

        try{

            const result = await connection(TABLE_RECORDS).where({ record_number }).select('*').first('*');
            verify.response(result, res);
        
        }catch(e){ message.serverError(e, res) }
    },

    async storage(req,res){
        const { access_key} = req.headers
        const { date } = req.body;
        verify.params([access_key, date], res);
        
        try{
           const record_number = generator.key();
           
            const result = await connection(TABLE_RECORDS).returning('record_number').insert({
                record_number,
                access_key,
                date
            });
            
            message.storageSuccess(res, result);
       
        }catch(e){ message.serverError(e, res) }
    },

    async upate(req,res){
        const {record_number} = req.params;
        const { status } = req.body;
        verify.params([record_number, status], res);

        try{

            await connection(TABLE_RECORDS).where({ record_number }).update({status});
            message.updateSuccess(res);
        
        }catch(e){ message.serverError(e, res) }
    }
};