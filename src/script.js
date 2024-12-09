// Get the file input and button elements
const imageInput = document.getElementById('imageInput');
const uploadButton = document.getElementById('uploadButton');
const resizedImage = document.getElementById('resizedImage');

// Function to handle the image upload
uploadButton.addEventListener('click', function() {
    const file = imageInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const image = new Image();
            image.src = e.target.result;
            
            image.onload = function() {
                // Resizing the image (for example, to 300px width)
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const scaleFactor = 300 / image.width;
                canvas.width = 300;
                canvas.height = image.height * scaleFactor;
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                
                // Convert the resized canvas to an image and display it
                const resizedDataUrl = canvas.toDataURL();
                resizedImage.src = resizedDataUrl;
                resizedImage.style.display = 'block';
                downloadLink.href = resizedDataUrl;  // Set the link to the resized image's Data URL
                downloadLink.style.display = 'inline-block';  // Show the download link

            };
        };
        
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image first.');
    }
});
