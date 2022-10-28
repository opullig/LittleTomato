const connection = require('../database/connection');
const verify = require('../components/verificator/Index');
const sanitize = require('../components/sanitize/Index');
const message = require('../components/messages/Index');
const { toggle } = require('../components/defaultControllers/Index')

const TABLE_PRODUCTS = 'products';
const TABLE_PROMOTIONS = 'promotions'

async function hasPromotion(columns = {}){
    const result = await connection(TABLE_PROMOTIONS).where(columns).select('price_off').first('price_off');
    return result;
}


module.exports ={

    async index(req, res){
        try{

            let products = await connection(TABLE_PRODUCTS).select('*').orderBy('name', 'asc');
            const promotions = await connection(TABLE_PROMOTIONS).select('product','price_off');
            
            if(promotions.length != 0){
                products.map(product => {
                    promotions.map(promotion => {
                        if(product.id == promotion.product)
                            product.price_off = promotion.price_off;
                    })
                });
            }
            verify.response(products, res);
            
        }catch(e){ message.serverError(e,res) }
    },

    async show(req,res){
        const { id } = req.params;
        verify.params([id], res);

        try{

            let product = await connection(TABLE_PRODUCTS).where({ id }).select('*').first('*');
            const promotion = hasPromotion({id, status: true}); 

            if(promotion == null)
                verify.response(product,res);
                
            product.price_off = promotion.price_off;
            verify.response(product,res);         
        
        }catch(e){ message.serverError(e,res) }
    },

    async storage(req,res){
        let { name, description, price, category } = req.body;
        verify.params([name, description, price, category], res);

        name = sanitize.text(name);
        description = sanitize.text(description);        
        price = price.replace(/[^,.0-9\s]/g, '')
        price = price.replace(/[,\s]/g,'.');

        try{

            verify.duplicity({table: TABLE_PRODUCTS,columnName: 'name', param: name},res);
            
            const id = await connection(TABLE_PRODUCTS).returning('id').insert({
                name,
                description,
                price,
                category
            })
            message.storageSuccess(res, id);
        
        }catch(e){ message.serverError(e,res) }
    },

    async update(req,res){
        const { id } = req.params;
        let { name, description, price, category } = req.body;

        verify.params([id, name, description, price, category], res);

        name = sanitize.text(name);
        description = sanitize.text(description);
        price = price.replace(/[^,.0-9\s]/g, '')
        price = price.replace(/[,\s]/g,'.');
        
        try{

            await connection(TABLE_PRODUCTS).where({ id }).update({
                name,
                description,
                price,
                category
            })
            
            message.updateSuccess(res);

        }catch(e){ message.serverError(e,res) }    
    },

    async toggle(req,res){ toggle(req,res,TABLE_PRODUCTS) }

}