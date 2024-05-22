import { IHeroesType } from '../reducers';

type TPayloadType = IHeroesType[] | number | string;

export interface IActionType {
    type: string;
    payload?: TPayloadType;
}

export const heroesFetching = (): IActionType => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes: IHeroesType[]): IActionType => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = (): IActionType => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDeleted = (id: number): IActionType => {
    return {
        type: 'HERO_DELETED',
        payload: id
    }
}

/* 
    {
      "id": 1,
      "name": "Первый герой",
      "description": "Первый герой в рейтинге!",
      "element": "fire"
    },
    {
      "id": 2,
      "name": "Неизвестный герой",
      "description": "Скрывающийся в тени",
      "element": "wind"
    },
    {
      "id": 3,
      "name": "Морской герой",
      "description": "Как аквамен, но не из DC",
      "element": "water"
    }
*/