import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('<App /> when user is not logged in', () => {
  it('renders the Produce page by default', () => {
    render(<App />);
    
    expect(screen.getByText(/Produce/i)).toBeInTheDocument();
  });

  it('renders the default header', () => {
    render(<App />);

    expect(screen.getByRole('heading', {name: 'Fresh Fetch'})).toBeInTheDocument();

  });

  // it('does not render the Basket button when user is not signed in', () => {
  //   render(<App />);

  //   expect(screen.queryByRole('button', {name: /Basket(.)/})).toBeNull()
  // });

  // it('Renders the Login and Sign up buttons', () => {
  //   render(<App />);

  //   expect(screen.getByRole('button', {name: 'Login'})).toBeInTheDocument();
  //   expect(screen.getByRole('button', {name: 'Signup'})).toBeInTheDocument();
  // });
  

  // it('does not render the User profile section when user not logged in', () => {
  //   render(<App />);

  //   expect(screen.queryByLabelText('User Profile')).toBeNull();
  // }) 

  // it('doesn not renders the Profile component when user not logged in', () => {
  //   render(<App />);

  //   expect(screen.queryByLabelText('Profile')).toBeNull();
  // })

  // it('does not render the logout button when user not loggged in', () => {
  //   render(<App />);
  
  //   expect(screen.queryByRole('button', {name: 'Logout'})).toBeNull();
  // })

  it('renders the Produce header', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Produce' })).toBeInTheDocument();
  });
  
  it('Renders a search button', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: /Search/})).toBeInTheDocument();
  });

  it('Renders product element(s)', () => {
    render(<App />);

    expect(screen.getAllByLabelText('Produce item').length).toBeGreaterThanOrEqual(1);
  });

  // it('goes to the Basket page when the Basket button is pressed', async () => {
  //   render(<App />);

  //   const button = screen.getByRole('button', { name: /Basket(.)/})

  //   act(() => {
  //     userEvent.click(button);
  //   });
  
  //   await expect(window.location.href).toContain('/basket');

  // })
  
  
});

