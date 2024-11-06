import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setCurrentPage, deleteItem } from '../itemsSlice'; // Import deleteItem
import { Link } from 'react-router-dom';
const ItemList = () => {
  const dispatch = useDispatch();
  const { items, searchQuery, currentPage, itemsPerPage } = useSelector((state) => state.items);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleDelete = (itemId) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá mặt hàng này?")) {
      dispatch(deleteItem(itemId));  // Dispatch delete action
    }
  };


  return (
    <div>
      <h2>Danh Sách Hàng Hóa</h2>
      <input
        type="text"
        placeholder="Tìm kiếm hàng hóa..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Link to="/add">
        <button style={{ backgroundColor: 'green', color: 'white' }}>Thêm Hàng Hóa</button>
      </Link>
      {currentItems.length > 0 ? (
        currentItems.map(item => (
          <div key={item.id} style={{ marginBottom: '10px' }}>
            {item.name} - {item.price}VND
            <button 
              onClick={() => handleDelete(item.id)}  
              style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
              Xoá
            </button>
            <button 
              onClick={() => handleDelete(item.id)}  
              style={{ marginLeft: '10px', backgroundColor: 'green', color: 'white' }}>
              Sửa
            </button>
          </div>
        ))
      ) : (
        <p>Không tìm thấy hàng hóa nào!</p>
      )}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Trang trước
        </button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default ItemList;
