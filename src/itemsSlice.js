import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 5,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // Action to add an item
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    // Action to set the search query
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    // Action to set the current page
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    // Action to set the list of items (useful for fetching data)
    setItems: (state, action) => {
      state.items = action.payload;
    },
    // Action to delete an item by its ID
    deleteItem: (state, action) => {
      // Filter out the item with the matching ID
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // Action to update an existing item
    updateItem: (state, action) => {
      const { id, name, price } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);

      if (itemIndex !== -1) {
        // Update the item in the list
        state.items[itemIndex] = { ...state.items[itemIndex], name, price };
      }
    },
  },
});

// Export the actions correctly
export const { addItem, setSearchQuery, setCurrentPage, setItems, deleteItem, updateItem } = itemsSlice.actions;

// Export the reducer as the default export
export default itemsSlice.reducer;
