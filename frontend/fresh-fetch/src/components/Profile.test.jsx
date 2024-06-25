import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Profile from './Profile';

import profilePic from "../images/pic-person-01.jpg";

describe('<Profile />', () => {
    it('Displays a profile picture of the user', () => {
        render(<Profile profilePic={profilePic}/>);

        expect(screen.getByAltText('Profile picture')).toBeInTheDocument();
    })
});
