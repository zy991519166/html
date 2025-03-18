document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const items = carousel.querySelectorAll('.carousel-item');
        const indicators = carousel.querySelectorAll('.carousel-indicators button');
        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');
        let currentIndex = 0;
        let isAnimating = false;
        let autoplayInterval;

        // 切换到指定索引的图片
        const showSlide = (index) => {
            if (isAnimating || index === currentIndex) return;
            isAnimating = true;

            const currentSlide = items[currentIndex];
            const nextSlide = items[index];

            // 设置初始状态
            currentSlide.style.transition = '';
            nextSlide.style.transition = '';
            
            // 只设置参与过渡的两张图片的状态
            currentSlide.style.opacity = '1';
            currentSlide.style.zIndex = '1';
            nextSlide.style.opacity = '0';
            nextSlide.style.zIndex = '2';

            // 更新指示器
            indicators.forEach(indicator => indicator.classList.remove('active'));
            indicators[index].classList.add('active');

            // 执行淡入动画
            requestAnimationFrame(() => {
                nextSlide.style.transition = 'opacity 0.5s ease-in-out';
                nextSlide.style.opacity = '1';

                setTimeout(() => {
                    // 动画完成后更新状态
                    currentSlide.style.opacity = '0';
                    currentSlide.style.zIndex = '0';
                    nextSlide.style.transition = '';
                    isAnimating = false;
                    currentIndex = index;
                }, 500);
            });
        };

        // 下一张图片
        const nextSlide = () => {
            const nextIndex = (currentIndex + 1) % items.length;
            showSlide(nextIndex);
        };

        // 上一张图片
        const prevSlide = () => {
            const prevIndex = (currentIndex - 1 + items.length) % items.length;
            showSlide(prevIndex);
        };

        // 开始自动播放
        const startAutoplay = () => {
            stopAutoplay();
            autoplayInterval = setInterval(nextSlide, 5000);
        };

        // 停止自动播放
        const stopAutoplay = () => {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        };

        // 事件监听
        prevButton.addEventListener('click', () => {
            prevSlide();
            startAutoplay();
        });

        nextButton.addEventListener('click', () => {
            nextSlide();
            startAutoplay();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                startAutoplay();
            });
        });

        // 鼠标悬停时停止自动播放
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // 开始自动播放
        startAutoplay();
    });
});