import { IActionType } from "../actions";
import { TLoadingStatusType, IReducerType } from "./reducer.types";
import { TPayloadType } from "../actions";

export interface IFilterType {
    name: string;
    label: string;
    className: string;
}

export interface IFiltersStateType {
    filters: IFilterType[];
    filtersLoadingStatus: TLoadingStatusType;
    activeFilter: string;
    
}

const initialState: IFiltersStateType = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    
}

const filtersReducer: IReducerType<IFiltersStateType, IActionType> = (state = initialState, action: IActionType): IFiltersStateType => {
    switch (action.type) {
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            const arrFilters = action.payload as IFilterType[];
            return {
                ...state,
                filters: arrFilters,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            let activeFilterPayload = action.payload as string;
            return {
                ...state,
                activeFilter: activeFilterPayload,
            }
        default: return state;
    }
}

export default filtersReducer;