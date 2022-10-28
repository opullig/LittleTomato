module.exports = {
    
    serverError(error, response){
        return response.status(500).json({message: 'Ocorreu um erro de conexão com o servidor', error})
    },

    updateSuccess(response){
        return response.status(201).json({message: 'Atualização concluída com sucesso.'});
    },

    storageSuccess(response, data = ''){
        return response.status(201).json({message: 'Inclusão realizada com sucesso.', data});
    },

    duplicatedData(response){
        return response.status(400).json({message: 'Não é permitido cadastro Duplicado'})
    },

    ok(response){
        return response.status(200).json({message: 'Remoção realizada com sucesso.'});
    },

    badRequest(response){
        return response.status(400).json({message: 'Houve um problema na requisição'})
    }
};