// React related imports
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

// Components
import Header from "../components/Header";
import Produce from "../components/Produce";
import Search from "../components/Search";
import Profile from "../components/Profile";
import Logout from "../components/Logout";

// Styling
import "../styles/ProducePage.css";

// images
import basketImg from "../images/basket.jpg";
import profilePic from "../images/pic-person-01.jpg";
import tomatoImg from "../images/tomato.jpg";
import onionImg from "../images/onion.jpg";
import gingerImg from "../images/ginger.jpg";


export default function ProducePage() {
    // This component displays all the available produces to the user
    
    // User state is empty to represent users that are not logged in
    const location = useLocation();
    const state = location.state;

    // console.log("User:", state.user)

    const [ user, setUser ] = useState(state ? {
        userId: state.user.id,
        firstName: state.user.first_name,
        lastName: state.user.last_name,
        basket: [],
        profilePic: state.user.image,
    } : null);

    const products = getProducts();
    const [ displayProducts, setDisplayProducts ] = useState(products.length > 0 ? [
        {
            id: products[0]?.id,
            name: products[0]?.title,
            pricePerPound: products[0]?.price,
            vendor: products[0]?.description,
            quantity: 1,
            price: 0,
            status: null,
            pic: tomatoImg,
        },
        {
            id: "2",
            name: "Organic Ginger",
            pricePerPound: 12.99,
            vendor: "Kmart",
            quantity: 1,
            price: 0,
            status: null,
            pic: gingerImg,
        },
        {
            id: "3",
            name: "Sweet Onion",
            pricePerPound: 2.99,
            vendor: "target",
            quantity: 1,
            price: 0,
            status: null,
            pic: onionImg,
        }
    ]: [
        {
            id: "1",
            name: "Heirloom tomato",
            pricePerPound: "5.99",
            vendor: "Wall-mart",
            quantity: 1,
            price: 0,
            status: null,
            pic: tomatoImg,
        },
        {
            id: "2",
            name: "Organic Ginger",
            pricePerPound: 12.99,
            vendor: "Kmart",
            quantity: 1,
            price: 0,
            status: null,
            pic: gingerImg,
        },
        {
            id: "3",
            name: "Sweet Onion",
            pricePerPound: 2.99,
            vendor: "target",
            quantity: 1,
            price: 0,
            status: null,
            pic: onionImg,
        }
    ]);

    async function getProducts() {
        const response = await fetch('http://127.0.0.1:8000/api/v1/products', {
            method: 'get',
        });

        let products;
        if (response.ok) {
            products = await response.json();
        } else {
            console.log("I am not okay");
        }
        console.log(products);
        return products;
    }
    const navigate = useNavigate();

    const goToBasket = () => {
        navigate('/basket');
    }

    const goToLogin = () => {
        navigate('/login');
    }

    const goToSignup = () => {
        navigate('/signup');
    }

    const handleMakeOrder = (id) => {
        const product = displayProducts.filter(product => product.id === id)
        user ? navigate('/summary', { state: { orders: [product] } })
             : goToLogin();
    }

    const addToBasket = (produce) => {
        setUser((prevState) => ({
            ...prevState,
            basket: [
                ...prevState.basket,
                produce,
            ]
        }))
    }

    function handleLogout() {
        setUser(null);
    }

    /* Depending on weather the user is logged in or not, this area will either
       display a login/signup button OR a basket page*/
    const conditionalComponent = user ? (
        <div className="basket-container">
            <button className="basket-btn" onClick={goToBasket}>
                <p>Basket({user.basket.length})</p>
                <img src={basketImg} alt="" />
            </button>
        </div> 
    ) : (
        <div className="user-auth-container">
            <button className="login-btn" onClick={goToLogin}>Login</button>
            <hr />
            <button className="signup-btn" onClick={goToSignup}>Signup</button>
        </div>
    );

    return (
        <>
            <div className="header-container">
                <Header />
                
            {conditionalComponent}

            </div>

            {user !== null && (
                <div className="profile-container" aria-label="User Profile">
                <Profile profilePic={profilePic} />
                <div className="user-info">
                    <h2 className="user-header">Welcome {user?.firstName}</h2>
                    <Logout handleLogout={handleLogout}/>
                </div>
            </div>
            )}

            <main>
                {/* This div contains the produce header and the search,
                    button */}
                <div className="secondary-header">
                    <h2>Produce</h2>
                    <Search />
                </div>
                <hr />
                

                {/* A few of the available produces */}
                <div className="produces">
                    {displayProducts.map((product) => (
                        <Produce key={product.id} product={product}
                                 handleMakeOrder={handleMakeOrder}
                                 addToBasket={user ? addToBasket : goToLogin} />
                    ))}
                </div>
            </main>
        </>
    )
}