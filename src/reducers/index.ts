import { IActionType } from "../actions";

type THeroesLoadingStatusType = 'idle' | 'loading' | 'error';

export interface IHeroesType {
    id?: number;
    name: string;
    description: string;
    element: string;
}
export interface IFilterType {
    name: string;
    label: string;
    className: string;
}

export interface IStateType {
    heroes: IHeroesType[];
    heroesLoadingStatus: THeroesLoadingStatusType;
    filters: IFilterType[];
    filtersLoadingStatus: string,
    activeFilter: string,
    filteredHeroes: IHeroesType[]
}

const initialState: IStateType = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action: IActionType) => {
    switch (action.type) {
        case 'HEROES_FETCHING': 
        return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED': 
        const arrPayload = Array.isArray(action.payload) ?  action.payload : null; 
        return {
                ...state,
                heroes: action.payload,
                filteredHeroes: state.activeFilter === 'all' ? arrPayload : arrPayload.filter(item => item.element === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        
        case 'HERO_DELETED': 
        const newHeroList = state.heroes.filter(item => item.id !== action.payload); 
        return {
            ...state,
            heroes: newHeroList,
            filteredHeroes: state.activeFilter === 'all' ? newHeroList : newHeroList.filter(item => item.element === state.activeFilter),
            heroesLoadingStatus: 'idle'
        }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ? state.heroes : state.heroes.filter(item => item.element === action.payload)
            }
        default: return state;
    }
}

export default reducer;