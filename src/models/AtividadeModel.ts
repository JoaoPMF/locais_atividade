class AtividadeModel {
    
    nome: string;
    seccao: number[];
    data: string;
    noites: string;
    participantes: string;

    constructor(nome: string, seccao: number[], data: string, noites: string, participantes: string) {
            this.nome = nome;
            this.seccao = seccao;
            this.data = data;
            this.noites = noites;
            this.participantes = participantes;
        }
}

export default AtividadeModel;