import { shallowMount } from '@vue/test-utils'
import MainApp from '../../src/App.vue';

describe('MainApp test', () => {    

    // fetch API must be mocked
    const unmockedFetch = global.fetch
    beforeAll(() => {
        global.fetch = () =>
            Promise.resolve({
                json: () => Promise.resolve(mockData),
            })
    });    
    afterAll(() => {
        global.fetch = unmockedFetch
    });

    it('Should mount the component', () => {
        const handle = shallowMount(MainApp, {
            mocks: {
                $t: () => {}
            }
        });
        expect(handle).toBeDefined();
    });

    it('Should render with the correct data', () => {
        const handle = shallowMount(MainApp, {
            data: () =>({
                artistName: 'coltrane',
                albumSearch: '',
                headers: [
                    {
                        text: 'test',
                        value: 'test_field'                        
                    }
                ],
                albums: [
                    {
                        test_field: 'Data 1'
                    },
                    {
                        test_field: 'Data 2'
                    }
                ],
                favoritesLoaded: false,
                totalFavorites: 0                
            }),
            mocks: {
                $t: () => {}
            }
        });
        expect(handle).toBeDefined();
    });
        
});