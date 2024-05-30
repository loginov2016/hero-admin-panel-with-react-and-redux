import { createReducer } from "@reduxjs/toolkit";
import { IActionType, heroesFetching, heroesFetched, heroesFetchingError, heroCreated, heroDeleted } from "../actions";
import { TLoadingStatusType, IReducerType } from "./reducer.types";


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

const heroesReducer = createReducer(initialState, builder => {
    builder.addCase(heroesFetching, state => {state.heroesLoadingStatus = 'loading'})
           .addCase(heroesFetched, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload;
            })
           .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
           })
           .addCase(heroCreated, (state, action) => {
            state.heroes.push(action.payload); 
           })
           .addCase(heroDeleted, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
            state.heroesLoadingStatus = 'idle';
           })
           .addDefaultCase( () => {} )
});

/* const heroesReducer: IReducerType<IHeroesStateType, IActionType> = (state = initialState, action: IActionType): IHeroesStateType => {
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
} */

export default heroesReducer;