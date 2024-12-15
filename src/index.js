import 'regenerator-runtime/runtime'
const { BlobServiceClient } = require("@azure/storage-blob");

const selectButton = document.getElementById("select-button");
const fileInput = document.getElementById("file-input");

const blobSasUrl = "sv=2022-11-02&ss=b&srt=co&sp=rwaciytf&se=2024-12-16T01:25:47Z&st=2024-12-15T17:25:47Z&spr=https&sig=tyxX7rW5VA7LrSfKhbA0KFDoBqTkYjiLH4RVjU686A8%3D"
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

