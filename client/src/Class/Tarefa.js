export default class Tarefa {
    constructor(id, nome , prioridade){
        this.id = id;
        this.nome = nome;
        this.prioridade = prioridade;
        this.concluida = false;
    }
}