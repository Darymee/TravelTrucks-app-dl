import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCamperById, fetchCampers } from '../api/api';

function applyClientFilters(items, filters) {
  if (!filters) return items;
  const location = (filters.location || '').trim().toLowerCase();
  const form = filters.form || '';
  const features = filters.features || {};

  const activeFeatureKeys = Object.keys(features).filter(k => features[k]);

  return (items || []).filter(camper => {
    if (location) {
      const camperLocation = String(camper.location || '').toLowerCase();
      if (!camperLocation.includes(location)) return false;
    }

    if (form) {
      if (String(camper.form || '') !== String(form)) return false;
    }

    for (const key of activeFeatureKeys) {
      if (key === 'automatic') {
        if (camper.transmission !== 'automatic') return false;
        continue;
      }
      if (key === 'petrol') {
        if (camper.engine !== 'petrol') return false;
        continue;
      }
      if (!camper[key]) return false;
    }

    return true;
  });
}

function buildServerParams(filters, page, limit) {
  const params = { page, limit };

  if (filters?.location?.trim()) {
    params.location = filters.location.trim();
  }

  if (filters?.form) params.form = filters.form;

  const features = filters?.features || {};
  for (const [key, value] of Object.entries(features)) {
    if (!value) continue;

    if (key === 'automatic') {
      params.transmission = 'automatic';
      continue;
    }
    if (key === 'petrol') {
      params.engine = 'petrol';
      continue;
    }

    params[key] = true;
  }

  return params;
}

export const getCampers = createAsyncThunk(
  'campers/getAll',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const filters = state.filters;
      const { limit } = state.campers;

      const page = 1;
      const params = buildServerParams(filters, page, limit);

      const data = await fetchCampers(params);
      const rawItems = data?.items ?? data ?? [];
      const filteredItems = applyClientFilters(rawItems, filters);

      return {
        items: filteredItems,
        totalFromServer: data?.total ?? null,
        receivedCount: Array.isArray(rawItems) ? rawItems.length : 0,
        page,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e?.message ?? 'Failed to load campers');
    }
  }
);

export const loadMoreCampers = createAsyncThunk(
  'campers/loadMore',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const filters = state.filters;
      const { page: currentPage, limit, hasMore } = state.campers;

      if (!hasMore) {
        return {
          items: [],
          totalFromServer: null,
          receivedCount: 0,
          page: currentPage,
        };
      }

      const page = currentPage + 1;
      const params = buildServerParams(filters, page, limit);

      const data = await fetchCampers(params);
      const rawItems = data?.items ?? data ?? [];
      const filteredItems = applyClientFilters(rawItems, filters);

      return {
        items: filteredItems,
        totalFromServer: data?.total ?? null,
        receivedCount: Array.isArray(rawItems) ? rawItems.length : 0,
        page,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e?.message ?? 'Failed to load more campers'
      );
    }
  }
);

export const getCamperDetails = createAsyncThunk(
  'campers/getById',
  async (id, thunkAPI) => {
    try {
      const camper = await fetchCamperById(id);

      if (!camper || camper.id == null) {
        return thunkAPI.rejectWithValue('Camper not found');
      }

      return camper;
    } catch (e) {
      const status = e?.response?.status;

      if (status === 404) {
        return thunkAPI.rejectWithValue('Camper not found');
      }

      const messageFromServer =
        e?.response?.data?.message || e?.response?.data?.error;

      return thunkAPI.rejectWithValue(
        messageFromServer ?? e?.message ?? 'Failed to load camper'
      );
    }
  }
);

const initialState = {
  items: [],
  total: 0,
  page: 1,
  limit: 4,
  hasMore: true,

  isLoading: false,
  error: null,

  detailsById: {},
  detailsLoading: false,
  detailsError: null,
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    resetSearchResults(state) {
      state.items = [];
      state.total = 0;
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // NEW SEARCH
      .addCase(getCampers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCampers.fulfilled, (state, action) => {
        state.isLoading = false;

        state.items = action.payload.items ?? [];
        state.page = action.payload.page ?? 1;

        state.hasMore = (action.payload.receivedCount ?? 0) === state.limit;

        state.total = action.payload.totalFromServer ?? state.items.length;
      })
      .addCase(getCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ?? action.error?.message ?? 'Failed to load campers';
      })

      // LOAD MORE
      .addCase(loadMoreCampers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadMoreCampers.fulfilled, (state, action) => {
        state.isLoading = false;

        const newItems = action.payload.items ?? [];
        state.items.push(...newItems);

        state.page = action.payload.page ?? state.page;
        state.hasMore = (action.payload.receivedCount ?? 0) === state.limit;

        // total можна оновити (за бажанням)
        if (action.payload.totalFromServer != null) {
          state.total = action.payload.totalFromServer;
        }
      })
      .addCase(loadMoreCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ??
          action.error?.message ??
          'Failed to load more campers';
      })

      // DETAILS
      .addCase(getCamperDetails.pending, state => {
        state.detailsLoading = true;
        state.detailsError = null;
      })
      .addCase(getCamperDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        const camper = action.payload;
        if (camper?.id != null) {
          state.detailsById[camper.id] = camper;
        }
      })
      .addCase(getCamperDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError =
          action.payload ?? action.error?.message ?? 'Failed to load camper';
      });
  },
});

export const { resetSearchResults } = campersSlice.actions;

// selectors
export const selectCampersItems = state => state.campers.items;
export const selectCampersTotal = state => state.campers.total;
export const selectCampersIsLoading = state => state.campers.isLoading;
export const selectCampersError = state => state.campers.error;

export const selectCampersHasMore = state => state.campers.hasMore;
export const selectCampersPage = state => state.campers.page;

export const selectCamperDetailsMap = state => state.campers.detailsById;
export const selectCamperDetailsLoading = state => state.campers.detailsLoading;
export const selectCamperDetailsError = state => state.campers.detailsError;

export const selectCamperDetails = (state, id) => state.campers.detailsById[id];

export default campersSlice.reducer;
