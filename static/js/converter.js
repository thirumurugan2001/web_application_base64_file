document.addEventListener('DOMContentLoaded', function() {
    // File to Base64
    const fileInput = document.getElementById('file-input');
    const fileNameDisplay = document.getElementById('file-name-display');
    const convertToBase64Button = document.getElementById('convert-to-base64');
    const base64Result = document.getElementById('base64-result');
    const base64Output = document.getElementById('base64-output');
    const copyBase64Button = document.getElementById('copy-base64');
    
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = `Selected: ${fileInput.files[0].name}`;
            convertToBase64Button.disabled = false;
        } else {
            fileNameDisplay.textContent = 'No file selected';
            convertToBase64Button.disabled = true;
        }
    });
    
    convertToBase64Button.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            // Get the base64 string without data URL prefix
            const base64String = e.target.result.split(',')[1];
            base64Output.value = base64String;
            base64Result.style.display = 'block';
        };
        reader.readAsDataURL(file);
    });
    
    copyBase64Button.addEventListener('click', () => {
        base64Output.select();
        document.execCommand('copy');
        copyBase64Button.textContent = 'Copied!';
        setTimeout(() => {
            copyBase64Button.textContent = 'Copy to Clipboard';
        }, 2000);
    });
    
    // Base64 to File
    const base64Input = document.getElementById('base64-input');
    const filenameInput = document.getElementById('filename-input');
    const convertToFileButton = document.getElementById('convert-to-file');
    const fileResult = document.getElementById('file-result');
    const downloadLink = document.getElementById('download-link');
    
    convertToFileButton.addEventListener('click', () => {
        const base64String = base64Input.value.trim();
        const filename = filenameInput.value.trim();
        
        if (!base64String || !filename) {
            alert('Please provide both a Base64 string and a filename.');
            return;
        }
        
        try {
            // Convert base64 to blob
            const byteCharacters = atob(base64String);
            const byteArrays = [];
            
            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                const slice = byteCharacters.slice(offset, offset + 512);
                
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                
                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            
            const blob = new Blob(byteArrays);
            
            // Create download link
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = filename;
            
            fileResult.style.display = 'block';
        } catch (error) {
            alert('Error converting Base64 to file. Please check your input.');
            console.error(error);
        }
    });
});