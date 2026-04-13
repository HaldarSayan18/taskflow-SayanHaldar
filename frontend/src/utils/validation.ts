import * as Yup from 'yup';

export const validationSchema = Yup.object({
    title: Yup.string().required("Enter project title"),
    description: Yup.string().required("Enter project description"),
    status: Yup.string().required("Select status"),
    priority: Yup.string().required("Select priority"),
    assignee: Yup.string().required("Enter Assignee name"),
    date: Yup.string()
        .typeError("Select date")
        .required("Select date")
        .test("date-not-past", "Date can't be past", function (value) {
            if (!value) return false;
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return selectedDate >= today;
        })
});