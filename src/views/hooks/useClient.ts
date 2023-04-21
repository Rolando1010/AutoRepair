import { useEffect, useState } from "react";
import requests from "../utils/requests";
import { type User } from "src/models/types";

const useClient = () => {
    const [clients, setClients] = useState<User[]>([]);

    const updateClients = () => {
        requests.get<User[]>("/api/users/clients").then(setClients);
    }

    useEffect(updateClients, []);

    return { clients, updateClients };
}

export default useClient;