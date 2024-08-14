import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            screens: {
                ['tn']: '365px',
                ['3xl']: '1680px',
                ['4xl']: '1920px',
                ['ultra']: '2560px',
            },
            keyframes: {
                pulse: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.2' },
                },
            },
        },
        fontFamily: {
            main: 'var(--main-font)',
        },
        colors: {
            white: '#fff',
            black: '#000',
            green: {
                '50': '#edfcf3',
                '100': '#d4f7e0',
                '200': '#adedc7',
                '300': '#77dea7',
                '400': '#40c784',
                '500': '#1eb66f',
                '600': '#108b54',
                '700': '#0d6f46',
                '800': '#0d5839',
                '900': '#0b4930',
                '950': '#05291b',
            },
            red: {
                '50': '#fff0f2',
                '100': '#ffe2e6',
                '200': '#ffcad3',
                '300': '#ff9fae',
                '400': '#ff6984',
                '500': '#ff204e',
                '600': '#ed1149',
                '700': '#c8083e',
                '800': '#a8093b',
                '900': '#8f0c39',
                '950': '#50011a',
            },
            neutral: {
                '50': '#f7f7f7',
                '100': '#ededed',
                '200': '#dfdfdf',
                '300': '#c8c8c8',
                '400': '#adadad',
                '500': '#a0a0a0',
                '600': '#888888',
                '700': '#7b7b7b',
                '800': '#676767',
                '900': '#545454',
                '950': '#363636',
            },
        },
    },
    plugins: [],
};
export default config;
