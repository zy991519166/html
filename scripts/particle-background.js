class ParticleBackground {
    constructor() {
        // ... 保持原有代码 ...
        
        // 添加性能优化
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // 使用 requestIdleCallback 进行粒子更新
        this.lastTime = 0;
        this.frameRate = 1000 / 30; // 限制30fps
    }

    animate(currentTime) {
        requestAnimationFrame((time) => this.animate(time));

        // 控制帧率
        if (currentTime - this.lastTime < this.frameRate) return;
        this.lastTime = currentTime;

        // ... 其余动画代码 ...
    }
}