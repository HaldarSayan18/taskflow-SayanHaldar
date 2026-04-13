export type Project = {
    id: string;
    title: string;
    description: string;
    date: string;
    status: 'Completed' | 'In Progress' | 'On Hold' | 'In Queue';
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
    title: string,
    description: string,
    date: string,
    status: string,
};

export type TaskFormValues = {
    projectId: string;
    title: string;
    description: string;
    date: string;
    status: string;
    priority: string;
    assignee: string;
};