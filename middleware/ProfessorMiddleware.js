// Importa o modelo Professor para verificar se o nome já existe no banco de dados.
const Professor = require('../model/Professor');
// Exporta a classe ProfessorMiddleware, que contém funções de validação para as requisições.
module.exports = class ProfessorMiddleware {
    // Método para validar o nome do professor antes de prosseguir com a criação ou atualização.
    async validar_NomeProfessor(request, response, next) {

        // Recupera o nome do professor enviado no corpo da requisição (request body).
        const nomeProfessor = request.body.professor.nomeProfessor;
        // Verifica se o nome do professor tem menos de 3 caracteres.
        if (nomeProfessor.length < 3) {
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
    // Método assíncrono para verificar se já existe um professor com o mesmo nome cadastrado.
    async isNot_professorByNomeProfessor(request, response, next) {
        // Recupera o nome do professor enviado no corpo da requisição (request body).
        const nomeProfessor = request.body.professor.nomeProfessor;
        // Cria uma nova instância do modelo Professor.
        const objProfessor = new Professor();
        // Define o nome do professor na instância do modelo.
        objProfessor.nomeProfessor = nomeProfessor;
        // Verifica se o professor já existe no banco de dados chamando o método isProfessor().
        const professorExiste = await objProfessor.isProfessorByNomeProfessor();
        // Se o professor já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
        if (professorExiste == false) {
            next(); // Chama o próximo middleware ou rota
        } else {
            const objResposta = {
                status: false,
                msg: "Não é possível cadastrar um professor com o mesmo nome de um professor existente, tente colocar o sobrenome abreviado"
            }
            response.status(400).send(objResposta);
        }
    }
    async isProfessorById(request, response, next) {

        const idProfessor = request.body.idProfessor

        const objProfessor = new Professor();

        const professorExiste = await objProfessor.isProfessorById(idProfessor);

        if (professorExiste == true) {
            next();

        } else {
            const objResposta = {
                status: false,
                msg: "Professor Não Existe"
            }

            response.status(400).send(objResposta);
        }
    }
}
