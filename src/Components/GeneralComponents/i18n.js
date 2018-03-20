import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';

i18next
    .use(LngDetector)
    .init({
        interpolation: {
            // React already does escaping
            escapeValue: false,
        },
        fallbackLng: 'nl',
        // Using simple hardcoded resources for simple example
        resources: {
            en: {
                translation: {
                    home: { label: 'Home', },
                    instruments: { label: 'Instruments', },
                    groups: { label: 'Groups', },
                },
            },
            nl: {
                translation: {
                    home: { label: 'Startpagina', },
                    instruments: { label: 'Instrumenten', },
                    groups: { label: 'Groepen', },
                },
            },
        },
    });

export default i18next