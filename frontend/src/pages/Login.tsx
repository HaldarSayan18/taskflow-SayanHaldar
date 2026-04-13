import { Box, Button, Input, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useRef, useState } from "react";
import { DUMMY_USER } from "../services/authService";
import { generateToken } from "../utils/jwt";

const Login = ({ isLightmode }: { isLightmode: boolean }) => {
    const toast = useToast();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    // login handler
    const handleLogin = (e: any) => {
        e.preventDefault();
        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";
        try {
            setLoading(true);
            const storedUser = JSON.parse(localStorage.getItem("users") || "{}");
            if ((email === storedUser.email && password === storedUser.password) || (email === DUMMY_USER.email && password === DUMMY_USER.password)) {
                const token = generateToken({
                    email,
                    firstName: storedUser.firstName,
                    lastName: storedUser.lastName
                });
                localStorage.setItem('token', token);
                toast({
                    title: "Logging in",
                    description: "You have been logged in successfully.",
                    status: "success",
                    position: 'top',
                    duration: 3000,
                    isClosable: true,
                    onCloseComplete() { navigate("/projects"); },
                });
            } else {
                toast({
                    title: "Login Failed",
                    description: "Invalid credentials",
                    status: "error",
                    position: 'top',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error: any) {
            setLoading(true);
            toast({
                title: "Error",
                description: error.message || "Something went wrong.",
                status: "error",
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`flex flex-col items-center justify-start gap-10 m-auto min-h-screen ${isLightmode ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'}`}>
            <div className={`mt-20 bg-[#73a2ce46] min-h-70 w-80 p-4 rounded-lg flex flex-col items-center gap-4 shadow-lg`}>
                <p className="font-semibold text-2xl">Sign In</p>

                {/* login form */}
                <form className={`h-full w-full bg-transparent gap-4 px-5 py-0 flex flex-col items-start justify-center`}>
                    <Input type="email" placeholder="Email" className={`w-full h-8`} ref={emailRef} />
                    <Box border="1px solid" borderRadius="md" outline='2px' className={`pl-4 h-10 w-full flex items-center gap-2`}>
                        <Input variant='unstyled' border='0px' placeholder="Password"
                            type={`${showPassword ? 'text' : 'password'}`}
                            className={`w-full h-8`}
                            ref={passwordRef}
                        />
                        {showPassword ?
                            <FaEye size={30} className={`pr-2 text-gray-500 hover:cursor-pointer`} onClick={() => setShowPassword(false)} />
                            : <FaEyeSlash size={30} className={`pr-2 text-gray-500 hover:cursor-pointer`} onClick={() => setShowPassword(true)} />
                        }
                    </Box>

                    {/* login button */}
                    <div className={`w-full`}>
                        <Button rightIcon={<MdLogin size={25} />}
                            bgGradient="linear(to-r, blue.400, blue.700)" type="button" colorScheme="blue" className={`w-full h-8 `}
                            isLoading={loading}
                            onClick={handleLogin}
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