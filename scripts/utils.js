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