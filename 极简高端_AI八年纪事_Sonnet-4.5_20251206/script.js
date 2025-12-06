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
            scale: 2, // 提高分辨率
            backgroundColor: null,
            useCORS: true,
            logging: false,
            width: poster.offsetWidth,
            height: poster.offsetHeight
        }).then(function(canvas) {
            // 创建下载链接
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 10);
            link.download = `AI八年纪事_B站封面_${timestamp}.png`;
            link.href = canvas.toDataURL('image/png');
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

    // 添加简单的动画效果
    const animateElements = () => {
        const chapters = document.querySelectorAll('.chapter-item');

        chapters.forEach((chapter, index) => {
            chapter.style.opacity = '0';
            chapter.style.transform = 'translateX(-20px)';

            setTimeout(() => {
                chapter.style.transition = 'all 0.5s ease';
                chapter.style.opacity = '1';
                chapter.style.transform = 'translateX(0)';
            }, 100 * index);
        });
    };

    // 页面加载完成后执行动画
    setTimeout(animateElements, 300);
});
