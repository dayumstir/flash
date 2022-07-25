import React from 'react';
import ProfileScreen from '../Profile';
import { fireEvent, render } from '@testing-library/react-native'

describe('Signout Screen', () => {
    
    it('should go to landing page on signOut', () => {
        const navigation = {navigate: () => {}}
        jest.spyOn(navigation, 'navigate');

        const page = render(<ProfileScreen navigation={navigation}/>);

        const loginButton = page.getByTestId('signOutButton');

        fireEvent.press(signOutButton);

        expect(navigation.navigate).toHaveBeenCalledWith("Landing");
    })
})