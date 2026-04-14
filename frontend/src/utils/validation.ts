import * as Yup from 'yup';

// projects & tasks

export const projectSchema = Yup.object({
    // projects & tasks
    title: Yup.string()
        .required("Enter project title"),
    description: Yup.string()
        .required("Enter project description"),
});

export const TaskSchema = Yup.object({
    title: Yup.string()
        .required("Enter task title"),
    description: Yup.string()
        .required("Enter task description"),
    status: Yup.string()
        .required("Select status"),
    priority: Yup.string()
        .required("Select priority"),
    assignee: Yup.string()
        .required("Enter Assignee name"),
    date: Yup.string()
        .typeError("Select date")
        .required("Select date")
        .test("date-not-past", "Date can't be past", function (value) {
            if (!value) return false;
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return selectedDate >= today;
        }),
});

// login & registration

export const registerSchema = Yup.object({
    firstName: Yup.string()
        .min(2, "Must contain more than 2 letters")
        .required("Enter first name"),
    lastName: Yup.string()
        .min(2, "Must contain more than 2 letters")
        .required("Enter last name"),
    email: Yup.string().trim()
        .email("Invalid format")
        .required("Email is required"),
    password: Yup.string().
        min(4, "Min. length 4")
        .required("Passowrd is required")
        .matches(/[a-z]/, "Must contain a lowercase letter")
        .matches(/[A-Z]/, "Must contain an uppercase letter")
        .matches(/[0-9]/, "Must contain a number"),
    confirmPassword: Yup.string().required("Re-enter passowrd")
        .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const loginSchema = Yup.object({
    email: Yup.string().trim()
        .email("Invalid format")
        .required("Email is required"),
    password: Yup.string().
        min(4, "Min. length 4")
        .required("Passowrd is required")
        .matches(/[a-z]/, "Must contain a lowercase letter")
        .matches(/[A-Z]/, "Must contain an uppercase letter")
        .matches(/[0-9]/, "Must contain a number"),
});