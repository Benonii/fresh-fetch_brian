import { useState } from 'react';
import { useNavigate } from 'react-router';

import '../styles/VendorProducts.css';

export default function VendorProduct({ product, changeQuantity, removeProduct }) {
    // This component is for the individual product items that will be displayed
    // on the product page

    const [ quantityModal, setQuantityModal ] = useState(false);
    const [ quantity, setQuantity ] = useState("");

    const navigate = useNavigate();


    const toggleQuantityModal = () => {
        setQuantityModal(!quantityModal);
        setQuantity("");
    };

    function handleChangeQuantity(e) {
        setQuantity(e.target.value);
    }

    const continueOrCancel = (
        quantity === "" ? (
            <button className="cancel-quantity-btn"
                    onClick={toggleQuantityModal}>
                Cancel
            </button>
        ) : (
            <button className="enter-quantity-btn"
                        onClick={() => {
                            changeQuantity(Number(quantity), product.id);
                            toggleQuantityModal();
                        }}>
                    Continue
            </button>
        )
    )

    const quantityInput = (
        <>
            <div className="quantity-input-container">
            <label htmlFor="quantity-input">Quantity: </label>
                <input type="text" name='quantity-input' id='quantity-input'
                       placeholder="1kg" onChange={handleChangeQuantity} />
                <br />
                {continueOrCancel}
            </div>
        </>
    )

    return (
        <div className="product" aria-label='Product item'>
            {/* This image will eventually be replaced by an image coming from an API */}
            <div className="product-image">
                <img src={ product.pic } alt="Image of product" />
            </div>

            {/* This data will also be replaced by data from the API. */}
            <div className="product-info">
                <div className="product-details">
                    <h3 className="prodice-name">{product.name}</h3>
                    <p className="price-per-pound">${product.pricePerPound} / kg</p>
                    <p className="available-quantity">Available quantity: {product.quantity}kgs</p>
                </div>

                {quantityModal ? quantityInput : (
                    <div className="product-btns">
                        <button className="change-quantity-btn"
                                onClick={toggleQuantityModal}>
                                    Change quantity
                        </button>
                        <button className="remove-product"
                            onClick={() => removeProduct(product.id)}>
                                Remove
                    </button>
                    </div>
                    )}
            </div>
        </div>
    )
};