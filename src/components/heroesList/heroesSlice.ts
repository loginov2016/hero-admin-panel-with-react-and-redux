import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";
import { IActionType } from "../../actions"; 
import { TLoadingStatusType } from "../../reducers/reducer.types";
import { IRequestType } from "../../hooks/http.hook";
import p from "../../../lib/print";
import { InitializeHook } from "module";


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

export const fetchHeroes = createAsyncThunk<IHeroesType[]>(
    'heroes/fetchHeroes',
    () => {
        const { request } = useHttp();
        return request('http://localhost:3001/heroes');
    }
);

p('fetchHeroes: ', fetchHeroes);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
            /* heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
            heroesFetched: (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload;
            },
            heroesFetchingError: state => {
                state.heroesLoadingStatus = 'error';
            },*/ 
            heroCreated: (state, action) => {
                state.heroes.push(action.payload); 
            },
            heroDeleted: (state, action) => {
                state.heroes = state.heroes.filter(item => item.id !== action.payload);
                state.heroesLoadingStatus = 'idle';
            }
    },
    extraReducers: builder => {
        builder.addCase( fetchHeroes.pending, state => { state.heroesLoadingStatus = 'loading' } )
               .addCase( fetchHeroes.fulfilled, (state, action) => {
                    state.heroesLoadingStatus = 'idle';
                    state.heroes = action.payload;
                    }
                ).addCase( fetchHeroes.rejected,  state => {
                    state.heroesLoadingStatus = 'error';
                    }
                ).addDefaultCase( () => {} )
    }
    });

    const { actions, reducer }  = heroesSlice;
    p('heroesSlice: ', heroesSlice);
    p('actions: ', actions);
    export default reducer;
    export const {
        /* heroesFetching,
        heroesFetched,
        heroesFetchingError,*/ 
        heroCreated,
        heroDeleted
    } = actions;