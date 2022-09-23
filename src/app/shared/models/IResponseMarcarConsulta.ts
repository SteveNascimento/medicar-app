export interface IResponseMarcarConsulta {
    id: number,
	dia: string,
	horario: string,
	data_agendamento: string,
	medico: {
		id: number,
		crm: number,
		nome: string,
		especialidade: {
			id: number,
			nome: string
		}
	}
}