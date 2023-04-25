import { Dispatch, SetStateAction, createContext, useContext, useMemo, useState } from "react";
import { type Vehicle, type Task } from "src/models/types";

type WorkOrderData = {
    clientID: number,
    vehicle: Vehicle,
    tasks: Task[]
}

const INITIAL_STATE: WorkOrderData = {
    clientID: 0,
    vehicle: {
        model: "",
        licenseplate: "",
        image: "",
        year: 0
    },
    tasks: []
};

const workorderContext = createContext<{
    data: WorkOrderData;
    setData: Dispatch<SetStateAction<WorkOrderData>>;
}>({data: INITIAL_STATE, setData: () => {}});

const WorkOrderContext = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<WorkOrderData>(INITIAL_STATE);
    const valueData = useMemo(() => ({ data, setData }), [data]);

    return (
        <workorderContext.Provider value={valueData}>
            {children}
        </workorderContext.Provider>
    );
}

const useWorkOrderCreation = () => {
    const { data, setData } = useContext(workorderContext);
    
    const setClient = (clientID: number) => {
        setData({...data, clientID});
    }

    const setVehicle = (key: keyof WorkOrderData["vehicle"], value: string | number) => {
        setData({...data, vehicle: {...data.vehicle, [key]: value}});
    }

    const addTask = (task: Task) => {
        setData({...data, tasks: [...data.tasks, task]});
    }
    
    return {
        setClient,
        setVehicle,
        tasks: data.tasks,
        addTask
    }
}

export {
    WorkOrderContext,
    useWorkOrderCreation
}