import { render, screen} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, ROute, Route, Routes  } from 'react-router-dom';
import tomatoImg from '../images/tomato.jpg';

import Summary from './Summary';

const renderWithRouter = (ui, { route = '/', state = {} } = {}) => {
    window.history.pushState(state, 'Test page', route);

    return render(
        <MemoryRouter initialEntries={[{ pathname: route, state }]}>
            <Routes>
                <Route path={route} element={ui} />
            </Routes>
        </MemoryRouter>
    );
}

describe('<Summary />', () => {
    it('contains the common Header', () => {
        renderWithRouter(<Summary />, {
            route: '/summary',
            state: { orders: [{
                id: "1",
                productId: "1",
                name: "Heirloom tomato",
                pricePerPound: 5.99,
                vendor: "Wall-Mart",
                quantity: 1,
                price: 0,
                status: null,
                pic: tomatoImg,
            }] },
        });

        expect(screen.getByRole('heading', { name: 'Fresh Fetch'})).toBeInTheDocument();
    });

    it('contains the summary header', () => {
        renderWithRouter(<Summary />, {
            route: '/summary',
            state: { orders: [{
                id: "1",
                productId: "1",
                name: "Heirloom tomato",
                pricePerPound: 5.99,
                vendor: "Wall-Mart",
                quantity: 1,
                price: 0,
                status: null,
                pic: tomatoImg,
            }] },
        });

        expect(screen.getByRole('heading', { name: 'Order summary' })).toBeInTheDocument();
    });

    it('contaims the subtotal paragraph', () => {
        renderWithRouter(<Summary />, {
            route: '/summary',
            state: { orders: [{
                id: "1",
                productId: "1",
                name: "Heirloom tomato",
                pricePerPound: 5.99,
                vendor: "Wall-Mart",
                quantity: 1,
                price: 0,
                status: null,
                pic: tomatoImg,
            }] },
        });

        expect(screen.getByText('Subtotal')).toBeInTheDocument();
    })

    it('contaims the delivery paragraph', () => {
        renderWithRouter(<Summary />, {
            route: '/summary',
            state: { orders: [{
                id: "1",
                productId: "1",
                name: "Heirloom tomato",
                pricePerPound: 5.99,
                vendor: "Wall-Mart",
                quantity: 1,
                price: 0,
                status: null,
                pic: tomatoImg,
            }] },
        });

        expect(screen.getByText('Delivery')).toBeInTheDocument();
    })

    it('contaims the tax paragraph', () => {
        renderWithRouter(<Summary />, {
            route: '/summary',
            state: { orders: [{
                id: "1",
                productId: "1",
                name: "Heirloom tomato",
                pricePerPound: 5.99,
                vendor: "Wall-Mart",
                quantity: 1,
                price: 0,
                status: null,
                pic: tomatoImg,
            }] },
        });

        expect(screen.getByText('Tax')).toBeInTheDocument();
    })

    it('contaims the Total paragraph', () => {
        renderWithRouter(<Summary />, {
            route: '/summary',
            state: { orders: [{
                id: "1",
                productId: "1",
                name: "Heirloom tomato",
                pricePerPound: 5.99,
                vendor: "Wall-Mart",
                quantity: 1,
                price: 0,
                status: null,
                pic: tomatoImg,
            }] },
        })
        expect(screen.getByText('Total')).toBeInTheDocument();
    });

    it('Displayes all the prices correctly', () => {
        renderWithRouter(<Summary />, {
            route: '/summary',
            state: { orders: [{
                id: "1",
                productId: "1",
                name: "Heirloom tomato",
                pricePerPound: 5.99,
                vendor: "Wall-Mart",
                quantity: 1,
                price: 0,
                status: null,
                pic: tomatoImg,
            }] },
        })

        expect(screen.getAllByText(/\$\d+\.\d{2}/).length).toBe(4);
    });
});