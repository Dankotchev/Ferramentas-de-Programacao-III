# Atividade Avaliativa II
Considere o cenário escolar onde onde existem cursos de nível técnico e superior e os cursos possuem várias disciplinas, como mostra o modelo a seguir. O período dos cursos pode ser, por exemplo: matutino, vespertino, noturno e integral.

![Modelo](https://images2.imgbox.com/56/21/qJtpaWp1_o.png)

 Implemente uma API (back-end) que: 
 
* Gere as tabelas com uso de migration.
* Tenha um endpoint (recurso) que permita pesquisar os cursos pelo nível. **Não** deve retornar as informações das disciplinas.
* Tenha um endpoint (recurso) que permita pesquisar os cursos pelo nome. Deve retornar **todas** as informações.
* Tenha um endpoint (recurso) que permita pesquisar as disciplinas pelo nome. Deve retornar **somente** o código e o nome da disciplina e o nome e o nível do curso.
* Tenha um endpoint (recurso) que permita remover um curso pelo código, somente se o curso **não** possuir disciplinas.
* Tenha um endpoint (recurso) que permita cadastrar uma disciplina.
