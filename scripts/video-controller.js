class VideoController {
    constructor() {
        this.videos = document.querySelectorAll('video');
        this.init();
    }

    init() {
        this.videos.forEach(video => {
            // 添加视频预加载
            video.preload = 'metadata';
            
            // 优化播放控制
            video.addEventListener('play', () => this.handleVideoPlay(video));
            
            // 添加错误处理
            video.addEventListener('error', () => this.handleVideoError(video));
        });
    }

    handleVideoPlay(currentVideo) {
        this.videos.forEach(video => {
            if (video !== currentVideo && !video.paused) {
                video.pause();
            }
        });
    }

    handleVideoError(video) {
        console.error('Video loading error:', video.src);
        // 可以添加错误提示UI
    }
}