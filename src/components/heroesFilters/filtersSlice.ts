import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TLoadingStatusType } from "../../reducers/reducer.types";
import { useHttp } from "../../hooks/http.hook";

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

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const { request } = useHttp();
        return request("http://localhost:3001/filters");
    }
);

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        /* filtersFetching: state => { state.filtersLoadingStatus = 'loading'; },
        filtersFetched: (state, action) => {
            state.filters = action.payload;
            state.filtersLoadingStatus = 'idle';
        },
        filtersFetchingError: state => { state.filtersLoadingStatus = 'error'; }, */
        activeFilterChanged: (state, action) => { state.activeFilter = action.payload; }
    },
    extraReducers: builder => {
        builder.addCase(fetchFilters.pending, state => { state.filtersLoadingStatus = 'loading'; } )
               .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filters = action.payload;
                state.filtersLoadingStatus = 'idle';
            }).addCase(fetchFilters.rejected, state => { state.filtersLoadingStatus = 'error'; })
              .addDefaultCase( () => {} )
    }
});

const { actions, reducer } = filterSlice;
export default reducer;
export const {
    /* filtersFetching,
    filtersFetched,
    filtersFetchingError, */
    activeFilterChanged
} = actions;