module.exports = {
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: [
            '../../templates/*.html', // base templates
            '../../**/templates/**/*.html', // app specific templates
        ]
    },
    prefix: 'tw-',
    variants: {},
    plugins: [],
}