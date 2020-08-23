class PhotosService {

    readFile = fileURL => {
        const reader = new FileReader();
        reader.readAsText(fileURL);
        reader.onload = () => { /* magic happens here */ };
    }
}
