// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');

// Define a classe Estado para representar a entidade Estado.
class Estado {
    // Construtor da classe Estado que inicializa as propriedades.
    constructor() {
        this._idEstado = null;  // ID do estado, inicialmente nulo.
        this._nomeEstado = null;  // Nome do estado, inicialmente uma string vazia.
    }

    // Método assíncrono para criar um novo estado no banco de dados.
    async create() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'INSERT INTO estado (nomeEstado) VALUES (?);';  // Query SQL para inserir o nome do estado.

        try {
            const [result] = await conexao.promise().execute(SQL, [this._nomeEstado]);  // Executa a query.
            this._idEstado = result.insertId;  // Armazena o ID gerado pelo banco de dados.
            return result.affectedRows > 0;  // Retorna true se a inserção afetou alguma linha.
        } catch (error) {
            console.error('Erro ao criar o estado:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para excluir um estado do banco de dados.
    async delete() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'DELETE FROM estado WHERE idEstado = ?;';  // Query SQL para deletar um estado pelo ID.

        try {
            const [result] = await conexao.promise().execute(SQL, [this._idEstado]);  // Executa a query de exclusão.
            return result.affectedRows > 0;  // Retorna true se alguma linha foi afetada (estado deletado).
        } catch (error) {
            console.error('Erro ao excluir o estado:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para atualizar os dados de um estado no banco de dados.
    async update() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'UPDATE estado SET nomeEstado = ? WHERE idEstado = ?;';  // Query SQL para atualizar o nome de um estado.

        try {
            const [result] = await conexao.promise().execute(SQL, [this._nomeEstado, this._idEstado]);  // Executa a query de atualização.
            return result.affectedRows > 0;  // Retorna true se a atualização afetou alguma linha.
        } catch (error) {
            console.error('Erro ao atualizar o estado:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para verificar se um estado já existe no banco de dados.
    async isEstadoByNomeEstado() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT COUNT(*) AS qtd FROM estado WHERE nomeEstado = ?;';  // Query SQL para contar estados com o mesmo nome.

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._nomeEstado]);  // Executa a query.
            return rows[0].qtd > 0;  // Retorna true se houver algum estado com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o estado:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    async isEstadoById(idEstado) {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT COUNT(*) AS qtd FROM estado WHERE idEstado = ?;';  // Query SQL para contar estados com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [idEstado]);  // Executa a query.
            return rows[0].qtd > 0;  // Retorna true se houver algum estado com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o estado:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para ler todos os estados do banco de dados.
    async readAll() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT * FROM estado ORDER BY nomeEstado;';  // Query SQL para selecionar todos os estados ordenados pelo nome.

        try {
            const [rows] = await conexao.promise().execute(SQL);  // Executa a query de seleção.
            return rows;  // Retorna a lista de estados.
        } catch (error) {
            console.error('Erro ao ler estados:', error);  // Exibe erro no console se houver falha.
            return [];  // Retorna uma lista vazia caso ocorra um erro.
        }
    }

    // Método assíncrono para ler um estado pelo seu ID.
    async readByID() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT * FROM estado WHERE idEstado = ?;';  // Query SQL para selecionar um estado pelo ID.

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idEstado]);  // Executa a query de seleção.
            return rows;  // Retorna o estado correspondente ao ID.
        } catch (error) {
            console.error('Erro ao ler estado pelo ID:', error);  // Exibe erro no console se houver falha.
            return null;  // Retorna null caso ocorra um erro.
        }
    }

    static async createByJSON(estadosJSON) {
        const conexao = Banco.getConexao();
        const estadosCriados = []; // Array para armazenar o resultado de cada criação

        for (const estadoData of estadosJSON) {
            if (estadoData.nomeEstado && estadoData.nomeEstado.length > 5) {
                const estado = new Estado();
                estado.nomeEstado = estadoData.nomeEstado.trim();

                try {
                    const SQL = 'INSERT INTO estado (nomeEstado) VALUES (?);';
                    const [result] = await conexao.promise().execute(SQL, [estado.nomeEstado]);
                    
                    if (result.affectedRows > 0) {
                        estado._idEstado = result.insertId;
                        estadosCriados.push({ nomeEstado: estado.nomeEstado, idEstado: estado._idEstado });
                    } else {
                        console.error(`Falha ao criar o estado: ${estado.nomeEstado}`);
                    }
                } catch (error) {
                    console.error(`Erro ao criar o estado ${estado.nomeEstado}:`, error);
                }
            }
        }

        return estadosCriados; // Retorna a lista dos estados criados com sucesso
    }

    // Getter para obter o valor de idEstado.
    get idEstado() {
        return this._idEstado;
    }

    // Setter para definir o valor de idEstado.
    set idEstado(idEstado) {
        this._idEstado = idEstado;
        return this;  // Retorna a instância atual para permitir encadeamento de chamadas.
    }

    // Getter para obter o valor de nomeEstado.
    get nomeEstado() {
        return this._nomeEstado;
    }

    // Setter para definir o valor de nomeEstado.
    set nomeEstado(nomeEstado) {
        this._nomeEstado = nomeEstado;
        return this;  // Retorna a instância atual para permitir encadeamento de chamadas.
    }
}

// Exporta a classe Estado para que possa ser utilizada em outros módulos.
module.exports = Estado;
