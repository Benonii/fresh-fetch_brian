import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import Dashboard from './Dashboard';

describe('<Dashboard />', () => {
    it('renders the common header', () => {
        render(<BrowserRouter>
                    <Dashboard />
            </BrowserRouter>);

        expect(screen.getByRole('heading', { name: 'Fresh Fetch'})).toBeInTheDocument();
    });

    it('contains the Vendor dashboard header(Orders)' , () => {
         render(<BrowserRouter>
                    <Dashboard />
            </BrowserRouter>);

        expect(screen.getByRole('heading', { name: 'Orders'})).toBeInTheDocument();
    })

    it('contains the order elements', () => {
         render(<BrowserRouter>
                    <Dashboard />
            </BrowserRouter>);

        expect(screen.getAllByLabelText('Vendor order').length).toBeGreaterThanOrEqual(0);
    })
    
});
