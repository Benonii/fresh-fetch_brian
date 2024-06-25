import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import userEvent from '@testing-library/user-event';

import Basket from './Basket';


describe('<Basket />', () => {
    it('contains the common Header', () => {
        render(<BrowserRouter>
                    <Basket />
                </BrowserRouter>
        );

        expect(screen.getByRole('heading', { name: 'Fresh Fetch'})).toBeInTheDocument();
    });

    it('contains the user profile section', () => {
        render(<BrowserRouter>
                    <Basket />
                </BrowserRouter>
        );

        expect(screen.getByLabelText('User Profile')).toBeInTheDocument();
    })

    it('Contains the profile component', () => {
        render(<BrowserRouter>
                    <Basket />
                </BrowserRouter>
        );

        expect(screen.getByLabelText('Profile')).toBeInTheDocument();
    });

    it('Contains the Basket header', () => {
        render(<BrowserRouter>
                    <Basket />
                </BrowserRouter>
        );

        expect(screen.getByRole('heading', { name: 'Basket'})).toBeInTheDocument();
        
    });

    it('Has the item count', () => {
        render(<BrowserRouter>
                    <Basket />
                </BrowserRouter>
        );

        expect(screen.getByLabelText("Item count")).toBeInTheDocument();
    });

    it('Contains the order all button', () => {
        render(<BrowserRouter>
                    <Basket />
                </BrowserRouter>
        );

        expect(screen.getByRole('button', { name: 'Order all'})).toBeInTheDocument();
    });

    it('Contains the order elements that have not been sent out yet', () => {
        render(<BrowserRouter>
                    <Basket />
                </BrowserRouter>
        );

        expect(screen.getAllByLabelText('Unmade order').length).toBeGreaterThanOrEqual(0);
    })

    it('Inititally contains no order elements that are sent out and are\
        pending/cancelled', () => {
    
        render(<BrowserRouter>
                    <Basket />
                </BrowserRouter>
        );

        expect(screen.queryAllByLabelText('Pending/Cancelled order')).toEqual([]);
    })

    it('Removes the unmade order when an remove is pressed on orders', () => {
        render(<BrowserRouter>
                    <Basket />
                </BrowserRouter>
        );

        const preOrdersInitialLength = screen.queryAllByLabelText('Unmade order').length;
        const removeBtns = screen.queryAllByRole('button', {name: 'Remove'})

        act(() => {
            preOrdersInitialLength > 1 && userEvent.click(removeBtns[0]);
        })
        expect(screen.queryAllByLabelText('Unmade order').length).toEqual(preOrdersInitialLength - 1);
    })
    
    // it('Displays an informative message when there is nothing in\
    //     unmadeOrders', async () => {
    //     render(<BrowserRouter>
    //                 <Basket />
    //             </BrowserRouter>
    //     );

    //     const removeBtns = screen.queryAllByRole('button', {name: 'Remove'})

    //     act(async () => {
    //         for (const btn of removeBtns) {
    //             userEvent.click(btn);
    //         }
    //     });

    //     screen.debug();

    //     await expect(screen.queryAllByLabelText('Unmade order').length).toBe(0);

    //     expect(screen.getByRole('paragraph', { name: 'Looks like there\
    //         is nothing in your basket' })).toBeInTheDocument();
    // })

    it('Removes the pending order when cancel is pressed on orders', () => {
        render(<BrowserRouter>
                    <Basket />
                </BrowserRouter>
        );

        const pendingOrdersInitialLength = screen.queryAllByLabelText('Pending/Cancelled order').length;
        const removeBtns = screen.queryAllByRole('button', {name: 'Cancel'})

        act(() => {
            pendingOrdersInitialLength && userEvent.click(removeBtns[0]);
        })

        if (pendingOrdersInitialLength == 0) {
            expect(screen.queryAllByLabelText('Pending/Cancelled order').length).toBe(0);

        } else {
            expect(screen.queryAllByLabelText('Pending/Cancelled order').length).toEqual(pendingOrdersInitialLength - 1 || 0);

        }
    })

    // it('Removes all pending orders when cancel all is clicked' , () => {
    //     render(<BrowserRouter>
                //     <Basket />
                // </BrowserRouter>
        // );

    //     const cancelAllBtn = screen.queryAllByRole('button', { name: 'Cancel All' });

    //     act(() => {
    //         userEvent.click(cancelAllBtn);
    //     })

    //     expect(screen.queryAllByLabelText('Pending/Cancelled order')).toBeNone();

    // })
});
