// assets/js/zombies.js

document.addEventListener('DOMContentLoaded', () => {
    const startAudioButton = document.getElementById('start-audio');
    const ambientAudio = document.querySelector('audio[data-id="main-ambient"]');

    const audioElements = {
        'pest-focus': document.querySelector('audio[data-id="pest-focus"]'),
        'pest-hover': document.querySelector('audio[data-id="pest-hover"]'),
        'pest-click': document.querySelector('audio[data-id="pest-click"]'),
        'pest-release': document.querySelector('audio[data-id="pest-release"]'),
        'bios-focus': document.querySelector('audio[data-id="bios-focus"]'),
        'bios-hover': document.querySelector('audio[data-id="bios-hover"]'),
        'bios-click': document.querySelector('audio[data-id="bios-click"]'),
        'bios-release': document.querySelector('audio[data-id="bios-release"]'),
        'necro-focus': document.querySelector('audio[data-id="necro-focus"]'),
        'necro-hover': document.querySelector('audio[data-id="necro-hover"]'),
        'necro-click': document.querySelector('audio[data-id="necro-click"]'),
        'necro-release': document.querySelector('audio[data-id="necro-release"]'),
        'about-focus': document.querySelector('audio[data-id="about-focus"]'),
        'about-hover': document.querySelector('audio[data-id="about-hover"]'),
        'about-click': document.querySelector('audio[data-id="about-click"]'),
        'about-release': document.querySelector('audio[data-id="about-release"]'),
        'terminal-focus': document.querySelector('audio[data-id="terminal-focus"]'),
        'terminal-hover': document.querySelector('audio[data-id="terminal-hover"]'),
        'terminal-click': document.querySelector('audio[data-id="terminal-click"]'),
        'terminal-release': document.querySelector('audio[data-id="terminal-release"]'),
        'footer-facebook-focus': document.querySelector('audio[data-id="footer-facebook-focus"]'),
        'footer-facebook-hover': document.querySelector('audio[data-id="footer-facebook-hover"]'),
        'footer-facebook-click': document.querySelector('audio[data-id="footer-facebook-click"]'),
        'footer-facebook-release': document.querySelector('audio[data-id="footer-facebook-release"]'),
        'main-ambient': document.querySelector('audio[data-id="main-ambient"]'),
        'back-focus': document.querySelector('audio[data-id="back-focus"]'),
        'back-hover': document.querySelector('audio[data-id="back-hover"]'),
        'back-click': document.querySelector('audio[data-id="back-click"]'),
        'back-release': document.querySelector('audio[data-id="back-release"]'),
        'terminal-welcome': document.getElementById('terminal-welcome'),
        'terminal-error': document.getElementById('terminal-error'),
        'terminal-success': document.getElementById('terminal-success'),

        // Nuevos elementos de audio
        'cta-download-map-focus': document.querySelector('audio[data-id="cta-download-map-focus"]'),
        'cta-download-map-hover': document.querySelector('audio[data-id="cta-download-map-hover"]'),
        'cta-download-map-click': document.querySelector('audio[data-id="cta-download-map-click"]'),
        'cta-download-map-release': document.querySelector('audio[data-id="cta-download-map-release"]'),
        'cta-download-assets-focus': document.querySelector('audio[data-id="cta-download-assets-focus"]'),
        'cta-download-assets-hover': document.querySelector('audio[data-id="cta-download-assets-hover"]'),
        'cta-download-assets-click': document.querySelector('audio[data-id="cta-download-assets-click"]'),
        'cta-download-assets-release': document.querySelector('audio[data-id="cta-download-assets-release"]'),
        'cta-discord-focus': document.querySelector('audio[data-id="cta-discord-focus"]'),
        'cta-discord-hover': document.querySelector('audio[data-id="cta-discord-hover"]'),
        'cta-discord-click': document.querySelector('audio[data-id="cta-discord-click"]'),
        'cta-discord-release': document.querySelector('audio[data-id="cta-discord-release"]'),
        'cta-x-focus': document.querySelector('audio[data-id="cta-x-focus"]'),
        'cta-x-hover': document.querySelector('audio[data-id="cta-x-hover"]'),
        'cta-x-click': document.querySelector('audio[data-id="cta-x-click"]'),
        'cta-x-release': document.querySelector('audio[data-id="cta-x-release"]'),
        'index-database-focus': document.querySelector('audio[data-id="index-database-focus"]'),
        'index-database-hover': document.querySelector('audio[data-id="index-database-hover"]'),
        'index-database-click': document.querySelector('audio[data-id="index-database-click"]'),
        'index-database-release': document.querySelector('audio[data-id="index-database-release"]'),
        'index-shop-focus': document.querySelector('audio[data-id="index-shop-focus"]'),
        'index-shop-hover': document.querySelector('audio[data-id="index-shop-hover"]'),
        'index-shop-click': document.querySelector('audio[data-id="index-shop-click"]'),
        'index-shop-release': document.querySelector('audio[data-id="index-shop-release"]'),
        'about-database-focus': document.querySelector('audio[data-id="about-database-focus"]'),
        'about-database-hover': document.querySelector('audio[data-id="about-database-hover"]'),
        'about-database-click': document.querySelector('audio[data-id="about-database-click"]'),
        'about-database-release': document.querySelector('audio[data-id="about-database-release"]'),

        // Nuevos elementos adicionales
        'about-colophon-focus': document.querySelector('audio[data-id="about-colophon-focus"]'),
        'about-colophon-hover': document.querySelector('audio[data-id="about-colophon-hover"]'),
        'about-colophon-click': document.querySelector('audio[data-id="about-colophon-click"]'),
        'about-colophon-release': document.querySelector('audio[data-id="about-colophon-release"]'),
        'media-screenshots-focus': document.querySelector('audio[data-id="media-screenshots-focus"]'),
        'media-screenshots-hover': document.querySelector('audio[data-id="media-screenshots-hover"]'),
        'media-screenshots-click': document.querySelector('audio[data-id="media-screenshots-click"]'),
        'media-screenshots-release': document.querySelector('audio[data-id="media-screenshots-release"]'),
        'media-videos-focus': document.querySelector('audio[data-id="media-videos-focus"]'),
        'media-videos-hover': document.querySelector('audio[data-id="media-videos-hover"]'),
        'media-videos-click': document.querySelector('audio[data-id="media-videos-click"]'),
        'media-videos-release': document.querySelector('audio[data-id="media-videos-release"]'),
        'server-information-focus': document.querySelector('audio[data-id="server-information-focus"]'),
        'server-information-hover': document.querySelector('audio[data-id="server-information-hover"]'),
        'server-information-click': document.querySelector('audio[data-id="server-information-click"]'),
        'server-information-release': document.querySelector('audio[data-id="server-information-release"]'),
        'server-mission-focus': document.querySelector('audio[data-id="server-mission-focus"]'),
        'server-mission-hover': document.querySelector('audio[data-id="server-mission-hover"]'),
        'server-mission-click': document.querySelector('audio[data-id="server-mission-click"]'),
        'server-mission-release': document.querySelector('audio[data-id="server-mission-release"]'),
        'extras-kofi-focus': document.querySelector('audio[data-id="extras-kofi-focus"]'),
        'extras-kofi-hover': document.querySelector('audio[data-id="extras-kofi-hover"]'),
        'extras-kofi-click': document.querySelector('audio[data-id="extras-kofi-click"]'),
        'extras-kofi-release': document.querySelector('audio[data-id="extras-kofi-release"]'),
        'extras-shop-focus': document.querySelector('audio[data-id="extras-shop-focus"]'),
        'extras-shop-hover': document.querySelector('audio[data-id="extras-shop-hover"]'),
        'extras-shop-click': document.querySelector('audio[data-id="extras-shop-click"]'),
        'extras-shop-release': document.querySelector('audio[data-id="extras-shop-release"]'),
        'footer-setetres-focus': document.querySelector('audio[data-id="footer-setetres-focus"]'),
        'footer-setetres-hover': document.querySelector('audio[data-id="footer-setetres-hover"]'),
        'footer-setetres-click': document.querySelector('audio[data-id="footer-setetres-click"]'),
        'footer-setetres-release': document.querySelector('audio[data-id="footer-setetres-release"]'),
        'footer-steam-focus': document.querySelector('audio[data-id="footer-steam-focus"]'),
        'footer-steam-hover': document.querySelector('audio[data-id="footer-steam-hover"]'),
        'footer-steam-click': document.querySelector('audio[data-id="footer-steam-click"]'),
        'footer-steam-release': document.querySelector('audio[data-id="footer-steam-release"]'),
        'footer-discord-focus': document.querySelector('audio[data-id="footer-discord-focus"]'),
        'footer-discord-hover': document.querySelector('audio[data-id="footer-discord-hover"]'),
        'footer-discord-click': document.querySelector('audio[data-id="footer-discord-click"]'),
        'footer-discord-release': document.querySelector('audio[data-id="footer-discord-release"]'),
        'footer-github-focus': document.querySelector('audio[data-id="footer-github-focus"]'),
        'footer-github-hover': document.querySelector('audio[data-id="footer-github-hover"]'),
        'footer-github-click': document.querySelector('audio[data-id="footer-github-click"]'),
        'footer-github-release': document.querySelector('audio[data-id="footer-github-release"]'),
        'footer-kofi-focus': document.querySelector('audio[data-id="footer-kofi-focus"]'),
        'footer-kofi-hover': document.querySelector('audio[data-id="footer-kofi-hover"]'),
        'footer-kofi-click': document.querySelector('audio[data-id="footer-kofi-click"]'),
        'footer-kofi-release': document.querySelector('audio[data-id="footer-kofi-release"]'),
        'footer-twitch-focus': document.querySelector('audio[data-id="footer-twitch-focus"]'),
        'footer-twitch-hover': document.querySelector('audio[data-id="footer-twitch-hover"]'),
        'footer-twitch-click': document.querySelector('audio[data-id="footer-twitch-click"]'),
        'footer-twitch-release': document.querySelector('audio[data-id="footer-twitch-release"]'),
        'footer-x-focus': document.querySelector('audio[data-id="footer-x-focus"]'),
        'footer-x-hover': document.querySelector('audio[data-id="footer-x-hover"]'),
        'footer-x-click': document.querySelector('audio[data-id="footer-x-click"]'),
        'footer-x-release': document.querySelector('audio[data-id="footer-x-release"]'),
        'footer-youtube-focus': document.querySelector('audio[data-id="footer-youtube-focus"]'),
        'footer-youtube-hover': document.querySelector('audio[data-id="footer-youtube-hover"]'),
        'footer-youtube-click': document.querySelector('audio[data-id="footer-youtube-click"]'),
        'footer-youtube-release': document.querySelector('audio[data-id="footer-youtube-release"]'),
        'index-powwws-focus': document.querySelector('audio[data-id="index-powwws-focus"]'),
        'index-powwws-hover': document.querySelector('audio[data-id="index-powwws-hover"]'),
        'index-powwws-click': document.querySelector('audio[data-id="index-powwws-click"]'),
        'index-powwws-release': document.querySelector('audio[data-id="index-powwws-release"]'),
        'patreon-focus': document.querySelector('audio[data-id="patreon-focus"]'),
        'patreon-hover': document.querySelector('audio[data-id="patreon-hover"]'),
        'patreon-click': document.querySelector('audio[data-id="patreon-click"]'),
        'patreon-release': document.querySelector('audio[data-id="patreon-release"]'),

        'paypal-focus': document.querySelector('audio[data-id="paypal-focus"]'),
        'paypal-hover': document.querySelector('audio[data-id="paypal-hover"]'),
        'paypal-click': document.querySelector('audio[data-id="paypal-click"]'),
        'paypal-release': document.querySelector('audio[data-id="paypal-release"]'),

        'suscripcion-focus': document.querySelector('audio[data-id="suscripcion-focus"]'),
        'suscripcion-hover': document.querySelector('audio[data-id="suscripcion-hover"]'),
        'suscripcion-click': document.querySelector('audio[data-id="suscripcion-click"]'),
        'suscripcion-release': document.querySelector('audio[data-id="suscripcion-release"]'),

        'itchio-focus': document.querySelector('audio[data-id="itchio-focus"]'),
        'itchio-hover': document.querySelector('audio[data-id="itchio-hover"]'),
        'itchio-click': document.querySelector('audio[data-id="itchio-click"]'),
        'itchio-release': document.querySelector('audio[data-id="itchio-release"]'),

        'deluxia-focus': document.querySelector('audio[data-id="deluxia-focus"]'),
        'deluxia-hover': document.querySelector('audio[data-id="deluxia-hover"]'),
        'deluxia-click': document.querySelector('audio[data-id="deluxia-click"]'),
        'deluxia-release': document.querySelector('audio[data-id="deluxia-release"]'),

    };

    // Reanudar el audio ambiental si ya estaba activo
    const resumeAmbientAudio = () => {
        if (ambientAudio && localStorage.getItem('audioEnabled') === 'true') {
            ambientAudio.loop = true;
            ambientAudio.play().catch(error => {
                console.error('Error al reproducir el audio ambiental:', error);
            });
        }
    };

    // Función para desbloquear el audio al hacer clic
    const unlockAudio = () => {
        if (ambientAudio) {
            ambientAudio.loop = true;
            ambientAudio.play().catch(error => {
                console.error('Error al reproducir el audio ambiental:', error);
            });
            localStorage.setItem('audioEnabled', 'true');
        }
        if (startAudioButton) {
            startAudioButton.classList.add('hidden'); // Ocultar el botón después de desbloquear el audio
        }
        document.removeEventListener('click', unlockAudio); // Limpiar el listener
    };

    // Agregar el evento al botón de inicio
    if (startAudioButton) {
        startAudioButton.addEventListener('click', unlockAudio);
    }

    // Función para reproducir el audio según el ID del elemento y la acción
    const playAudio = (element, action) => {
        const audio = audioElements[`${element.id}-${action}`];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(error => {
                console.error(`Error al reproducir el audio para ${element.id}-${action}:`, error);
            });
        } else {
            console.error(`Elemento de audio con id="${element.id}-${action}" no encontrado.`);
        }
    };

    // Agregar eventos a los elementos con data-id
    document.querySelectorAll('a').forEach(element => {
        const id = element.getAttribute('id');
        element.addEventListener('mouseover', () => playAudio(element, 'hover'));
        element.addEventListener('mousedown', () => playAudio(element, 'click'));
        element.addEventListener('mouseup', () => playAudio(element, 'release'));
        element.addEventListener('focus', () => playAudio(element, 'focus'));
    });

    // Desbloquear el audio con un clic en cualquier parte del documento
    document.addEventListener('click', unlockAudio);

    // Reanudar el audio ambiental si ya estaba habilitado
    resumeAmbientAudio();
});