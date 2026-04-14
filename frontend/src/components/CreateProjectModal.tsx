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
    FormErrorMessage,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useFormik } from 'formik';
// import { FaChevronDown } from 'react-icons/fa6';
import { MdAdd } from 'react-icons/md';
import { ProjectFormValues } from '../assets/types/type';
import { projectSchema } from '../utils/validation';
import { BASE_URL } from '../assets/api/api';
import { decodeToken } from '../utils/jwt';

export function CreateProjectModal({
    isOpen, onClose, fetchProjects }: {
        isOpen: boolean; onClose: () => void; fetchProjects: () => void
    }) {
    // const statuses = ["Completed", "In Progress", "In Queue", "On Hold"];
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();

    // owner id
    let owner = null;
    const token = localStorage.getItem("token");
    if (token) { owner = decodeToken(token); }

    // handle project form
    const formik = useFormik<ProjectFormValues>({
        initialValues: {
            owner: "",
            id: uuidv4(),
            title: "",
            description: "",
            date: new Date().toLocaleString(),
            // status: "",
        },
        validationSchema: projectSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}/projects`, {
                    method: 'POST',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        ...values,
                        owner: owner.id,
                    })
                });
                await response.json();
                // const formData = await response.json();
                // console.log('values', formData);
                toast({
                    title: "Project saved",
                    description: "Project saved successfully",
                    status: "success",
                    duration: 1000,
                    position: "top",
                });
                fetchProjects();
                resetForm();
                onClose();
            } catch (error: any) {
                toast({
                    title: 'Error in saving',
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
        <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add New Project</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form id='project-form' className={`grid grid-cols-2 place-items-center gap-2`} onSubmit={formik.handleSubmit}>
                        {/* title */}
                        <FormControl isInvalid={!!formik.errors.title && formik.touched.title}>
                            <Input type='text' placeholder='Project title'
                                value={formik.values.title} name="title"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
                        </FormControl>

                        {/* description */}
                        <FormControl isInvalid={!!formik.errors.description && formik.touched.description}>
                            <Input type='text' placeholder='Project description'
                                value={formik.values.description} name='description'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
                        </FormControl>

                        {/* date */}
                        {/* <FormControl isInvalid={!!formik.errors.date && formik.touched.date}>
                            <Input type='date' placeholder='Date'
                                value={formik.values.date} name='date'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>{formik.errors.date}</FormErrorMessage>
                        </FormControl> */}

                        {/* status */}
                        {/* <FormControl isInvalid={!!formik.errors.status && formik.touched.status}>
                            <Menu>
                                <MenuButton variant="outline" as={Button} rightIcon={<FaChevronDown />} textAlign="start"
                                    textFillColor='black'
                                    _hover={{ bgColor: 'white' }}
                                    className={`w-full items-start justify-between`}
                                >
                                    {formik.values.status || "Status"}
                                </MenuButton>
                                <MenuList>
                                    {statuses.map((s: string) => (
                                        <MenuItem
                                            color='black' key={s} onClick={() => formik.setFieldValue("status", s)}
                                        >
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
                    <Button colorScheme='blue' mr={3} onClick={() => { formik.resetForm(); onClose(); fetchProjects() }}>
                        Close
                    </Button>
                    <Button form='project-form' type='submit' rightIcon={<MdAdd size={20} />} variant='outline' colorScheme='green' fontSize={18}
                        isLoading={loading}
                        isDisabled={!formik.isValid}
                    >
                        Add
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}