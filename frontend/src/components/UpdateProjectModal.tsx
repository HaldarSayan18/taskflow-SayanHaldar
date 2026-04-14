import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useToast,
    FormControl,
    FormErrorMessage
} from '@chakra-ui/react'
import { useFormik } from 'formik';
import { useState } from 'react';
// import { FaChevronDown } from 'react-icons/fa6';
import { RxUpdate } from "react-icons/rx";
import { projectSchema } from '../utils/validation';
import { BASE_URL } from '../assets/api/api';
import { UpdateProjectForm } from '../assets/types/type';
import { useNavigate } from 'react-router-dom';

export function UpdateProjectModal({ isOpen, onClose, project, }: {
    isOpen: boolean; onClose: () => void, project: any;
}) {
    // console.log("Modal rendeder.")
    const toast = useToast();
    const navigate = useNavigate();
    // const statuses = ["Completed", "In Progress", "In Queue", "On Hold"];
    const [loading, setLoading] = useState(false);

    const formik = useFormik<UpdateProjectForm>({
        // enableReinitialize: true,
        initialValues: {
            title: project?.title || "",
            description: project?.description || "",
        },
        validationSchema: projectSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}/projects/${project.id}`, {
                    method: 'PATCH',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(values)
                });
                await response.json();
                // const updatedTask = await response.json();
                // console.log('updated', updatedTask);
                toast({
                    title: 'Project Updated',
                    description: "Project has been updated successfully.",
                    status: 'success',
                    duration: 1000,
                    isClosable: true,
                    position: 'top'
                });
                // fetchProjects();
                resetForm();
                onClose();
                navigate('/projects');
            } catch (error: any) {
                // setLoading(true);
                toast({
                    title: 'Error in updating',
                    description: error.message || "Something went wrong",
                    status: 'error',
                    duration: 1000,
                    isClosable: true,
                    position: 'top'
                })
            } finally {
                setLoading(false);
            }
        }

    });

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form id='task-form-update' className={`grid grid-cols-2 place-items-center gap-2`} onSubmit={formik.handleSubmit}>
                        {/* title */}
                        <FormControl isInvalid={!!formik.errors.title && formik.touched.title}>
                            <Input type='text' placeholder='Task title' className={`col-span-2`}
                                value={formik.values.title} name="title"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
                        </FormControl>

                        {/* description */}
                        <FormControl isInvalid={!!formik.errors.description && formik.touched.description}>
                            <Input type='text' placeholder='Task description' className={`col-span-2`}
                                value={formik.values.description} name='description'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
                        </FormControl>

                        {/* status */}
                        {/* <FormControl isInvalid={!!formik.errors.status && formik.touched.status}>
                            <Menu>
                                <MenuButton variant="outline" as={Button} rightIcon={<FaChevronDown />} textAlign="start" className={`w-full items-start justify-between`}>
                                    {formik.values.status || 'Status'}
                                </MenuButton>
                                <MenuList>
                                    {statuses.map((s: string) => (
                                        <MenuItem key={s} onClick={() => formik.setFieldValue('status', s)}>
                                            {s}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                            <FormErrorMessage>{formik.errors.status}</FormErrorMessage>
                        </FormControl> */}
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => { formik.resetForm(); onClose(); }}>
                        Close
                    </Button>
                    <Button form='task-form-update' type='submit' rightIcon={<RxUpdate size={20} />} variant='outline' colorScheme='yellow' fontSize={18}
                        isLoading={loading}
                        isDisabled={!formik.isValid}
                    >
                        Update
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}