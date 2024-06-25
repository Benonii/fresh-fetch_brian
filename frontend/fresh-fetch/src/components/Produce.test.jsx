import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Produce from './Produce';

import tomatoImg from '../images/tomato.jpg';

describe('<Produce />', () => {
    const testProduce = {
        id: "1",
        name: "Heirloom Tomato",
        pricePerPound: 5.99,
        vendor: "Wall-Mart",
        pic: tomatoImg,
    };

    it('contains an image of the produce', () => {
        render(
            <BrowserRouter>
                <Produce product={testProduce} />
            </BrowserRouter>
        );

        expect(screen.getByAltText('Image of produce')).toBeInTheDocument();
    })

    it('Contains the name of the produce', () => {
        render(
            <BrowserRouter>
                <Produce product={testProduce} />
            </BrowserRouter>
        );

        expect(screen.getByRole('heading', { name: 'Heirloom Tomato' })).toBeInTheDocument();
    })

    it('Contains the Price per pound', () => {
        render(
            <BrowserRouter>
                <Produce product={testProduce} />
            </BrowserRouter>
        );

        expect(screen.getByText("$5.99 / lb")).toBeInTheDocument();
    });

    it('Contains the Vendor of the produce', () => {
        render(
            <BrowserRouter>
                <Produce product={testProduce} />
            </BrowserRouter>
        );

        expect(screen.getByText("Vendor: Wall-Mart")).toBeInTheDocument();
    })

    it('Contains the Order now and Add to Basket buttons', () => {
        render(
            <BrowserRouter>
                <Produce product={testProduce} />
            </BrowserRouter>
        );

        expect(screen.getByRole('button', { name: 'Order now'})).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Add to Basket'})).toBeInTheDocument();
    })

    it('Clicking the Add to Basket calls the addToBasket function', () => {
        const mockAddToBasket = jest.fn();
        render(
            <BrowserRouter>
                <Produce product={testProduce} addToBasket={mockAddToBasket} />
            </BrowserRouter>);

        const addToBasketBtn = screen.getByRole('button', { name: 'Add to Basket'});
        userEvent.click(addToBasketBtn);

        expect(mockAddToBasket).toHaveBeenCalled();
    })
    
});
