// components/Footer.js

import React from 'react';


const Footer = () => {
    return (
        <footer class="rounded-lg shadow">
            <div class="w-full mx-auto p-4 flex items-center justify-between">
                <a href="https://twitter.com/tepkisocial" class="text-sm text-gray-500 sm:text-center dark:text-gray-400 hover:underline">
                    𝕏: tepkisocial
                </a>
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">✉️ İletişim için: tepkiapp@gmail.com</span>
            </div>
        </footer>
    );
};

export default Footer;