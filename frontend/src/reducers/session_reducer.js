import { RECEIVE_USER_LOGOUT } from "../actions/session_actions";


export default function(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_USER_LOGOUT: 
        return {
            authenticated: false,
            user: undefined
        };
        default:
            return state;
    }
}