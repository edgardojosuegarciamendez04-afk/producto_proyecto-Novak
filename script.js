document.addEventListener('DOMContentLoaded', function() {
    
    const htmlTag = document.documentElement;

    // -------------------------------------------------------------
    // 1. MODO CLARO / OSCURO (localStorage)
    // -------------------------------------------------------------
    const btnTheme = document.getElementById('btn-theme');
    const temaGuardado = localStorage.getItem('theme') || 'dark';
    
    htmlTag.setAttribute('data-bs-theme', temaGuardado);
    actualizarBotonTema(temaGuardado);

    if (btnTheme) {
        btnTheme.addEventListener('click', function() {
            const temaActual = htmlTag.getAttribute('data-bs-theme');
            const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';
            
            htmlTag.setAttribute('data-bs-theme', nuevoTema);
            localStorage.setItem('theme', nuevoTema);
            actualizarBotonTema(nuevoTema);
        });
    }

    function actualizarBotonTema(tema) {
        if (!btnTheme) return;
        const langActual = localStorage.getItem('lang') || 'es';
        if (tema === 'dark') {
            btnTheme.textContent = langActual === 'es' ? 'Modo Claro' : 'Light Mode';
            btnTheme.className = 'btn btn-outline-light btn-sm';
        } else {
            btnTheme.textContent = langActual === 'es' ? 'Modo Oscuro' : 'Dark Mode';
            btnTheme.className = 'btn btn-outline-dark btn-sm';
        }
    }

    // -------------------------------------------------------------
    // 2. CAMBIO DE IDIOMA ESPAÑOL / INGLÉS (localStorage)
    // -------------------------------------------------------------
    const btnLang = document.getElementById('btn-lang');
    const langGuardado = localStorage.getItem('lang') || 'es';

    aplicarIdioma(langGuardado);

    if (btnLang) {
        btnLang.addEventListener('click', function() {
            const langActual = localStorage.getItem('lang') || 'es';
            const nuevoLang = langActual === 'es' ? 'en' : 'es';
            
            localStorage.setItem('lang', nuevoLang);
            aplicarIdioma(nuevoLang);
            actualizarBotonTema(htmlTag.getAttribute('data-bs-theme'));
        });
    }

    function aplicarIdioma(lang) {
        htmlTag.setAttribute('lang', lang);

        // Traducir textos con data-es y data-en
        const elementos = document.querySelectorAll('[data-es][data-en]');
        elementos.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        // Traducir placeholders de inputs/textareas
        const inputs = document.querySelectorAll('[data-es-placeholder][data-en-placeholder]');
        inputs.forEach(input => {
            input.placeholder = input.getAttribute(`data-${lang}-placeholder`);
        });

        if (btnLang) {
            btnLang.textContent = lang === 'es' ? 'English' : 'Español';
        }
    }

    // -------------------------------------------------------------
    // 3. FORMULARIO DE CONTACTO (Alerta de 3 segundos)
    // -------------------------------------------------------------
    const formContacto = document.getElementById('form-contacto');
    const alertaMensaje = document.getElementById('alerta-contacto');

    if (formContacto) {
        formContacto.addEventListener('submit', function(e) {
            e.preventDefault();

            if (alertaMensaje) {
                alertaMensaje.classList.remove('d-none');
            }

            formContacto.reset();

            setTimeout(function() {
                if (alertaMensaje) {
                    alertaMensaje.classList.add('d-none');
                }
            }, 3000);
        });
    }
});

// -------------------------------------------------------------
// 4. CUESTIONARIO INTERACTIVO
// -------------------------------------------------------------
function evaluarQuiz() {
    const respuestas = { p1: 'c', p2: 'a', p3: 'a', p4: 'b', p5: 'a' };
    let puntaje = 0;
    const langActual = localStorage.getItem('lang') || 'es';

    for (let i = 1; i <= 5; i++) {
        const opciones = document.getElementsByName('p' + i);
        opciones.forEach(opcion => {
            const label = opcion.parentElement;
            label.classList.remove('list-group-item-success', 'list-group-item-danger');

            if (opcion.checked) {
                if (opcion.value === respuestas['p' + i]) {
                    puntaje++;
                    label.classList.add('list-group-item-success');
                } else {
                    label.classList.add('list-group-item-danger');
                }
            }
        });
    }

    const resultado = document.getElementById('resultado');
    if (resultado) {
        if (langActual === 'es') {
            resultado.innerHTML = `Obtuviste ${puntaje} de 5 respuestas correctas.`;
        } else {
            resultado.innerHTML = `You got ${puntaje} out of 5 correct answers.`;
        }
        resultado.className = puntaje >= 3 ? 'alert alert-success mt-3 text-center' : 'alert alert-danger mt-3 text-center';
    }
}