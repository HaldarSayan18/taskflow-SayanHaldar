import { useNavigate, useParams } from "react-router-dom"
import { Project } from "../assets/types/type";
import { UpdateProjectModal } from "./UpdateProjectModal";
import { useEffect, useState } from "react";
import { BASE_URL } from "../assets/api/api";

export const UpdateProjectModalWrapper = () => {
    // console.log('modal mounted');
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            const res = await fetch(`${BASE_URL}/projects/${id}`);
            const data = await res.json();
            setProject(data);
        };
        fetchProject();
    }, [id]);
    // console.log('project===>', project)

    const handleClose = () => navigate(-1);

    if (!project) return null;
    return (
        <UpdateProjectModal isOpen={true} onClose={handleClose} project={project} />
    )
}