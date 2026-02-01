const contenedor = document.getElementById('contenedor-proyectos');

async function obtenerProyectos() {
    try {
        const respuesta = await fetch('https://api.github.com/repos/Louis-Alamo/compilador');
        const repo = await respuesta.json();

        contenedor.innerHTML = '';

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
        contenedor.innerHTML = tarjeta;

    } catch (error) {
        console.error('Error al obtener repos:', error);
        contenedor.innerHTML = '<p>Hubo un error cargando los proyectos.</p>';
    }
}

obtenerProyectos();
