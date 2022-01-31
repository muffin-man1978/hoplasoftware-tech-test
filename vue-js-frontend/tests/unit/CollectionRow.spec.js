import { shallowMount, mount, flushPromises } from '@vue/test-utils'
import CollectionRow from '@/components/CollectionRow.vue';

describe('Unit testing for CollectionRow Component', () => {
    
    const testDataStructure = {
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
    };

    it('Renders correctly on shallowMount', () => {
        const wrapper = shallowMount(CollectionRow, {
            props: {
                album: testDataStructure
            }
        });

        expect(wrapper.find("#collectionId").html()).toBe("<td id=\"collectionId\">1443203607</td>");

    }); 

});