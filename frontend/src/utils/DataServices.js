import axios from "axios";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const newPeep = async (peepText) => {
  const token = getToken();
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_CHITTER_API_URL}/peeps`,
      { content: peepText },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
};

export const peepList = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_CHITTER_API_URL}/peeps`);
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
};

export const newComment = async (commentText, peepId) => {
  const token = getToken();
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_CHITTER_API_URL}/peeps/comment`,
      { content: commentText, peepId: peepId  },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
};
