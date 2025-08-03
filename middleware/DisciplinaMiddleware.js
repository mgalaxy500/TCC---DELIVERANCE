// Importa o modelo Disciplina para verificar se o nome já existe no banco de dados.
const Disciplina = require('../model/Disciplina');
// Exporta a classe DisciplinaMiddleware, que contém funções de validação para as requisições.
module.exports = class DisciplinaMiddleware {
    // Método para validar o nome do disciplina antes de prosseguir com a criação ou atualização.
    async validar_NomeDisciplina(request, response, next) {

        // Recupera o nome do disciplina enviado no corpo da requisição (request body).
        const nomeDisciplina = request.body.disciplina.nomeDisciplina;
        // Verifica se o nome do disciplina tem menos de 3 caracteres.
        if (nomeDisciplina.length < 3) {
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
    // Método assíncrono para verificar se já existe um disciplina com o mesmo nome cadastrado.
    async isNot_disciplinaByNomeDisciplina(request, response, next) {
        // Recupera o nome do disciplina enviado no corpo da requisição (request body).
        const nomeDisciplina = request.body.disciplina.nomeDisciplina;
        // Cria uma nova instância do modelo Disciplina.
        const objDisciplina = new Disciplina();
        // Define o nome do disciplina na instância do modelo.
        objDisciplina.nomeDisciplina = nomeDisciplina;
        // Verifica se o disciplina já existe no banco de dados chamando o método isDisciplina().
        const disciplinaExiste = await objDisciplina.isDisciplinaByNomeDisciplina();
        // Se o disciplina já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
        if (disciplinaExiste == false) {
            next(); // Chama o próximo middleware ou rota
        } else {
            const objResposta = {
                status: false,
                msg: "Não é possível cadastrar um disciplina com o mesmo nome de um disciplina existente"
            }
            response.status(400).send(objResposta);
        }
    }
    async isDisciplinaById(request, response, next) {

        const idDisciplina = request.body.idDisciplina

        const objDisciplina = new Disciplina();

        const disciplinaExiste = await objDisciplina.isDisciplinaById(idDisciplina);

        if (disciplinaExiste == true) {
            next();

        } else {
            const objResposta = {
                status: false,
                msg: "Disciplina Não Existe"
            }

            response.status(400).send(objResposta);
        }
    }
}
