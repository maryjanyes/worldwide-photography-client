import ContestsData from '../mocks/contests.json';

class ApiService {
    sendData() {
        const [path, method = 'POST', data = {}, headers = {}] = arguments;
        fetch(`/${path}`, {
            method,
            body: JSON.stringify(data),
            headers: { ...ApiService.getHeaders(), ...headers },
        })
        .then(this.handleSuccess || ApiService.handleSuccess)
        .catch(this.handleError || ApiService.handleError);
    }

    getData() {
        const [path, method = 'GET', headers = {}] = arguments;
        fetch(`/${path}`, {
            method,
            headers: { ...ApiService.getHeaders(), ...headers },
        })
        .then(Athis.handleSuccess || ApiService.handleSuccess)
        .catch(this.handleError || ApiService.handleError);
    }

    static uploadPhoto(url, binary) {
        return http.post(url, binary);
    }

    static getPolicy(lang = 'en') {
        if (lang === 'en') {
            return fetch('/assets/text/privacy-en.txt');
        } else {
            return fetch('/assets/text/privacy-ru.txt');
        }
    }

    static getHeaders() {
        return {
            'Content-Type': 'application/json',
        };
    }

    static handleError(error) {
        return Promise.resolve({ error });
    }

    static handleSuccess(response) {
        return response.json();
    }

    static getNavLinks() {
        return [{
            en: 'Contests',
            ua: 'Конкурси',
            link: '/',
        },
        {
            en: 'Gallery',
            ua: 'Галерея',
            link: '/photos',
        }, {
            en: 'Articles',
            ua: 'Статті',
            link: '/articles',
        }/*, {
            en: 'Judle classes',
            ua: 'Майстер-класи від суддів',
            link: '/judle-classes',
        }*/];
    }

    static getSignItems() {
        return [{
            en: 'Sign in',
            ua: 'Увійти',
            action: 'sign-in',
        }, {
            en: 'Sign up',
            ua: 'Зареєструватися',
            action: 'sign-up',
        }];
    }

    static getMenuItems() {
        return [{
            en: 'Profile',
            action: 'profile',
        }];
    }

    static getContests() {
        return Promise.resolve(ContestsData);
    }

    static getContestItemLinks() {
        return [{
            en: 'Free',
            action: 'all-contests',
        }, {
            en: 'Community',
            action: 'community-contests',
        }, {
            en: 'Categories',
            toggleNavAction: true,
        }, {
            en: 'Privacy&conditions',
            action: 'privacy',
        }];
    }

    static defaultContestAvatar() {
        return 'assets/images/pane2.jpg';
    }

    constructor(endpoint) {
        this.active = 'ua-UA';
        this.endpoint = 'http://localhost:5000/web/v1' || endpoint;
    }
}

const apiService = new ApiService();

apiService.active = 'en';

export { apiService, ApiService };
