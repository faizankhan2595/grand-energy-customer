import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import chatReduce from './Chats';

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    chat: chatReduce
});

export default reducers;