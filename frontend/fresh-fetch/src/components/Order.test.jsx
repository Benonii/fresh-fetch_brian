import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Order from './Order';

import tomatoImg from '../images/tomato.jpg';

describe('<Order />', () => {
    const testOrder = {
        id: "1",
        productId: "1",
        name: "Heirloom tomato",
        pricePerPound: 5.99,
        vendor: "Wall-Mart",
        quantity: 1,
        price: 5.99,
        status: null,
        pic: tomatoImg,
    };

    it('Contains an image with the write alt message', () => {
        render(<BrowserRouter>
                <Order order={testOrder} />
            </BrowserRouter>);

        expect(screen.getByAltText('Produce')).toBeInTheDocument();
    });

    it('Contains the name of the produce', () => {
        render(<BrowserRouter>
                <Order order={testOrder} />
            </BrowserRouter>);


        expect(screen.getByRole('heading', {name: 'Heirloom tomato'})).toBeInTheDocument();
    })

    it('Contains the price per pound of the produce', () => {
        render(<BrowserRouter>
                <Order order={testOrder} />
            </BrowserRouter>);


        expect(screen.getByText('$5.99 / kg')).toBeInTheDocument();
    });

    it('Contains the vendor of the produce', () => {
        render(<BrowserRouter>
                <Order order={testOrder} />
            </BrowserRouter>);


        expect(screen.getByText('Vendor: Wall-Mart')).toBeInTheDocument();
    });

    it('Contains the Order now and Remove buttons', () => {
        render(<BrowserRouter>
                <Order order={testOrder} />
            </BrowserRouter>);


        expect(screen.getByRole('button', { name: 'Order now' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
    });

    it('Contains the qunatity input element', () => {
        render(<BrowserRouter>
                <Order order={testOrder} />
            </BrowserRouter>);


        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByAltText('A pencil')).toBeInTheDocument();
    });
    
});
