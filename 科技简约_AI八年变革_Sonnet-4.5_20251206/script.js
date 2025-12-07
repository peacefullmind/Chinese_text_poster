document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.getElementById('saveBtn');
    const poster = document.getElementById('poster');

    // 保存为图片功能
    saveBtn.addEventListener('click', function() {
        // 禁用按钮，防止重复点击
        saveBtn.disabled = true;
        saveBtn.textContent = '生成中...';

        // 使用html2canvas截取海报
        html2canvas(poster, {
            scale: 2, // 2倍分辨率，确保清晰度
            backgroundColor: '#000000',
            useCORS: true,
            logging: false,
            width: poster.offsetWidth,
            height: poster.offsetHeight,
            windowWidth: poster.offsetWidth,
            windowHeight: poster.offsetHeight
        }).then(function(canvas) {
            // 创建下载链接
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 10);
            link.download = `AI八年重塑_B站封面_${timestamp}.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();

            // 恢复按钮状态
            saveBtn.disabled = false;
            saveBtn.textContent = '保存为图片';
        }).catch(function(error) {
            console.error('生成图片失败:', error);
            alert('生成图片失败，请重试');

            // 恢复按钮状态
            saveBtn.disabled = false;
            saveBtn.textContent = '保存为图片';
        });
    });

    // 页面加载动画
    const initAnimations = () => {
        // 主标题动画
        const titleElements = document.querySelectorAll('.title-text, .keyword, .title-emphasis');
        titleElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';

            setTimeout(() => {
                el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 * index);
        });

        // 章节卡片动画
        const chapterCards = document.querySelectorAll('.chapter-card');
        chapterCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(20px)';

            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, 500 + (80 * index));
        });

        // 未来标签动画
        const futureTag = document.querySelector('.future-tag');
        if (futureTag) {
            futureTag.style.opacity = '0';
            futureTag.style.transform = 'translateY(20px)';

            setTimeout(() => {
                futureTag.style.transition = 'all 0.8s ease';
                futureTag.style.opacity = '1';
                futureTag.style.transform = 'translateY(0)';
            }, 1200);
        }
    };

    // 延迟执行动画
    setTimeout(initAnimations, 200);

    // 关键词呼吸效果
    const keyword = document.querySelector('.keyword');
    if (keyword) {
        setInterval(() => {
            keyword.style.transition = 'text-shadow 2s ease-in-out';
            const shadowIntensity = 0.3 + Math.random() * 0.2;
            keyword.style.textShadow = `0 0 40px rgba(220, 38, 38, ${shadowIntensity})`;
        }, 2000);
    }
});
