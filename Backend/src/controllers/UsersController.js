const md5 = require ('md5');

const connection = require('../database/connection');
const sanitize = require('../components/sanitize/Index');
const verify = require('../components/verificator/Index');
const generator = require('../components/generator/Index');
const message = require('../components/messages/Index');
const { index, show, toggle } = require('../components/defaultControllers/Index');

const TABLE_USERS = 'users';
const TABLE_PASSWORDS = 'passwords';

module.exports={

    async index(req,res){index(req,res,TABLE_USERS)},
    async show(req,res){show(req,res,TABLE_USERS)},

    async storage(req, res){

        let {name, email, password} = req.body;

        verify.params([name, email, password], res);

        email = sanitize.text(email);
        name = sanitize.text(name);
        password = sanitize.password(password);
        password = md5(password);

        try{
            const userId = generator.key();
            const passId = generator.key();
            
            await verify.duplicity({table: TABLE_USERS, columnName: 'email', param: email}, res);   
            await verify.duplicity({table: TABLE_USERS, columnName: 'id', param: userId}, res);
            await verify.duplicity({table: TABLE_PASSWORDS, columnName: 'id', param: passId}, res);

            await connection(TABLE_USERS).insert({
                id: userId,
                name,
                email
            });

            await connection(TABLE_PASSWORDS).insert({
                id: passId,
                password,
                user: userId,
            });

            message.storageSuccess(res, userId);
        
        }catch(e){message.serverError(e,res)}
    },

    async update(req, res){
        const { id } = req.params
        let { name, email, password} = req.body;
            console.log(req.body)
        
        // if(password && !name){
            // verify.params([id, password],res)

        //     password = sanitize.password(password);
        //     password = md5(password);

        //     try{
        //         await connection(TABLE_PASSWORDS).where({user: id}).update({ password })
        //         message.updateSuccess(res);
        //     }catch(e){message.serverError(e,res)}

        // }else if(name && !password){
        //     verify.params([id, name, email])

        //     name = sanitize.text(name);
        //     email = sanitize.text(email);

        //     try{
        //         await connection(TABLE_USERS).where({id}).update({ name, email })
        //         message.updateSuccess(res);
        //     }catch(e){message.serverError(e,res)}
        
        // }else{
        //     message.badRequest(res);
        // }    
    },

    async toggle(req,res){toggle(req,res,TABLE_USERS)},
};