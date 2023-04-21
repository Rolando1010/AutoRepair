export enum State {
    inprogress = "En Progreso",
    pending = "Pendiente",
    finished = "Finalizado"
}

export type WorkOrder = {
    id: number,
    vehicle: {
        image: string,
        model: string,
        licenseplate: string,
    },
    state: keyof typeof State,
    entry: string,
    departure: string,
    client: string,
    adviser: string
}