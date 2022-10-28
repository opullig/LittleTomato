const connection = require('../database/connection');
const generator = require('../components/generator/Index');
const verify = require('../components/verificator/Index');
const message = require('../components/messages/Index');

const { index, show } = require('../components/defaultControllers/Index');

const TABLE_PROFESSIONALS = 'professionals';

module.exports = {

    async index(req, res){ index(req, res, TABLE_PROFESSIONALS) },

    async show(req, res){ 
        const {id} = req.params;
        verify.params([id], res);
        
        try{
            const data = await connection(TABLE_PROFESSIONALS).where({ user: id }).select('*').first('*');
            verify.response(data, res);

        }catch(e){message.serverError(e,res);}
     },

    async storage(req, res){
        const { user } = req.headers;
        const access_key = generator.key();
        verify.params([user, access_key], res);

        try{
            verify.duplicity({table: TABLE_PROFESSIONALS, columnName: 'user', param: user}, res);
                        
            await connection(TABLE_PROFESSIONALS).insert({
                access_key,
                user
            });
            
            message.storageSuccess(res);
        
        }catch(e){ message.serverError(e, res) }
    },

    async delete(req, res){
        const {id} = req.params;
        verify.params([id], res);
        
        try{
            await connection(TABLE_PROFESSIONALS).where({ user: id }).delete();
            message.ok(res);

        }catch(e){ message.serverError(e, res) }
    },
};