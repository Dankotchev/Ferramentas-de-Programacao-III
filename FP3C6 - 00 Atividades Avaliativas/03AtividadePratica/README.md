# Atividade Avaliativa III
## Back-end


| Método | Recurso | Protegida | Requisição                                               | Resposta                                      | Observação                                                                                                                                                                                                                                                                                                                                                               |
|--------|---------|-----------|----------------------------------------------------------|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ?      | /login  | Não       | - Deve ser enviado no corpo da requisição: login e senha | - No corpo da resposta: token, nome e salário | - Esse recurso deve validar login e senha no banco de dados. - Na `resposta`, deve ser retornado no corpo da mensagem o nome, o salário e o token. O token retornado deve ser o valor armazenado no arquivo .env. `Não é para assinar o token.` - Validar as propriedades recebidas na `requisição`. Login e senha são obrigatórios e devem ter pelo menos 3 caracteres. |
| ?      | /users  | Sim       | - Deve ser enviado por parâmetro: token                  | - No corpo da resposta: lista de usuários     | - Esse recurso deve retornar todos os usuários armazenados no banco de dados. - Na `requisição`, o token deve ser enviado por `parâmetro`.                                                                                                                                                                                                                               |
| ?      | /users  | Sim       | - Deve ser enviado por parâmetro: token e identificador  |                                               | - Esse recurso deve excluir um usuário. - Validar as propriedades recebidas na `requisição`. Identificador e token são obrigatórios.                                                                                                                                                                                                                                     |


### Códigos do status para serem utilizados
* **Login**
    * Status 400: mensagens de validação dos valores obrigatórios da requisição.
    * Status 500: login inválido.
    * Status 200: login válido.
* **Listagem de usuários**
    * Status 200: lista de usuários.
* **Exclusão de um usuário**
    * Status 202: usuário excluído.
    * Status 400: mensagens de validação dos valores obrigatórios da requisição.
    * Status 404: usuário não existe.
* **Validação token**
    * Status 401: token não enviado ou inválido.

## Front-end
* Deve listar todos os usuários ao iniciar o aplicativo
    * Se não existir usuários, apresentar o texto na página: “Não existem usuários cadastrados.”.
* Deve permitir remover um usuário específico.
    * Considerar que um usuário pode não existir, portanto a mensagem retornada pelo back-end deve ser exibida pelo componente Toast.
    * Caso o usuário seja excluído, a mensagem retornada pelo back-end deve ser exibida pelo componente Toast.
    * Apresentar as mensagens de validação pelo componente Toast.
**Observações**
* Não deve implementar a página de login. O token é estático, utilizar o mesmo do arquivo .env do back-end.

### Considerações
* Utilizar boas práticas de programação.
* Uso de código desnecessário (bibliotecas, arquivos, funções, variáveis etc.), serão descontados pontos.
* Não é necessário utilizar migrations.