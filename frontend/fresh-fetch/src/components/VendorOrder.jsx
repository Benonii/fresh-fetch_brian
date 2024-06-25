import '../styles/VendorOrder.css'

export default function VendorOrder({ order, handleFulfill }) {
    return (
        <div className="vendor-order" aria-label="Vendor order">
            {/* This image will be repalced by an image we fetch 
                from the api eventually */}
            <img src={order.pic} alt="order" />

            {/* This static data will also be replaced by data coming
                from the api */}
            
            <div className="order-details">
                <h3 className="order-name">{order.name}</h3>
                <p className="price">{order.price}</p>
                <p className="quantity">Quantity: {order.quantity}lb</p>
            </div>

            {/* This status will be either pending, confirmed or cancelled
                For now, it is just pending */}
            <div className="status">
                <small className={order.status}>{order.status}</small>
            </div>

            {/* Instead of ordering or confirming, the vendor has the fulfill
                button */}
            {order.status === "Pending" && (
                <div className="btn-container">
                    <button className="fulfill-btn"
                            onClick={() => {handleFulfill(order.id)}}>
                                Fulfill
                    </button>
                </div>
            )}
            
        </div>
    )
}