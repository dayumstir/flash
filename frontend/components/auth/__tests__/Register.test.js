import React from 'react';
import RegisterScreen from '../Register';
import { fireEvent, render } from '@testing-library/react-native'

describe('Register Screen', () => {
    
    it('should go to feed page on register', () => {
        const navigation = {navigate: () => {}}
        jest.spyOn(navigation, 'navigate');

        const page = render(<RegisterScreen navigation={navigation}/>);

        const registerButton = page.getByTestId('registerButtonRegister');

        fireEvent.press(registerButton);

        expect(navigation.navigate).toHaveBeenCalledWith("Feed");
    })
})