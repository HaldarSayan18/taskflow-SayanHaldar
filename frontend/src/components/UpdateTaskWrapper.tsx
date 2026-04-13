// import { useNavigate, useParams } from "react-router-dom"
// import { tasksData } from "../assets/data/tasksData";
// import { UpdateTaskModal } from "./UpdateTaskModal";
// import { Task } from "../assets/types/type";

// export const UpdateTaskModalWrapper = ({tasks}: { tasks: Task[] }) => {
//     const { taskId } = useParams<{ taskId: string }>();
//     const navigate = useNavigate();

//     const task_id: any = tasks.find((t: Task) => String(t.id) === taskId);
//     const handleClose = () => navigate(-1);

//     if (!task_id) return null;
//     return (
//         <UpdateTaskModal isOpen={true} onClose={handleClose} task={task_id} />
//     )
// }

import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { UpdateTaskModal } from "./UpdateTaskModal";
import { Task } from "../assets/types/type";

export const UpdateTaskModalWrapper = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const navigate = useNavigate();

    const { tasks, fetchTasks } = useOutletContext<{
        tasks: Task[]; fetchTasks: () => void;
    }>();

    const task_id: any = tasks.find((t: Task) => String(t.id) === taskId);
    const handleClose = () => navigate(-1);

    if (!task_id) return null;
    return (
        <UpdateTaskModal isOpen={true} onClose={handleClose} task={task_id} fetchTasks={fetchTasks} />
    )
}