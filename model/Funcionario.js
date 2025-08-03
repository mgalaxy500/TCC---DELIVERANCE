// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');

// Define a classe Funcionario para representar a entidade Funcionario.
class Funcionario {
    // Construtor da classe Funcionario que inicializa as propriedades.
    constructor() {
        this._idFuncionario = null;  // ID do funcionario, inicialmente nulo.
        this._emailFuncionario = null;  // Nome do funcionario.
        this._senhaFuncionario = null;  // Preço do funcionario.
    }

    // Método assíncrono para criar um novo funcionario no banco de dados.
    async create() {
        const conexao = Banco.getConexao();
        const SQL = 'INSERT INTO funcionario (emailFuncionario, senhaFuncionario) VALUES (?, ?);';

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._emailFuncionario, this._senhaFuncionario
            ]);
            this._idFuncionario = result.insertId;  // Armazena o ID gerado pelo banco de dados.
            return result.affectedRows > 0;  // Retorna true se a inserção foi bem-sucedida.
        } catch (error) {
            console.error('Erro ao criar o funcionario:', error);
            return false;
        }
    }

    async login() {
        const conexao = Banco.getConexao(); // Obtém a conexão com o banco de dados.
        const SQL = `
            SELECT COUNT(*) AS qtd, idFuncionario, emailFuncionario
            FROM funcionario
            WHERE emailFuncionario = ? AND senhaFuncionario = MD5(?);
        `; // Query SQL para selecionar o funcionário com base no email e senha.

        try {
            // Prepara e executa a consulta SQL com parâmetros.
            const [rows] = await conexao.promise().execute(SQL, [this._emailFuncionario, this._senhaFuncionario]);

            if (rows.length > 0 && rows[0].qtd === 1) {
                const tupla = rows[0];
                // Configura os atributos do funcionário.
                this._idFuncionario = tupla.idFuncionario;
                this._emailFuncionario = tupla.emailFuncionario;

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

    // Método assíncrono para excluir um funcionario do banco de dados.
    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM funcionario WHERE idFuncionario = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._idFuncionario]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o funcionario:', error);
            return false;
        }
    }

    // Método assíncrono para atualizar os dados de um funcionario no banco de dados.
    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE funcionario SET emailFuncionario = ?, senhaFuncionario = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._emailFuncionario, this._senhaFuncionario
            ]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o funcionario:', error);
            return false;
        }
    }

    // Método assíncrono para ler todos os funcionarios do banco de dados.
    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM funcionario ORDER BY emailFuncionario;';

        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler funcionarios:', error);
            return [];
        }
    }

    // Método assíncrono para ler um funcionario pelo seu ID.
    async readByID(idFuncionario) {
        this._idFuncionario = idFuncionario;

        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM funcionario WHERE idFuncionario = ?;';
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idFuncionario]);
            return rows[0] || null; // Retorna o funcionario encontrado ou null se não existir
        } catch (error) {
            console.error('Erro ao ler funcionario pelo ID:', error);
            return null;
        }
    }

    // Getters e setters para as propriedades da classe.

    get idFuncionario() {
        return this._idFuncionario;
    }

    set idFuncionario(idFuncionario) {
        this._idFuncionario = idFuncionario;
    }

    set emailFuncionario(valor) {
        this._emailFuncionario = valor;
    }

    get emailFuncionario() {
        return this._emailFuncionario;
    }

    set senhaFuncionario(valor) {
        this._senhaFuncionario = valor;
    }
    get senhaFuncionario() {
        return this._senhaFuncionario;
    }


}

// Exporta a classe Funcionario para que possa ser utilizada em outros módulos.
module.exports = Funcionario;
