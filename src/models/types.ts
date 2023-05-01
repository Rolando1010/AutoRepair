export const States = {
    IN_PROGRESS: "inprogress",
    PENDING: "pending",
    FINISHED: "finished"
} as const;

export const StateValues = {
    [States.IN_PROGRESS]: "En Progreso",
    [States.PENDING]: "Pendiente",
    [States.FINISHED]: "Finalizado"
}

export type State = typeof States[keyof typeof States];

export const Roles = {
    ADVISER: "adviser",
    TECHNICIAN: "technician",
    CLIENT: "client"
} as const;

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
    year?: number,
    owner?: User
};

export type WorkOrder = {
    id: number,
    vehicle: Vehicle,
    state: State,
    entry: string,
    departure: string,
    adviser: string,
    client: User,
    tasks?: Task[]
}

export type User = {
    id: number,
    name: string
}

export type Task = {
    id: number,
    name: string,
    description: string,
    day: Date,
    technician?: User,
    state: State,
    vehicle: Vehicle,
    reports?: TaskReport[]
};

export type TaskReport = {
    id: number,
    creation: Date,
    description: string
}