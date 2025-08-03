from flask import Flask, jsonify, request
from controle.GeneroController import GeneroController
from modelo.Genero import Genero  # Ajuste conforme a localização do arquivo da classe Genero

# Cria a aplicação Flask
app = Flask("rest_api")

# Função auxiliar para lidar com erros de validação
# Retorna uma mensagem de erro em formato JSON e o status HTTP 400 (Bad Request)
def handle_validation_error(e):
    return jsonify({"erro": str(e)}), 400

# Função responsável por obter todos os generos
# Endpoint: GET /generos/
# Retorna a lista de todos os generos no banco de dados
@app.route('/generos/', methods=['GET'])
def readAll():
    try:
        # Instancia o controlador de Genero
        generoController = GeneroController()
        # Chama o método para buscar todos os generos e retorna o resultado
        return generoController.read_all()
    except ValueError as e:
        # Se houver um erro de validação, lida com ele
        return handle_validation_error(e)

# Função responsável por obter um genero específico pelo ID
# Endpoint: GET /generos/<int:id>
# Retorna o genero correspondente ao ID fornecido
@app.route('/generos/<int:id>', methods=['GET'])
def readById(id):
    try:
        # Instancia o controlador de Genero
        objGeneroController = GeneroController()
        # Define o ID do genero no objeto GeneroController
        objGeneroController.genero.idGenero = id
        # Chama o método para buscar o genero pelo ID e retorna o resultado
        return objGeneroController.read_by_id()
    except ValueError as e:
        # Lida com erros de validação e retorna a mensagem de erro
        return handle_validation_error(e)

# Função responsável por criar um novo genero
# Endpoint: POST /generos/
# Recebe os dados do genero em formato JSON e cria um novo genero no banco de dados
@app.route('/generos/', methods=['POST'])
def create():
    try:
        # Obtém o corpo da requisição em formato JSON
        body = request.get_json()
        # Instancia o controlador de Genero
        objGeneroController = GeneroController()
        # Define o nome do genero com base nos dados recebidos
        objGeneroController.genero.nomeGenero = body['genero']['nomeGenero']
        # Chama o método para criar o genero e retorna o resultado
        return objGeneroController.create_control()
    except ValueError as e:
        # Lida com erros de validação e retorna a mensagem de erro
        return handle_validation_error(e)

# Função responsável por atualizar um genero existente
# Endpoint: PUT /generos/<int:id>
# Recebe os dados do genero em formato JSON e atualiza o genero no banco de dados
@app.route('/generos/<int:id>', methods=['PUT'])
def update(id):
    try:
        # Obtém o corpo da requisição em formato JSON
        body = request.get_json()
        # Instancia o controlador de Genero
        objGeneroController = GeneroController()
        # Define o nome e o ID do genero com base nos dados recebidos
        objGeneroController.genero.nomeGenero = body['genero']['nomeGenero']
        objGeneroController.genero.idGenero = id
        # Chama o método para atualizar o genero e retorna o resultado
        return objGeneroController.update()
    except ValueError as e:
        # Lida com erros de validação e retorna a mensagem de erro
        return handle_validation_error(e)

# Função responsável por deletar um genero pelo ID
# Endpoint: DELETE /generos/<int:id>
# Remove o genero correspondente ao ID fornecido
@app.route('/generos/<int:id>', methods=['DELETE'])
def delete(id):
    try:
        # Instancia o controlador de Genero
        objGeneroController = GeneroController()
        # Define o ID do genero a ser deletado
        objGeneroController.genero.idGenero = id
        # Chama o método para deletar o genero e verifica o resultado
        generosExcluidos = objGeneroController.delete()
        if generosExcluidos:
            # Se o genero foi excluído com sucesso, retorna uma mensagem de sucesso
            return jsonify({"message": "Genero deletado com sucesso"}), 200
        else:
            # Se o genero não foi encontrado, retorna uma mensagem de erro
            return jsonify({"message": "Genero não encontrado"}), 404
    except ValueError as e:
        # Lida com erros de validação e retorna a mensagem de erro
        return handle_validation_error(e)

# Inicia o servidor Flask na porta 8080
app.run(host='0.0.0.0', port=7000)
