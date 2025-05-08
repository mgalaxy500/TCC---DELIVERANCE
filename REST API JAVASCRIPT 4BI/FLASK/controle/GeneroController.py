from flask import jsonify
from modelo.Genero import Genero


class GeneroController:
    # Classe responsável por controlar as operações CRUD para a entidade Genero.
    
    def __init__(self):
        # Inicializa a classe GeneroController.
        # Cria uma instância da classe Genero para gerenciar as operações de banco de dados.
        self._genero = Genero()

    # Valida o nome do genero.
    # Levanta uma exceção se o nome do genero for nulo ou tiver menos de 3 caracteres.
    def validar_nomeGenero(self):
        if self._genero.nomeGenero is None:
            # Verifica se o nome do genero é nulo
            raise ValueError("O nome do genero não pode ser vazio")
        if len(self._genero.nomeGenero) < 3:
            # Verifica se o nome do genero tem menos de 3 caracteres
            raise ValueError("O nome do genero não pode ser vazio e deve ter pelo menos 3 caracteres.")
    
    # Obtém todos os generos do banco de dados.
    # Retorna um JSON contendo a lista de generos ou uma mensagem de erro em caso de falha.
    def read_all(self):

        generos = self._genero.readAll()
        if generos is not None:
            # Retorna a lista de generos em formato JSON e o status HTTP 200 (OK)
            return jsonify(generos), 200
        else:
            # Retorna uma mensagem de erro e o status HTTP 500 (Internal Server Error)
            return jsonify({"message": "Não foi possível obter os generos"}), 500
    
    # Obtém um genero específico pelo ID.
    # Retorna um JSON com os dados do genero ou uma mensagem de erro caso o genero não seja encontrado.    
    def read_by_id(self):
        
        genero_data = self._genero.readGeneroById()
        if genero_data:
            # Retorna os dados do genero em formato JSON e o status HTTP 200 (OK)
            return jsonify(genero_data), 200
        else:
            # Retorna uma mensagem de erro e o status HTTP 404 (Not Found)
            return jsonify({"message": "Genero não encontrado"}), 404
        
    # Cria um novo genero no banco de dados.
    # Valida o nome do genero antes de inserir os dados no banco.
    # Retorna o ID do novo genero criado ou uma mensagem de erro caso falhe.
    def create_control(self):

        self.validar_nomeGenero()  # Valida o nome do genero antes de prosseguir
        id_novo_genero = self._genero.create()  # Tenta criar o novo genero no banco de dados
        if id_novo_genero:
            # Retorna o ID do novo genero e o nome em formato JSON com o status HTTP 201 (Created)
            return jsonify({"idGenero": id_novo_genero, 
                            "nomeGenero": self._genero.nomeGenero}), 201
        else:
            # Retorna uma mensagem de erro e o status HTTP 500 (Internal Server Error)
            return jsonify({"message": "Não foi possível criar o genero"}), 500

    # Atualiza um genero existente no banco de dados.
    # Valida o nome do genero antes de atualizar os dados.
    # Retorna os dados do genero atualizado ou uma mensagem de erro em caso de falha.
    def update(self):
   
        self.validar_nomeGenero()  # Middleware para validar o nome do genero
        id_novo_genero = self._genero.update()  # Tenta atualizar o genero no banco de dados
        if id_novo_genero:
            # Retorna o ID do genero atualizado e o nome em formato JSON com o status HTTP 200 (OK)
            return jsonify({"idGenero": id_novo_genero, 
                            "nomeGenero": self._genero.nomeGenero}), 200
        else:
            # Retorna uma mensagem de erro e o status HTTP 500 (Internal Server Error)
            return jsonify({"message": "Não foi possível atualizar o genero"}), 500


    def delete(self):
        # Exclui um genero do banco de dados pelo ID.
        # Retorna uma mensagem de sucesso ou erro dependendo do resultado.
        genero = Genero()  # Cria uma instância temporária da classe Genero
        linhas_afetadas = genero.delete()  # Tenta deletar o genero pelo ID
        if linhas_afetadas:
            # Retorna uma mensagem de sucesso e o status HTTP 200 (OK)
            return jsonify({"message": "Genero excluído com sucesso"}), 200
        else:
            # Retorna uma mensagem de erro e o status HTTP 404 (Not Found)
            return jsonify({"message": "Genero não encontrado"}), 404

    # Getter para acessar o objeto genero
    @property
    def genero(self):
        # Retorna a instância da classe Genero.
        return self._genero

    # Setter para modificar o objeto genero
    @genero.setter
    def genero(self, value):
        # Permite modificar a instância da classe Genero.
        self._genero = value
