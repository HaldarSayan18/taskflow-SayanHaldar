import { v4 as uuidv4 } from 'uuid';
import { Box, Button, FormControl, FormErrorMessage, Input, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { TiUser } from "react-icons/ti";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { registerSchema } from "../utils/validation";
import { useFormik } from "formik";
import { SignupForm, SignupRequest } from "../assets/types/type";
import { BASE_URL } from "../assets/api/api";

const Register = ({ isLightmode }: { isLightmode: boolean }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const toast = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    // registration
    const formik = useFormik<SignupForm>({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: registerSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log("FORM SUBMITTED", values);
            try {
                setLoading(true);
                // find if already registered
                const existsUsers = await fetch(`${BASE_URL}/users?email=${values.email}`);
                const user = await existsUsers.json();

                if (user.length > 0) {
                    toast({
                        title: "User already exists",
                        description: "Please login instead.",
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                    });
                    return;
                }
                // create new user
                const payload: SignupRequest = {
                    id: uuidv4(),
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                }
                const newUser = await fetch(`${BASE_URL}/auth/register`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload),
                });
                if (!newUser.ok) {
                    toast({
                        title: "Registration Failed",
                        status: "error",
                        position: 'top',
                        duration: 1000,
                        isClosable: true,
                    });
                    return;
                }
                toast({
                    title: "Registered",
                    description: "Account created successfully.",
                    status: "success",
                    position: 'top',
                    duration: 1000,
                    isClosable: true,
                    onCloseComplete() { navigate("/login"); },
                });
                resetForm();
            } catch (error: any) {
                toast({
                    title: "Registration Failed",
                    description: error.message || "Something went wrong",
                    status: "error",
                    position: 'top',
                    duration: 2000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <div className={`flex flex-col items-center justify-start gap-10 m-auto min-h-screen ${isLightmode ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'}`}>
            <div className={`mt-20 bg-[#73a2ce46] min-h-70 w-80 md:w-100 lg:w-100 px-5 py-4 rounded-lg flex flex-col items-center gap-4 shadow-lg`}>
                <p className="font-semibold text-2xl">Create Account</p>
                <form id='register-form' className={`h-full w-full bg-transparent gap-4 grid grid-cols-2 place-items-center`}
                    onSubmit={formik.handleSubmit}
                >
                    {/* first name */}
                    <FormControl isInvalid={!!formik.errors.firstName && formik.touched.firstName}>
                        <Input type="text" name='firstName' placeholder="First name" className={`h-8`}
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                    </FormControl>

                    {/* last name */}
                    <FormControl isInvalid={!!formik.errors.lastName && formik.touched.lastName}>
                        <Input type="text" name='lastName' placeholder="Last name" className={`h-8`}
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
                    </FormControl>

                    {/* email */}
                    <FormControl gridColumn="span 2" isInvalid={!!formik.errors.email && formik.touched.email}>
                        <Input type="email" name="email" placeholder="Email" className={`w-full h-8`}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>

                    {/* password */}
                    <FormControl isInvalid={!!formik.errors.password && formik.touched.password}>
                        <Box border="1px solid" borderRadius="md" outline='2px' className={`pl-4 h-10 w-full flex items-center gap-2`}>
                            <Input variant='unstyled' name="password" border='0px' placeholder="Password"
                                type={`${showPassword ? 'text' : 'password'}`}
                                className={`w-full h-8`}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {showPassword ?
                                <FaEye size={30} className={`pr-2 text-gray-500 hover:cursor-pointer`} onClick={() => setShowPassword(false)} />
                                : <FaEyeSlash size={30} className={`pr-2 text-gray-500 hover:cursor-pointer`} onClick={() => setShowPassword(true)} />
                            }
                        </Box>
                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    </FormControl>

                    {/* confirm password */}
                    <FormControl isInvalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}>
                        <Box border="1px solid" borderRadius="md" outline='2px' className={`pl-4 h-10 w-full flex items-center gap-2`}>
                            <Input variant='unstyled' name="confirmPassword" border='0px' placeholder="Confirm"
                                type={`${showConfirmPassword ? 'text' : 'password'}`}
                                className={`w-full h-8`}
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {showConfirmPassword ?
                                <FaEye size={30} className={`pr-2 text-gray-500 hover:cursor-pointer`} onClick={() => setShowConfirmPassword(false)} />
                                : <FaEyeSlash size={30} className={`pr-2 text-gray-500 hover:cursor-pointer`} onClick={() => setShowConfirmPassword(true)} />
                            }
                        </Box>
                        <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
                    </FormControl>
                </form>
                {/* register button */}
                <Button type="submit" form='register-form' rightIcon={<TiUser size={22} />} colorScheme="blue"
                    bgGradient="linear(to-l, blue.400, blue.700)"
                    className={`w-full h-8`}
                    isLoading={loading}
                    isDisabled={!formik.isValid || loading}
                >
                    Register
                </Button>
                <Box border='0px solid' className="w-full text-center">Already have an account?
                    <Button variant='link' colorScheme='blue' border='0px solid' size='sm' className="flex items-center justify-center">
                        <Link to="/login">Sign In</Link></Button>
                </Box>
            </div>
        </div>
    )
}

export default Register