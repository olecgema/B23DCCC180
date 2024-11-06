import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice'; // Path to your itemsSlice

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

// Export the store as the default export if needed
export default store;
