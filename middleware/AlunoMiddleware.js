// Importa o modelo Aluno para verificar se o nome já existe no banco de dados.
const Aluno = require('../model/Aluno');
// Exporta a classe AlunoMiddleware, que contém funções de validação para as requisições.
module.exports = class AlunoMiddleware {
    // Método para validar o nome do aluno antes de prosseguir com a criação ou atualização.
    async validar_MatriculaAluno(request, response, next) {

        // Recupera o nome do aluno enviado no corpo da requisição (request body).
        const matriculaAluno = request.body.aluno.matriculaAluno;
        // Verifica se o nome do aluno tem menos de 3 caracteres.
        if (matriculaAluno.length !== 8) {
            // Se o nome for inválido, cria um objeto de resposta com o status falso e a mensagem de erro.
            const objResposta = {
                status: false,
                msg: "A matricula deve ter deve ter 8"
            }
            // Envia a resposta com status HTTP 400 e a mensagem de erro.
            response.status(400).send(objResposta);
        } else {
            // Caso o nome seja válido, chama o próximo middleware ou a rota definida.
            next(); // Chama o próximo middleware ou rota
        }
    }
    // Método assíncrono para verificar se já existe um aluno com o mesmo nome cadastrado.
    async isNot_alunoByMatriculaAluno(request, response, next) {
        // Recupera o nome do aluno enviado no corpo da requisição (request body).
        const matriculaAluno = request.body.aluno.matriculaAluno;
        // Cria uma nova instância do modelo Aluno.
        const objAluno = new Aluno();
        // Define o nome do aluno na instância do modelo.
        objAluno.matriculaAluno = matriculaAluno;
        // Verifica se o aluno já existe no banco de dados chamando o método isAluno().
        const alunoExiste = await objAluno.isAlunoByNomeAluno();
        // Se o aluno já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
        if (alunoExiste == false) {
            next(); // Chama o próximo middleware ou rota
        } else {
            const objResposta = {
                status: false,
                msg: "Não é possível cadastrar um aluno com a mesma matricula de um aluno existente"
            }
            response.status(400).send(objResposta);
        }
    }
    async isAlunoById(request, response, next) {

        const idAluno = request.body.idAluno

        const objAluno = new Aluno();

        const alunoExiste = await objAluno.isAlunoById(idAluno);

        if (alunoExiste == true) {
            next();

        } else {
            const objResposta = {
                status: false,
                msg: "Aluno Não Existe"
            }

            response.status(400).send(objResposta);
        }
    }
}
