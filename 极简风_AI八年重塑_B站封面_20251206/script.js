/*
文件路径: /极简风_AI八年重塑_B站封面_20251206/script.js
主要功能: 实现封面图的交互功能和图片导出功能
*/

/**
 * 保存封面为图片
 * 输入: 无
 * 输出: 下载生成的PNG图片文件
 */
function savePoster() {
    const posterElement = document.getElementById('poster');
    const saveBtn = document.getElementById('saveBtn');
    
    // 保存按钮添加加载状态
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成中...';
    saveBtn.disabled = true;
    
    // 使用html2canvas生成图片
    html2canvas(posterElement, {
        scale: 2, // 提高清晰度，2倍分辨率
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: 750,
        height: 1000
    }).then(canvas => {
        // 将canvas转换为blob
        canvas.toBlob(blob => {
            // 创建下载链接
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const timestamp = new Date().getTime();
            
            link.download = `AI八年重塑_B站封面_${timestamp}.png`;
            link.href = url;
            link.click();
            
            // 清理URL对象
            URL.revokeObjectURL(url);
            
            // 恢复按钮状态
            saveBtn.innerHTML = '<i class="fas fa-check"></i> 保存成功';
            setTimeout(() => {
                saveBtn.innerHTML = '<i class="fas fa-download"></i> 保存封面';
                saveBtn.disabled = false;
            }, 2000);
        }, 'image/png');
    }).catch(error => {
        console.error('生成图片失败:', error);
        saveBtn.innerHTML = '<i class="fas fa-times"></i> 生成失败';
        setTimeout(() => {
            saveBtn.innerHTML = '<i class="fas fa-download"></i> 保存封面';
            saveBtn.disabled = false;
        }, 2000);
    });
}

/**
 * 初始化页面
 * 输入: 无
 * 输出: 绑定事件监听器
 */
function initializePage() {
    const saveBtn = document.getElementById('saveBtn');
    
    // 绑定保存按钮点击事件
    saveBtn.addEventListener('click', savePoster);
    
    // 添加键盘快捷键支持 (Ctrl+S / Cmd+S)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            savePoster();
        }
    });
    
    // 页面加载完成提示
    console.log('封面页面初始化完成');
    console.log('提示：按 Ctrl+S (Windows) 或 Cmd+S (Mac) 也可以保存封面');
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

/**
 * 添加页面可见性监听
 * 当页面从后台切换回前台时，确保动画正常运行
 */
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        console.log('页面重新可见，动画状态正常');
    }
});

