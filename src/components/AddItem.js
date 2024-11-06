import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../itemsSlice';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddItem = () => {
    // Validate the inputs
    if (!name || !price) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError('Giá phải là một số hợp lệ lớn hơn 0!');
      return;
    }

    setError('');
    // Dispatch the addItem action
    dispatch(addItem({ id: Date.now(), name, price }));
    // Clear input fields
    setName('');
    setPrice('');
    // Navigate to the home page
    navigate('/');
  };

  return (
    <div>
      <h2>Thêm Hàng Hóa</h2>
      <div>
        <input
          type="text"
          placeholder="Tên hàng hóa"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Giá hàng hóa"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <button onClick={handleAddItem}>Thêm hàng hóa</button>
        <button onClick={() => navigate('/')}>Quay Lại</button>
      </div>
    </div>
  );
};

export default AddItem;
