import { Box, Button, FormControl, FormErrorMessage, Input, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { generateToken } from "../utils/jwt";
import { useFormik } from "formik";
import { SigninForm } from "../assets/types/type";
import { loginSchema } from "../utils/validation";
import { BASE_URL } from "../assets/api/api";

const Login = ({ isLightmode }: { isLightmode: boolean }) => {
    const toast = useToast();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // login
    const formik = useFormik<SigninForm>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema : loginSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}/users?email=${values.email}&password=${values.password}`);
                if(!response.ok){
                    toast({
                        title: "Invalid",
                        status: "error",
                        position: 'top',
                        duration: 1000,
                        isClosable: true,
                    });
                    return;
                }
                // const res = response.json();
                const users = await response.json();
                const user = users[0];
                if(users.length === 0){
                    toast({
                        title: "User not found",
                        description:"Check credentials properly",
                        status: "error",
                        position: 'top',
                        duration: 1000,
                        isClosable: true,
                    });
                    return;
                }
                console.log("user details ==>", user);
                const token = generateToken({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                });
                localStorage.setItem('token', token);
                toast({
                    title: "Logging in",
                    description: "You have been logged in successfully.",
                    status: "success",
                    position: 'top',
                    duration: 1000,
                    isClosable: true,
                    onCloseComplete() { navigate("/projects"); },
                });
                resetForm();
            } catch (error: any) {
                setLoading(true);
                toast({
                    title: "Error",
                    description: error.message || "Something went wrong.",
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
            <div className={`mt-20 bg-[#73a2ce46] min-h-70 w-80 p-4 rounded-lg flex flex-col items-center gap-4 shadow-lg`}>
                <p className="font-semibold text-2xl">Sign In</p>

                {/* login form */}
                <form id="login-form" className={`h-full w-full bg-transparent gap-4 px-5 py-0 flex flex-col items-start justify-center`}
                    onSubmit={formik.handleSubmit}
                >
                    {/* email */}
                    <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
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

                    {/* login button */}
                    <div className={`w-full`}>
                        <Button type="submit" form="login-form" rightIcon={<MdLogin size={25} />}
                            bgGradient="linear(to-r, blue.400, blue.700)" colorScheme="blue" className={`w-full h-8 `}
                            isLoading={loading}
                            isDisabled={!formik.isValid}
                        >
                            Login
                        </Button>
                        <a href="#"><p className={`text-sm underline ${isLightmode ? 'text-gray-700' : 'text-gray-300'} font-medium w-full text-end hover:cursor-pointer`}>Forget password</p></a>
                    </div>

                    <Box border='0px solid' className="w-full text-center">Don't have an account?
                        <Button variant='link' colorScheme='blue' border='0px solid' size='sm' className="flex items-center justify-center">
                            <Link to="/register">Sign Up</Link></Button>
                    </Box>
                </form>
            </div>
        </div>
    )
}

export default Login