import React from 'react';
import FeedScreen from '../Feed';
import { fireEvent, render } from '@testing-library/react-native'

describe('Feed Screen', () => {
    
    it('should go to search page on search button press', () => {
        const navigation = {navigate: () => {}}
        jest.spyOn(navigation, 'navigate');

        const page = render(<FeedScreen navigation={navigation}/>);

        const searchButton = page.getByTestId('searchButtonFeed');

        fireEvent.press(searchButton);

        expect(navigation.navigate).toHaveBeenCalledWith("Search");
    })

    it('should go to add page on add button press', () => {
        const navigation = {navigate: () => {}}
        jest.spyOn(navigation, 'navigate');

        const page = render(<FeedScreen navigation={navigation}/>);

        const addButton = page.getByTestId('addButtonFeed');

        fireEvent.press(addButton);

        expect(navigation.navigate).toHaveBeenCalledWith("Add");
    })

    it('should go to filter page on filter button press', () => {
        const navigation = {navigate: () => {}}
        jest.spyOn(navigation, 'navigate');

        const page = render(<FeedScreen navigation={navigation}/>);

        const filterButton = page.getByTestId('filterButtonFeed');

        fireEvent.press(filterButton);

        expect(navigation.navigate).toHaveBeenCalledWith("Filter");
    })

    it('should go to profile page on profile button press', () => {
        const navigation = {navigate: () => {}}
        jest.spyOn(navigation, 'navigate');

        const page = render(<FeedScreen navigation={navigation}/>);

        const profileButton = page.getByTestId('profileButtonFeed');

        fireEvent.press(profileButton);

        expect(navigation.navigate).toHaveBeenCalledWith("Profile");
    })
})