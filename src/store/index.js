import {createStore, combineReducers} from 'redux';
import addReducer from "./reducers/addReducer";
import change_lang from "./reducers/change_lang";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
    addReducer,
    change_lang
})
const myPersistReducer = persistReducer(persistConfig, rootReducer)
const initializeState = {};
const store = createStore(myPersistReducer, initializeState);
export const persistor = persistStore(store)
export default store;