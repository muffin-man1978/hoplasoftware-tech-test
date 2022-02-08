import { shallowMount } from '@vue/test-utils'
import Favorite from '../../src/components/Favorite.vue';

describe('Favorite component unit test suite', () => {
    it('Should mount the component', () => {
        const handler = shallowMount(Favorite);
        expect(handler).toBeDefined();
    });

    it('Should mount with the correct props', () => {
        const handler = shallowMount(Favorite, {
            props: {
                collectionId: 1
            }
        });
        expect(handler).toBeDefined();
    });
});