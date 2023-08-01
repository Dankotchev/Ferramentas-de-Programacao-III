// SALA DE AULA: 2308.01
//Função callback
console.clear();
function exibir() {
  console.log("Essa é a função exibir");
}

function executar(funcaoDeCallback: Function) {
  funcaoDeCallback();
}

executar(exibir);

//Utilizando com função anônima
executar(() => console.log("Essa é uma função anonima, dentro da callback"));

//Funções de manipulação de elementos de Array
console.clear();
//const numeros: number[] = [2, 3, 5, 7, 11, 13];
const numeros = [2, 3, 5, 7, 11, 13]; // Inferência de tipo

///forEach()
numeros.forEach((valor, index) =>
  console.log("Valor: " + valor + ", na posição #" + index)
);
/// Template String
numeros.forEach((valor, index) =>
  console.log(`Valor: ${valor} ::: Posição ${index}`)
);

///map()
console.clear();
numeros
  .map((valor, index) => valor * index)
  .forEach((valor) => console.log(`Novo valor: ${valor}`));

numeros
  .map((valor, index) => {
    if (index % 2 == 0) return valor * 2;
    return valor;
  })
  .forEach((valor) => console.log(`Novo valor: ${valor}`)); // Encadeando funções

/// filter()
console.clear();
numeros
  .filter((elemento) => {
    if (elemento < 9) return true; // Elemento deve ser retornado
    return false; // Elemento não deve ser retornado
  })
  .forEach((valor) => console.log(`Valor: ${valor}`));

///find()
console.clear();
let elementoEncontrado = numeros.find((elemento) => elemento == 3);
console.log(elementoEncontrado);
elementoEncontrado = numeros.find((elemento) => elemento == 44);
console.log(elementoEncontrado);

///reduce()
////Obter um único elemento a partir do conjunto
console.clear();
let resultado = numeros.reduce((somatorio, item) => somatorio + item, 0);
console.log(`Soma = ${resultado}`);

resultado = numeros.reduce((produtorio, item) => {
  return produtorio * item;
}, 1);
console.log(`Produto = ${resultado}`);

///indexOf()
console.clear();
let posicao = numeros.indexOf(166);
console.log(`Posição: ${posicao}`); // -1 se não encontrar o valor

//Funções de adicionar e remover elementos de um Array
console.clear();
///pop() :: remove e retorna o último elemento do Array
const letras = ["a", "b", "c", "d"];
console.log(letras.pop());
console.log(letras);

///push() :: adiciona um elemento na última posição e retorna o tamanho do Array
console.log(`Tamanho: ${letras.push("e")}`);
console.log(letras);
console.log(`Tamanho: ${letras.push("f", "g", "h")}`);
console.log(letras);

///shift() :: remove e retorna o primeiro elemento do Array
console.log(letras.shift());
console.log(letras);

///unshift() :: adiciona um elemento na primeira posição e retorna o tamanho do Array
console.log(`Tamanho: ${letras.unshift("z")}`);
console.log(letras);
console.log(`Tamanho: ${letras.unshift("1", "2", "3")}`);
console.log(letras);

///splice() :: remove e retorna, a partir de uma posição, uma quantiade especificada de elementos
/////Parametros:: Posição Inicial, Quantidade
console.log(letras.splice(4, 3));
console.log(letras);

////Remove na posição, a quantidade indicada, e insere novos elementos a partir de tal posição
/////Parametros:: Posição Inicial, Quantidade, elementos a ser adcionados
console.log(letras.splice(5, 1, "Danilo", "Daniele", "Lucas", "Tereza"));
console.log(letras);

////Adicionando a partir de um array
const lugares = ["Minha Casa", "Praia", "Montanha"];
console.log(letras.splice(2, 1, ...lugares));
console.log(letras);

