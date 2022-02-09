import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import MainApp from '../../src/App.vue';
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import translations from '../../src/locales/en.json';

describe('MainApp test', () => {

    const mockData = [{
        "wrapperType": "collection",
        "collectionType": "Album",
        "artistId": 71822,
        "collectionId": 1443203607,
        "amgArtistId": 65851,
        "artistName": "John Coltrane Quartet",
        "collectionName": "Coltrane (Expanded Edition)",
        "collectionCensoredName": "Coltrane (Expanded Edition)",
        "artistViewUrl": "https://music.apple.com/us/artist/john-coltrane-quartet/71822?uo=4",
        "collectionViewUrl": "https://music.apple.com/us/album/coltrane-expanded-edition/1443203607?uo=4",
        "artworkUrl60": "https://is5-ssl.mzstatic.com/image/thumb/Music128/v4/bf/46/bb/bf46bbb0-35f9-eb84-741b-73beabf615d5/source/60x60bb.jpg",
        "artworkUrl100": "https://is5-ssl.mzstatic.com/image/thumb/Music128/v4/bf/46/bb/bf46bbb0-35f9-eb84-741b-73beabf615d5/source/100x100bb.jpg",
        "collectionPrice": 9.99,
        "collectionExplicitness": "notExplicit",
        "trackCount": 7,
        "copyright": "℗ 1997 UMG Recordings, Inc.",
        "country": "USA",
        "currency": "USD",
        "releaseDate": "1997-01-01T08:00:00Z",
        "primaryGenreName": "Jazz"
    },
    {
        "wrapperType": "collection",
        "collectionType": "Album",
        "artistId": 71822,
        "collectionId": 1443143816,
        "amgArtistId": 65851,
        "artistName": "John Coltrane Quartet",
        "collectionName": "Coltrane",
        "collectionCensoredName": "Coltrane",
        "artistViewUrl": "https://music.apple.com/us/artist/john-coltrane-quartet/71822?uo=4",
        "collectionViewUrl": "https://music.apple.com/us/album/coltrane/1443143816?uo=4",
        "artworkUrl60": "https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/b0/a6/1e/b0a61eed-9706-07a0-cdd7-de73c802cad5/source/60x60bb.jpg",
        "artworkUrl100": "https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/b0/a6/1e/b0a61eed-9706-07a0-cdd7-de73c802cad5/source/100x100bb.jpg",
        "collectionPrice": 7.99,
        "collectionExplicitness": "notExplicit",
        "trackCount": 5,
        "copyright": "℗ 2015 The Verve Music Group, a Division of UMG Recordings, Inc.",
        "country": "USA",
        "currency": "USD",
        "releaseDate": "1962-08-01T07:00:00Z",
        "primaryGenreName": "Jazz"
    }];

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

    // Vuetify + i18n init
    //@todo: Jest returns warnings for the translations...
    let localVue;
    let vuetify;
    let wrapper;
    let i18n;
    beforeEach(() => {
        localVue = createLocalVue();
        vuetify = new Vuetify();
        localVue.use(vuetify);
        i18n = new VueI18n({
            locale: 'en',
            fallbackLocale: 'en',
            messages: translations            
        });
        localVue.use(i18n);
        wrapper = mount(MainApp, {
            localVue,
            vuetify,
            i18n,
            mocks: {
                $t: () => { }
            }
        });
    });


    it('Should mount the component', () => {
        const handle = shallowMount(MainApp, {
            mocks: {
                $t: () => { }
            }
        });
        expect(handle).toBeDefined();
    });    

    it('Should get the data when requested from the backend', async () => {
        wrapper.setData({
            artistName: "coltrane"
        });

        const buttonFindBackend = wrapper.find("#btnSearchBackend");
        await buttonFindBackend.trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.albums).toBe(mockData);
    });

    it('Should not return any data if artist name is empty', async () => {
        const buttonFindBackend = wrapper.find("#btnSearchBackend");
        await buttonFindBackend.trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.albums).toStrictEqual([]);
    });

    it('Should not render any favorites', () => {
        expect(wrapper.find("#favorite_1443203607").exists()).toEqual(false);
    });
    
    it('Should render favorites', async () => {
        wrapper.setData({
            favoritesLoaded: true,
            favoritesTotal: 2,
            albums: mockData
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.find("#favorite_1443203607").exists()).toEqual(true);
    });



});