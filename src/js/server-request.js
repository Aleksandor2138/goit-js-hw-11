import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';

export class SerchPhoto {
    #API_KEY = '29610901-b3c9d79f36e45579ed5e9f9a6';

    constructor(perPage) {
        this.page = 1;
        this.query = null;
        this.perPage = perPage;
    }

    async fetchPictures() {
        axios.defaults.params = {
        key: this.#API_KEY,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: this.perPage,
        page: this.page,
        };

        const response = await axios.get(`api/`);
        const data = await response.data;
        return data;
    }
}
