import { IActionType } from "../actions";
import { TLoadingStatusType } from "./reducer.types";



export interface IHeroesType {
    id?: number | string;
    name: string;
    description: string;
    element: string;
}

export interface IHeroesStateType {
    heroes: IHeroesType[];
    heroesLoadingStatus: TLoadingStatusType;
}

const initialState: IHeroesStateType = {
    heroes: [],
    heroesLoadingStatus: 'idle', 
}

const heroesReducer = (state = initialState, action: IActionType): IHeroesStateType => {
    switch (action.type) {
        case 'HEROES_FETCHING': 
            return {
                    ...state,
                    heroesLoadingStatus: 'loading'
                }
        case 'HEROES_FETCHED': 
            const arrHeroesFetched = action.payload as IHeroesType[];
            return {
                    ...state,
                    heroes: arrHeroesFetched,
                    heroesLoadingStatus: 'idle'
                }
         case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_CREATED':
            const arrHeroesPayload = [...state.heroes, action.payload] as IHeroesType[];
            return {
                ...state,
                heroes: arrHeroesPayload
            }
        case 'HERO_DELETED': 
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload),
                heroesLoadingStatus: 'idle'
            }
        default: return state;
    }
}

export default heroesReducer;