import { useEffect, useMemo, useState } from "react";
import requests from "../utils/requests";
import { Roles, type User } from "src/models/types";

type RoleUser = {role: string} & User;
type ClientsAndTechniciansSplited = {clients: User[], technicians: User[]};

const useClientAndTechnicians = () => {
    const [clientsAndTechnicians, setClientsAndTechnicians] = useState<RoleUser[]>([]);
    
    const {clients, technicians}: ClientsAndTechniciansSplited = useMemo(() => {
        return clientsAndTechnicians.reduce((acc: ClientsAndTechniciansSplited, el) => {
            const user = {id: el.id, name: el.name};
            if(el.role === Roles.CLIENT) acc.clients.push(user);
            else acc.technicians.push(user);
            return acc;
        }, {clients: [], technicians: []});
    }, [clientsAndTechnicians]);

    const updateClientsAndTechnicians = () => {
        requests
            .get<RoleUser[]>("/api/users/clients_and_technicians")
            .then(setClientsAndTechnicians);
    }

    useEffect(updateClientsAndTechnicians, []);

    return {
        clients,
        technicians,
        updateClientsAndTechnicians
    }
}

export default useClientAndTechnicians;