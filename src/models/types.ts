export enum State {
    inprogress = "En Progreso",
    pending = "Pendiente",
    finished = "Finalizado"
}

export const Roles = {
    ADVISER: "adviser",
    TECHNICIAN: "technician",
    CLIENT: "client"
} as const

export const RoleValues = {
    [Roles.ADVISER]: "Asesor",
    [Roles.TECHNICIAN]: "Técnico",
    [Roles.CLIENT]: "Cliente"
}

export type Role = typeof Roles[keyof typeof Roles];

export type Vehicle = {
    model: string,
    licenseplate: string,
    image: string,
    year?: number
};

export type WorkOrder = {
    id: number,
    vehicle: Vehicle,
    state: keyof typeof State,
    entry: string,
    departure: string,
    client: string,
    adviser: string
}

export type User = {
    id: number,
    name: string
}

export type Task = {
    name: string,
    description: string,
    day: Date,
    technician: User
};