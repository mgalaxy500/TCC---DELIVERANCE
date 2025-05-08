from mysql.connector import Error
from modelo.Banco import Banco

class Genero:
    def __init__(self):

        self._idGenero = None
        self._nomeGenero = None

    def create(self):
        conexao = Banco.getConexao()
        if conexao:
            try:
                cursor = conexao.cursor()
                sql = "INSERT INTO genero (nomeGenero) VALUES (%s)"
                cursor.execute(sql, (self.nomeGenero,))
                conexao.commit()
                self.idGenero = cursor.lastrowid  # Atualiza o idGenero após criação
                return self.idGenero
            except Error as e:
                print(f"Erro ao criar genero: {e}")
                raise ValueError("Ocorreu um erro ao cadastrar o genero")
            finally:
                cursor.close()

    def readAll(self):
        conexao = Banco.getConexao()
        if conexao:
            try:
                cursor = conexao.cursor(dictionary=True)
                sql = "SELECT * FROM genero order by nomeGenero asc"
                cursor.execute(sql)
                return cursor.fetchall()
            except Error as e:
                print(f"Erro ao obter generos: {e}")
                raise ValueError("Ocorreu um erro ao selecionar todos os generos")
            finally:
                cursor.close()

    def readGeneroById(self):
        conexao = Banco.getConexao()
        if conexao:
            try:
                cursor = conexao.cursor(dictionary=True)
                sql = "SELECT * FROM genero WHERE idGenero = %s"
                cursor.execute(sql, (self.idGenero,))
                linhaRespostaSQL = cursor.fetchone()
                if linhaRespostaSQL:
                    self.idGenero = linhaRespostaSQL['idGenero']
                    self.nomeGenero = linhaRespostaSQL['nomeGenero']
                return linhaRespostaSQL
            except Error as e:
                print(f"Erro ao obter genero por ID: {e}")
                return None
            finally:
                cursor.close()

    def update(self):
        conexao = Banco.getConexao()
        if conexao:
            try:
                cursor = conexao.cursor()
                sql = "UPDATE genero SET nomeGenero = %s WHERE idGenero = %s"
                cursor.execute(sql, (self.nomeGenero, self.idGenero))
                conexao.commit()
                return cursor.rowcount
            except Error as e:
                print(f"Erro ao atualizar genero: {e}")
                raise ValueError("Erro ao atualizar o genero.")
            finally:
                cursor.close()

    def delete(self):
        conexao = Banco.getConexao()
        if conexao:
            try:
                cursor = conexao.cursor()
                sql = "DELETE FROM genero WHERE idGenero = %s"
                cursor.execute(sql, (self.idGenero,))
                conexao.commit()
                qtdExcluidos = cursor.rowcount
                return qtdExcluidos
            except Error as e:
                print(f"Erro ao deletar genero: {e}")
                return None
            finally:
                cursor.close()

    # Getter para idGenero
    @property
    def idGenero(self):
        return self._idGenero

    # Setter para idGenero
    @idGenero.setter
    def idGenero(self, value):
        self._idGenero = value

    # Getter para nomeGenero
    @property
    def nomeGenero(self):
        return self._nomeGenero

    # Setter para nomeGenero
    @nomeGenero.setter
    def nomeGenero(self, value):
        self._nomeGenero = value