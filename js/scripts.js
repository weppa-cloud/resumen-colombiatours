// Función para validar si el JSON es correcto
function isJSONValid(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

// Escuchar eventos del objeto Window
window.addEventListener("message", function (event) {
    console.log('Received event data:', event.data);

    if (!isJSONValid(event.data)) {
        console.error('Invalid JSON:', event.data);
        return;
    }

    // Procesar los datos del evento
    const eventData = JSON.parse(event.data);

    // Mostrar mensaje de carga
    document.getElementById('loading').style.display = 'flex';
    document.getElementById('resumen').style.display = 'none';

    // Enviar los datos a n8n y esperar la respuesta
    fetch('https://n8n.weppa.co/webhook-test/resumen-aplication-colombiatours', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    })
    .then(response => response.json())
    .then(n8nResponse => {
        console.log('Received response from n8n:', n8nResponse);

        // Extraer y mostrar el resumen de n8n en el div
        const resumen = n8nResponse.data || 'No hay resumen disponible';
        document.getElementById('resumen').innerText = resumen;

        // Mostrar el resumen y ocultar el mensaje de carga
        document.getElementById('loading').style.display = 'none';
        document.getElementById('resumen').style.display = 'block';

        // Aquí puedes procesar la respuesta de n8n y modificar los datos si es necesario
        const chatwootData = {
            ...eventData, 
            reply: n8nResponse.reply || ''
        };
    })
    .catch((error) => {
        console.error('Error sending data to n8n:', error);
        document.getElementById('loading').style.display = 'none';
    });
});
