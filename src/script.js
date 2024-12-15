import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

const accountName = "images23f2";
const sasToken = "sv=2022-11-02&ss=b&srt=co&sp=rwciytf&se=2024-12-16T01:10:09Z&st=2024-12-15T17:10:09Z&spr=https&sig=hWKdkQJ%2BqPNTh9tn%2FC6SQdpU3B4pNC0fnsPVV4Bbjgk%3D";
const containerName = "orgimages";

const blobServiceClient = new BlobServiceClient(
  "https://${accountName}.blob.core.windows.net/?${sasToken}"
);
const containerClient = blobServiceClient.getContainerClient(containerName);

const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");

uploadButton.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (file) {
    const blobName = file.name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
    try {
      await blockBlobClient.uploadBrowserData(file);
      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
});