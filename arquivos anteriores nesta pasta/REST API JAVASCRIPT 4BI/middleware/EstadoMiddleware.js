// Importa o modelo Estado para verificar se o nome já existe no banco de dados.
const Estado = require('../model/Estado');
// Exporta a classe EstadoMiddleware, que contém funções de validação para as requisições.
module.exports = class EstadoMiddleware {
    // Método para validar o nome do estado antes de prosseguir com a criação ou atualização.
    async validar_NomeEstado(request, response, next) {

        // Recupera o nome do estado enviado no corpo da requisição (request body).
        const nomeEstado = request.body.estado.nomeEstado;
        // Verifica se o nome do estado tem menos de 3 caracteres.
        if (nomeEstado.length < 3) {
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
    // Método assíncrono para verificar se já existe um estado com o mesmo nome cadastrado.
    async isNot_estadoByNomeEstado(request, response, next) {
        // Recupera o nome do estado enviado no corpo da requisição (request body).
        const nomeEstado = request.body.estado.nomeEstado;
        // Cria uma nova instância do modelo Estado.
        const objEstado = new Estado();
        // Define o nome do estado na instância do modelo.
        objEstado.nomeEstado = nomeEstado;
        // Verifica se o estado já existe no banco de dados chamando o método isEstado().
        const estadoExiste = await objEstado.isEstadoByNomeEstado();
        // Se o estado já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
        if (estadoExiste == false) {
            next(); // Chama o próximo middleware ou rota
        } else {
            const objResposta = {
                status: false,
                msg: "Não é possível cadastrar um estado com o mesmo nome de um estado existente"
            }
            response.status(400).send(objResposta);
        }
    }
    async isEstadoById(request, response, next) {

        const idEstado = request.body.idEstado

        const objEstado = new Estado();

        const estadoExiste = await objEstado.isEstadoById(idEstado);

        if (estadoExiste == true) {
            next();

        } else {
            const objResposta = {
                status: false,
                msg: "Estado Não Existe"
            }

            response.status(400).send(objResposta);
        }
    }
}
