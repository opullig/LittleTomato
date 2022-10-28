module.exports ={
    
    text(text){
        text = text.trim();
        text = text.replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ@.0-9\s]/g, '');
        return text
    },

    password(password){
        password = password.trim();
        password = password.replace(/\s/g , '');
        return password
    }
}