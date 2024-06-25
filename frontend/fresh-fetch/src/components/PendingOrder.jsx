import "../styles/PendingOrder.css"

export default function PendingOrder({ order, cancelOrder, confirmOrder }) {
    // This component is for the individual order items that will be displayed
    // in the pending area of the basket. The orders are made and the user is
    // waiting for them to be delivered.


    return (
        <div className="pending-order" aria-label="Pending/Cancelled order">
            {/* This image will be repalced by an image we fetch 
                from the api eventually */}
            <img src={order.pic} alt="produce" />

            {/* This static data will also be replaced by data coming
                from the api */}
            <div className="order-details">
                <h3 className="order-name">{order.name}</h3>
                <p className="price">Price: ${order.price}</p>
                <p className="quantity">Quantity: {order.quantity} lbs</p>
                <p className="vendor">Vendor: {order.vendor}</p>
                
                <div className="order-btns">
                    <button className="confirm-btn"
                            onClick={() => {confirmOrder(order.id)}}>Confirm</button>
                    <button className="cancel-btn"
                            onClick={() => {cancelOrder(order.id)}}>Cancel</button>
                </div>
            </div>

            {/* This status will be either pending, confirmed or cancelled */}
            <div className="status">
                <small className={order.status}>{order.status}</small>
            </div>
        </div>
    )
};