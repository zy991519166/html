class ThemeManager {
    constructor() {
        this.moonIcon = document.getElementById('moon-icon');
        this.sunIcon = document.getElementById('sun-icon');
        this.themeToggle = document.getElementById('theme-toggle');
        
        // Initialize theme from localStorage or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update UI to match current theme
        this.updateThemeUI(savedTheme);
        
        // Set up event listeners
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    updateThemeUI(theme) {
        if (this.moonIcon && this.sunIcon) {
            this.moonIcon.style.display = theme === 'dark' ? 'none' : 'block';
            this.sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
        }
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        this.updateThemeUI(newTheme);
    }
}