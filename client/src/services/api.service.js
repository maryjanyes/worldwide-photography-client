import ContestsData from '../mocks/contests.json';
import PhotoCategoriesData from '../mocks/photo-categories.json';

class ApiService {

    static getData() {
        const [endpoint, path, method, data] = arguments;
        console.log(endpoint, path, method, data);
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
            link: '/gallery',
        }, {
            en: 'Articles',
            ua: 'Статті',
            link: '/articles',
        }, {
            en: 'Judle classes',
            ua: 'Майстер-класи від суддів',
            link: '/judle-classes',
        }];
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
            en: PhotoCategoriesData[0].name,
            // ua: 'Вибір 1',
            action: 'select1',
        }, {
            en: PhotoCategoriesData[1].name,
            // ua: 'Вибір 2',
            action: 'select2',
        }, {
            en: PhotoCategoriesData[2].name,
            // ua: 'Вибір 2',
            action: 'select3',
        }]
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

    constructor() {
        this.active = 'ua';
    }
}

const apiService = new ApiService();

apiService.active = 'en';

export { apiService, ApiService };
