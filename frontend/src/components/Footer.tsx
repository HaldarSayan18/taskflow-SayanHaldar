import { Text } from "@chakra-ui/react"

export const Footer = ({ isLightmode }: { isLightmode: boolean }) => {
    return (
        <div className={`${isLightmode ? 'bg-gray-200 text-black' : 'bg-slate-800/90 text-white'} mt-auto w-full h-14 flex items-center justify-center shadow-md`}>
            <Text>&copy; 2026 Sayan Haldar. All rights reserved.</Text>
        </div>
    )
}