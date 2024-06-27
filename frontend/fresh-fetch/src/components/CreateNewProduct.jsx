import React, { useState } from 'react';

import '../styles/CreateNewProduct.css';


function CreateNewProduct({ createProduct }) {
    const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    price: '',
    stock: ''
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.image && formData.name && formData.price && formData.stock) {
      createProduct(formData);
      setIsOpen(false);
      setFormData({
        image: null,
        name: '',
        price: '',
        stock: ''
      });
    }
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const isFormIncomplete = formData.name && formData.price && formData.stock;
  const createOrCancel = isFormIncomplete ?
                                <button type="submit" disabled={!isFormIncomplete}>Submit</button> 
                            :
                            <button onClick={toggleForm} className="cancel-btn">Cancel</button> 
  return (
    <div className="new-product-form">
      {/* <button onClick={toggleForm}>
        {isOpen ? (isFormIncomplete ? 'Create' : 'Cancel') : 'New'}
      </button> */}
      {isOpen && (
        <div className="form-popup">
          <form onSubmit={handleSubmit}>
            <label>
              Image:
              <input type="file" name="image" onChange={handleChange} required />
            </label>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Price per pound:
              <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required />
            </label>
            <label>
              Available Stock(in kg):
              <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} required />
            </label>
            {createOrCancel}
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateNewProduct
