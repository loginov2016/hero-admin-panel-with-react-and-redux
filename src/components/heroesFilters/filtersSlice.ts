import { createSlice } from "@reduxjs/toolkit";
import { TLoadingStatusType } from "../../reducers/reducer.types";

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

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => { state.filtersLoadingStatus = 'loading'; },
        filtersFetched: (state, action) => {
            state.filters = action.payload;
            state.filtersLoadingStatus = 'idle';
        },
        filtersFetchingError: state => { state.filtersLoadingStatus = 'error'; },
        activeFilterChanged: (state, action) => { state.activeFilter = action.payload; }
    }
});

const { actions, reducer } = filterSlice;
export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions;