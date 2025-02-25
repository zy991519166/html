class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.moonIcon = document.querySelector('.moon');
        this.sunIcon = document.querySelector('.sun');
        this.isDark = false;
        
        this.initTheme();
        this.addEventListeners();
    }

    initTheme() {
        const urlParams = new URLSearchParams(window.location.search);
        const themeParam = urlParams.get('theme');
        
        if (themeParam === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    enableDarkMode() {
        document.documentElement.setAttribute('data-theme', 'dark');
        this.moonIcon.style.display = 'none';
        this.sunIcon.style.display = 'block';
        this.isDark = true;
        localStorage.setItem('theme', 'dark');
        this.updateLinksTheme('dark');
    }

    enableLightMode() {
        document.documentElement.setAttribute('data-theme', 'light');
        this.moonIcon.style.display = 'block';
        this.sunIcon.style.display = 'none';
        this.isDark = false;
        localStorage.setItem('theme', 'light');
        this.updateLinksTheme('light');
    }

    updateLinksTheme(theme) {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            if (link.href && link.href.startsWith(window.location.origin)) {
                const url = new URL(link.href);
                url.searchParams.set('theme', theme);
                link.href = url.toString();
            }
        });
    }

    addEventListeners() {
        this.themeToggle.addEventListener('click', () => {
            if (this.isDark) {
                this.enableLightMode();
            } else {
                this.enableDarkMode();
            }
        });
    }
} 