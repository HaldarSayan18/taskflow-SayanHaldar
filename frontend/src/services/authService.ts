// type User = {
//     id: string,
//     firstName: string,
//     lastName: string,
//     email: string,
//     password: string
// };

// const USER_KEY = "taskflo-dummyuser";

// const getUsers = (): User[] => {
//     return JSON.parse(localStorage.getItem(USER_KEY) || "[]");
// };

// const saveUser = (user: User) => {
//     const users = getUsers();
//     users.push(user);
//     localStorage.setItem(USER_KEY, JSON.stringify(users));
// };

export const DUMMY_USER = {
    email: "test@emaple.com",
    password: "password123"
};