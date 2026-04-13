import { Box, Button, Input, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { TiUser } from "react-icons/ti";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useRef, useState } from "react";

const Register = ({ isLightmode }: { isLightmode: boolean}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const toast = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    // registration handler
    const handleRegister = (e: any) => {
        e.preventDefault();
        // form
        const firstName = firstNameRef.current?.value || "";
        const lastName = lastNameRef.current?.value || "";
        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";
        const confirmPassword = confirmPasswordRef.current?.value || "";
        const accountForm = {
            firstName, lastName, email, password
        };
        try {
            setLoading(true);
            // find if already registered
            const existsUsers = localStorage.getItem("users");
            const users = existsUsers ? JSON.parse(existsUsers) : [];
            const user = users.find((u: any) => u.email === email);

            if (!accountForm) {
                toast({
                    title: "Form error",
                    description: "Fill the form correctly.",
                    status: "error",
                    position: 'top',
                    duration: 3000,
                    isClosable: true,
                });
            } else if (user) {
                toast({
                    title: "User already exists",
                    description: "Please login instead.",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            } else if (password !== confirmPassword) {
                toast({
                    title: "Not matched",
                    description: "Password not matched",
                    status: "error",
                    position: 'top',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                // create new user
                const newUser = {
                    id: Date.now().toString(),
                    email: accountForm.email,
                    password: accountForm.password,
                    firstName: accountForm.firstName,
                    lastName: accountForm.lastName,
                }
                localStorage.setItem("users", JSON.stringify(newUser));
                toast({
                    title: "Registered",
                    description: "Account created successfully.",
                    status: "success",
                    position: 'top',
                    duration: 3000,
                    isClosable: true,
                    onCloseComplete() { navigate("/login"); },
                });
            }
        } catch (error: any) {
            toast({
                title: "Registration Failed",
                description: error.message || "Something went wrong",
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
            <div className={`mt-20 bg-[#73a2ce46] min-h-70 w-80 md:w-100 lg:w-100 px-5 py-4 rounded-lg flex flex-col items-center gap-4 shadow-lg`}>
                <p className="font-semibold text-2xl">Create Account</p>
                <form className={`h-full w-full bg-transparent gap-4 grid grid-cols-2 place-items-center`}>
                    <Input type="text" placeholder="First name" className={`h-8`} ref={firstNameRef} />
                    <Input type="text" placeholder="Last name" className={`h-8`} ref={lastNameRef} />
                    <Input type="email" placeholder="Email" className={`w-full h-8 col-span-2`} ref={emailRef} />
                    {/* password */}
                    <Box border="1px solid" borderRadius="md" outline='2px' className={`pl-4 h-10 flex items-center gap-2`}>
                        <Input variant='unstyled' border='0px'
                            type={`${showPassword ? 'text' : 'password'}`} placeholder="Password"
                            className={`w-full h-8`}
                            ref={passwordRef}
                        />
                        {showPassword ?
                            <FaEye size={30} className={`pr-2 text-gray-500 hover:cursor-pointer`} onClick={() => setShowPassword(false)} />
                            : <FaEyeSlash size={30} className={`pr-2 text-gray-500 hover:cursor-pointer`} onClick={() => setShowPassword(true)} />
                        }
                    </Box>
                    {/* confirm password */}
                    <Box border="1px solid" borderRadius="md" outline='2px' className={`pl-4 h-10 flex items-center gap-2`}>
                        <Input variant='unstyled' border='0px'
                            type={`${showConfirmPassword ? 'text' : 'password'}`} placeholder="Confirm Password"
                            className={`w-full h-8`}
                            ref={confirmPasswordRef}
                        />
                        {showConfirmPassword ?
                            <FaEye size={30} className={`pr-2 text-gray-500 hover:cursor-pointer`} onClick={() => setShowConfirmPassword(false)} />
                            : <FaEyeSlash size={30} className={`pr-2 text-gray-500 hover:cursor-pointer`} onClick={() => setShowConfirmPassword(true)} />
                        }
                    </Box>
                </form>
                {/* register button */}
                <Button rightIcon={<TiUser size={22} />} type="button" colorScheme="blue"
                    bgGradient="linear(to-l, blue.400, blue.700)"
                    className={`w-full h-8`}
                    isLoading={loading}
                    onClick={handleRegister}
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