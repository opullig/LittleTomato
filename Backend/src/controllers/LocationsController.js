const connection = require('../database/connection');
const verify = require('../components/verificator/Index');
const message = require('../components/messages/Index');
const sanitize = require('../components/sanitize/Index');

const TABLE_LOCATIONS = 'locations';

module.exports = {

    async index(req,res){
        const { id } = req.headers;
        verify.params([id], res);

        try{
            const locations = await connection(TABLE_LOCATIONS).where({user: id}).select('*').orderBy('address','asc');
            verify.response(locations,res);

        }catch(e){message.serverError(e,res)}
    },

    async show(req, res){
        const { id } = req.params;
        verify.params([id],res)
        
        try{
            const location = await connection(TABLE_LOCATIONS).where({id}).select('*').first('*');
            verify.response(location,res);

        }catch(e){message.serverError(e,res)}
    },

    async storage(req,res){
        let { user, address, complement, city } = req.body;
        
        verify.params([user, address, complement, city], res);
        
        address = sanitize.text(address);
        complement = sanitize.text(complement);
        city = sanitize.text(city);

        try{
            const id = await connection(TABLE_LOCATIONS).returning('id').insert({
                address,
                complement,
                user,
                city
            })
            message.storageSuccess(res, id);
        }catch(e){message.serverError(e,res)}
    },

    async update(req, res){
        const { id } = req.params;
        let { address, complement, city } = req.body;
        verify.params([id, address, complement, city], res);

        address = sanitize.text(address);
        complement = sanitize.text(complement);
        city = sanitize.text(city);
        
        try{
            await connection(TABLE_LOCATIONS).where({ id }).update({
                address,
                complement,
                city
            })
            message.updateSuccess(res);

        }catch(e){message.serverError(e, res);}
    },

    async delete(req, res){
        const { id } = req.params;
        verify.params([id], res);

        try{
            await connection(TABLE_LOCATIONS).where({ id }).delete();
            message.ok(res);
            
        }catch(e){ message.serverError(e,res) }
    }
};