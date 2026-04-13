
// generate token
export const generateToken = (payload: any): string => {
    // console.log('payload --',payload);
    return btoa(JSON.stringify(payload));
}

// verify token
export const verifyToken = (token: string): boolean => {
    return !!token;
};

//decode token
export const decodeToken = (token: string) => {
    try {
        return JSON.parse(atob(token));
    } catch {
        return null;
    }
};