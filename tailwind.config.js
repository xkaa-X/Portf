import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
                serif: ['Playfair Display', 'Georgia', 'serif'],
            },
            animation: {
                'logo-loop': 'logo-loop 18s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'lanyard-swing': 'swing 5s ease-in-out infinite alternate',
            },
            keyframes: {
                'logo-loop': {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-10px) rotate(2deg)' },
                },
                'swing': {
                    '0%': { transform: 'rotate(2deg)' },
                    '100%': { transform: 'rotate(-2deg)' }
                }
            },
            boxShadow: {
                'glow-amber': '0 0 30px -5px rgba(245, 158, 11, 0.3)',
            }
        },
    },

    plugins: [forms],
};