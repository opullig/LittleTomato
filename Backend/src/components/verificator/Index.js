const message = require('../messages/Index')
const connection = require('../../database/connection');


function exists(params = [], response){
    console.log(params)
    // params.map(item => {
    //     if(item == null || item == 'undefined')
    //         return response.status(400).json({message: `Parâmetro Inexistente`})
    // });
}

function hasValue(params = [], response){
    params.map(item => {
        if(item == '')
            return response.status(400).json({message: `Parâmetro Vazio`})
    });
}

module.exports ={

   async duplicity({table, columnName, param}, response){

        try{
            const data = await connection(table).where(`${columnName}`, param).select(columnName).first(columnName);
            if(data != null)
                message.duplicatedData(response);
        }catch(e){message.serverError(e,res)}
               
    },

    response(data, response){   
        if(data != null){
            return response.json(data);
        }else{
            return response.json({message: 'Não há dados a serem exibidos'})
        }
    },

    params(params = [],response){
        exists(params, response);
        hasValue(params, response);
    },

    

}