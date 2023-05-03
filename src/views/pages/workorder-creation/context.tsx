import { useRouter } from "next/router";
import { Dispatch, SetStateAction, createContext, useContext, useMemo, useState } from "react";
import { type Vehicle, type Task } from "src/models/types";
import toast from "src/views/components/toast";
import requests from "src/views/utils/requests";

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
    const valueData = useMemo(() => ({data, setData}), [data]);
    
    return (
        <workorderContext.Provider value={valueData}>
            {children}
        </workorderContext.Provider>
    );
}

const useWorkOrderCreation = () => {
    const { data, setData } = useContext(workorderContext);
    const router = useRouter();
    
    const setClient = (clientID: number) => {
        setData({...data, clientID});
    }

    const setVehicle = (key: keyof WorkOrderData["vehicle"], value: string | number) => {
        setData({...data, vehicle: {...data.vehicle, [key]: value}});
    }

    const addTask = (task: Task) => {
        setData({...data, tasks: [...data.tasks, task]});
    }

    const uploadWorkorder = () => {
        const workorderUpload = requests.post("/api/workorders", {...data, tasks: data.tasks.map(t => {
            return {...t, day: t.day.toISOString()}
        })})
        toast.promise(
            workorderUpload,
            "Guardando orden de trabajo, por favor espera.",
            "Orden de trabajo guardada",
            "Error guardando orden de trabajo"
        )
        workorderUpload.then(() => {
            router.push("/asesor/ordenes-trabajo");
        });
    }
    
    return {
        setClient,
        setVehicle,
        tasks: data.tasks,
        addTask,
        uploadWorkorder
    }
}

export {
    WorkOrderContext,
    useWorkOrderCreation
}