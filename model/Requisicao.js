// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');
const Aluno = require('./Aluno');
// Define a classe Requisicao para representar a entidade Requisicao.
class Requisicao {
    // Construtor da classe Requisicao que inicializa as propriedades.
    constructor() {
        this._idRequisicao = null;
        this._justRequisicao = null;
        this._dataRequisicao = null;
        this._codigoComprovanteRequisicao = null;
        this._aluno = new Aluno();

        // Novos campos
        this._idProfessor = null;
        this._idDisciplina = null;
        this._justRequisicao = null;
        this._gNRequisicao = null;
        this._modeloRequisicao = null;
        this._statusRequisicao = null; // 0 = Aprovado, 1 = Pendente
        this._matriculaAluno = null;
        this._bimestreRequisicao = null;
    }

    // Método assíncrono para criar um novo requisicao no banco de dados.
    async create() {
    const conexao = Banco.getConexao();
    const SQL = `
        INSERT INTO requisicao 
        (aluno_matriculaAluno, professor_idProfessor, disciplina_idDisciplina, justRequisicao, dataRequisicao, gNRequisicao, modeloRequisicao, statusRequisicao, bimestreRequisicao)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    try {
        const [result] = await conexao.promise().execute(SQL, [
            this._matriculaAluno,         // aluno_matriculaAluno
            this._idProfessor,            // professor_idProfessor
            this._idDisciplina,           // disciplina_idDisciplina
            this._justRequisicao,         // justRequisicao
            this._dataRequisicao,         // dataRequisicao
            this._gNRequisicao,           // gNRequisicao
            this._modeloRequisicao,       // modeloRequisicao
            this._statusRequisicao,       // statusRequisicao
            this._bimestreRequisicao      // bimestreRequisicao
        ]);
        this._idRequisicao = result.insertId;
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao criar o requisicao:', error);
        return false;
    }
}

    // Método assíncrono para excluir um requisicao do banco de dados.
    async delete() {
        console.log('Deletando:', this._idRequisicao);
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM requisicao WHERE idRequisicao = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._idRequisicao]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o requisicao:', error);
            return false;
        }
    }

    // Método assíncrono para atualizar os dados de um requisicao no banco de dados.
    async update() {
        console.log('Atualizando:', this._statusRequisicao, this._idRequisicao);
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE requisicao SET statusRequisicao = ? WHERE idRequisicao = ?;';
        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._statusRequisicao,
                this._idRequisicao
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
        const SQL = `SELECT * 
            FROM requisicao
            JOIN aluno ON requisicao.aluno_matriculaAluno = aluno.matriculaAluno
            ORDER BY requisicao.idRequisicao;`;
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

    // Getters e setters para os novos campos
    get idRequisicao() { return this._idRequisicao; }
    set idRequisicao(value) { this._idRequisicao = value; }

    get idProfessor() { return this._idProfessor; }
    set idProfessor(value) { this._idProfessor = value; }

    get idDisciplina() { return this._idDisciplina; }
    set idDisciplina(value) { this._idDisciplina = value; }

    get justRequisicao() { return this._justRequisicao; }
    set justRequisicao(value) { this._justRequisicao = value; }

    get gNRequisicao() { return this._gNRequisicao; }
    set gNRequisicao(value) { this._gNRequisicao = value; }

    get modeloRequisicao() { return this._modeloRequisicao; }
    set modeloRequisicao(value) { this._modeloRequisicao = value; }

    get statusRequisicao() { return this._statusRequisicao; }
    set statusRequisicao(value) { this._statusRequisicao = value; }

    get matriculaAluno() { return this._matriculaAluno; }
    set matriculaAluno(value) { this._matriculaAluno = value; }

    get dataRequisicao() { return this._dataRequisicao; }
    set dataRequisicao(value) { this._dataRequisicao = value; }

    get bimestreRequisicao() { return this._bimestreRequisicao; }
    set bimestreRequisicao(value) { this._bimestreRequisicao = value; }
}

// Exporta a classe Requisicao para que possa ser utilizada em outros módulos.
module.exports = Requisicao;
