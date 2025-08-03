// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');
const Estado = require('./Estado');
const Genero = require('./Genero');
// Define a classe Jogo para representar a entidade Jogo.
class Jogo {
    // Construtor da classe Jogo que inicializa as propriedades.
    constructor() {
        this._idJogo = null;  // ID do jogo, inicialmente nulo.
        this._nomeJogo = null;  // Nome do jogo.
        this._precoJogo = null;  // Preço do jogo.
        this._dataJogo = null;  // Data de lançamento do jogo.
        this._metacriticJogo = null;  // Pontuação do jogo no Metacritic.
        this._njogadoresJogo = null;  // Número de jogadores do jogo.
        this._versaoJogo = null;  // Versão do jogo.
        this._genero = new Genero() ;  // ID do gênero associado.
        this._estado = new Estado();  // ID do estado associado.
    }

    // Método assíncrono para criar um novo jogo no banco de dados.
    async create() {
        const conexao = Banco.getConexao();
        const SQL = 'INSERT INTO jogo (nomeJogo, precoJogo, dataJogo, metacriticJogo, njogadoresJogo, versaoJogo, genero_idGenero, estado_idEstado) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._nomeJogo, this._precoJogo, this._dataJogo, 
                this._metacriticJogo, this._njogadoresJogo, this._versaoJogo, 
                this._genero.idGenero, this._estado.idEstado
            ]);
            this._idJogo = result.insertId;  // Armazena o ID gerado pelo banco de dados.
            return result.affectedRows > 0;  // Retorna true se a inserção foi bem-sucedida.
        } catch (error) {
            console.error('Erro ao criar o jogo:', error);
            return false;
        }
    }

    // Método assíncrono para excluir um jogo do banco de dados.
    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM jogo WHERE idJogo = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._idJogo]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o jogo:', error);
            return false;
        }
    }

    // Método assíncrono para atualizar os dados de um jogo no banco de dados.
    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE jogo SET nomeJogo = ?, precoJogo = ?, dataJogo = ?, metacriticJogo = ?, njogadoresJogo = ?, versaoJogo = ?, genero_idGenero = ?, estado_idEstado = ? WHERE idJogo = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._nomeJogo, this._precoJogo, this._dataJogo, 
                this._metacriticJogo, this._njogadoresJogo, this._versaoJogo, 
                this._genero.idGenero, this._estado.idEstado, this._idJogo
            ]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o jogo:', error);
            return false;
        }
    }

    // Método assíncrono para ler todos os jogos do banco de dados.
    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM jogo JOIN genero ON genero_idGenero = idGenero JOIN estado ON estado_idEstado = idEstado ORDER BY nomeJogo;';
        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler jogos:', error);
            return [];
        }
    }

    // Método assíncrono para ler um jogo pelo seu ID.
    async readByID(idJogo) {
        this._idJogo = idJogo;

        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM jogo join genero on genero_idGenero = idgenero join estado on estado_idEstado = idEstado WHERE idJogo = ?;';
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idJogo]);
            return rows[0] || null; // Retorna o jogo encontrado ou null se não existir
        } catch (error) {
            console.error('Erro ao ler jogo pelo ID:', error);
            return null;
        }
    }

    

    // Getters e setters para as propriedades da classe.

    get idJogo() {
        return this._idJogo;
    }

    set idJogo(idJogo) {
        this._idJogo = idJogo;
    }

    get nomeJogo() {
        return this._nomeJogo;
    }

    set nomeJogo(nomeJogo) {
        this._nomeJogo = nomeJogo;
    }

    get precoJogo() {
        return this._precoJogo;
    }

    set precoJogo(precoJogo) {
        this._precoJogo = precoJogo;
    }

    get dataJogo() {
        return this._dataJogo;
    }

    set dataJogo(dataJogo) {
        this._dataJogo = dataJogo;
    }

    get metacriticJogo() {
        return this._metacriticJogo;
    }

    set metacriticJogo(metacriticJogo) {
        this._metacriticJogo = metacriticJogo;
    }

    get njogadoresJogo() {
        return this._njogadoresJogo;
    }

    set njogadoresJogo(njogadoresJogo) {
        this._njogadoresJogo = njogadoresJogo;
    }

    get versaoJogo() {
        return this._versaoJogo;
    }

    set versaoJogo(versaoJogo) {
        this._versaoJogo = versaoJogo;
    }

    get genero() {
        return this._genero;
    }

    set genero(genero) {
        this._genero = genero;
    }

    get estado() {
        return this._estado;
    }

    set estado(estado) {
        this._estado = estado;
    }
}

// Exporta a classe Jogo para que possa ser utilizada em outros módulos.
module.exports = Jogo;
