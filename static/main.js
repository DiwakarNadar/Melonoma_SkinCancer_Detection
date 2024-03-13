document.addEventListener('DOMContentLoaded', function () {
    const dropZone = document.querySelector('.drop-zone');
    const input = document.querySelector('.drop-zone__input');

    dropZone.addEventListener('click', function () {
        input.click();
    });

    input.addEventListener('change', function () {
        if (input.files.length) {
            updateThumbnail(dropZone, input.files[0]);
        }
    });

    dropZone.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.classList.add('drop-zone--over');
    });

    ['dragleave', 'dragend'].forEach((type) => {
        dropZone.addEventListener(type, (e) => {
            dropZone.classList.remove('drop-zone--over');
        });
    });

    dropZone.addEventListener('drop', function (e) {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
            input.files = e.dataTransfer.files;
            updateThumbnail(dropZone, e.dataTransfer.files[0]);
        }

        dropZone.classList.remove('drop-zone--over');
    });

    // Predict button click event
    const predictButton = document.getElementById('predictButton');
    predictButton.addEventListener('click', function () {
        const file = input.files[0];
        if (file) {
            uploadFile(file);
        }
    });
});

function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector('.drop-zone__thumb');

    // First time - remove the prompt
    if (dropZoneElement.querySelector('.drop-zone__prompt')) {
        dropZoneElement.querySelector('.drop-zone__prompt').remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
        thumbnailElement = document.createElement('div');
        thumbnailElement.classList.add('drop-zone__thumb');
        dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
    } else {
        thumbnailElement.style.backgroundImage = null;
    }
}

function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
        updatePrediction(data.prediction, data.prediction_id);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function updatePrediction(prediction, predictionId) {
    const predictionElement = document.querySelector('.prediction');
    const viewDetailsLink = document.querySelector('.view_details');

    predictionElement.textContent = prediction;
    viewDetailsLink.textContent="View details"
    viewDetailsLink.href = `/details/${predictionId}`;
    viewDetailsLink.style.backgroundColor = "#766f6f"; 
}
