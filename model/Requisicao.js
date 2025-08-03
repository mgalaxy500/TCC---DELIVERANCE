// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');
const Aluno = require('./Aluno');
// Define a classe Requisicao para representar a entidade Requisicao.
class Requisicao {
    // Construtor da classe Requisicao que inicializa as propriedades.
    constructor() {
        this._idRequisicao = null;  // ID do requisicao, inicialmente nulo.
        this._tipoRequisicao = null;  // Nome do requisicao.
        this._dataRequisicao = null;  // Nome do requisicao.
        this._codigoComprovanteRequisicao = null;  // ID do gênero associado.
        this._aluno = new Aluno();  // ID do aluno associado.
    }

    // Método assíncrono para criar um novo requisicao no banco de dados.
    async create() {
        const conexao = Banco.getConexao();
        const SQL = 'INSERT INTO requisicao (tipoRequisicao, dataRequisicao, codigoComprovanteRequisicao, aluno_idAluno) VALUES (?, ?, ?, ?);';

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._tipoRequisicao, this._dataRequisicao, this._codigoComprovanteRequisicao,this._aluno.idAluno
            ]);
            this._idRequisicao = result.insertId;  // Armazena o ID gerado pelo banco de dados.
            return result.affectedRows > 0;  // Retorna true se a inserção foi bem-sucedida.
        } catch (error) {
            console.error('Erro ao criar o requisicao:', error);
            return false;
        }
    }

    // Método assíncrono para excluir um requisicao do banco de dados.
    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM requisicao WHERE idRequisicao = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._idRequisicao, this._tipoRequisicao, this._dataRequisicao, this._codigoComprovanteRequisicao,this._aluno.idAluno]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o requisicao:', error);
            return false;
        }
    }

    // Método assíncrono para atualizar os dados de um requisicao no banco de dados.
    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE requisicao SET tipoRequisicao, dataRequisicao, codigoComprovanteRequisicao, aluno_idAluno = ? WHERE idRequisicao = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._tipoRequisicao, this._dataRequisicao, this._codigoComprovanteRequisicao,this._aluno.idAluno
            ]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o requisicao:', error);
            return false;
        }
    }

    // Método assíncrono para ler todos os requisicaos do banco de dados.
    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM requisicao JOIN ON requisicao_idRequisicao = idRequisicao JOIN aluno ON aluno_idAluno = idAluno ORDER BY nomeRequisicao;';
        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler requisicaos:', error);
            return [];
        }
    }

    // Método assíncrono para ler um requisicao pelo seu ID.
    async readByID(idRequisicao) {
        this._idRequisicao = idRequisicao;

        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM requisicao JOIN disciplina ON requisicao_idRequisicao = idRequisicao JOIN aluno on aluno_idAluno = idAluno WHERE idRequisicao = ?;';
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idRequisicao]);
            return rows[0] || null; // Retorna o requisicao encontrado ou null se não existir
        } catch (error) {
            console.error('Erro ao ler requisicao pelo ID:', error);
            return null;
        }
    }

    

    // Getters e setters para as propriedades da classe.

    get idRequisicao() {
        return this._idRequisicao;
    }

    set idRequisicao(idRequisicao) {
        this._idRequisicao = idRequisicao;
    }

    get tipoRequisicao(){
        return this._tipoRequisicao;
    }

    set tipoRequisicao(tipoRequisicao) {
        this._tipoRequisicao = tipoRequisicao;
    }

    get codigoComprovanteRequisicao(){
        return this._codigoComprovanteRequisicao;
    }

    set codigoComprovanteRequisicao(codigoComprovanteRequisicao) {
        this._codigoComprovanteRequisicao = codigoComprovanteRequisicao;
    }

    get aluno() {
        return this._aluno;
    }

    set aluno(aluno) {
        this._aluno = aluno;
    }
}

// Exporta a classe Requisicao para que possa ser utilizada em outros módulos.
module.exports = Requisicao;
