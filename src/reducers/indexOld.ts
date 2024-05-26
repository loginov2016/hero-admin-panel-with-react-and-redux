import { IActionType } from "../actions";

type TLoadingStatusType = 'idle' | 'loading' | 'error';

export interface IHeroesType {
    id?: number | string;
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
    heroesLoadingStatus: TLoadingStatusType;
    filters: IFilterType[];
    filtersLoadingStatus: TLoadingStatusType;
    activeFilter: string;
    
}

const initialState: IStateType = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    
}

const reducer = (state = initialState, action: IActionType) => {
    switch (action.type) {
        case 'HEROES_FETCHING': 
        return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED': 
        return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HERO_CREATED':
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }
        case 'HERO_DELETED': 
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload),
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
            }
        default: return state;
    }
}

export default reducer;