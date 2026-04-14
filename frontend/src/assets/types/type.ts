export type SignupForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};
export type SignupRequest = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export type SigninForm = {
    email: string;
    password: string;
};

export type Project = {
    id: string;
    title: string;
    description: string;
    // status: 'Completed' | 'In Progress' | 'On Hold' | 'In Queue';
};

export type Task = {
    id: string;
    projectId: string;
    title: string;
    description: string;
    date: string;
    status: 'Completed' | 'In Progress' | 'On Hold' | 'In Queue';
    priority: 'Low' | 'Medium' | 'High';
    assignee: string;
};

export type ProjectFormValues = {
    owner: string,
    id: string,
    title: string,
    description: string,
    date: string,
    // status: string,
};

export type UpdateProjectForm = {
    title: string,
    description: string,
    // status: string,
};

export type TaskFormValues = {
    projectId: string;
    title: string;
    description: string;
    date: string;
    status: string;
    priority: string;
    assigneeId: string;
    assignee: string;
};

export type UpdateTaskForm = {
    title: string;
    description: string;
    date: string;
    status: string;
    priority: string;
    assignee: string;
};