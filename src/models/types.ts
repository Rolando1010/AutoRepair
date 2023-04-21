export enum State {
    inprogress = "En Progreso",
    pending = "Pendiente",
    finished = "Finalizado"
}

export enum Role {
    adviser = "Asesor",
    technician = "Técnico",
    client = "Cliente"
}

export type WorkOrder = {
    id: number,
    vehicle: {
        image: string,
        model: string,
        licenseplate: string,
    },
    state: State,
    entry: string,
    departure: string,
    client: string,
    adviser: string
}