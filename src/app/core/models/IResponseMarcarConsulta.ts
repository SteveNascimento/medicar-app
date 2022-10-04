import { IMedico } from "./IMedico";

export interface IResponseMarcarConsulta {
    id: number;
	dia: string;
	horario: string;
	data_agendamento: string;
	medico: IMedico;
}