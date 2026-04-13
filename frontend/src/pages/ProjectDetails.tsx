import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardBody, CardHeader, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import Notfound from './Notfound';
import { FiSearch } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { MdAdd, MdCalendarToday } from 'react-icons/md';
import { RiEditFill } from 'react-icons/ri';
import { TaskModal } from '../components/CreateTaskModal';
import { Project, Task } from "../assets/types/type";
import { BASE_URL } from "../assets/api/api";

export const ProjectDetails = ({ isLightmode }: { isLightmode: boolean }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskstoFilter, setTaskstoFilter] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const statuses = ["All", "Completed", "In Progress", "In Queue", "On Hold"];
    const [status, setStatus] = useState("All");
    // find existing project
    const project = projects.find((project: any) => String(project.id) === id);

    // create-task modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    // fetch projects from api
    const fetchProjects = async () => {
        const response = await fetch(`${BASE_URL}/projects`);
        const projects: any = await response.json();
        setProjects(projects);
    };
    // fetch tasks from api
    const fetchTasks = async () => {
        // const response = await fetch(`${BASE_URL}/projects/${id}/tasks`);
        const response = await fetch(`${BASE_URL}/tasks`);
        const tasks: any = await response.json();
        setTasks(tasks);
        setTaskstoFilter(tasks);
    };
    useEffect(() => { fetchProjects(); fetchTasks() }, []);

    // search filter
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const filteredTasks = taskstoFilter.filter((task: Task) => {
            const projectMatch = String(task.projectId) === id;
            const matchedAssignee = task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
            const matchedSTatus = status === "All" ? true : task.status === status;
            return projectMatch && matchedAssignee && matchedSTatus;
        });
        setTasks(filteredTasks);
    }, [searchTerm, status]);

    if (!project) {
        return <Notfound isLightmode={isLightmode} />
    }

    return (
        <div className={`w-full min-h-screen ${isLightmode ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'} pb-5`}>
            <div className={`pt-3 flex flex-col items-center justify-center gap-10 m-auto ${isLightmode ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'}`}>
                <div className={`w-full flex items-center justify-between px-2`}>
                    <Text className={`text-xl font-medium`}>{project.title}</Text>
                    <Button leftIcon={<MdAdd size={25} />} type="button" bgGradient="linear(to-r, teal.300, teal.600)" colorScheme='teal' className={`py-2 shadow-lg`}
                        onClick={onOpen}
                    >
                        Create Task
                    </Button>
                </div>

                {/* search & filter task */}
                <div className={`w-full flex items-start justify-between gap-10 px-4`}>
                    <Box
                        className={`flex items-center justify-start shadow-md ${isLightmode ? 'bg-gray-300/20' : 'bg-gray-500/30'} px-4 py-0 rounded-md w-100`}
                    >
                        <FiSearch />
                        <Input type='search' border='none' outline='none' focusBorderColor='transparent' bgColor='transparent' placeholder='Search assignee name...'
                            className={`w-xl px-4 py-2 rounded-md`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Box>
                    {/* status */}
                    <Menu>
                        <MenuButton variant='solid' as={Button} rightIcon={<FaChevronDown />} textAlign="start" className={`shadow-md w-50 items-start justify-between`}
                            bgColor={`${isLightmode ? 'white' : '#2b3343'}`}
                            textFillColor={`${isLightmode ? 'black' : 'white'}`}
                            color={`${isLightmode ? 'black' : 'white'}`}
                            _hover={{ bgColor: `${isLightmode ? 'gray.100' : 'gray.600'}` }}
                        >
                            {status === "All" ? 'Status' : status}
                        </MenuButton>
                        <MenuList bgColor={`${isLightmode ? 'white' : 'gray.200'}`}>
                            {statuses.map((s: string) => (
                                <MenuItem
                                    bgColor={`${isLightmode ? 'white' : 'gray.200'}`}
                                    color='black' key={s} onClick={() => setStatus(s)}
                                    _hover={{ bgColor: isLightmode ? 'gray.100' : 'gray.300', color: 'blue.500', }}
                                >
                                    {s}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                </div>

                {/* tasks list */}
                <div className={`w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-2`}>
                    {tasks.map((task: any) => (
                        <Card key={task.id} className={`m-2 px-2 py-4`} bgColor={`${isLightmode ? 'gray.200' : 'gray.50'}`}>
                            <CardHeader borderWidth='0px' padding='10px' className={`flex items-center justify-between`}>
                                <div>
                                    <Heading size='md'>{task.title}</Heading>
                                    <Text fontSize='sm' color='gray.500' className={`flex items-center gap-1 mt-2`}>Assigned by: {task.assignee}</Text>
                                </div>
                                <div className={`flex items-center justify-between gap-2`}>
                                    <RiEditFill size={33} className={`${isLightmode ? 'bg-gray-400/50 p-2 rounded-md hover:bg-gray-400/80' : 'bg-gray-200/50 p-2 rounded-md hover:bg-gray-300/80'} hover:cursor-pointer`}
                                        onClick={() => navigate(`/projects/${id}/task/${task.id}`)}
                                    />
                                    {/* priority */}
                                    <Text
                                        borderWidth={`${isLightmode ? '1px' : '1px'}`}
                                        borderColor={`${isLightmode ? task.priority === 'Low' ? 'blue.300' : task.priority === 'Medium' ? 'yellow.300' : task.priority === 'High' ? 'red.300' : 'blue.300' : 'gray.200'}`}
                                        bgColor={
                                            task.priority === 'Low' ? 'blue.100' :
                                                task.priority === 'Medium' ? 'yellow.100' :
                                                    task.priority === 'High' ? 'red.100' : 'gray.100'
                                        }
                                        color={
                                            task.priority === 'Low' ? 'blue.700' :
                                                task.priority === 'Medium' ? 'yellow.700' :
                                                    task.priority === 'High' ? 'red.700' : 'gray.700'
                                        }
                                        className={`px-2 py-1 rounded-md text-sm font-semibold`}
                                    >
                                        {task.priority}
                                    </Text>
                                </div>
                            </CardHeader>
                            <CardBody borderWidth='0px' padding='5px' className={`flex flex-col items-strech justify-between`}>
                                <Text>{task.description}</Text>
                                <Box borderWidth='0px' padding='0px' mt={2} mb={2} className={`flex items-center justify-between`}>
                                    <Text fontSize='sm' color='gray.500' className={`flex items-center gap-1 mt-2`}>
                                        <strong>Deadline: </strong>
                                        {task.date}<MdCalendarToday size={16} />
                                    </Text>
                                    {/* status */}
                                    <Text
                                        borderWidth={`${isLightmode ? '1px' : '1px'}`}
                                        borderColor={`${isLightmode ? task.status === 'Completed' ? 'green.300' : task.status === 'In Progress' ? 'yellow.300' : task.status === 'On Hold' ? 'red.300' : 'blue.300' : 'gray.200'}`}
                                        bgColor={
                                            task.status === 'Completed' ? 'green.100' :
                                                task.status === 'In Progress' ? 'yellow.100' :
                                                    task.status === 'On Hold' ? 'red.100' : 'blue.100'
                                        }
                                        color={
                                            task.status === 'Completed' ? 'green.700' :
                                                task.status === 'In Progress' ? 'yellow.700' :
                                                    task.status === 'On Hold' ? 'red.700' : 'blue.700'
                                        }
                                        className={`px-2 py-1 rounded-md text-sm font-semibold`}
                                    >
                                        {task.status}
                                    </Text>
                                </Box>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>

            {/* modal */}
            <TaskModal isOpen={isOpen} onClose={onClose} fetchTasks={fetchTasks} projectId={id!}/>

            <Outlet context={{tasks, fetchTasks}}/>
        </div>
    );
};
