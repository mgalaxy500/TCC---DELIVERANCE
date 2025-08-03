// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');

// Define a classe Professor para representar a entidade Professor.
class Professor {
    // Construtor da classe Professor que inicializa as propriedades.
    constructor() {
        this._idProfessor = null;  // ID do professor, inicialmente nulo.
        this._nomeProfessor = null;  // Nome do professor, inicialmente uma string vazia.
        this._disciplinaProfessor
    }

    // Método assíncrono para criar um novo professor no banco de dados.
    async create() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'INSERT INTO professor (nomeProfessor) VALUES (?);';  // Query SQL para inserir o nome do professor.

        try {
            const [result] = await conexao.promise().execute(SQL, [this._nomeProfessor, this._disciplinaProfessor]);  // Executa a query.
            this._idProfessor = result.insertId;  // Armazena o ID gerado pelo banco de dados.
            return result.affectedRows > 0;  // Retorna true se a inserção afetou alguma linha.
        } catch (error) {
            console.error('Erro ao criar o professor:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para excluir um professor do banco de dados.
    async delete() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'DELETE FROM professor WHERE idProfessor = ?;';  // Query SQL para deletar um professor pelo ID.

        try {
            const [result] = await conexao.promise().execute(SQL, [this._idProfessor]);  // Executa a query de exclusão.
            return result.affectedRows > 0;  // Retorna true se alguma linha foi afetada (professor deletado).
        } catch (error) {
            console.error('Erro ao excluir o professor:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para atualizar os dados de um professor no banco de dados.
    async update() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'UPDATE professor SET nomeProfessor = ? WHERE idProfessor = ?;';  // Query SQL para atualizar o nome de um professor.

        try {
            const [result] = await conexao.promise().execute(SQL, [this._nomeProfessor, this._idProfessor]);  // Executa a query de atualização.
            return result.affectedRows > 0;  // Retorna true se a atualização afetou alguma linha.
        } catch (error) {
            console.error('Erro ao atualizar o professor:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para verificar se um professor já existe no banco de dados.
    async isProfessorByNomeProfessor() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT COUNT(*) AS qtd FROM professor WHERE nomeProfessor = ?;';  // Query SQL para contar professors com o mesmo nome.

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._nomeProfessor]);  // Executa a query.
            return rows[0].qtd > 0;  // Retorna true se houver algum professor com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o professor:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    async isProfessorById(idProfessor) {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT COUNT(*) AS qtd FROM professor WHERE idProfessor = ?;';  // Query SQL para contar professors com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [idProfessor]);  // Executa a query.
            return rows[0].qtd > 0;  // Retorna true se houver algum professor com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o professor:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para ler todos os professors do banco de dados.
    async readAll() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT * FROM professor ORDER BY nomeProfessor;';  // Query SQL para selecionar todos os professors ordenados pelo nome.

        try {
            const [rows] = await conexao.promise().execute(SQL);  // Executa a query de seleção.
            return rows;  // Retorna a lista de professors.
        } catch (error) {
            console.error('Erro ao ler professores:', error);  // Exibe erro no console se houver falha.
            return [];  // Retorna uma lista vazia caso ocorra um erro.
        }
    }

    // Método assíncrono para ler um professor pelo seu ID.
    async readByID() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT * FROM professor WHERE idProfessor = ?;';  // Query SQL para selecionar um professor pelo ID.

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idProfessor]);  // Executa a query de seleção.
            return rows;  // Retorna o professor correspondente ao ID.
        } catch (error) {
            console.error('Erro ao ler professor pelo ID:', error);  // Exibe erro no console se houver falha.
            return null;  // Retorna null caso ocorra um erro.
        }
    }

    static async createByJSON(professorsJSON) {
        const conexao = Banco.getConexao();
        const professorsCriados = []; // Array para armazenar o resultado de cada criação

        for (const professorData of professorsJSON) {
            if (professorData.nomeProfessor && professorData.nomeProfessor.length > 5) {
                const professor = new Professor();
                professor.nomeProfessor = professorData.nomeProfessor.trim();

                try {
                    const SQL = 'INSERT INTO professor (nomeProfessor) VALUES (?);';
                    const [result] = await conexao.promise().execute(SQL, [professor.nomeProfessor, professor.disciplinaProfessor]);
                    
                    if (result.affectedRows > 0) {
                        professor._idProfessor = result.insertId;
                        professorsCriados.push({ nomeProfessor: professor.nomeProfessor, idProfessor: professor._idProfessor });
                    } else {
                        console.error(`Falha ao criar o professor: ${professor.nomeProfessor}`);
                    }
                } catch (error) {
                    console.error(`Erro ao criar o professor ${professor.nomeProfessor}:`, error);
                }
            }
        }

        return professorsCriados; // Retorna a lista dos professors criados com sucesso
    }

    // Getter para obter o valor de idProfessor.
    get idProfessor() {
        return this._idProfessor;
    }

    // Setter para definir o valor de idProfessor.
    set idProfessor(idProfessor) {
        this._idProfessor = idProfessor;
        return this;  // Retorna a instância atual para permitir encadeamento de chamadas.
    }

    // Getter para obter o valor de nomeProfessor.
    get nomeProfessor() {
        return this._nomeProfessor;
    }

    // Setter para definir o valor de nomeProfessor.
    set nomeProfessor(nomeProfessor) {
        this._nomeProfessor = nomeProfessor;
        return this;  // Retorna a instância atual para permitir encadeamento de chamadas.
    }
}

// Exporta a classe Professor para que possa ser utilizada em outros módulos.
module.exports = Professor;
