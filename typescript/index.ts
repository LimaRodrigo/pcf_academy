/**
 * Tipos Existentes
 * 
Number	    a double-precision IEEE 754 floating point.
String	    an immutable UTF-16 string.
BigInt	    integers in the arbitrary precision format.
Boolean	    true and false.
Symbol	    a unique value usually used as a key.
Null	    equivalent to the unit type.
Undefined	also equivalent to the unit type.
Object	    similar to records.
 */

//Interface and method Generics
interface IPessoa {
    getFuncao<T>(id: T);
}

//Composing Types
type Profissao = "DEV" | "CONSULTOR" | "OUTRO";

export class Pessoa implements IPessoa {

    nome: string;
    ultimoNome?: string;


    constructor(_nome: string, _ultimoNome?: string) {
        this.nome = _nome;
        this.ultimoNome = _ultimoNome;
    }


    getFuncao<T>(id: T): number | null | string {
        return 38;
    }
}

export class Funcionario extends Pessoa {
    profissao: Profissao;
    nivel: Nivel
}

export enum Nivel {
    jr = 1,
    pleno = 2,
    senior = 3
}