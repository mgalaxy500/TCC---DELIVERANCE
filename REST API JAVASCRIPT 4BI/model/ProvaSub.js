// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');
const Aluno = require('./Aluno');
const Disciplina = require('./Disciplina');
// Define a classe ProvaSub para representar a entidade ProvaSub.
class ProvaSub {
    // Construtor da classe ProvaSub que inicializa as propriedades.
    constructor() {
        this._idProvaSub = null;  // ID do provaSub, inicialmente nulo.
        this._dataProvaSub = null;  // Nome do provaSub.
        this._disciplina = new Disciplina() ;  // ID do gênero associado.
        this._aluno = new Aluno();  // ID do aluno associado.
    }

    // Método assíncrono para criar um novo provaSub no banco de dados.
    async create() {
        const conexao = Banco.getConexao();
        const SQL = 'INSERT INTO provaSub (nomeProvaSub, disciplina_idDisciplina, aluno_idAluno) VALUES (?, ?, ?);';

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._dataProvaSub, this._disciplina.idDisciplina, this._aluno.idAluno
            ]);
            this._idProvaSub = result.insertId;  // Armazena o ID gerado pelo banco de dados.
            return result.affectedRows > 0;  // Retorna true se a inserção foi bem-sucedida.
        } catch (error) {
            console.error('Erro ao criar o provaSub:', error);
            return false;
        }
    }

    // Método assíncrono para excluir um provaSub do banco de dados.
    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM provaSub WHERE idProvaSub = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._idProvaSub]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o provaSub:', error);
            return false;
        }
    }

    // Método assíncrono para atualizar os dados de um provaSub no banco de dados.
    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE provaSub SET dataProvaSub = ?, provaSub_idProvaSub = ?, aluno_idAluno = ? WHERE idProvaSub = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._dataProvaSub, this._disciplina.idDisciplina, this._aluno.idAluno
            ]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o provaSub:', error);
            return false;
        }
    }

    // Método assíncrono para ler todos os provaSubs do banco de dados.
    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM provaSub JOIN provaSub ON provaSub_iDProvaSub = idProvaSub JOIN aluno ON aluno_idAluno = idAluno ORDER BY nomeProvaSub;';
        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler provaSubs:', error);
            return [];
        }
    }

    // Método assíncrono para ler um provaSub pelo seu ID.
    async readByID(idProvaSub) {
        this._idProvaSub = idProvaSub;

        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM provaSub JOIN disciplina ON disciplina_idDisciplina = idDisciplina JOIN aluno ON aluno_idAluno = idAluno WHERE idProvaSub = ?;';
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idProvaSub]);
            return rows[0] || null; // Retorna o provaSub encontrado ou null se não existir
        } catch (error) {
            console.error('Erro ao ler provaSub pelo ID:', error);
            return null;
        }
    }

    

    // Getters e setters para as propriedades da classe.

    get idProvaSub() {
        return this._idProvaSub;
    }

    set idProvaSub(idProvaSub) {
        this._idProvaSub = idProvaSub;
    }

    get dataProvaSub() {
        return this._dataProvaSub;
    }

    set dataProvaSub(dataProvaSub) {
        this._dataProvaSub = dataProvaSub;
    }

    get disciplina() {
        return this._disciplina;
    }

    set disciplina(disciplina) {
        this._disciplina = disciplina;
    }

    get aluno() {
        return this._aluno;
    }

    set aluno(aluno) {
        this._aluno = aluno;
    }
}

// Exporta a classe ProvaSub para que possa ser utilizada em outros módulos.
module.exports = ProvaSub;
