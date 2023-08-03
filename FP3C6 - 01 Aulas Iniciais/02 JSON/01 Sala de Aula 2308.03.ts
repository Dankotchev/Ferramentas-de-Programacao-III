// SALA DE AULA 2308.03
//Objeto mais simples
let obj1 = {
    "id": 1,
    "nome": "Danilo",
};

console.log(obj1.id);
console.log(obj1.nome);
console.log(obj1);
console.clear();

//Objetos com "campos de atributos" separados
let obj2 = {
    "id": 1,
    "nome": "Danilo",
    "telefone": {
        "ddd": 18,
        "numero": "95842-0102",
    },
    "emails": [
        {
            "email": "danilo.quirino@email.com",
            "tipo": "pessoal"
        },
        {
            "email": "quirino.danilo@email.com",
            "tipo": "trabalho"
        }
    ],
    "valores": [1, 6, 8],
    "pets": ["Lucinha", "Ritinha"]
};

console.log(obj2.telefone.ddd);
console.log(obj2.telefone.numero);
console.log(obj2.emails[0].email);  //Acessa o atributo
console.log(obj2.emails[0].tipo);   //Acessa o atributo
console.log(obj2.emails[1]);        //Acesa o objeto
console.clear();

let obj3 = [
    {
        "nome": "Maria",
        "id": 1
    },
    {
        "nome": "Carla",
        "id": 2
    },
    {
        "nome": "Danilo",
        "id": 3
    },
    {
        "nome": "Xavier",
        "id": 4
    }
]

console.log(obj3);

// Lista os nomes dos elementos do array
for (let i = 0; i < obj3.length; i++) {
    console.log(obj3[i].nome);
}

console.clear();
// forEach()
obj3.forEach( valor => console.log(valor.nome));

