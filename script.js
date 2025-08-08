document.getElementById('convertBtn').onclick = async function() {
    const file = document.getElementById('fileInput').files[0];
    const format = document.getElementById('formatSelect').value;

    if (!file) {
        alert("Please select an image file first.");
        return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.getElementById('downloadLink');
        link.href = url;
        link.download = `converted.${format === 'jpeg' ? 'jpg' : format}`;
        link.style.display = 'block';
        link.textContent = 'Download Converted File';
    }, `image/${format}`);
};
