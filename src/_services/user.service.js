import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    updateProfile,
    addHome,
    addEvent,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'email': email, 'password': password })
    };

    console.log(requestOptions);
    return fetch(`https://bauphi-api.herokuapp.com/api/users/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://127.0.0.1:5000/api/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://127.0.0.1:5000/api/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`https://bauphi-api.herokuapp.com/api/users`, requestOptions).then(handleResponse);
}

function updateProfile(user) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'session_key': 'admin' },
        body: JSON.stringify({'name': user.profile_name,
            'surname': user.profile_surname,
            'password': user.profile_password,
            'email': user.profile_email,
            'phone': user.profile_phone })
    };

    let user_id = JSON.parse(localStorage.getItem('user'));
    user_id = user_id['user']['user_id'];

    console.log(requestOptions.body);
    return fetch(`https://bauphi-api.herokuapp.com/api/users/${user_id}`, requestOptions).then(handleResponse);
}

function addHome(home) {
    var home_json = {
        "home_name": home.addHome_homeName,
        'isVisible': home.addHome_visible,
        'country': home.addHome_country,
        'state': home.addHome_state,
        'city': home.addHome_city,
        'neighbourhood': home.addHome_neighbourhood,
        'latitude': home.addHome_latitude,
        'longitude': home.addHome_longitude
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(home_json)
    };

    // TODO: user_id fields might be changed on prod environment
    // user_id is getting from localStorage
    let user_id = JSON.parse(localStorage.getItem('user'));
    user_id = user_id['user']['user_id'];

    return fetch(`https://bauphi-api.herokuapp.com/api/users/${user_id}/homes`, requestOptions).then(handleResponse);
}

function addEvent(event) {
    var event_json = {
        "start_time": event.addEvent_startTime,
        "end_time": event.addEvent_endTime,
        "type": event.addEvent_type,
        "title": event.addEvent_title,
        "description": event.addEvent_description,
        "is_emergency": event.addEvent_is_emergency,
        "country": event.addEvent_country,
        "state": event.addEvent_state,
        "city": event.addEvent_city,
        "neighbourhood": event.addEvent_neighbourhood,
        "latitude": event.addEvent_latitude,
        "longitude": event.addEvent_longitude,
        "currency": event.addEvent_currency,
        "amount": event.addEvent_amount
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event_json)
    };

    // TODO: user_id fields might be changed on prod environment
    // user_id is getting from localStorage
    let user_id = JSON.parse(localStorage.getItem('user'));
    user_id = user_id['user']['user_id'];

    return fetch(`https://bauphi-api.herokuapp.com/api/users/${user_id}/events`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`https://bauphi-api.herokuapp.com/api/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`http://127.0.0.1:5000/api/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        console.log(data);

        if (data.status === "FAILURE")
        {
            console.log('err');
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                console.log("haata");
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}