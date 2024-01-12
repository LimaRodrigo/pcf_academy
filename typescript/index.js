class Pessoa {
    nome;
    ultimoNome;

    constructor(_nome, _ultimoNome) {
        this.nome = _nome;
        this.ultimoNome = _ultimoNome;
    }
    getFuncao(id) {
        return 38;
    }
}

class Funcionario extends Pessoa {
    nivel;
}

//Similar enum
const Nivel = {
    jr: 1,
    pleno: 2,
    senior: 3
}