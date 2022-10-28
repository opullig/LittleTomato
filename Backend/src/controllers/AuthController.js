const connection = require('../database/connection');
const verify = require('../components/verificator/Index');
const sanitize = require('../components/sanitize/Index');
const message = require('../components/messages/Index');
const md5 = require('md5');

const TABLE_USERS = 'users';
const TABLE_PROFESSIONALS = 'professionals';
const TABLE_PASSWORDS = 'passwords';

module.exports={
    async auth(req, res){
        let {email, password} = req.headers;
        verify.params([email, password], res);
        
        email = sanitize.text(email);
        password = sanitize.password(password);
        password = md5(password);
        
        try{
            const user = await connection(TABLE_USERS).where({email}).select('id', 'name').first('id', 'name');        
            const tbPassword = await connection(TABLE_PASSWORDS).where({user: user.id, password}).select('*').first('*');
            
            verify.params([user], res);
            verify.params([tbPassword], res);
                        
            const professional = await connection(TABLE_PROFESSIONALS).where({user: user.id}).select('access_key').first('access_key');    
            
            if(professional != null)
                user.access_key = professional.access_key;
            
            verify.response(user, res);
            
        }catch(e){ message.serverError(e,res); }
    }
}