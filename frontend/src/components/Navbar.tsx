import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { decodeToken } from "../utils/jwt";
import { useToast } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

const Navbar = ({ isLightmode, setIsLightMode }: { isLightmode: boolean; setIsLightMode: (isLightMode: boolean) => void }) => {
    const token = localStorage.getItem("token");
    let user = null;
    if (token) {user = decodeToken(token)}

    const navigate = useNavigate();
    const toast = useToast();

    // logout handler
    const handleLogout = () => {
        localStorage.removeItem('token');
        toast({
            title: "Logged out",
            description: "You have been logged out successfully.",
            status: "success",
            position: 'top',
            duration: 2000,
            isClosable: true,
            onCloseComplete() { navigate('/login'); },
        });
    };

    return (
        <div className={`${isLightmode ? 'bg-gray-200 text-black' : 'bg-slate-800/90 text-white'} min-h-14 w-full shadow-md h-10 flex items-center justify-between px-4`}>
            <Link to="/projects">
                <div className="flex items-center gap-0">
                    <img src={logo} alt="logo" className="h-6 w-10" />
                    <p>TaskFlow</p>
                </div>
            </Link>
            {user ? (
                <>
                    <div className={`flex items-center justify-center gap-1 ml-auto mr-3`}>
                        <p>Namaste!</p>
                        <p>{user.firstName}</p>
                    </div>
                    <div className={`flex items-center justify-center gap-2 md:gap-5 lg:gap-5`}>
                        <button onClick={() => setIsLightMode(!isLightmode)}>
                            {isLightmode ?
                                <MdLightMode size={30} className={`bg-gray-300/30 p-1 text-orange-700 rounded-md`} />
                                : <MdDarkMode size={30} className={`bg-slate-500/80 p-1 text-gray-800 rounded-md`} />
                            }
                        </button>
                        <FiLogOut size={30} className={`bg-red-300 p-1 text-red-700 rounded-md shadow-md hover:opacity-50`}
                            onClick={handleLogout}
                        />
                    </div>
                </>
            ) : (
                <div className={`flex items-center justify-center gap-2 md:gap-5 lg:gap-5`}>
                    <button onClick={() => setIsLightMode(!isLightmode)}>
                        {isLightmode ?
                            <MdLightMode size={30} className={`bg-gray-300/30 p-1 text-orange-700 rounded-md`} />
                            : <MdDarkMode size={30} className={`bg-slate-500/80 p-1 text-gray-800 rounded-md`} />
                        }
                    </button>
                    {/* <Button
                    type="button" onClick={()=>navigate("/login")}
                    bgGradient={`${isLightmode ? 'linear(to-l, gray.200, blue.100)' : 'linear(to-r, gray.500, blue.700)'}`}
                    className={`shadow-lg`}
                    ><Text>Signin/Signup</Text></Button> */}
                </div>
            )}
        </div>
    )
}

export default Navbar