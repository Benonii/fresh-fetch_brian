import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Header from "../components/Header";
import basketImg from "../images/basket.jpg";
import Order from "../components/Order";
import PendingOrder from "../components/PendingOrder";
import Profile from "../components/Profile";

import "../styles/Basket.css";

import profilePic from "../images/pic-person-01.jpg";
import tomatoImg from "../images/tomato.jpg";
import gingerImg from "../images/ginger.jpg";
import onionImg from "../images/onion.jpg";


export default function Basket() {
    // This is a component that will display the basket page

    // const statuses = {
    //     completed: "Completed",
    //     pending: "Pending",
    //     cancelled: "cancelled",
    // }

    // User state is empty to represent users that are not logged in
    const [ user, setUser ] = useState({
        userId: "1",
        firstName: "Benoni",
        lastName: "Esckinder",
        basket: [
            {
                id: "1",
                productId: "1",
                name: "Heirloom tomato",
                pricePerPound: 5.99,
                vendor: "Wall-Mart",
                quantity: 1,
                price: 0,
                orderStatus: null,
                paidStatus: false,
                pic: tomatoImg,
            },
            {
                id: "2",
                productId: "2",
                name: "Organic ginger",
                pricePerPound: 12.99,
                vendor: "Wall-Mart",
                quantity: 1,
                price: 0,
                status: null,
                pic: gingerImg,
            },
            {
                id: "3",
                productId: "3",
                name: "Sweet onion",
                pricePerPound: 14.95,
                vendor: "Fresh Corner",
                quantity: 1,
                price: 0,
                status: null,
                pic: onionImg,
            },
        ],
        profilePic: profilePic,
    });

    // const location = useLocation();
    // const allPending = [];
    // const pendingOrdersState = location.state;
    // let pendingOrders = pendingOrdersState ? pendingOrdersState.pendingOrders : [];

    const [ madeOrders, setMadeOrders ] = useState([]);
    const [ unmadeOrders, setUnmadeOrders ] = useState(user.basket);

    useEffect(() => {
        const unmade = user.basket;
  
        setUnmadeOrders(unmade);
    }, [user.basket]);

    // if (pendingOrders != madeOrders) {
    //     setMadeOrders((pendingOrders));
    // }

    function handleChangeQuantity(e, id) {
        const value = e.target.value;
        const newBasket = user.basket.map((item) => {
            if(item.id === id) {
                return { ...item, quantity: value };
            } else {
            return item;
            }
        })
        setUser((prevState) => ({
            ...prevState,
            basket: newBasket,
        }));
    }


    function removeOrder(id) {
        const newBasket = user.basket.filter(order => order.id !== id);
        setUser((prevState) => ({
            ...prevState,
            basket: newBasket,
        }));
    }

    function cancelOrder(id) {
        const newBasket = madeOrders.filter(order => order.id !== id);
        setMadeOrders(newBasket);
    };

    function cancelAllPending() {
        setMadeOrders([]);
    }

    function confirmOrder(id) {
        const newMadeOrders = madeOrders.map((order => {
            if (order.id === id) {
                return {...order, status: "Completed"};
            } else {
                return order;
            }
        }))
        setMadeOrders(newMadeOrders);
    };

    const navigate = useNavigate();

    function updateOrder(id) {
        setUser((prevState) => ({
            ...prevState,
            basket: prevState.basket.map((item) => {
                if (item.id === String(id)) {
                    const price = item.pricePerPound * item.quantity;
                    return {...item, price: price};
                } else {
                    return item;
                }
            }),
        }));
        const item = user.basket.filter(item => item.id === id);
        // Returns the item instead of the filtered array
        return item[0];
    }

    function handleOrderNow(id) {
        // setPrice returns the object that was ordered and
        // updates it's price attribute
        const order = updateOrder(id);

        // Summary always recieves an array of prices
        removeOrder(id);
        navigate('/summary', { state: { orders: Array.of(order)}});
    }

    function handleOrderAll(id) {

        navigate('/summary', { state: { orders: user.basket } });
    }

    return (
        <>
            <div className="header-container">
                <Header />
            </div>

            <div className="profile-container" aria-label="User Profile">
                <Profile profilePic={user.profilePic} />
                <div className="user-info">
                    <h2 className="user-header">{user.firstName}'s Basket</h2>
                </div>
            </div>

            <main>
                {/* This div contains the basket logo,
                    the orders count and the order-all button */}
                <div className="basket-header">
                    <div className="basket-logo">
                        <img src={basketImg} alt="A basket" />
                        <div className="basket-logo-text">
                            <h2>Basket</h2>
                            <small className="item-count" aria-label="Item count">{user.basket.filter(order => !order.status).length} item(s)</small>
                        </div>
                    </div>

                    <button className="order-all-btn"
                            onClick={handleOrderAll}>Order all</button>
                </div>
                <hr />

                {/* This div is for orders that haven't been made yet */}
                <div className="pre-orders">
                    {user.basket.filter(order => !order.status).length === 0 ? (
                        <p className="basket-p">Looks like there is nothing in your basket.</p>
                    ) :
                        unmadeOrders.map((order) => (
                                <Order key={order.id}
                                    order={order} 
                                    removeOrder={removeOrder}
                                    handleChange={handleChangeQuantity}
                                    handleOrder={handleOrderNow} />
                            ))
                        }
                    {/* {preOrders.map((order) => (
                        <Order key={order.id}
                               order={order} 
                               removeOrder={removeOrder} />
                    ))} */}
                </div>

                {/* This div contains the "pending" header and the cancel-all
                    button
                */}
                <div className="pending-header">
                    <div className="pending-header-text">
                        <h2>Pending</h2>
                        <small className="item-count">{madeOrders.length} item(s)</small>
                    </div>
                    <button className="cancel-all-btn"
                            onClick={cancelAllPending}>Cancel all</button>
                </div>
                <hr />

                {/* This div is for all the orders that have been made(sent out)
                    but still not delivered yet. */}

                <div className="pending-orders">
                    {madeOrders.length === 0 ? (
                        <p className="basket-p">You have no pending orders</p>
                    ) :                     
                        madeOrders.map((order) => (
                                <PendingOrder key={order.id}
                                              order={order}
                                              cancelOrder={cancelOrder}
                                              confirmOrder={confirmOrder} />
                            ))
                        }
                </div>
            </main>
            
        </>
    )
}