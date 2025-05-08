// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');

// Define a classe Dev para representar a entidade Dev.
class Dev {
    // Construtor da classe Dev que inicializa as propriedades.
    constructor() {
        this._idDev = null;  // ID do dev, inicialmente nulo.
        this._emailDev = null;  // Nome do dev.
        this._senhaDev = null;  // Preço do dev.
    }

    // Método assíncrono para criar um novo dev no banco de dados.
    async create() {
        const conexao = Banco.getConexao();
        const SQL = 'INSERT INTO dev (emailDev, senhaDev) VALUES (?, ?);';

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._emailDev, this._senhaDev
            ]);
            this._idDev = result.insertId;  // Armazena o ID gerado pelo banco de dados.
            return result.affectedRows > 0;  // Retorna true se a inserção foi bem-sucedida.
        } catch (error) {
            console.error('Erro ao criar o dev:', error);
            return false;
        }
    }

    async login() {
        const conexao = Banco.getConexao(); // Obtém a conexão com o banco de dados.
        const SQL = `
            SELECT COUNT(*) AS qtd, idDev, emailDev
            FROM dev
            WHERE emailDev = ? AND senhaDev = MD5(?);
        `; // Query SQL para selecionar o funcionário com base no email e senha.

        try {
            // Prepara e executa a consulta SQL com parâmetros.
            const [rows] = await conexao.promise().execute(SQL, [this._emailDev, this._senhaDev]);

            if (rows.length > 0 && rows[0].qtd === 1) {
                const tupla = rows[0];
                // Configura os atributos do funcionário.
                this._idDev = tupla.idDev;
                this._emailDev = tupla.emailDev;

                return true; // Login bem-sucedido.
            }
            else{
                return false; // Login falhou.
            }

        } catch (error) {
            console.error('Erro ao realizar o login:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para excluir um dev do banco de dados.
    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM dev WHERE idDev = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._idDev]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o dev:', error);
            return false;
        }
    }

    // Método assíncrono para atualizar os dados de um dev no banco de dados.
    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE dev SET emailDev = ?, senhaDev = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._emailDev, this._senhaDev
            ]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o dev:', error);
            return false;
        }
    }

    // Método assíncrono para ler todos os devs do banco de dados.
    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM dev ORDER BY emailDev;';

        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler devs:', error);
            return [];
        }
    }

    // Método assíncrono para ler um dev pelo seu ID.
    async readByID(idDev) {
        this._idDev = idDev;

        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM dev WHERE idDev = ?;';
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idDev]);
            return rows[0] || null; // Retorna o dev encontrado ou null se não existir
        } catch (error) {
            console.error('Erro ao ler dev pelo ID:', error);
            return null;
        }
    }

    // Getters e setters para as propriedades da classe.

    get idDev() {
        return this._idDev;
    }

    set idDev(idDev) {
        this._idDev = idDev;
    }

    get emailDev() {
        return this._emailDev;
    }

    set emailDev(emailDev) {
        this._emailDev = emailDev;
    }

    get senhaDev() {
        return this._senhaDev;
    }

    set senhaDev(senhaDev) {
        this._senhaDev = senhaDev;
    }


}

// Exporta a classe Dev para que possa ser utilizada em outros módulos.
module.exports = Dev;
