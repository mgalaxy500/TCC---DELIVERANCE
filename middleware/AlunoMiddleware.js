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
                msg: "A matricula deve ter deve ter 8 caracteres"
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
        // Recupera a matrícula do aluno enviado no corpo da requisição
        try {
            const matriculaAluno = request.body.aluno?.matriculaAluno;

            if (!matriculaAluno) {
                return response.status(400).send({
                    status: false,
                    msg: "Matrícula do aluno não informada."
                });
            }

            // Cria uma nova instância do modelo Aluno
            const objAluno = new Aluno();
            objAluno.matriculaAluno = matriculaAluno;

            // Chama um método que verifica se a matrícula já existe
            const alunoExiste = await objAluno.isAlunoByMatricula(matriculaAluno);

            if (alunoExiste) {
                // Se a matrícula já existe, retorna erro
                return response.status(400).send({
                    status: false,
                    msg: "Não é possível cadastrar um aluno com a mesma matrícula de um aluno existente."
                });
            }

            // Se não existe, segue para o próximo middleware
                    next();
        } 
            
        catch (err) {
            console.error("Erro interno:", err);
            return response.status(500).send({
                status: false,
                msg: "Erro interno ao verificar matrícula do aluno."
            });
        }
    }
}
