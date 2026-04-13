import { Card, CardBody, Text } from "@chakra-ui/react";

const Notfound = ({ isLightmode }: { isLightmode: boolean }) => {
    return (
        <>
            <div className={`flex items-center justify-center gap-10 m-auto min-h-screen ${isLightmode ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'}`}>
                <Card bgColor={`${isLightmode ? 'gray.100' : 'gray.800'}`} textColor="yellow.500" className={`min-w-20 shadow-md font-semibold text-2xl text-center`}>
                    <CardBody>
                        <Text>Error: 404 <br/>page not found!</Text>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default Notfound