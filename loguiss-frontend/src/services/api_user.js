import axios from 'axios'; //biblioteca usada para facilitar a comunicação

const api = axios.create({ //create por estar criando uma conexão com o servidor
    baseURL: 'http://localhost:3000/user' // endereço que o backEnd fica(o endpoint vai ser passado depois)
});

export default api // sempre lembrar de exportar