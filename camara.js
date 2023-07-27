// Obtener elementos del DOM
const openCameraBtn = document.getElementById('openCameraBtn');
const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('previewImage');

// Evento click en el botón para abrir la cámara
openCameraBtn.addEventListener('click', () => {
    openCamera();
});

// Función para abrir la cámara
function openCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Solicitar permiso para acceder a la cámara
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                // Mostrar la cámara en una vista previa (opcional)
                previewImage.srcObject = stream;
                previewImage.style.display = 'block';

                // Detener la cámara y capturar el archivo cuando se selecciona la imagen
                fileInput.addEventListener('change', function () {
                    const selectedFile = this.files[0];
                    if (selectedFile) {
                        // Aquí puedes enviar el archivo al servidor o realizar otras acciones con él
                        console.log('Archivo seleccionado:', selectedFile);
                    }

                    // Detener la cámara y ocultar la vista previa
                    stream.getTracks().forEach(track => track.stop());
                    previewImage.style.display = 'none';
                });
            })
            .catch((error) => {
                console.error('Error al acceder a la cámara:', error);
            });
    } else {
        console.error('La API MediaDevices no es compatible con este navegador.');
    }
}
