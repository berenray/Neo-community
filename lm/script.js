// ==== ТЕМА (свет/тёмная) ====
(function () {
    const root = document.documentElement;
    const key = 'site-theme';
    if (localStorage.getItem(key) === 'dark') root.setAttribute('data-theme', 'dark');

    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const isDark = root.getAttribute('data-theme') === 'dark';
        if (isDark) {
            root.removeAttribute('data-theme');
            localStorage.setItem(key, 'light');
        } else {
            root.setAttribute('data-theme', 'dark');
            localStorage.setItem(key, 'dark');
        }
    });
})();

// ==== ВСТАВЬ СВОЮ ССЫЛКУ НА YOUTUBE СЮДА ====
const YOUTUBE_URL = 'https://youtu.be/bJm6os124oM';
// =============================================

function extractYouTubeId(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    return match ? match[1] : null;
}

const videoId = extractYouTubeId(YOUTUBE_URL);
const iframe = document.getElementById('lesson-video');
if (videoId && iframe) {
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
}
