import { IMedico } from "./IMedico";

export interface IConsulta {
    id: number;
    dia: string;
    horario: string;
    data_agendamento: string;
    medico: IMedico;
}