import axios from 'axios';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/matrimony/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      alert('Login Successfully');
      window.location.assign('/')
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/matrimony/logout',
    });
    if (res.data.status === 'success') {
      alert('Logged out successfully');
      window.location.assign('/');
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

