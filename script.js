document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const convertBtn = document.getElementById('convertBtn');
    const downloadLink = document.getElementById('downloadLink');

    if (convertBtn) {
        convertBtn.onclick = async function() {
            const file = fileInput.files[0];
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

            // Decide output format based on page
            let format = "jpeg";
            if (document.title.includes("JPG to PNG")) format = "png";
            if (document.title.includes("WebP to JPG")) format = "jpeg";

            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                downloadLink.href = url;
                downloadLink.download = `converted.${format === 'jpeg' ? 'jpg' : format}`;
                downloadLink.style.display = 'block';
                downloadLink.textContent = 'Download Converted File';
            }, `image/${format}`);
        };
    }
});
