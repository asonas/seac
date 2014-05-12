function takeScreenshot() {
  chrome.tabs.getSelected(null, function(tab) {
    console.log(tab.title);
    title = tab.title;
  })

  chrome.tabs.captureVisibleTab(null, function(img) {
    console.log(img);
    dataArray = img.split(",")
    var blob = b64toBlob(dataArray[1], "image/jpeg");
    var blobUrl = URL.createObjectURL(blob);

    var saveas = document.createElement("a");
    saveas.style.display = "none";
    saveas.href = blobUrl;
    saveas.download = title + ".jpg";
    saveas.click();

  });
}
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: "application/octet-stream"});
    return blob;
}

chrome.commands.onCommand.addListener(function(command) {
  takeScreenshot();
});
