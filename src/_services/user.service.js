import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    updateProfile,
    deleteProfile,
    updateHome,
    deleteHome,
    addHome,
    addEvent,
    updateEvent,
    deleteEvent,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAll,
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
            'password': (user.profile_password === "") ? user.profile_password_hashed : user.profile_password,
            'email': user.profile_email,
            'phone': user.profile_phone })
    };

    let user_id = JSON.parse(localStorage.getItem('user'));
    user_id = user_id['user']['user_id'];

    console.log(requestOptions.body);
    return fetch(`https://bauphi-api.herokuapp.com/api/users/${user_id}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function deleteProfile() {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'session_key': 'admin' }
    };

    let user_id = JSON.parse(localStorage.getItem('user'));
    user_id = user_id['user']['user_id'];

    console.log(requestOptions.body);
    return fetch(`https://bauphi-api.herokuapp.com/api/users/${user_id}`, requestOptions).then(handleResponse);
}

function updateHome(home) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'session_key': 'admin' },
        body: JSON.stringify({
            'home_name': home.home_name,
            'isVisible': home.isVisible,
            'country': home.country,
            'state': home.state,
            'city': home.city,
            'neighbourhood': home.neighbourhood,
            'latitude': home.latitude,
            'longitude': home.longitude,
        })
    };

    let user_id = JSON.parse(localStorage.getItem('user'));
    user_id = user_id['user']['user_id'];

    console.log(requestOptions.body);
    return fetch(`https://bauphi-api.herokuapp.com/api/users/${user_id}/homes/${home.home_id}`, requestOptions).then(handleResponse);
}

function updateEvent(event) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'session_key': 'admin' },
        body: JSON.stringify({
            'start_time': event.start_time,
            'end_time': event.end_time,
            'type': event.type,
            'title': event.title,
            'description': event.description,
            'is_emergency': event.is_emergency,
            'country': event.country,
            'state': event.state,
            'city': event.city,
            'neighbourhood': event.neighbourhood,
            'latitude': event.latitude,
            'longitude': event.longitude,
            'currency': event.currency,
            'amount': event.amount
        })
    };

    let user_id = JSON.parse(localStorage.getItem('user'));
    user_id = user_id['user']['user_id'];

    console.log(requestOptions.body);
    return fetch(`https://bauphi-api.herokuapp.com/api/users/${user_id}/events/${event.event_id}`, requestOptions).then(handleResponse);
}

function updateAnnouncement(announcement) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'session_key': 'admin' },
        body: JSON.stringify({
            'image': announcement.image,
            'phone': announcement.phone,
            'title': announcement.title,
            'description': announcement.description,
            'isHuman': announcement.isHuman,
        })
    };

    let user_id = JSON.parse(localStorage.getItem('user'));
    user_id = user_id['user']['user_id'];

    console.log(requestOptions.body);
    return fetch(`https://bauphi-api.herokuapp.com/api/users/${user_id}/announcements/${announcement.announcement_id}`, requestOptions).then(handleResponse);
}

function deleteHome(home_id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'session_key': 'admin' }
    };

    let user_id = JSON.parse(localStorage.getItem('user'));
    user_id = user_id['user']['user_id'];

    console.log(requestOptions.body);
    return fetch(`https://bauphi-api.herokuapp.com/api/users/${user_id}/homes/${home_id}`, requestOptions).then(handleResponse);
}

function deleteEvent(event_id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'session_key': 'admin' }
    };

    let user_id = JSON.parse(localStorage.getItem('user'));
    user_id = user_id['user']['user_id'];

    console.log(requestOptions.body);
    return fetch(`https://bauphi-api.herokuapp.com/api/users/${user_id}/events/${event_id}`, requestOptions).then(handleResponse);
}

function deleteAnnouncement(announcement_id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'session_key': 'admin' }
    };

    let user_id = JSON.parse(localStorage.getItem('user'));
    user_id = user_id['user']['user_id'];

    console.log(requestOptions.body);
    return fetch(`https://bauphi-api.herokuapp.com/api/users/${user_id}/announcements/${announcement_id}`, requestOptions).then(handleResponse);
}

function addHome(home) {
    let user_id = JSON.parse(localStorage.getItem('user'));
    user_id = user_id['user']['user_id'];

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
        headers: { 'Content-Type': 'application/json', 'session_key': 'admin' },
        body: JSON.stringify(home_json)
    };

    console.log("addHome request:", requestOptions);
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
        headers: { 'Content-Type': 'application/json', 'session_key': 'admin' },
        body: JSON.stringify(event_json)
    };

    let user_id = JSON.parse(localStorage.getItem('user'));
    user_id = user_id['user']['user_id'];

    console.log("addEvent request:", requestOptions);
    return fetch(`https://bauphi-api.herokuapp.com/api/users/${user_id}/events`, requestOptions).then(handleResponse);
}

function addAnnouncement(announcement) {
    var announcement_json = {
        "image": announcement.addAnnouncement_image,
        "phone": announcement.addAnnouncement_phone,
        "title": announcement.addAnnouncement_title,
        "description": announcement.addAnnouncement_description,
        "isHuman": announcement.addAnnouncement_isHuman
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'session_key': 'admin' },
        body: JSON.stringify(announcement_json)
    };

    let user_id = JSON.parse(localStorage.getItem('user'));
    user_id = user_id['user']['user_id'];

    console.log("addAnnouncement request:", requestOptions);
    return fetch(`https://bauphi-api.herokuapp.com/api/users/${user_id}/announcements`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        console.log("response: ", data);

        if (data.status === "FAILURE")
        {
            console.log('response status: FAILURE');
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                console.log("response status: 401");
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}