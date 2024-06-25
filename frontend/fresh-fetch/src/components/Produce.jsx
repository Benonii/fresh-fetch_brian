import { useState } from 'react';
import { useNavigate } from 'react-router';

import '../styles/Produce.css';

export default function Produce({ product, addToBasket }) {
    // This component is for the individual produce items that will be displayed
    // on the produce page

    const [ quantityModal, setQuantityModal ] = useState(false);
    const [ quantity, setQuantity ] = useState("");

    const navigate = useNavigate();


    const toggleQuantityModal = () => {
        setQuantityModal(!quantityModal);
        setQuantity("");
    };

    const makeOrder = () => {
        const pricePerPound = product.pricePerPound;
        // product.quantity = Number(quantity);
        const price = pricePerPound * Number(quantity);
        console.log('PpP: ', pricePerPound, 'quanitity:', 'price:', price)
        navigate('/summary', { state: { orders: [product] } });
    }

    function handleChangeQuantity(e) {
        setQuantity(e.target.value);
    }

    const quantityInput = (
        <>
            <div className="quantity-input-container">
            <label htmlFor="quantity-input">Quantity: </label>
                <input type="text" name='quantity-input' id='quantity-input'
                       placeholder="1lb" onChange={handleChangeQuantity} />
                <br />
                <button className="enter-quantity-btn"
                        onClick={makeOrder}
                        disabled={quantity === ""}>Continue</button>
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
                    <p className="price-per-pound">${product.pricePerPound} / lb</p>
                    <p className="vendor">Vendor: {product.vendor}</p>
                </div>

                {quantityModal ? quantityInput : (
                    <div className="produce-btns">
                        <button className="order-now-btn"
                                onClick={toggleQuantityModal}>Order now
                        </button>
                        <button className="add-to-basket"
                            onClick={() => addToBasket(product)}>
                        Add to Basket
                    </button>
                    </div>
                    )}
            </div>
        </div>
    )
};