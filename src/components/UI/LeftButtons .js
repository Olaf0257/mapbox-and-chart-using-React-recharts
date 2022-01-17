
import { useState, Suspense } from 'react'
import MoreInfo from '../Modals/MoreInfo'
// import i18n from 'i18next'
// import { initReactI18next, useTranslation } from 'react-i18next'

import { Info } from '@material-ui/icons'
import '../Style/MoreInfo.module.css'



// const translationsEn = { test: 'Text for en language en' }
// const translationsFr = { test: 'Texte pour la langue fr' }

// i18n
//     .use(initReactI18next)
//     .init({
//         resources: {
//             en: { translation: translationsEn },
//             fr: { translation: translationsFr },
//         },
//         lng: 'en',
//         fallbackLng: 'en',
//         interpolation: { escapeValue: false },
//     })


const LeftButtons = (props) => {

    // const { t } = useTranslation()
    const [moreInfoModal, setMoreInfoModal] = useState(false)


    const toggleModal = () => {

        setMoreInfoModal(true)
    }

    // const onChange = (event) => {
    //     i18n.changeLanguage(event.target.value)
    // }

    return (
        <Suspense fallback='Loading...'>
            <div className="section-container">
                <div>
                    {moreInfoModal && (
                        <MoreInfo close={() => setMoreInfoModal(false)} />
                    )}
                    <button onClick={toggleModal} className="info left-btn">
                        <Info style={{ fontSize: 30 }} />
                    </button>
                    <select id="language" className="lang left-btn" >
                        {/* <select id="language" className="lang left-btn" onChange={onChange}> */}
                        <option value="en" className="li">🇺🇸</option>
                        <option value="fr" className="li">🇫🇷</option>
                    </select>
                    {/* <h2 style={{ fontSize: '30px', fontWeight: 800 }}>{t("test")}</h2> */}
                </div>
            </div>
        </Suspense >
    )
}

export default LeftButtons;