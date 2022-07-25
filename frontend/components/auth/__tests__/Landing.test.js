import React from 'react';
import LandingScreen from '../Landing';
import { fireEvent, render } from '@testing-library/react-native'

describe('Landing Screen', () => {

    it('should go to login page', () => {
        const navigation = {navigate: () => {}}
        jest.spyOn(navigation, 'navigate')

        const page = render(<LandingScreen navigation={navigation}/>)

        const loginButton = page.getByTestId("loginButtonLanding")

        fireEvent.press(loginButton)

        expect(navigation.navigate).toHaveBeenCalledWith("Login")
    })

    it('should go to register page', () => {
        const navigation = {navigate: () => {}}
        jest.spyOn(navigation, 'navigate')

        const page = render(<LandingScreen navigation={navigation}/>)

        const registerButton = page.getByTestId("registerButtonLanding")

        fireEvent.press(registerButton)

        expect(navigation.navigate).toHaveBeenCalledWith("Register")
    })
})