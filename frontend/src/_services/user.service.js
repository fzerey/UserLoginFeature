import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    verify,
    retrievePassword,
    getOnlineCount,
    getNotVerificatedCount
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`/api/1.0/auth`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };
    localStorage.removeItem('user');
    return fetch('/api/1.0/logout', requestOptions).then(handleResponse);
}

function verify(email, code){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
    };
    return fetch('/api/1.0/users/verify', requestOptions).then(handleResponse);
}

function retrievePassword(email){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    };
    return fetch('/api/1.0/users/password', requestOptions).then(handleResponse);
}


function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/api/1.0/users`, requestOptions).then(handleResponse);
}



function getOnlineCount() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/1.0/users/reports`, requestOptions).then(handleResponse);
}

function getNotVerificatedCount() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/1.0/users/notVerify`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if(data.message === "Logout success"){
            localStorage.removeItem('user');
        }
        
        return data;
    });
}
