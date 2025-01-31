import { StoreEnhancer, Dispatch, createStore, combineReducers, Reducer, Store, compose, applyMiddleware} from 'redux';
import { configureStore, Action } from '@reduxjs/toolkit';
//import { thunk } from 'redux-thunk'; // Вместо ReduxThunk нужно писать просто именованный thunk
import heroesReducer  from '../components/heroesList/heroesSlice';
import filtersReducer from '../components/heroesFilters/filtersSlice';
import { IHeroesStateType } from '../reducers/heroesReducer'
import { IFiltersStateType } from '../reducers/filtersReducer'
import p from '../../lib/print';
import { IActionType } from '../actions';
import { IReducerType }  from "../reducers/reducer.types";
import { Middleware } from 'webpack-dev-server';

/* export interface IRootStateType {
    heroesReducer: IHeroesStateType;
    filtersReducer: IFiltersStateType; 
} */

interface newDispatchType<T> extends Dispatch {
    (action: T): T;
}

//store: Store<IRootStateType, IActionType, Dispatch<IActionType>>
const stringMiddlware = () => (dispatch: Dispatch<IActionType>) => (action: IActionType | string) => {
    if( typeof action === 'string' ) {
        return dispatch( {
            type: action
        } );
    }
    return dispatch(action);
}
/* 
    function createStore<S, A extends Action<string>, Ext extends {} = {}, StateExt extends {} = {}>
    (reducer: Reducer<S, A>, enhancer?: StoreEnhancer<Ext, StateExt>): 
    Store<S, A, UnknownIfNonSpecific<StateExt>> & Ext (+1 overload)
*/
// createStore: (reducer: IReducerType<IRootStateType, IActionType>) => Store<IRootStateType, IActionType, Dispatch<IActionType>>
const enhancer: StoreEnhancer = ( createStore ) => (...args) => {
    const store = createStore(...args);
    const oldDispatch: Dispatch<IActionType> = store.dispatch;
    const newDispatch: newDispatchType<string | IActionType> = (action: string | IActionType) => {
        if(typeof action === 'string') {
            return oldDispatch({ type: action });
        }
        return oldDispatch(action);
    }
    store.dispatch = newDispatch;
    return store;
}

//const rootReducer = combineReducers( {heroesReducer, filtersReducer} );
//p('rootReducer', rootReducer);
//const composeMiddlewares = compose( applyMiddleware(thunk, stringMiddlware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );
//const store = createStore(rootReducer,  composeMiddlewares); 
//compose( enhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )

const store = configureStore({
    reducer: {heroesReducer, filtersReducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddlware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type IRootStateType = ReturnType<typeof store.getState>;
export type TAppDispatchType = typeof store.dispatch;

export default store;