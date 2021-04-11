import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    updateProfile,
    deleteProfile,
    updateHome,
    deleteHome,
    updateEvent,
    deleteEvent,
    addHome,
    addEvent,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAll,
};

function login(username, password, from) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function updateProfile(user) {
    return dispatch => {
        dispatch(request(user));

        userService.updateProfile(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/profil');
                    dispatch(alertActions.success('Profile update successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function deleteProfile() {
    return dispatch => {
        dispatch(request());

        userService.deleteProfile()
            .then(
                user => {
                    dispatch(success());
                    dispatch(userActions.logout());
                    history.push('/login');
                    dispatch(alertActions.success('Profile deletion successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function updateHome(home) {
    return dispatch => {
        dispatch(request(home));

        userService.updateHome(home)
            .then(
                user => {
                    dispatch(success());
                    history.push('/profil');
                    dispatch(alertActions.success('Home update successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function updateEvent(event) {
    return dispatch => {
        dispatch(request(event));

        userService.updateEvent(event)
            .then(
                user => {
                    dispatch(success());
                    history.push('/profil');
                    dispatch(alertActions.success('Event update successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function updateAnnouncement(announcement) {
    return dispatch => {
        dispatch(request(announcement));

        userService.updateAnnouncement(announcement)
            .then(
                user => {
                    dispatch(success());
                    history.push('/profil');
                    dispatch(alertActions.success('Announcement update successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function deleteHome(home_id) {
    return dispatch => {
        dispatch(request());

        userService.deleteHome(home_id)
            .then(
                user => {
                    dispatch(success());
                    history.push('/');
                    history.push('/profil');
                    dispatch(alertActions.success('Home deletion successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function deleteEvent(event_id) {
    return dispatch => {
        dispatch(request());

        userService.deleteEvent(event_id)
            .then(
                user => {
                    dispatch(success());
                    history.push('/');
                    history.push('/profil');
                    dispatch(alertActions.success('Event deletion successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function deleteAnnouncement(announcement_id) {
    return dispatch => {
        dispatch(request());

        userService.deleteAnnouncement(announcement_id)
            .then(
                user => {
                    dispatch(success());
                    history.push('/');
                    history.push('/profil');
                    dispatch(alertActions.success('Announcement deletion successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function addHome(home) {
    return dispatch => {
        dispatch(request(home));

        userService.addHome(home)
            .then(
                user => {
                    dispatch(success());
                    history.push('/ilan_ekle');
                    dispatch(alertActions.success('Home addition successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function addEvent(event) {
    return dispatch => {
        dispatch(request(event));

        userService.addEvent(event)
            .then(
                user => {
                    dispatch(success());
                    history.push('/ilan_ekle');
                    dispatch(alertActions.success('Event addition successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function addAnnouncement(announcement) {
    return dispatch => {
        dispatch(request(announcement));

        userService.addAnnouncement(announcement)
            .then(
                user => {
                    dispatch(success());
                    history.push('/ilan_ekle');
                    dispatch(alertActions.success('Announcement addition successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}