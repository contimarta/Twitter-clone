import axios from "axios";

export const logIn = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_CHITTER_API_URL}/users/login`,
      formData
    );
    // Store the token in the local storage
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (e) {
    return { error: e.message };
  }
};

export const signUp = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_CHITTER_API_URL}/users/register`,
      formData
    );
    return response.data;
  } catch (e) {
    return { error: e.response.data.errors };
  }
};
