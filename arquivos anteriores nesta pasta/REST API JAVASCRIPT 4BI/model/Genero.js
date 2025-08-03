// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');
const fs = require('fs');
const csv = require('csv-parser');
// Define a classe Genero para representar a entidade Genero.
class Genero {
    // Construtor da classe Genero que inicializa as propriedades.
    constructor() {
        this._idGenero = null;  // ID do genero, inicialmente nulo.
        this._nomeGenero = null;  // Nome do genero, inicialmente uma string vazia.
    }

    // Método assíncrono para criar um novo genero no banco de dados.
    async create() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'INSERT INTO genero (nomeGenero) VALUES (?);';  // Query SQL para inserir o nome do genero.

        try {
            const [result] = await conexao.promise().execute(SQL, [this._nomeGenero]);  // Executa a query.
            this._idGenero = result.insertId;  // Armazena o ID gerado pelo banco de dados.
            return result.affectedRows > 0;  // Retorna true se a inserção afetou alguma linha.
        } catch (error) {
            console.error('Erro ao criar o genero:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    static async createByCSV(request, response) {
        // Verifica se o arquivo foi enviado
        if (!request.file) {
            return response.status(400).json({
                cod: 0,
                status: false,
                msg: "Nenhum arquivo foi enviado."
            });
        }

        const generos = []; // Array para armazenar os generos processados

        // Lê o arquivo CSV
        fs.createReadStream(request.file.path)
            .pipe(csv())
            .on('data', (row) => {
                // Adiciona o gênero à lista se a coluna 'nomeGenero' estiver presente
                if (row.nomeGenero && row.nomeGenero.trim().length > 0) {
                    const genero = new Genero();
                    genero.nomeGenero = row.nomeGenero.trim();
                    generos.push(genero);
                }
            })
            .on('end', async () => {
                const resultados = [];
                for (const genero of generos) {
                    const isCreated = await genero.create();
                    if (isCreated) {
                        resultados.push(genero.nomeGenero);
                    }
                }

                // Envia a resposta
                response.status(201).json({
                    cod: 1,
                    status: true,
                    msg: 'Gêneros cadastrados com sucesso',
                    generos: resultados
                });

                // Remove o arquivo após o processamento
                fs.unlink(request.file.path, (err) => {
                    if (err) console.error("Erro ao remover o arquivo:", err);
                });
            })
            .on('error', (err) => {
                console.error("Erro ao processar o arquivo CSV:", err);
                response.status(500).json({
                    cod: 0,
                    status: false,
                    msg: "Erro ao processar o arquivo CSV."
                });
            });
    }
    
    // Método assíncrono para excluir um genero do banco de dados.
    async delete() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'DELETE FROM genero WHERE idGenero = ?;';  // Query SQL para deletar um genero pelo ID.

        try {
            const [result] = await conexao.promise().execute(SQL, [this._idGenero]);  // Executa a query de exclusão.
            return result.affectedRows > 0;  // Retorna true se alguma linha foi afetada (genero deletado).
        } catch (error) {
            console.error('Erro ao excluir o genero:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para atualizar os dados de um genero no banco de dados.
    async update() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'UPDATE genero SET nomeGenero = ? WHERE idGenero = ?;';  // Query SQL para atualizar o nome de um genero.

        try {
            const [result] = await conexao.promise().execute(SQL, [this._nomeGenero, this._idGenero]);  // Executa a query de atualização.
            return result.affectedRows > 0;  // Retorna true se a atualização afetou alguma linha.
        } catch (error) {
            console.error('Erro ao atualizar o genero:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para verificar se um genero já existe no banco de dados.
    async isGeneroByNomeGenero() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT COUNT(*) AS qtd FROM genero WHERE nomeGenero = ?;';  // Query SQL para contar generos com o mesmo nome.

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._nomeGenero]);  // Executa a query.
            return rows[0].qtd > 0;  // Retorna true se houver algum genero com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o genero:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    async isGeneroById(idGenero) {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT COUNT(*) AS qtd FROM genero WHERE idGenero = ?;';  // Query SQL para contar generos com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [idGenero]);  // Executa a query.
            return rows[0].qtd > 0;  // Retorna true se houver algum genero com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o genero:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para ler todos os generos do banco de dados.
    async readAll() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT * FROM genero ORDER BY nomeGenero;';  // Query SQL para selecionar todos os generos ordenados pelo nome.

        try {
            const [rows] = await conexao.promise().execute(SQL);  // Executa a query de seleção.
            return rows;  // Retorna a lista de generos.
        } catch (error) {
            console.error('Erro ao ler generos:', error);  // Exibe erro no console se houver falha.
            return [];  // Retorna uma lista vazia caso ocorra um erro.
        }
    }

    // Método assíncrono para ler um genero pelo seu ID.
    async readByID() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = 'SELECT * FROM genero WHERE idGenero = ?;';  // Query SQL para selecionar um genero pelo ID.

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idGenero]);  // Executa a query de seleção.
            return rows;  // Retorna o genero correspondente ao ID.
        } catch (error) {
            console.error('Erro ao ler genero pelo ID:', error);  // Exibe erro no console se houver falha.
            return null;  // Retorna null caso ocorra um erro.
        }
    }

    // Getter para obter o valor de idGenero.
    get idGenero() {
        return this._idGenero;
    }

    // Setter para definir o valor de idGenero.
    set idGenero(idGenero) {
        this._idGenero = idGenero;
        return this;  // Retorna a instância atual para permitir encadeamento de chamadas.
    }

    // Getter para obter o valor de nomeGenero.
    get nomeGenero() {
        return this._nomeGenero;
    }

    // Setter para definir o valor de nomeGenero.
    set nomeGenero(nomeGenero) {
        this._nomeGenero = nomeGenero;
        return this;  // Retorna a instância atual para permitir encadeamento de chamadas.
    }
}

// Exporta a classe Genero para que possa ser utilizada em outros módulos.
module.exports = Genero;
