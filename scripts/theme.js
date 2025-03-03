class ThemeManager {
    constructor() {
        // 使用 Proxy 监听主题变化
        this.state = new Proxy({
            theme: localStorage.getItem('theme') || 'light'
        }, {
            set: (obj, prop, value) => {
                obj[prop] = value;
                this.handleThemeChange(value);
                return true;
            }
        });

        this.init();
    }

    handleThemeChange(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateUI(theme);
        this.updateParticles(theme);
        this.updateLinks(theme);
    }

    // 减少不必要的DOM操作
    updateUI(theme) {
        requestAnimationFrame(() => {
            this.moonIcon.style.display = theme === 'dark' ? 'none' : 'block';
            this.sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
        });
    }
}