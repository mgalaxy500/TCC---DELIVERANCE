const Banco = require('./Banco');
const Professor = require('./Professor');

class Disciplina {
    constructor() {
        this._idDisciplina = null;
        this._nomeDisciplina = null;
        this._professor = new Professor();
        this._professor.idProfessor = null;
    }

    async create() {
        const conexao = Banco.getConexao();

        const SQL = `
            INSERT INTO disciplina
            (nomeDisciplina, professor_idProfessor)
            VALUES (?, ?)
        `;

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._nomeDisciplina,
                this._professor.idProfessor
            ]);
            return result.affectedRows === 1;
        } catch (error) {
            console.error('Erro ao inserir disciplina:', error);
            return false;
        }
    }

    static async createByJSON(disciplinasJSON) {
        const conexao = Banco.getConexao();
        const disciplinasCriadas = [];

        for (const data of disciplinasJSON) {
            if (data.nomeDisciplina && data.nomeDisciplina.length > 5) {
                const disciplina = new Disciplina();
                disciplina.nomeDisciplina = data.nomeDisciplina.trim();
                disciplina.professor_idProfessor = data.professor_idProfessor || null;
                console.log(disciplina)

                try {
                    const SQL = 'INSERT INTO disciplina (nomeDisciplina, professor_idProfessor) VALUES (?, ?);';
                    const [result] = await conexao.promise().execute(SQL, [
                        disciplina.nomeDisciplina,
                        disciplina.professor_idProfessor
                    ]);

                    if (result.affectedRows > 0) {
                        disciplina._idDisciplina = result.insertId;
                        disciplinasCriadas.push({
                            idDisciplina: disciplina.idDisciplina,
                            nomeDisciplina: disciplina.nomeDisciplina,
                            professor_idProfessor: disciplina.professor_idProfessor
                        });
                    }
                } catch (error) {
                    console.error(`Erro ao criar a disciplina ${disciplina.nomeDisciplina}:`, error);
                }
            }
        }

        return disciplinasCriadas;
    }

    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM disciplina WHERE idDisciplina = ?;';
        try {
            const [result] = await conexao.promise().execute(SQL, [this._idDisciplina]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir a disciplina:', error);
            return false;
        }
    }

    async update() {
        console.log('Atualizando:', this._nomeDisciplina, this._professor.idProfessor, this._idDisciplina);
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE disciplina SET nomeDisciplina = ?, professor_idProfessor = ? WHERE idDisciplina = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._nomeDisciplina,
                this._professor.idProfessor,
                this._idDisciplina
            ]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar a disciplina:', error);
            return false;
        }
    }

    async isDisciplinaByNomeDisciplina() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT COUNT(*) AS qtd FROM disciplina WHERE nomeDisciplina = ?;';
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._nomeDisciplina]);
            return rows[0].qtd > 0;
        } catch (error) {
            console.error('Erro ao verificar a disciplina:', error);
            return false;
        }
    }

    async isDisciplinaById(idDisciplina) {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT COUNT(*) AS qtd FROM disciplina WHERE idDisciplina = ?;';
        try {
            const [rows] = await conexao.promise().execute(SQL, [idDisciplina]);
            return rows[0].qtd > 0;
        } catch (error) {
            console.error('Erro ao verificar a disciplina pelo ID:', error);
            return false;
        }
    }

    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM disciplina ORDER BY nomeDisciplina;';
        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler disciplinas:', error);
            return [];
        }
    }

    async readByID() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM disciplina WHERE idDisciplina = ?;';
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idDisciplina]);
            return rows;
        } catch (error) {
            console.error('Erro ao ler disciplina pelo ID:', error);
            return null;
        }
    }

    // Getters e Setters
    get idDisciplina() {
        return this._idDisciplina;
    }

    set idDisciplina(idDisciplina) {
        this._idDisciplina = idDisciplina;
        return this;
    }

    get nomeDisciplina() {
        return this._nomeDisciplina;
    }

    set nomeDisciplina(nomeDisciplina) {
        this._nomeDisciplina = nomeDisciplina;
        return this;
    }

    get professor_idProfessor() {
        return this._professor.idProfessor;
    }

    set professor_idProfessor(professor_idProfessor) {
        this._professor.idProfessor = professor_idProfessor;
        return this;
    }
}

module.exports = Disciplina;
