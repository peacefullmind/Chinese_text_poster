// 
//  文件路径：极简高端_AI八年纪事_GPT-4.1-mini_2025-12-06/main.js
//  主要功能：通过 html2canvas 将海报主区域导出为 PNG 图片，并绑定“保存封面为图片”按钮
//

// 
//  函数名：generatePosterFileName
//  输入：无（内部读取当前时间）
//  输出：字符串形式的文件名，例如 "poster-20251206.png"
//  作用：根据当前日期生成较有语义的导出图片文件名
//
function generatePosterFileName() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `poster-${year}${month}${day}.png`;
}

// 
//  函数名：handleSavePoster
//  输入：无显式输入（通过DOM获取 id="poster-root" 的节点）
//  输出：触发一次浏览器下载PNG图片的副作用，无返回值
//  作用：使用 html2canvas 将海报区域渲染为画布，再转为图片下载
//
function handleSavePoster() {
  const target = document.getElementById("poster-root");
  if (!target) {
    // 若找不到目标区域，则直接结束，避免报错
    return;
  }

  // 使用 html2canvas 生成截图
  html2canvas(target, {
    backgroundColor: "#050608",
    useCORS: true,
    scale: 2, // 提升导出清晰度
  }).then((canvas) => {
    const dataUrl = canvas.toDataURL("image/png");

    // 创建隐藏的 a 标签触发下载
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = generatePosterFileName();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// 
//  函数名：bindSaveButton
//  输入：无（在 DOMContentLoaded 事件触发后执行）
//  输出：无直接返回值，通过事件绑定提供交互能力
//  作用：为“保存封面为图片”按钮绑定点击事件，触发 handleSavePoster
//
function bindSaveButton() {
  const saveBtn = document.getElementById("save-btn");
  if (!saveBtn) return;

  saveBtn.addEventListener("click", handleSavePoster);
}

// 在DOM加载完成后初始化按钮事件绑定
document.addEventListener("DOMContentLoaded", bindSaveButton);


