import { Navigate, useLocation, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getTaskById } from "@/api/TaskAPI"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {

    const params = useParams()
    const projectId = params.projectId!
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('editTask')!

    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId, /// el "!!" lo que hace es convertir la variable a boolean, si es string vació devuelve False
        /// enabled habilita la consulta. en este caso lo hace en base a una variable
        retry: 1
    })

    if (isError) return <Navigate to={'/404'} />
    if (data) return <EditTaskModal data={data} taskId={taskId} />
}
