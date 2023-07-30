console.clear();    // Limpeza de console !=

// Declarar variáveis
//  var :: variáveis globais;
//  let :: variáveis locais;
//  const :: variáveis com valor constante;

if(true) {
    // Variável global declarada dentro de um escopo local
    var numero = 2;

    // Variável declarada detro do escopo usando let, 
    let valor = 10;
    valor = valor * 2;
}

console.log(numero);
// console.log(valor); // Erro de variável não declarada

if(true){
    const soma = 5;
    // soma = soma + 5;    // Erro
}

// console.log(soma);   // Erro de variável não declarada no escopo


// Tipos de variáveis
    // Numéricas (inteira e decimal)
let valor: number = 10;
//valor = "Teste";  // Erro
valor = 3;

    // Strings
let nome: string = "Danilo";

console.log(valor);
console.log(nome);

    // Lógica booleana
let achou: boolean = false;

    // Variável que pode receber qualquer tipos de valor
let qualquer: any = 45;
console.log("Qualquer: "+ qualquer);
qualquer = "Danilo";
console.log("Qualquer: "+ qualquer);
qualquer = true;
console.log("Qualquer: "+ qualquer);


let duplaPersonalidade: number | string;
duplaPersonalidade = 100;
duplaPersonalidade = "Doida";
//duplaPersonalidade = true;  // Erro

    // Inferência de tipo
let x = 0;  // number
let y = "0"; // string
let z;
z = true;   // any, a inferência de tipo se da na inicialização

console.clear();

    // Comparação == ou ===
// == Compara o conteúdo/valor
// === Compara o conteúdo e o tipo


    // Array
// Declarando vetor de string e inicializando como vazio
const nomes: string[] = ["Danilo", "Giovana", "Samara"];
console.log(nomes[0]);

nomes[1] = "Daniele";
console.log(nomes[1]);

for(let i = 0; i < nomes.length; i++){
    console.log(nomes[i]);
}

for(let nome of nomes){
    console.log(nome);
}

console.clear();

// Definindo uma função
function exibir(): void{
    console.log("olá");
}
exibir();

function soma(numero1: number, numero2: number): number{
    return numero1 + numero2;
}
const resultado = soma(10, 20);
console.log("resultado: " + resultado);

//Arrow Function ou função anonima
const funcaoAnonima = () => console.log("Função anonima");
funcaoAnonima();

const soma2 = (numero1: number, numero2: number) => numero1 + numero2;
const resul = soma2(10,20);
console.log("Resultado soma = "+ resul);
