import { IHeroesType } from '../components/heroesList/heroesSlice';
import { IFilterType } from '../components/heroesFilters/filtersSlice';

export type TPayloadType = IHeroesType | IHeroesType[] | IFilterType[] | number | string;

export type TLoadingStatusType = 'idle' | 'loading' | 'error';

export interface IActionType {
    type: string;
    payload?: TPayloadType;
}

export interface IReducerType<T, A> {
    (state: T, action: A): T
}