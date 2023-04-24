import { type User } from "src/models/types";

export type Task = {
    name: string,
    description: string,
    day: Date,
    technician: User
};