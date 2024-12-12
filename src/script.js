// Include Azure Blob Storage SDK
const { BlobServiceClient } = require('@azure/storage-blob');

// Blob Storage setup
const storageConnectionString = "https://imgorg23.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=o&sp=rwdlacupiytfx&se=2024-12-13T00:59:19Z&st=2024-12-12T16:59:19Z&spr=https&sig=JKq%2B1zAfDsu2h52wxZ93JtKZykxoyJZUWe9zpiiJAKE%3D";
const originalContainerName = "imgorz23";
const resizedContainerName = "imgrsz23";

const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnectionString);
const originalContainerClient = blobServiceClient.getContainerClient(originalContainerName);

// HTML element references
const imageInput = document.getElementById('imageInput');
const uploadButton = document.getElementById('uploadButton');
const resizedImage = document.getElementById('resizedImage');
const downloadLink = document.getElementById('downloadLink');

// Function to upload image to Azure Blob Storage
async function uploadToBlob(file) {
    const blobName = file.name; // Use file name or generate unique name
    const blockBlobClient = originalContainerClient.getBlockBlobClient(blobName);

    try {
        // Upload the file to the "original-images" container
        await blockBlobClient.uploadBrowserData(file, {
            blobHTTPHeaders: { blobContentType: file.type },
        });
        console.log(`File uploaded successfully: ${blobName}`);
        return blobName; // Return the name of the uploaded file
    } catch (err) {
        console.error('Error uploading file to Blob Storage:', err);
        alert('Failed to upload file. Please try again.');
        return null;
    }
}

// Function to get the URL of a blob in the resized-images container
function getResizedImageUrl(imageName) {
    return `https://${blobServiceClient.accountName}.blob.core.windows.net/${resizedContainerName}/${imageName}`;
}

// Main function to handle file upload and image processing
uploadButton.addEventListener('click', async function () {
    const file = imageInput.files[0]; // Get the selected file

    if (!file) {
        alert('Please select an image first.');
        return;
    }

    // Step 1: Upload the file to Azure Blob Storage
    const blobName = await uploadToBlob(file);
    if (!blobName) return;

    // Step 2: Derive the name of the resized image
    const resizedImageName = `resized-${blobName}`;

    // Step 3: Get the URL of the resized image
    const resizedUrl = getResizedImageUrl(resizedImageName);

    // Step 4: Display the resized image and enable the download link
    resizedImage.src = resizedUrl;
    resizedImage.style.display = 'block'; // Show the image
    downloadLink.href = resizedUrl;
    downloadLink.style.display = 'inline-block'; // Show the download button
});
