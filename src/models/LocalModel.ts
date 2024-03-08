import AtividadeModel from "./AtividadeModel";

class LocalModel {
    local: string;
    nivel: string;
    sede: boolean;
    atividades: AtividadeModel[];
    coordenadas: string;

    constructor(local: string, nivel: string, sede: boolean, atividades: AtividadeModel[], coordenadas: string) {
            this.local = local;
            this.nivel = nivel;
            this.sede = sede;
            this.atividades = atividades;
            this.coordenadas = coordenadas;
        }
}

export default LocalModel;