document.addEventListener('DOMContentLoaded', function() {
    const htmlTag = document.documentElement;

    // -------------------------------------------------------------
    // 1. MODO CLARO / OSCURO (localStorage)
    // -------------------------------------------------------------
    const btnTheme = document.getElementById('btn-theme');
    const themeText = document.getElementById('theme-text');
    const themeIcon = document.getElementById('theme-icon');

    function syncThemeUI(theme) {
        const lang = localStorage.getItem('lang') || 'es';
        if (themeIcon) {
            themeIcon.innerHTML = theme === 'dark' 
                ? '<svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8z"/></svg>' 
                : '<svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>';
        }
        if (themeText) {
            if (theme === 'dark') {
                themeText.textContent = lang === 'es' ? 'Modo Claro' : 'Light Mode';
            } else {
                themeText.textContent = lang === 'es' ? 'Modo Oscuro' : 'Dark Mode';
            }
        }
        if (btnTheme) {
            btnTheme.className = theme === 'dark' ? 'btn btn-outline-light btn-toggle-ui' : 'btn btn-outline-dark btn-toggle-ui';
        }
    }

    if (btnTheme) {
        syncThemeUI(htmlTag.getAttribute('data-bs-theme'));
        btnTheme.addEventListener('click', function() {
            const currentTheme = htmlTag.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlTag.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            syncThemeUI(newTheme);
        });
    }

    // -------------------------------------------------------------
    // 2. CAMBIO DE IDIOMA ESPAÑOL / INGLÉS (localStorage)
    // -------------------------------------------------------------
    const btnLang = document.getElementById('btn-lang');
    const langText = document.getElementById('lang-text');

    function applyLanguage(lang) {
        htmlTag.setAttribute('lang', lang);

        document.querySelectorAll('[data-es][data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        document.querySelectorAll('[data-es-placeholder][data-en-placeholder]').forEach(input => {
            input.placeholder = input.getAttribute(`data-${lang}-placeholder`);
        });

        if (langText) {
            langText.textContent = lang === 'es' ? 'English' : 'Español';
        }

        syncThemeUI(htmlTag.getAttribute('data-bs-theme'));
    }

    const currentLang = localStorage.getItem('lang') || 'es';
    applyLanguage(currentLang);

    if (btnLang) {
        btnLang.addEventListener('click', function() {
            const activeLang = localStorage.getItem('lang') || 'es';
            const nextLang = activeLang === 'es' ? 'en' : 'es';
            localStorage.setItem('lang', nextLang);
            applyLanguage(nextLang);
        });
    }

    // -------------------------------------------------------------
    // 3. ENVÍO DOBLE: DISCORD WEBHOOK + EMAILJS (GMAIL)
    // -------------------------------------------------------------
    const formContacto = document.getElementById('form-contacto');
    const alertaMensaje = document.getElementById('alerta-contacto');

    // CREDENCIALES (Reemplaza con tus datos reales)
    const DISCORD_WEBHOOK_URL = "TU_WEBHOOK_DE_DISCORD_AQUI";
    const EMAILJS_SERVICE_ID = "TU_SERVICE_ID";
    const EMAILJS_TEMPLATE_ID = "TU_TEMPLATE_ID";

    if (formContacto) {
        formContacto.addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;

            // --- A) ENVÍO A GMAIL VÍA EMAILJS ---
            const emailParams = {
                from_name: nombre,
                from_email: email,
                message: mensaje
            };

            if (typeof emailjs !== 'undefined') {
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams)
                    .then(function(res) {
                        console.log('Mensaje enviado a Gmail exitosamente:', res.status);
                    })
                    .catch(function(err) {
                        console.error('Error al enviar a Gmail:', err);
                    });
            }

            // --- B) ENVÍO A DISCORD VÍA WEBHOOK ---
            const discordPayload = {
                embeds: [{
                    title: "📩 Nuevo Mensaje de Contacto - NØVAK",
                    color: 16726832, // Rojo neón (#FF3B30)
                    fields: [
                        { name: "👤 Nombre", value: nombre, inline: true },
                        { name: "📧 Email", value: email, inline: true },
                        { name: "💬 Mensaje", value: mensaje }
                    ],
                    footer: { text: "NØVAK Web Contact System" },
                    timestamp: new Date()
                }]
            };

            fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(discordPayload)
            })
            .then(res => console.log('Mensaje enviado a Discord exitosamente'))
            .catch(err => console.error('Error al enviar a Discord:', err));

            // --- C) CONFIRMACIÓN EN PANTALLA Y LIMPIEZA ---
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
    const lang = localStorage.getItem('lang') || 'es';

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
        if (lang === 'es') {
            resultado.innerHTML = `Obtuviste ${puntaje} de 5 respuestas correctas.`;
        } else {
            resultado.innerHTML = `You scored ${puntaje} out of 5 correct answers.`;
        }
        resultado.className = puntaje >= 3 ? 'alert alert-success mt-3 text-center fw-bold' : 'alert alert-danger mt-3 text-center fw-bold';
    }
}