import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const URL = `${API_BASE}/courses`;

export const createCourse = async (course) => {
    const response = await axios.post(URL, course);
    return response.data;
}

export const findAllCourses = async () => {
    const response = await axios.get(URL);
    return response.data;
};

export const updateCourse = async (course) => {
    const response = await axios
        .put(`${URL}/${course._id}`, course);
    return response.data;
};

export const deleteCourse = async (courseId) => {
    const response = await axios
        .delete(`${URL}/${courseId}`);
    return response.data;
}