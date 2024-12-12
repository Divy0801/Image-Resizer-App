document.addEventListener("DOMContentLoaded", () => {
    // Define Azure Blob Storage SAS URL
    const sasUrl = "https://imgorg23.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=o&sp=rwdlacupiytfx&se=2024-12-13T01:15:10Z&st=2024-12-12T17:15:10Z&spr=https&sig=KTfCgJnkuGupVPFmEQsnsvMSANxlEHN4ztyw0ShMREY%3D"; // Replace with your generated SAS URL
    const resizedImageBaseUrl = "https://imgrsz233.blob.core.windows.net/;QueueEndpoint=https://imgrsz233.queue.core.windows.net/;FileEndpoint=https://imgrsz233.file.core.windows.net/;TableEndpoint=https://imgrsz233.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=o&sp=rwdlacupiytfx&se=2024-12-13T01:27:16Z&st=2024-12-12T17:27:16Z&spr=https&sig=DHj4TsUZQ4cTHXPvLh0IarMkH76Km3h5R8gbJRSlIHM%3D"; // Replace with your resized container's base URL

    // Function to upload the image to Blob Storage
    const uploadToBlobStorage = async (file) => {
        const blobName = "imgorz23"; // Use the file's name for storage

        try {
            // Upload the image to Blob Storage
            const response = await fetch(`${sasUrl}/${blobName}`, {
                method: "PUT",
                headers: {
                    "x-ms-blob-type": "BlockBlob",
                },
                body: file,
            });

            if (response.ok) {
                console.log(`Image uploaded successfully: ${blobName}`);
                alert("Image uploaded successfully!");
                showUploadedPreview(file);
                await displayResizedImage(blobName); // Fetch and display resized image
            } else {
                console.error("Error uploading image:", response.statusText);
                alert("Failed to upload image!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while uploading the image.");
        }
    };

    // Function to preview the uploaded image
    const showUploadedPreview = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const uploadedPreview = document.getElementById("uploadedImagePreview");
            uploadedPreview.src = e.target.result;
            uploadedPreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    };

    // Function to fetch and display the resized image
    const displayResizedImage = async (blobName) => {
        const resizedImageUrl = `${resizedImageBaseUrl}/resized-${blobName}`; // Construct the URL

        // Verify if the resized image exists
        try {
            const response = await fetch(resizedImageUrl);
            if (response.ok) {
                const resizedImagePreview = document.getElementById("resizedImagePreview");
                resizedImagePreview.src = resizedImageUrl;
                resizedImagePreview.style.display = "block";
                console.log("Resized image fetched successfully.");
            } else {
                console.warn("Resized image not found yet. Please wait...");
                alert("The resized image is not ready yet. Please try again later.");
            }
        } catch (error) {
            console.error("Error fetching resized image:", error);
        }
    };

    // Attach the upload functionality to the file input
    const fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadToBlobStorage(file);
        }
    });
});
