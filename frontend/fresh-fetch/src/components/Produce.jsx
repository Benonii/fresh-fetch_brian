import { useState } from 'react';
import { useNavigate } from 'react-router';

import '../styles/Produce.css';

export default function Produce({ product, addToBasket, handleMakeOrder }) {
    // This component is for the individual produce items that will be displayed
    // on the produce page

    const [ quantityModal, setQuantityModal ] = useState(false);
    const [ quantity, setQuantity ] = useState("");

    const navigate = useNavigate();


    const toggleQuantityModal = () => {
        setQuantityModal(!quantityModal);
        setQuantity("");
    };

    const continueOrCancel = (
        quantity === "" ? (
            <button className="cancel-quantity-btn"
                    onClick={toggleQuantityModal}>
                Cancel
            </button>
        ) : (
            <button className="enter-quantity-btn"
                        onClick={() => {handleMakeOrder(product.id)}}>
                    Continue
            </button>
        )
    )

    function handleChangeQuantity(e) {
        setQuantity(e.target.value);
    }

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
        <div className="produce" aria-label='Produce item'>
            {/* This image will eventually be replaced by an image coming from an API */}
            <div className="produce-image">
                <img src={ product.pic } alt="Image of produce" />
            </div>

            {/* This data will also be replaced by data from the API. */}
            <div className="produce-info">
                <div className="produce-details">
                    <h3 className="prodice-name">{product.name}</h3>
                    <p className="price-per-pound">${product.pricePerPound} / kg</p>
                    <p className="vendor">Vendor: {product.vendor}</p>
                </div>

                {quantityModal ? quantityInput : (
                    <div className="produce-btns">
                        <button className="order-now-btn"
                                onClick={toggleQuantityModal}>Order now
                        </button>
                        <button className="add-to-basket"
                            onClick={() => addToBasket(product)}>
                        Add to basket
                    </button>
                    </div>
                    )}
            </div>
        </div>
    )
};