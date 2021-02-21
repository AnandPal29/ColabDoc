const socket = io();

socket.on('initialText', (val) => {
    document.querySelector('#textbox').value = val;
})

function charUpdate(textbox) {
    var length = textbox.value.length;
    socket.emit('textUpdate', textbox.value);
}
socket.on('sendUpdate', (val) => {
    document.querySelector('#textbox').value = val;
});

/*-----------------------------------------------------------------------------------------*/

function downloadFunc(){
    const a = document.getElementById("downloadBtn");

    const textbox = document.getElementById("textbox");
    const data = textbox.value;

    const blob = new Blob([data], {type: 'application/octet-stream'});
    a.href = URL.createObjectURL(blob);
}



/* ----------------------------------------------------- */
function Export2Word(element, filename = ''){
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+document.getElementById(element).value+postHtml;

    var blob = new Blob(['\ufeff', html], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    filename = filename?filename+'.doc':'document.doc';
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);
}