document.addEventListener("DOMContentLoaded", () => {
    const sasUrl = "https://images23f2.blob.core.windows.net/orgimages?sp=r&st=2024-12-14T18:35:01Z&se=2024-12-15T02:35:01Z&spr=https&sv=2022-11-02&sr=c&sig=MT9AcS0byLHbXZ%2B7rU8w8lIduednY%2BiP8Ot2I0mn15E%3D";
    const resizedImageBaseUrl = "https://<your-storage-account-name>.blob.core.windows.net/<resized-container-name>";

    const uploadToBlobStorage = async (file) => {
        const blobName = file.name;

        try {
            const response = await fetch(`${sasUrl}/${blobName}`, {
                method: "PUT",
                headers: {
                    "x-ms-blob-type": "BlockBlob",
                },
                body: file,
            });

            if (response.ok) {
                alert("Image uploaded successfully!");
                showUploadedPreview(file);
                await displayResizedImage(blobName);
            } else {
                alert("Failed to upload image.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("An error occurred during upload.");
        }
    };

    const showUploadedPreview = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.getElementById("uploadedImagePreview");
            img.src = e.target.result;
            img.style.display = "block";
        };
        reader.readAsDataURL(file);
    };

    const displayResizedImage = async (blobName) => {
        const resizedImageUrl = `${resizedImageBaseUrl}/resized-${blobName}`;

        try {
            const response = await fetch(resizedImageUrl);
            if (response.ok) {
                const img = document.getElementById("resizedImagePreview");
                img.src = resizedImageUrl;
                img.style.display = "block";
            } else {
                alert("Resized image not ready yet.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadToBlobStorage(file);
        }
    });
});
