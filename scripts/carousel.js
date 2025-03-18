document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const items = carousel.querySelectorAll('.carousel-item');
        const indicatorsContainer = carousel.querySelector('.carousel-indicators');

        if (indicatorsContainer) {
            // 清空现有指示器
            indicatorsContainer.innerHTML = '';

            // 动态生成指示器
            items.forEach((_, index) => {
                const indicator = document.createElement('button');
                indicator.setAttribute('data-index', index);
                if (index === 0) indicator.classList.add('active');
                indicatorsContainer.appendChild(indicator);
            });
        }
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

            // 隐藏所有幻灯片，除了当前和下一张
            items.forEach(item => {
                if (item !== currentSlide && item !== nextSlide) {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                    item.style.zIndex = '0';
                    item.classList.remove('active');
                }
            });

            // 设置初始状态
            currentSlide.style.transition = '';
            nextSlide.style.transition = '';
            
            currentSlide.style.display = 'block';
            currentSlide.style.opacity = '1';
            currentSlide.style.zIndex = '2';
            
            nextSlide.style.display = 'block';
            nextSlide.style.opacity = '0';
            nextSlide.style.zIndex = '1';

            // 更新指示器
            indicators.forEach(indicator => indicator.classList.remove('active'));
            indicators[index].classList.add('active');

            // 强制浏览器重排以确保过渡效果生效
            void currentSlide.offsetHeight;

            // 设置过渡效果并执行动画
            currentSlide.style.transition = 'opacity 0.5s ease-in-out';
            nextSlide.style.transition = 'opacity 0.5s ease-in-out';

            requestAnimationFrame(() => {
                currentSlide.style.opacity = '0';
                nextSlide.style.opacity = '1';

                setTimeout(() => {
                    // 动画完成后更新状态
                    currentSlide.style.display = 'none';
                    currentSlide.style.zIndex = '0';
                    currentSlide.classList.remove('active');

                    nextSlide.style.zIndex = '2';
                    nextSlide.classList.add('active');

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
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                prevSlide();
                startAutoplay();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', function() {
                nextSlide();
                startAutoplay();
            });
        }

        indicators.forEach((indicator, index) => {
            if (indicator) {
                indicator.addEventListener('click', () => {
                    showSlide(index);
                    startAutoplay();
                });
            }
        });

        // 鼠标悬停时停止自动播放
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // 开始自动播放
        startAutoplay();
    });
});