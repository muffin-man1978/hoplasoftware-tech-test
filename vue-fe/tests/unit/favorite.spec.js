import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Favorite from '../../src/components/Favorite.vue';
import Vuetify from 'vuetify'

describe('Favorite component unit test suite', () => {

    // Vuetify init
    let localVue;
    let vuetify;
    let wrapper;
    beforeEach(() => {
        localVue = createLocalVue();
        vuetify = new Vuetify();
        localVue.use(vuetify);
        wrapper = mount(Favorite, {
            localVue,
            vuetify,
            propsData: {
                collectionId: 1
            },
            mocks: {
                $t: () => { }
            }
        });
    });

    it('Should mount the component', () => {
        expect(wrapper).toBeDefined();
    });

    it('Should mount with the correct props', () => {
        expect(wrapper).toBeDefined();
        expect(wrapper.find("#favorite_1").exists()).toBeTruthy();
    });

    it('Should emit an event when adding', async () => {
        const buttonAdd = wrapper.find("#add_favorite_1");
        await buttonAdd.trigger("click");
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted("new-favorite-event")).toBeTruthy();
    });

    it('Should emit an event when removing', async () => {
        const buttonRemove = wrapper.find("#remove_favorite_1");
        await buttonRemove.trigger("click");
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted("remove-favorite-event")).toBeTruthy();
    });
});