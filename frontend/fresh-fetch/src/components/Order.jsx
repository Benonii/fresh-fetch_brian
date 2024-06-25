import "../styles/Order.css"
import pencilImg from "../images/pencil.png";

export default function Order({ order, removeOrder, handleChange, handleOrder }) {
    // This component is for the individual order items that will be displayed
    // in the basket. These orders haven't been made yet
    return (
        <div className="order" aria-label='Unmade order'>
            {/* This image will be repalced by an image we fetch 
                from the api eventually */}
            <img src={ order.pic } alt="Produce" />

            {/* This static data will also be replaced by data coming
                from the api */}
            
            <div className="order-details">
                <h3 className="order-name">{order.name}</h3>
                <p className="price-per-pound">${order.pricePerPound} / kg</p>
                <p className="vendor">Vendor: {order.vendor}</p>

                <div className="order-btns">
                    <button className="order-now-btn"
                            onClick={() => {handleOrder(order.id)}}>Order now</button>
                    <button className="remove-btn"
                            onClick={() => {removeOrder(order.id)}}>Remove</button>
                </div>
            </div>

            {/* This is where a user would enter the amount of the particular
                produce that they want */}
            <div className="quantity-input">
                <span id="hiddenLabel">Enter the desired quantity:</span>
                <input type="text" placeholder="1kg"
                       default="1lb" name="quantity input" aria-labelledby='hiddenLabel'
                       onChange={(e) => handleChange(e, order.id)} />
                <img src={pencilImg} alt="A pencil" />
            </div>
        </div>
    )
};