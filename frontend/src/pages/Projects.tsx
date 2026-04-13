import { Box, Button, Card, CardBody, CardHeader, Heading, Input, Text, useDisclosure, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { MdAdd, MdCalendarToday } from "react-icons/md";
import { ProjectModal } from "../components/CreateProjectModal";
import { FaChevronDown } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Project } from "../assets/types/type";
import { BASE_URL } from "../assets/api/api";


const Projects = ({ isLightmode }: { isLightmode: boolean }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [projects, setProjects] = useState<Project[]>([]);
    const statuses = ["All", "Completed", "In Progress", "In Queue", "On Hold"];
    const [status, setStatus] = useState("All");

    // fetch projects from api
    const fetchProjects = async () => {
        const response = await fetch(`${BASE_URL}/projects`);
        const projects: any = await response.json();
        setProjects(projects);
    };
    useEffect(() => { fetchProjects() }, []);

    // search filter
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const filteredProjects = projects.filter((project: any) =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProjects(filteredProjects);
    }, [searchTerm]);

    return (
        <div className={`w-full min-h-screen ${isLightmode ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'} pb-5`}>
            <div className={`flex flex-col items-center justify-center gap-10 ${isLightmode ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'}`}>
                {/* project heading */}
                <div className={`w-full h-full flex items-center justify-between px-5 mt-4`}>
                    <Text fontSize='xl' fontWeight='bold'>Projects</Text>
                    <Button leftIcon={<MdAdd size={25} />} type="button" bgGradient="linear(to-r, teal.300, teal.600)" colorScheme='teal' className={`py-2 shadow-lg`}
                        onClick={onOpen}
                    >
                        Create New Project
                    </Button>
                </div>

                {/* search & filter project */}
                <div className={`w-full flex items-start justify-between gap-10 px-4`}>
                    <Box
                        className={`flex items-center justify-start shadow-md ${isLightmode ? 'bg-gray-300/20' : 'bg-gray-500/30'} px-4 py-0 rounded-md w-100`}
                    >
                        <FiSearch />
                        <Input type='search' border='none' outline='none' focusBorderColor='transparent' bgColor='transparent' placeholder='Search projects...'
                            className={`w-xl px-4 py-2 rounded-md`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Box>
                    <Menu>
                        <MenuButton variant='solid' as={Button} rightIcon={<FaChevronDown />} textAlign="start" className={`shadow-md w-50 items-start justify-between`}
                            bgColor={`${isLightmode ? 'white' : '#2b3343'}`}
                            textFillColor={`${isLightmode ? 'black' : 'white'}`}
                            color={`${isLightmode ? 'black' : 'white'}`}
                            _hover={{ bgColor: `${isLightmode ? 'gray.100' : 'gray.600'}` }}
                        >
                            {status === "All" ? "Status" : status}
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

                {/* project list */}
                <div className={`w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 px-2`}>
                    {projects.map((project: any) => (
                        <Card key={project.id} className={`m-2 px-2 py-4`} bgColor={`${isLightmode ? 'gray.200' : 'gray.50'}`}>
                            <CardHeader borderWidth='0px' padding='10px' className={`flex items-center justify-between`}>
                                <Heading size='md'>{project.title}</Heading>
                                <Link to={`/projects/${project.id}`}>
                                    <FaExternalLinkAlt size={33} className={`${isLightmode ? 'bg-gray-400/50 p-2 rounded-md hover:bg-gray-400/80' : 'bg-gray-200/50 p-2 rounded-md hover:bg-gray-300/80'} hover:cursor-pointer`} />
                                </Link>
                            </CardHeader>
                            <CardBody borderWidth='0px' padding='5px' className={`flex flex-col items-strech justify-between`}>
                                <Text>{project.description}</Text>
                                <Box borderWidth='0px' padding='0px' mt={2} mb={2} className={`flex items-center justify-between`}>
                                    <Text fontSize='sm' color='gray.500' className={`flex items-center gap-1 mt-2`}>
                                        <MdCalendarToday size={16} />{project.date}
                                    </Text>
                                    <Text
                                        borderWidth={`${isLightmode ? '1px' : '1px'}`}
                                        borderColor={`${isLightmode ? project.status === 'Completed' ? 'green.300' : project.status === 'In Progress' ? 'yellow.300' : project.status === 'On Hold' ? 'red.300' : 'blue.300' : 'gray.200'}`}
                                        bgColor={
                                            project.status === 'Completed' ? 'green.100' :
                                                project.status === 'In Progress' ? 'yellow.100' :
                                                    project.status === 'On Hold' ? 'red.100' : 'blue.100'
                                        }
                                        color={
                                            project.status === 'Completed' ? 'green.700' :
                                                project.status === 'In Progress' ? 'yellow.700' :
                                                    project.status === 'On Hold' ? 'red.700' : 'blue.700'
                                        }
                                        className={`px-2 py-1 rounded-md text-sm font-semibold`}
                                    >
                                        {project.status}
                                    </Text>
                                </Box>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
            {/* project modal */}
            <ProjectModal isOpen={isOpen} onClose={onClose} fetchProjects={fetchProjects} />
        </div>
    )
}
export default Projects