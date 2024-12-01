const login = async (email, password) => {
    console.log('Attempting login with:', email, password);
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v2/hallusers/hallsignin',
            data: { email, password },
            withCredentials: true
        });
        console.log('Server response:', res.data);
        if (res.data.status === 'success') {
            alert('Login Successful');
            window.location.assign('/allevents');
        }
    } catch (err) {
        console.error('Login error:', err.response ? err.response.data : err.message);
        alert(err.response ? err.response.data.message : 'An error occurred');
    }
};

let loginForm = document.querySelector('#loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let email = document.getElementById('emailInput').value;
        let password = document.getElementById('passwordInput').value;
        login(email, password);
    });
}