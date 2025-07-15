// Función para agregar eventos dinámicamente
function cargarEventos() {
  fetch('http://localhost:3000/eventos')
    .then(response => response.json())
    .then(eventos => {
      const contenedor = document.querySelector('.events');
      contenedor.innerHTML = ''; // limpiar antes de agregar
      eventos.forEach(e => {
        const hoy = new Date().toISOString().split('T')[0]; // Fecha actual

        if (e.fecha < hoy) return; // Si el evento ya pasó, NO lo mostramos

        const div = document.createElement('div');
        div.classList.add('event');
        div.innerHTML = `

        <img src="${e.imagen}" alt="Imagen evento" class="event__image">
        <h3 class="event__title">${e.titulo}</h3>
        <p class="event__description">${e.descripcion}</p>
        <p class="event__date">Fecha: ${e.fecha}</p>
        <p class="event__status">Estado: ${e.estado}</p>
        <button type="button" class="event__toggle">Ver más</button>
        <a href="${e.link}" class="event__link">Ver detalles</a>
      `;
        contenedor.appendChild(div);
      });

    })
    .catch(error => console.error('Error al cargar eventos:', error));
}

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  cargarEventos();
  enviarRegistro(); 
});



// Escuchar clicks en todos los botones Ver más/Ver menos
document.addEventListener('click', function (e) {
  if (e.target.matches('.event__toggle')) {
    const eventCard = e.target.closest('.event'); // buscar el div .event
    const desc = eventCard.querySelector('.event__description'); // buscar la descripción

    desc.classList.toggle('expanded');
    e.target.textContent = desc.classList.contains('expanded') ? 'Ver menos' : 'Ver más';
  }
});


// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', cargarEventos);

// Función para crear cada tarjeta de evento
function crearEvento(evento) {
  const contenedor = document.querySelector(".events");
  const div = document.createElement("div");
  div.classList.add("event");
  div.innerHTML = `
    <img src="${evento.imagen}" alt="${evento.titulo}" class="event__image">
    <h3 class="event__title">${evento.titulo}</h3>
    <p class="event__description">${evento.descripcion}</p>
    <a href="${evento.link}" class="event__link">Ver detalles</a>
  `;
  contenedor.appendChild(div);
}

// Función para registrar un nuevo usuario
function registerUser(nombre, correo, contraseña) {
  if (!nombre || !correo || !contraseña) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const nuevoUsuario = {
    id: generarID(),
    nombre,
    correo,
    contraseña
  };

  fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  })
    .then(res => {
      if (res.ok) {
        alert('Usuario registrado correctamente');
        // Redirigir al login
        window.location.href = "./login.html";
      } else {
        alert('Error al registrar el usuario');
      }
    })
    .catch(() => {
      alert('Error al conectar con el servidor');
    });
}

// Función auxiliar para generar IDs únicos
function generarID() {
  return Math.random().toString(36).substr(2, 9);
}

// Añadir el event listener al formulario cuando cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('registerUsername').value.trim();
    const correo = document.getElementById('registerEmail').value.trim();
    const contraseña = document.getElementById('registerPassword').value.trim();
    registerUser(nombre, correo, contraseña);
  });
});