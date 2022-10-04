import { IEspecialidade } from "./IEspecialidade";

export interface IMedico {
    id: number;
    crm: number;
    nome: string;
    especialidade: IEspecialidade;
}