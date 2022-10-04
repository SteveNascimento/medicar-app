import { IAgendaHoras } from "./IAgendaHoras"
import { IMedico } from "./IMedico"

export interface IAgenda {
    id: number;
    medico: IMedico;
    dia: string;
    horarios: IAgendaHoras[];
}