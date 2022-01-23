import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    verify,
    retrievePassword,
    getOnlineCount
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    return dispatch => {
        dispatch(request());

        userService.logout()
            .then(
                () => { 
                    dispatch(success());
                    history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: userConstants.LOGOUT_REQUEST } }
    function success() { return { type: userConstants.LOGOUT_SUCCESS } }
    function failure(error) { return { type: userConstants.LOGOUT_FAILURE, error } }
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/verify');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function verify(email, code){
    return dispatch => {
        dispatch(request(email));
        userService.verify(email, code)
            .then(
                () => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Verification successful'));
                    
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            )
    }
    function request() { return { type: userConstants.VERIFICATION_REQUEST } }
    function success() { return { type: userConstants.VERIFICATION_SUCCESS } }
    function failure(error) { return { type: userConstants.VERIFICATION_FAILURE, error } }
}

function retrievePassword(email){
    return dispatch => {
        dispatch(request(email));
        userService.retrievePassword(email)
            .then(
                () => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Password sent'));
                    
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            )
    }
    function request() { return { type: userConstants.RETRIEVAL_REQUEST } }
    function success() { return { type: userConstants.RETRIEVAL_SUCCESS } }
    function failure(error) { return { type: userConstants.RETRIEVAL_FAILURE, error } }
}

function getOnlineCount(){
    return dispatch => {
        dispatch(request());
        userService.getOnlineCount()
            .then(
                response => dispatch(success(response.message)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETONLINECOUNT_REQUEST } }
    function success(response) { return { type: userConstants.GETONLINECOUNT_SUCCESS, response } }
    function failure(error) { return { type: userConstants.GETONLINECOUNT_FAILURE, error } }
}

function getNotVerificatedCount(){
    return dispatch => {
        dispatch(request());
        userService.getNotVerificatedCount()
            .then(
                response => dispatch(success(response.message)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETNOTVERIFICATEDCOUNT_REQUEST} }
    function success(response) { return { type: userConstants.GETNOTVERIFICATEDCOUNT_SUCCESS, response } }
    function failure(error) { return { type: userConstants.GETNOTVERIFICATEDCOUNT_ERROR, error } }
}
