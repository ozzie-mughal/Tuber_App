//File URI needs to be converted to BLOB for S3 storage
const getBlob = async (uri) => {
    const response = await fetch(uri);
    const blob = response.blob();
    return blob;
}

export default getBlob