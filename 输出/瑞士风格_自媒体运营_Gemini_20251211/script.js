/**
 * 文件路径: 输出/瑞士风格_自媒体运营_Gemini_20251211/script.js
 * 主要功能: 实现将HTML元素转换为图片并下载的功能
 * 输入: 用户点击保存按钮
 * 输出: 下载PNG格式的封面图片
 */

document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('save-btn');
    const posterCard = document.getElementById('poster-card');

    saveBtn.addEventListener('click', async () => {
        try {
            // 更改按钮状态
            const originalText = saveBtn.innerHTML;
            saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 生成中...';
            saveBtn.disabled = true;

            // 配置 html2canvas 选项
            const canvas = await html2canvas(posterCard, {
                scale: 2, // 提高分辨率 (2倍)
                useCORS: true, // 允许跨域加载图片（如果是网络字体或图片）
                backgroundColor: null, // 保持透明背景（虽然这里是矩形）
                logging: false,
                width: posterCard.offsetWidth, // 确保宽度准确
                height: posterCard.offsetHeight // 确保高度准确
            });

            // 转换为数据 URL
            const image = canvas.toDataURL("image/png");

            // 创建临时下载链接
            const link = document.createElement('a');
            link.href = image;
            link.download = '自媒体运营_瑞士风格_封面.png';
            
            // 触发下载
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // 恢复按钮状态
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;

        } catch (error) {
            console.error('生成图片失败:', error);
            alert('生成图片失败，请重试');
            saveBtn.innerHTML = '<i class="fa-solid fa-download"></i> 保存封面图';
            saveBtn.disabled = false;
        }
    });
});
