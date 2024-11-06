// src/components/EditItemPage.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateItem } from '../itemsSlice'; // Import the updateItem action

const EditItemPage = () => {
  const { id } = useParams(); // Get the id from the URL
  const dispatch = useDispatch();
  const history = useHistory();
  const { items } = useSelector((state) => state.items);

  // Find the item to edit based on the id
  const itemToEdit = items.find((item) => item.id === parseInt(id));

  // If item not found, redirect to the list page
  if (!itemToEdit) {
    return <p>Item not found</p>;
  }

  // Local state to hold the form values
  const [name, setName] = useState(itemToEdit.name);
  const [price, setPrice] = useState(itemToEdit.price);

  useEffect(() => {
    // Set form values when the item is found
    setName(itemToEdit.name);
    setPrice(itemToEdit.price);
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dispatch the updateItem action to update the item
    dispatch(updateItem({ id: itemToEdit.id, name, price }));
    
    // Redirect to the item list page after updating
    history.push('/');
  };

  return (
    <div>
      <h2>Sửa Hàng Hóa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên Hàng Hóa:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Giá:</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>
          Cập Nhật
        </button>
      </form>
    </div>
  );
};

export default EditItemPage;
