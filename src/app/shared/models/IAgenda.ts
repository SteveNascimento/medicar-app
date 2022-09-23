import { IAgendaHoras } from "./IAgendaHoras"

export interface IAgenda {
    id: number,
    medico: {
            id: number,
            crm: number,
            nome: string,
            especialidade: {
                id: number,
                nome: string
            }
        },
    dia: string,
    horarios: IAgendaHoras[]
}