import React from 'react';
import LoginScreen from '../Login';
import { fireEvent, render } from '@testing-library/react-native'

describe('Login Screen', () => {
    
    it('should go to feed page on login', () => {
        const navigation = {navigate: () => {}}
        jest.spyOn(navigation, 'navigate');

        const page = render(<LoginScreen navigation={navigation}/>);

        const loginButton = page.getByTestId('loginButtonLogin');

        fireEvent.press(loginButton);

        expect(navigation.navigate).toHaveBeenCalledWith("Feed");
    })
})