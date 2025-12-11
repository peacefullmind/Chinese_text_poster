/**
 * 文件路径: /输出/瑞士几何_自媒体运营实践_Claude-Sonnet-4.5_20251211/script.js
 * 主要功能: 实现一键保存海报为图片功能
 * 使用库: html2canvas
 * 输入: 点击保存按钮
 * 输出: 下载生成的封面图片（PNG格式）
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取保存按钮和海报元素
    const saveBtn = document.getElementById('saveBtn');
    const poster = document.getElementById('poster');

    /**
     * 保存海报为图片
     * 输入: 无
     * 输出: 下载 PNG 格式的图片文件
     * 功能: 使用 html2canvas 将海报转换为图片并触发下载
     */
    function savePosterAsImage() {
        // 禁用按钮，防止重复点击
        saveBtn.disabled = true;
        saveBtn.textContent = '正在生成...';

        // 使用 html2canvas 截取海报元素
        html2canvas(poster, {
            scale: 3, // 提高图片质量（3倍分辨率）
            backgroundColor: '#ffffff', // 背景色
            logging: false, // 关闭日志
            useCORS: true, // 允许跨域图片
            allowTaint: true // 允许跨域图片
        }).then(canvas => {
            // 将 canvas 转换为 blob
            canvas.toBlob(function(blob) {
                // 创建下载链接
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                
                // 生成文件名（包含时间戳）
                const timestamp = new Date().toISOString().slice(0, 10);
                link.download = `自媒体运营实践_抖音封面_${timestamp}.png`;
                
                link.href = url;
                
                // 触发下载
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // 释放内存
                URL.revokeObjectURL(url);
                
                // 恢复按钮状态
                saveBtn.disabled = false;
                saveBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    保存图片
                `;
                
                // 显示成功提示
                showNotification('图片已保存！');
            }, 'image/png');
        }).catch(error => {
            console.error('生成图片失败:', error);
            
            // 恢复按钮状态
            saveBtn.disabled = false;
            saveBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                保存图片
            `;
            
            // 显示错误提示
            showNotification('保存失败，请重试', 'error');
        });
    }

    /**
     * 显示通知消息
     * 输入: message (string) - 提示消息, type (string) - 消息类型 ('success' 或 'error')
     * 输出: 在页面上显示临时通知
     */
    function showNotification(message, type = 'success') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideIn 0.3s ease;
        `;
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        // 添加到页面
        document.body.appendChild(notification);
        
        // 3秒后自动移除
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                document.body.removeChild(notification);
                document.head.removeChild(style);
            }, 300);
        }, 3000);
    }

    // 绑定保存按钮点击事件
    saveBtn.addEventListener('click', savePosterAsImage);

    // 添加键盘快捷键支持（Ctrl/Cmd + S）
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault(); // 阻止默认保存行为
            savePosterAsImage();
        }
    });

    // 初始化完成提示
    console.log('🎨 海报生成器已就绪！');
    console.log('💡 提示: 点击右上角"保存图片"按钮或按 Ctrl/Cmd + S 保存海报');
});
