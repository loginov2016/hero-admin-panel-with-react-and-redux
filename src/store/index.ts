import { createStore, combineReducers, Reducer, Store, Dispatch } from 'redux';
import heroesReducer from '../reducers/heroesReducer';
import filtersReducer from '../reducers/filtersReducer';
import { IHeroesStateType } from '../reducers/heroesReducer'
import { IFiltersStateType } from '../reducers/filtersReducer'
import p from '../../lib/print';
import { IActionType } from '../actions';

export interface IRootStateType {
    heroesReducer: IHeroesStateType;
    filtersReducer: IFiltersStateType; 
}

const rootReducer = combineReducers( {heroesReducer, filtersReducer} );
p('rootReducer', rootReducer);

const store: Store<IRootStateType, IActionType, Dispatch<IActionType>> = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;