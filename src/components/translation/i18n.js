import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import {
    initReactI18next
} from 'react-i18next';
import { ASSETS_URL } from "./config/config";

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: 'en',
        backend: {
            loadPath: ASSETS_URL + 'assets/i18n/{{ns}}/{{lng}}.json'
        },
        fallbackLng: 'en',
        debug: true,
        ns: ['translations'],
        defaultNS: 'translations',
        keySeparator: false,
        interpolation: {
            escapeValue: true,
            formatSeparator: ','
        },
        react: {
            wait: true
        }
    })

export default i18n