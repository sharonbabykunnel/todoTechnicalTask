import axios from "axios";
import Success from './../helpers/Success';
import Failed from './../helpers/Failed';
const auth = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const signupApi = async (values) => {
    try {
        console.log(values)
        const res = await auth.post('v1/auth/register', values);
        Success(res.data.message);
        localStorage.setItem('accessToken', res.data.accessToken)
        return res.data;
    } catch (error) {
        console.log(error)
        Failed(error.response.data.message ? error.response.data.message : error.message);
    }   
}

export const signinApi = async ({email, password}) => {
    try {
        const res = await auth.post('v1/auth/login', { email, password });
        console.log(res)
        Success(res.data.message);
        localStorage.setItem('accessToken', res.data.accessToken);
        return res.data;
    } catch (error) {
        console.log(error)
        Failed(error.response.data.message ? error.response.data.message : error.message);
    }   
}

export const signoutApi = async () => {
    try {
        const res = await auth.post('v1/auth/logout');
        console.log(res)
        Success(res.data.message);
        localStorage.removeItem('accessToken');
        return res.data
    } catch (error) {
                console.log(error);
                Failed(
                  error.response.data.message
                    ? error.response.data.message
                    : error.message
                );
    }
}

export const passwordChangeApi = async ({ email, password }) => {
  try {
    const res = await auth.post("v1/auth/password", { email, password });
    console.log(res);
    Success(res.data.message);
    return res.data;
  } catch (error) {
    console.log(error);
    Failed(
      error.response.data.message ? error.response.data.message : error.message
    );
  }
};