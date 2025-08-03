// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');

// Define a classe Estado para utilizar na relação entre Jogo e Estado.
const Estado = require('./Estado');
const Genero = require('./Genero');

// Define a classe Jogo para representar a entidade Jogo.
class Jogo {
    // Construtor da classe Jogo que inicializa as propriedades.
    constructor() {
        this._idJogo = null;  // ID do funcionário, inicialmente nulo.
        this._nomeJogo = null;  // Nome do funcionário.
        this._email = null;  // Email do funcionário.
        this._senha = null;  // Senha do funcionário.
        this._recebeValeTransporte = null;  // Indica se o funcionário recebe vale-transporte.
        this._estado = new Estado();  // Estado associado ao funcionário.
    }

    // Método assíncrono para criar um novo funcionário no banco de dados.
    async create() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'INSERT INTO jogo (nomeJogo, email, senha, recebeValeTransporte, Estado_idEstado) VALUES (?, ?, ?, ?, ?);';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._nomeJogo, this._email, this._senha, this._recebeValeTransporte, this._estado.idEstado]);
            this._idJogo = result.insertId;  // Armazena o ID gerado pelo banco de dados.
            return result.affectedRows > 0;  // Retorna true se a inserção foi bem-sucedida.
        } catch (error) {
            console.error('Erro ao criar o funcionário:', error);
            return false;
        }
    }

    // Método assíncrono para excluir um funcionário do banco de dados.
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

    // Método assíncrono para atualizar os dados de um funcionário no banco de dados.
    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE jogo SET nomeJogo = ?, email = ?, senha = ?, recebeValeTransporte = ?, Estado_idEstado = ? WHERE idJogo = ?;';
        console.log([this._nomeJogo, this._email, this._senha, this._recebeValeTransporte, this._estado.idEstado, this._idJogo]);
        try {
            const [result] = await conexao.promise().execute(SQL, [this._nomeJogo, this._email, this._senha, this._recebeValeTransporte, this._estado.idEstado, this._idJogo]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o funcionário:', error);
            return false;
        }
    }

    // Método assíncrono para ler todos os funcionários do banco de dados.
    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM jogo join estado on estado_idEstado = idestado ORDER BY nomeJogo;';

        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler funcionários:', error);
            return [];
        }
    }

    // Método assíncrono para ler um funcionário pelo seu ID.
    async readByID(idJogo) {
        this._idJogo = idJogo;

        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM jogo join estado on idEstado = estado_idEstado WHERE idJogo = ?;';
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idJogo]);
            return rows;
        } catch (error) {
            console.error('Erro ao ler funcionário pelo ID:', error);
            return null;
        }
    }

    async isJogoByEmail(email) {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.

        const SQL = 'SELECT COUNT(*) AS qtd FROM jogo WHERE email = ?;';  
        try {
            const [rows] = await conexao.promise().execute(SQL, [email]);  // Executa a query.
            return rows[0].qtd > 0;  // Retorna true se houver algum email no banco
        } catch (error) {
            console.error('Erro ao verificar o email:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }
    async login() {
        const conexao = Banco.getConexao(); // Obtém a conexão com o banco de dados.
        const SQL = `
            SELECT COUNT(*) AS qtd, idJogo, nomeJogo, email, idEstado, nomeEstado
            FROM jogo 
            JOIN estado ON Estado_idEstado = idEstado
            WHERE email = ? AND senha = MD5(?);
        `; // Query SQL para selecionar o funcionário com base no email e senha.

        try {
            // Prepara e executa a consulta SQL com parâmetros.
            const [rows] = await conexao.promise().execute(SQL, [this._email, this._senha]);

            if (rows.length > 0 && rows[0].qtd === 1) {
                const tupla = rows[0];
                // Configura os atributos do funcionário.
                this._idJogo = tupla.idJogo;
                this._nomeJogo = tupla.nomeJogo;
                this._email = tupla.email;
                this._estado.idEstado = tupla.idEstado;
                this._estado.nomeEstado = tupla.nomeEstado;

                return true; // Login bem-sucedido.
            }

            return false; // Login falhou.
        } catch (error) {
            console.error('Erro ao realizar o login:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
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

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;

    }

    get senha() {
        return this._senha;
    }

    set senha(senha) {
        this._senha = senha;

    }

    get recebeValeTransporte() {
        return this._recebeValeTransporte;
    }

    set recebeValeTransporte(recebeValeTransporte) {
        this._recebeValeTransporte = recebeValeTransporte;
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
