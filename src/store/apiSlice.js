import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const CACHE_KEY = 'redux_api_cache';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(CACHE_KEY);
    if (serializedState) {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    console.error('Could not load cached state', err);
  }
  return {
    posts: [],
    loading: false,
    error: null,
    lastFetched: null,
  };
};

export const fetchApiPosts = createAsyncThunk(
  'api/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { api } = getState();
      const now = Date.now();
      const FIVE_MINUTES = 5 * 60 * 1000;

      // Agar data already load ho raha hai, ya 5 minute se kam waqt guzra hai, toh request rok do
      if (api.loading) {
        return false;
      }
      if (api.lastFetched && (now - api.lastFetched < FIVE_MINUTES)) {
        return false;
      }
      return true; // Else API call allow karo
    }
  }
);

const apiSlice = createSlice({
  name: 'api',
  initialState: loadState(),
  reducers: {
    addApiPost: (state, action) => {
      state.posts.unshift(action.payload);
      localStorage.setItem(CACHE_KEY, JSON.stringify(state));
    },
    updateApiPost: (state, action) => {
      const index = state.posts.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...action.payload };
        localStorage.setItem(CACHE_KEY, JSON.stringify(state));
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiPosts.pending, (state) => {
        if (state.posts.length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchApiPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.lastFetched = Date.now();
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          posts: state.posts,
          loading: false,
          error: null,
          lastFetched: state.lastFetched,
        }));
      })
      .addCase(fetchApiPosts.rejected, (state, action) => {
        state.loading = false;
        if (action.payload !== 'cached') {
          state.error = action.payload || 'Failed to fetch API posts';
        }
      });
  },
});

export const { addApiPost, updateApiPost } = apiSlice.actions;
export default apiSlice.reducer;
