import 'regenerator-runtime/runtime'
const { BlobServiceClient } = require("@azure/storage-blob");

const selectButton = document.getElementById("select-button");
const fileInput = document.getElementById("file-input");

const blobSasUrl = "https://images23f2.blob.core.windows.net/?sv=2022-11-02&ss=b&srt=co&sp=rwiytf&se=2024-12-15T01:49:41Z&st=2024-12-14T17:49:41Z&spr=https&sig=PqYHeO2ysqHGIybNVttrzzxqzC6AvCfFWzOv0P%2BI6KY%3D"
const blobServiceClient = new BlobServiceClient(blobSasUrl); 
const containerName = "orgimages";
const containerClient = blobServiceClient.getContainerClient(containerName);

const uploadFiles = async () => {

   try {
       const promises = [];
       for (const file of fileInput.files){
	const blockBlobClient = containerClient.getBlockBlobClient(file.name);
        promises.push(blockBlobClient.uploadBrowserData(file));
	} 	  
        await Promise.all(promises);
        alert('Done.');
       }
   catch (error) {
            alert(error.message);
                 }

}


selectButton.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", uploadFiles);

