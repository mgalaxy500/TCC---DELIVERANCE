// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');
const Professor = require('./Professor');
// Define a classe Disciplina para representar a entidade Disciplina.
class Disciplina {
    // Construtor da classe Disciplina que inicializa as propriedades.
    constructor() {
        this._idDisciplina = null;  // ID do disciplina, inicialmente nulo.
        this._nomeDisciplina = null;  // Nome do disciplina, inicialmente uma string vazia.
        this._professor = new Professor()
    }

    // Método assíncrono para criar um novo disciplina no banco de dados.
    async create() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'INSERT INTO disciplina (nomeDisciplina, turmaDisciplina) VALUES (?, ?);';  // Query SQL para inserir o nome do disciplina.

        try {
            const [result] = await conexao.promise().execute(SQL, [this._nomeDisciplina, this._turmaDisciplina]);  // Executa a query.
            this._idDisciplina = result.insertId;  // Armazena o ID gerado pelo banco de dados.
            return result.affectedRows > 0;  // Retorna true se a inserção afetou alguma linha.
        } catch (error) {
            console.error('Erro ao criar o disciplina:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    static async createByJSON(disciplinasJSON) {
        const conexao = Banco.getConexao();
        const disciplinasCriados = []; // Array para armazenar o resultado de cada criação

        for (const disciplinaData of disciplinasJSON) {
            if (disciplinaData.nomeDisciplina && disciplinaData.nomeDisciplina.length > 5) {
                const disciplina = new Disciplina();
                disciplina.nomeDisciplina = disciplinaData.nomeDisciplina.trim();

                try {
                    const SQL = 'INSERT INTO disciplina (nomeDisciplina, turmaDisciplina) VALUES (?, ?);';
                    const [result] = await conexao.promise().execute(SQL, [disciplina.nomeDisciplina, disciplina.turmaDisciplina]);
                    
                    if (result.affectedRows > 0) {
                        disciplina._idDisciplina = result.insertId;
                        disciplinasCriados.push({ nomeDisciplina: disciplina.nomeDisciplina, turmaDisciplina: disciplina.turmaDisciplina,  idDisciplina: disciplina._idDisciplina });
                    } else {
                        console.error(`Falha ao criar o disciplina: ${disciplina.nomeDisciplina}`);
                    }
                } catch (error) {
                    console.error(`Erro ao criar o disciplina ${disciplina.nomeDisciplina}:`, error);
                }
            }
        }

        return disciplinasCriados; // Retorna a lista dos disciplinas criados com sucesso
    }
    
    // Método assíncrono para excluir um disciplina do banco de dados.
    async delete() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'DELETE FROM disciplina WHERE idDisciplina = ?;';  // Query SQL para deletar um disciplina pelo ID.

        try {
            const [result] = await conexao.promise().execute(SQL, [this._idDisciplina]);  // Executa a query de exclusão.
            return result.affectedRows > 0;  // Retorna true se alguma linha foi afetada (disciplina deletado).
        } catch (error) {
            console.error('Erro ao excluir o disciplina:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para atualizar os dados de um disciplina no banco de dados.
    async update() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'UPDATE disciplina SET nomeDisciplina = ?, turmaDisciplina = ?, Professor.idProfessor = ? WHERE idDisciplina = ?;';  // Query SQL para atualizar o nome de um disciplina.

        try {
            const [result] = await conexao.promise().execute(SQL, [this._nomeDisciplina, this._idDisciplina]);  // Executa a query de atualização.
            return result.affectedRows > 0;  // Retorna true se a atualização afetou alguma linha.
        } catch (error) {
            console.error('Erro ao atualizar o disciplina:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para verificar se um disciplina já existe no banco de dados.
    async isDisciplinaByNomeDisciplina() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT COUNT(*) AS qtd FROM disciplina WHERE nomeDisciplina = ?;';  // Query SQL para contar disciplinas com o mesmo nome.

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._nomeDisciplina]);  // Executa a query.
            return rows[0].qtd > 0;  // Retorna true se houver algum disciplina com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o disciplina:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    async isDisciplinaById(idDisciplina) {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT COUNT(*) AS qtd FROM disciplina WHERE idDisciplina = ?;';  // Query SQL para contar disciplinas com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [idDisciplina]);  // Executa a query.
            return rows[0].qtd > 0;  // Retorna true se houver algum disciplina com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o disciplina:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para ler todos os disciplinas do banco de dados.
    async readAll() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT * FROM disciplina ORDER BY nomeDisciplina;';  // Query SQL para selecionar todos os disciplinas ordenados pelo nome.

        try {
            const [rows] = await conexao.promise().execute(SQL);  // Executa a query de seleção.
            return rows;  // Retorna a lista de disciplinas.
        } catch (error) {
            console.error('Erro ao ler disciplinas:', error);  // Exibe erro no console se houver falha.
            return [];  // Retorna uma lista vazia caso ocorra um erro.
        }
    }

    // Método assíncrono para ler um disciplina pelo seu ID.
    async readByID() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT * FROM disciplina WHERE idDisciplina = ?;';  // Query SQL para selecionar um disciplina pelo ID.

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idDisciplina]);  // Executa a query de seleção.
            return rows;  // Retorna o disciplina correspondente ao ID.
        } catch (error) {
            console.error('Erro ao ler disciplina pelo ID:', error);  // Exibe erro no console se houver falha.
            return null;  // Retorna null caso ocorra um erro.
        }
    }

    // Getter para obter o valor de idDisciplina.
    get idDisciplina() {
        return this._idDisciplina;
    }

    // Setter para definir o valor de idDisciplina.
    set idDisciplina(idDisciplina) {
        this._idDisciplina = idDisciplina;
        return this;  // Retorna a instância atual para permitir encadeamento de chamadas.
    }

    // Getter para obter o valor de nomeDisciplina.
    get nomeDisciplina() {
        return this._nomeDisciplina;
    }

    // Setter para definir o valor de nomeDisciplina.
    set nomeDisciplina(nomeDisciplina) {
        this._nomeDisciplina = nomeDisciplina;
        return this;  // Retorna a instância atual para permitir encadeamento de chamadas.
    }

    get professorDisciplina() {
        return this._professorDisciplina;
    }

    // Setter para definir o valor de nomeDisciplina.
    set professorDisciplina(professorDisciplina) {
        this._professorDisciplina = professorDisciplina;
        return this;  // Retorna a instância atual para permitir encadeamento de chamadas.
    }
}

// Exporta a classe Disciplina para que possa ser utilizada em outros módulos.
module.exports = Disciplina;
