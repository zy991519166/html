// 视频控制
export const VideoController = {
    setupMutualExclusion(videoSelector = 'video') {
        const videos = document.querySelectorAll(videoSelector);
        videos.forEach(video => {
            video.addEventListener('play', () => this.pauseOthers(video, videos));
        });
    },

    pauseOthers(currentVideo, videos) {
        videos.forEach(video => {
            if (video !== currentVideo && !video.paused) {
                video.pause();
            }
        });
    }
};

// DOM 工具
export const DOMUtils = {
    createElement(tag, className, attributes = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        return element;
    },

    addStyles(element, styles = {}) {
        Object.assign(element.style, styles);
    }
};

// 其他工具函数
class LoadingManager {
    static show() {
        // 显示加载状态
        const loading = document.createElement('div');
        loading.className = 'loading-overlay';
        loading.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(loading);
    }

    static hide() {
        const loading = document.querySelector('.loading-overlay');
        if (loading) {
            loading.remove();
        }
    }
}

// 添加全局错误处理
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // 可以添加错误提示UI
});