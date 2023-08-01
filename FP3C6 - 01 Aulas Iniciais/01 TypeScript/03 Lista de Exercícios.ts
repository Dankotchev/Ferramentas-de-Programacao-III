//  1. Crie uma função que receba por parâmetro um vetor de números e retorne o maior elemento.
const numeros: number[] = [25, 36, 10, 8, -8, 1, 0, 9, 6, 45, 0];

function maiorElemento(v: number[]): number {
    let maior = v[0];
    v.forEach(valor => {
        if (valor > maior)
            maior = valor;
    });
    return maior;
}

console.log(`Maior valor: ${maiorElemento(numeros)}`);

//  2. Crie uma função que receba por parâmetro um vetor de números e retorne a soma de todos os elementos.
function somatorio(vetor: number[]): number {
    return vetor.reduce((somatoria, valorAtual) => somatoria + valorAtual, 0)
}

console.log(`Somatorio = ${somatorio(numeros)}`);

//  3. Crie uma função que receba por parâmetro um vetor de números e retorne o elemento com menor valor.
function menorElemento(vetor: number[]) {
    let menor = vetor[0];
    vetor.forEach(valor => {
        if (valor < menor)
            menor = valor;
    });
    return menor;
}

console.log(`Menor valor: ${menorElemento(numeros)}`);

//  4. Crie uma função que receba por parâmetro um vetor de números,
//      calcule o dobro de cada elemento e retorne o resultado em um vetor.
function dobrarElementosVetor(vetor: number[]): number[] {
    return vetor.map(valor => valor * 2);
}

console.log(`Vetor com elementos "dobrados": ${dobrarElementosVetor(numeros)}`);

//  5. Crie uma função que receba por parâmetro o peso e a altura de uma pessoa e retorne o IMC. imc = peso / altura * altura;
let peso: number = 78;
let altura: number = 1.71;

let imc = (peso: number, altura: number) => peso / (altura * altura);

console.log(`IMC = ${imc(peso, altura)}`);
console.log(`IMC = ${imc(50, 1.65)}`);

//  6. Crie uma função que receba por parâmetro um vetor de números e
//      retorne a média entre os elementos do vetor.
let mediaVetor = (vetor: number[]) => somatorio(vetor) / vetor.length;

console.log(`Média = ${mediaVetor(numeros)}`);

//  7. Crie uma função que receba por parâmetro um vetor de números
//      e retorne os elementos que são maiores do que a média entre eles.
function maiorQueMedia(vetor: number[]): number[] {
    let media = mediaVetor(vetor);
    return vetor.filter((valor) => {
        if (valor > media)
            return true;
        return false;
    });
}

console.log(`Maiores que a média: ${maiorQueMedia(numeros)}`);

//  8. Crie uma função que receba por parâmetro um vetor de números
//      e retorne um vetor com a ordem inversa dos elementos.
function ordemInversa(vetor: number[]): number[] {
    let retorno: number[] = [];
    vetor.forEach((valor) => retorno.unshift(valor));
    return retorno;
}

console.log(`Ordem Direta: ${numeros}`);
console.log(`Ordem Inversa: ${ordemInversa(numeros)}`);

//  9. Crie uma função que receba por parâmetro um vetor de números e uma taxa (porcentagem),
//      calcule a taxa para cada elemento do vetor e retorne os novos valores em um vetor.
function incrementarTaxa(vetor: number[], taxa: number): number[] {
    return vetor.map((valor) => valor * (1 + taxa));
}

console.log(`Incrementando em 10%: ${incrementarTaxa(numeros, 0.10)}`);

// Crie uma função que receba por parâmetro um número e retorne se o número é primo ou não.
function primo(valor: number): string {
    let primo: boolean = true;
    if (valor == 2) {
        primo = true;
    } else if (valor % 2 == 0) {
        primo = false;
    } else {
        for (let i = 3; i < valor / 2; i += 2) {
            if (valor % i == 0) {
                primo = false;
            }
        }
    }

    return primo ? "É primo" : "Não é primo";
}

console.clear();
let verificar: number = 2;
console.log(`${verificar} é primo? ${primo(verificar)}`);
