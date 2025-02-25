class ParticleSystem {
    static CONFIG = {
        particleCount: 1000,
        particleSize: 2,
        moveSpeed: 0.0005,
        interactionRadius: 40
    };

    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.initScene();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        
        this.setupRenderer();
        this.setupCamera();
    }

    createParticles() {
        // ... 粒子创建逻辑 ...
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.updateParticles();
        this.renderer.render(this.scene, this.camera);
    }

    updateParticles() {
        // ... 粒子更新逻辑 ...
    }
} 