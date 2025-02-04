import { Dispatch } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import heroesReducer  from '../components/heroesList/heroesSlice';
import filtersReducer from '../components/heroesFilters/filtersSlice';
import { IActionType}  from "../types/reducer.types";

//store: Store<IRootStateType, IActionType, Dispatch<IActionType>>
const stringMiddlware = () => (dispatch: Dispatch<IActionType>) => (action: IActionType | string) => {
    if( typeof action === 'string' ) {
        return dispatch( {
            type: action
        } );
    }
    return dispatch(action);
}

const store = configureStore({
    reducer: {heroesReducer, filtersReducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddlware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type IRootStateType = ReturnType<typeof store.getState>;
export type TAppDispatchType = typeof store.dispatch;

export default store;