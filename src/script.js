import 'regenerator-runtime/runtime'
const { BlobServiceClient } = require("@azure/storage-blob");

const selectButton = document.getElementById("select-button");
const fileInput = document.getElementById("file-input");

const blobSasUrl = "https://images23f2.blob.core.windows.net/?sv=2022-11-02&ss=b&srt=co&sp=rwciytf&se=2024-12-30T01:11:14Z&st=2024-12-14T17:11:14Z&spr=https&sig=yBOswgjNBmKWPO6j3x2bcsslozdoa8bP%2FcZxzx6AIUg%3D";
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

