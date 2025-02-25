class ThemeManager {
    constructor() {
        this.init();
        this.bindEvents();
    }

    init() {
        this.elements = {
            toggle: document.querySelector('.theme-toggle'),
            moon: document.querySelector('.moon'),
            sun: document.querySelector('.sun')
        };
        this.theme = {
            current: localStorage.getItem('theme') || 'light',
            urlParam: new URLSearchParams(window.location.search).get('theme')
        };
        
        this.applyTheme(this.theme.urlParam || this.theme.current);
    }

    bindEvents() {
        this.elements.toggle?.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateIcons(theme);
        localStorage.setItem('theme', theme);
    }

    updateIcons(theme) {
        if (this.elements.moon && this.elements.sun) {
            this.elements.moon.style.display = theme === 'dark' ? 'none' : 'block';
            this.elements.sun.style.display = theme === 'dark' ? 'block' : 'none';
        }
    }

    toggleTheme() {
        const newTheme = this.theme.current === 'dark' ? 'light' : 'dark';
        this.theme.current = newTheme;
        this.applyTheme(newTheme);
    }
} 