/*
  文件路径：输出/科技简约_自媒体运营实践_GPT-5_20251211/script.js
  主要功能：为“自媒体运营实践”封面提供一键保存为图片的功能，并绑定交互事件
*/

/**
 * 函数名称：getPosterElement
 * 输入：无
 * 输出：返回代表封面区域的 DOM 元素，如果不存在则返回 null
 */
function getPosterElement() {
  // 使用 ID 获取封面主容器
  return document.getElementById("poster");
}

/**
 * 函数名称：getSaveButtonElement
 * 输入：无
 * 输出：返回“保存封面”按钮的 DOM 元素，如果不存在则返回 null
 */
function getSaveButtonElement() {
  // 使用 ID 获取保存按钮
  return document.getElementById("saveButton");
}

/**
 * 函数名称：createFileName
 * 输入：无
 * 输出：返回一个用于保存图片的文件名字符串
 */
function createFileName() {
  // 使用主题与当前时间拼接文件名，方便区分不同导出
  var now = new Date();
  var timePart =
    String(now.getFullYear()) +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    "_" +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0");

  return "自媒体运营实践_合集封面_" + timePart + ".png";
}

/**
 * 函数名称：downloadCanvasAsImage
 * 输入：
 *   - canvas：HTMLCanvasElement，对应 html2canvas 生成的画布
 *   - fileName：字符串，期望保存的文件名
 * 输出：无（在浏览器中触发图片下载）
 */
function downloadCanvasAsImage(canvas, fileName) {
  if (!canvas) {
    return;
  }

  // 将 canvas 转换为 PNG 数据 URL
  var dataUrl = canvas.toDataURL("image/png");

  // 创建一个隐藏的 a 标签触发下载
  var link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 函数名称：capturePosterAndSave
 * 输入：无
 * 输出：无（在用户点击后触发封面区域截图并下载）
 */
function capturePosterAndSave() {
  // 若 html2canvas 未正确加载，则给出友好提示，避免按钮“无响应”的错觉
  if (typeof window.html2canvas !== "function") {
    // 这里使用 alert 是为了在本地 file:// 打开时也能明显看到错误原因
    alert("当前未成功加载截图组件（html2canvas），请检查网络或稍后重试。");
    return;
  }

  var posterElement = getPosterElement();
  if (!posterElement) {
    // 若不存在对应元素，则直接返回避免报错
    return;
  }

  // 使用 html2canvas 截取封面区域，只包含内容本身，不包含外部按钮与说明
  html2canvas(posterElement, {
    backgroundColor: null,
    scale: 2
  }).then(function (canvas) {
    var fileName = createFileName();
    downloadCanvasAsImage(canvas, fileName);
  });
}

/**
 * 函数名称：bindSaveButtonEvent
 * 输入：无
 * 输出：无（为“保存封面”按钮绑定点击事件）
 */
function bindSaveButtonEvent() {
  var saveButton = getSaveButtonElement();
  if (!saveButton) {
    return;
  }

  saveButton.addEventListener("click", function () {
    capturePosterAndSave();
  });
}

/**
 * 函数名称：initPosterPage
 * 输入：无
 * 输出：无（在 DOM 内容就绪后初始化页面交互）
 */
function initPosterPage() {
  bindSaveButtonEvent();
}

// 等待 DOM 内容加载完成后再进行初始化，避免元素尚未渲染
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    initPosterPage();
  });
} else {
  initPosterPage();
}


