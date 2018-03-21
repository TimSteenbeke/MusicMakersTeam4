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
                    users: { label: 'Users'},
                    courses: { label: 'Courses'},
                    coursetypes: { label: 'CourseTypes'},
                    lessons: { label: 'Lessons'},
                    addlessons: { label: 'Add lessons'},
                    compositions: { label: 'Compositions'},
                    notifications: { label: 'Notifications'},
                    mygroups: { label: 'My groups'},
                    mycourses: { label: 'My courses'}
                },
            },
            nl: {
                translation: {
                    home: { label: 'Startpagina', },
                    instruments: { label: 'Instrumenten', },
                    groups: { label: 'Groepen', },
                    users: { label: 'Gebruikers'},
                    courses: { label: 'Vakken'},
                    coursetypes: { label: 'Vaktypes'},
                    lessons: { label: 'Lessen'},
                    addlessons: { label: 'Les toevoegen'},
                    compositions: { label: 'Muziekstukken'},
                    notifications: { label: 'Meldingen'},
                    mygroups: { label: 'Mijn groepen'},
                    mycourses: { label: 'Mijn vakken'}
                },
            },
        },
    });

export default i18next