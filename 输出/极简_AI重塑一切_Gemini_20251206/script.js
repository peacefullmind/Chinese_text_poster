document.getElementById('save-button').addEventListener('click', function() {
    const coverImage = document.getElementById('cover-image-v2');

    html2canvas(coverImage, {
        allowTaint: true,
        useCORS: true,
        scale: 2 // Increase scale for higher resolution image
    }).then(function(canvas) {
        const link = document.createElement('a');
        link.download = 'bilibili_cover_minimalist.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});
