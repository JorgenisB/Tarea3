
function cargarContactos() {
    fetch('http://www.raydelto.org/agenda.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar la lista de contactos');
            }
            return response.json();
        })
        .then(data => {
            const contactList = document.getElementById('contact-list');
            contactList.innerHTML = '';
            data.forEach(contacto => {
                const li = document.createElement('li');
                li.textContent = `${contacto.nombre} ${contacto.apellido} - Teléfono: ${contacto.telefono}`;
                contactList.appendChild(li);
            });
        })
        .catch(error => {
            console.error(error.message);
            
        });
}


function agregarContacto(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;

    const nuevoContacto = {
        nombre,
        apellido,
        telefono
    };

    fetch('http://www.raydelto.org/agenda.php', {
        method: 'POST',
        body: JSON.stringify(nuevoContacto)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al agregar el contacto');
        }
        return response.json();
    })
    .then(data => {
        console.log('Contacto agregado:', data);
        cargarContactos(); 
    })
    .catch(error => {
        console.error(error.message);
     
    });
}


cargarContactos();


const addContactForm = document.getElementById('add-contact-form');
addContactForm.addEventListener('submit', agregarContacto);
