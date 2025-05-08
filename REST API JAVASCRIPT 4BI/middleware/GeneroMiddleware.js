// Importa o modelo Genero para verificar se o nome já existe no banco de dados.
const Genero = require('../model/Genero');
// Exporta a classe GeneroMiddleware, que contém funções de validação para as requisições.
module.exports = class GeneroMiddleware {
    // Método para validar o nome do genero antes de prosseguir com a criação ou atualização.
    async validar_NomeGenero(request, response, next) {

        // Recupera o nome do genero enviado no corpo da requisição (request body).
        const nomeGenero = request.body.genero.nomeGenero;
        // Verifica se o nome do genero tem menos de 3 caracteres.
        if (nomeGenero.length < 3) {
            // Se o nome for inválido, cria um objeto de resposta com o status falso e a mensagem de erro.
            const objResposta = {
                status: false,
                msg: "O nome deve ter mais do que 3 letras"
            }
            // Envia a resposta com status HTTP 400 e a mensagem de erro.
            response.status(400).send(objResposta);
        } else {
            // Caso o nome seja válido, chama o próximo middleware ou a rota definida.
            next(); // Chama o próximo middleware ou rota
        }
    }
    // Método assíncrono para verificar se já existe um genero com o mesmo nome cadastrado.
    async isNot_generoByNomeGenero(request, response, next) {
        // Recupera o nome do genero enviado no corpo da requisição (request body).
        const nomeGenero = request.body.genero.nomeGenero;
        // Cria uma nova instância do modelo Genero.
        const objGenero = new Genero();
        // Define o nome do genero na instância do modelo.
        objGenero.nomeGenero = nomeGenero;
        // Verifica se o genero já existe no banco de dados chamando o método isGenero().
        const generoExiste = await objGenero.isGeneroByNomeGenero();
        // Se o genero já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
        if (generoExiste == false) {
            next(); // Chama o próximo middleware ou rota
        } else {
            const objResposta = {
                status: false,
                msg: "Não é possível cadastrar um genero com o mesmo nome de um genero existente"
            }
            response.status(400).send(objResposta);
        }
    }
    async isGeneroById(request, response, next) {

        const idGenero = request.body.idGenero

        const objGenero = new Genero();

        const generoExiste = await objGenero.isGeneroById(idGenero);

        if (generoExiste == true) {
            next();

        } else {
            const objResposta = {
                status: false,
                msg: "Genero Não Existe"
            }

            response.status(400).send(objResposta);
        }
    }
}
