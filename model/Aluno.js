// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');
// Define a classe Aluno para representar a entidade Aluno.
class Aluno {
    // Construtor da classe Aluno que inicializa as propriedades.
    constructor() {
        this._idAluno = null;  // ID do aluno, inicialmente nulo.
        this._nomeAluno = null;  // Nome do aluno, inicialmente uma string vazia.
        this._matriculaAluno = null;
        this._turmaAluno = null;
    }

    // Método assíncrono para criar um novo aluno no banco de dados.
    async create() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'INSERT INTO aluno (nomeAluno, matriculaAluno, turmaAluno) VALUES (?, ?, ?);';  // Query SQL para inserir o nome do aluno.

        try {
            const [result] = await conexao.promise().execute(SQL, [this._nomeAluno, this._matriculaAluno, this._turmaAluno]);  // Executa a query.
            this._idAluno = result.insertId;  // Armazena o ID gerado pelo banco de dados.
            return result.affectedRows > 0;  // Retorna true se a inserção afetou alguma linha.
        } catch (error) {
            console.error('Erro ao criar o aluno:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    static async createByJSON(alunosJSON) {
        const conexao = Banco.getConexao();
        const alunosCriados = []; // Array para armazenar o resultado de cada criação

        for (const alunoData of alunosJSON) {
            if (alunoData.nomeAluno && alunoData.nomeAluno.length > 5) {
                const aluno = new Aluno();
                aluno.nomeAluno = alunoData.nomeAluno.trim();
                aluno.matriculaAluno = alunoData.matriculaAluno.trim();
                aluno.turmaAluno = alunoData.turmaAluno.trim();
                

                try {
                    const SQL = 'INSERT INTO aluno (nomeAluno, matriculaAluno, turmaAluno) VALUES (?, ?, ?);';
                    const [result] = await conexao.promise().execute(SQL, [aluno.nomeAluno, aluno.matriculaAluno, aluno.turmaAluno]);
                    
                    if (result.affectedRows > 0) {
                        aluno._idAluno = result.insertId;
                        alunosCriados.push({ nomeAluno: aluno.nomeAluno, matriculaaluno : aluno.matriculaAluno, alunoAluno: aluno.turmaAluno,  idAluno: aluno._idAluno });
                    } else {
                        console.error(`Falha ao criar o aluno: ${aluno.nomeAluno}`);
                    }
                } catch (error) {
                    console.error(`Erro ao criar o aluno ${aluno.nomeAluno}:`, error);
                }
            }
        }

        return alunosCriados; // Retorna a lista dos alunos criados com sucesso
    }
    
    // Método assíncrono para excluir um aluno do banco de dados.
    async delete() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'DELETE FROM aluno WHERE idAluno = ?;';  // Query SQL para deletar um aluno pelo ID.

        try {
            const [result] = await conexao.promise().execute(SQL, [this._idAluno]);  // Executa a query de exclusão.
            return result.affectedRows > 0;  // Retorna true se alguma linha foi afetada (aluno deletado).
        } catch (error) {
            console.error('Erro ao excluir o aluno:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para atualizar os dados de um aluno no banco de dados.
    async update() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'UPDATE aluno SET nomeAluno = ?, matriculaAluno = ?, turmaAluno = ? WHERE idAluno = ?;';
        

        try {
            const [result] = await conexao.promise().execute(SQL, [
            this._nomeAluno,
            this._matriculaAluno,
            this._turmaAluno,
            this._idAluno
        ]); // Executa a query de atualização.
            return result.affectedRows > 0;  // Retorna true se a atualização afetou alguma linha.
        } catch (error) {
            console.error('Erro ao atualizar o aluno:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para verificar se um aluno já existe no banco de dados.
    async isAlunoByNomeAluno() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT COUNT(*) AS qtd FROM aluno WHERE nomeAluno = ?;';  // Query SQL para contar alunos com o mesmo nome.

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._nomeAluno]);  // Executa a query.
            return rows[0].qtd > 0;  // Retorna true se houver algum aluno com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o aluno:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    async isAlunoById(idAluno) {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT COUNT(*) AS qtd FROM aluno WHERE idAluno = ?;';  // Query SQL para contar alunos com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [idAluno]);  // Executa a query.
            return rows[0].qtd > 0;  // Retorna true se houver algum aluno com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o aluno:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para ler todos os alunos do banco de dados.
    async readAll() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT * FROM aluno ORDER BY nomeAluno;';  // Query SQL para selecionar todos os alunos ordenados pelo nome.

        try {
            const [rows] = await conexao.promise().execute(SQL);  // Executa a query de seleção.
            return rows;  // Retorna a lista de alunos.
        } catch (error) {
            console.error('Erro ao ler alunos:', error);  // Exibe erro no console se houver falha.
            return [];  // Retorna uma lista vazia caso ocorra um erro.
        }
    }

    // Método assíncrono para ler um aluno pelo seu ID.
    async readByID() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT * FROM aluno WHERE idAluno = ?;';  // Query SQL para selecionar um aluno pelo ID.

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idAluno]);  // Executa a query de seleção.
            return rows;  // Retorna o aluno correspondente ao ID.
        } catch (error) {
            console.error('Erro ao ler aluno pelo ID:', error);  // Exibe erro no console se houver falha.
            return null;  // Retorna null caso ocorra um erro.
        }
    }

    // Getter para obter o valor de idAluno.
    get idAluno() {
        return this._idAluno;
    }

    // Setter para definir o valor de idAluno.
    set idAluno(idAluno) {
        this._idAluno = idAluno;
        return this;  // Retorna a instância atual para permitir encadeamento de chamadas.
    }

    // Getter para obter o valor de nomeAluno.
    get nomeAluno() {
        return this._nomeAluno;
    }

    // Setter para definir o valor de nomeAluno.
    set nomeAluno(nomeAluno) {
        this._nomeAluno = nomeAluno;
        return this;  // Retorna a instância atual para permitir encadeamento de chamadas.
    }

    get turmaAluno() {
        return this._turmaAluno;
    }

    set turmaAluno(turmaAluno) {
        this._turmaAluno = turmaAluno;
        return this;  // Retorna a instância atual para permitir encadeamento de chamadas.
    }

    get matriculaAluno() {
        return this._matriculaAluno;
    }

    // Setter para definir o valor de nomeAluno.
    set matriculaAluno(matriculaAluno) {
        this._matriculaAluno = matriculaAluno;
        return this;  // Retorna a instância atual para permitir encadeamento de chamadas.
    }
}

// Exporta a classe Aluno para que possa ser utilizada em outros módulos.
module.exports = Aluno;
