import { render, screen} from "@testing-library/react";
import { userEvent} from '@testing-library/user-event';
import { BrowserRouter } from "react-router-dom";

import VendorOrder from "./VendorOrder";
import tomatoImg from '../images/tomato.jpg';
import onionImg from '../images/onion.jpg';

describe('<VendorOrder />', () => {
    const enRouteOrder = {
        id: "1",
        productId: "1",
        name: "Heirloom tomato",
        pricePerPound: "$5.99 / lb",
        vendor: "Wall-Mart",
        quantity: 5,
        price: "$5.99",
        status: "En-Route",
        pic: tomatoImg,
    };

    const pendingOrder = {
        id: "3",
        productId: "3",
        name: "Sweet onion",
        pricePerPound: "$14.95 / lb",
        vendor: "Fresh Corner",
        quantity: .5,
        price: "$14.95",
        status: "Pending",
        pic: onionImg,
    };

    it('<Contains an image of the ordered produce', () => {
        render(<BrowserRouter>
            <VendorOrder order={enRouteOrder} />
        </BrowserRouter>);

        expect(screen.getByAltText('order')).toBeInTheDocument();
    });

    it('Contains the name of the ordered produce', () => {
        render(<BrowserRouter>
            <VendorOrder order={enRouteOrder} />
        </BrowserRouter>);

        expect(screen.getByRole('heading', { name: 'Heirloom tomato'})).toBeInTheDocument();
    });

    it('Contains the Price of the ordered produce', () => {
       render(<BrowserRouter>
            <VendorOrder order={enRouteOrder} />
        </BrowserRouter>);

        expect(screen.getByText('$5.99')).toBeInTheDocument();
    });

    it('Contains the Quantity of the ordered produce', () => {
        render(<BrowserRouter>
            <VendorOrder order={enRouteOrder} />
        </BrowserRouter>);

        expect(screen.getByText('Quantity: 5kg')).toBeInTheDocument();
    });

    it('Displays the right status' , () => {
        render(<BrowserRouter>
            <VendorOrder order={enRouteOrder} />
        </BrowserRouter>);

        expect(screen.getByText('En-Route')).toBeInTheDocument();
    });

    it('Has no Fulfill button when status is not Pending', () => {
        render(<BrowserRouter>
            <VendorOrder order={enRouteOrder} />
        </BrowserRouter>);

        expect(screen.queryByRole('button', { name: 'Fulfill' })).toBeNull();
    });

    // it('Has a Fulfill button when status is Pending', () => {
    //     render(<BrowserRouter>
    //         <VendorOrder order={enRouteOrder} />
    //     </BrowserRouter>);

    //     expect(screen.getByText('Fulfill')).toBeInTheDocument();
    // });    
});
