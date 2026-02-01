const usuarioGithub = 'Carlos-Emmanuel-ISC6'; 
const contenedor = document.getElementById('contenedor-proyectos');

async function obtenerProyectos() {
    try {
        // Hacemos la petición a la API de GitHub
        const respuesta = await fetch(`https://api.github.com/users/${usuarioGithub}/repos`);
        const proyectos = await respuesta.json();

        // Limpiamos el mensaje de "Cargando..."
        contenedor.innerHTML = '';

        // Filtramos para que no salgan Forks (opcional)
        const misProyectos = proyectos.filter(repo => !repo.fork);

        misProyectos.forEach(repo => {
            // Creamos la tarjeta HTML para cada proyecto
            const tarjeta = `
                <div class="tarjeta-proyecto">
                    <h3>${repo.name}</h3>
                    <p>${repo.description ? repo.description : 'Sin descripción'}</p>
                    <div class="tecnologias">
                        <span>${repo.language ? repo.language : 'Código'}</span>
                    </div>
                    <div class="enlaces">
                        <a href="${repo.html_url}" target="_blank" class="btn-repo">Ver Código</a>
                        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="btn-demo">Ver Demo</a>` : ''}
                    </div>
                </div>
            `;
            // Inyectamos la tarjeta en el HTML
            contenedor.innerHTML += tarjeta;
        });

    } catch (error) {
        console.error('Error al obtener repos:', error);
        contenedor.innerHTML = '<p>Hubo un error cargando los proyectos.</p>';
    }
}

// Ejecutamos la función al cargar
obtenerProyectos();
