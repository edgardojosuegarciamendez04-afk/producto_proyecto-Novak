// Función para evaluar el cuestionario interactivo
function evaluarQuiz() {
    const respuestasCorrectas = {
        p1: 'c',
        p2: 'a',
        p3: 'a',
        p4: 'b',
        p5: 'a'
    };

    let puntaje = 0;
    const total = 5;

    for (let i = 1; i <= total; i++) {
        const opciones = document.getElementsByName('p' + i);

        opciones.forEach(opcion => {
            const label = opcion.parentElement;
            label.classList.remove('correcto', 'incorrecto');

            if (opcion.checked) {
                if (opcion.value === respuestasCorrectas['p' + i]) {
                    puntaje++;
                    label.classList.add('correcto');
                } else {
                    label.classList.add('incorrecto');
                }
            }
        });
    }

    const resultadoDiv = document.getElementById('resultado');
    if (resultadoDiv) {
        resultadoDiv.innerHTML = `Puntaje final: ${puntaje} de ${total} respuestas correctas.`;
        resultadoDiv.style.color = puntaje >= 3 ? '#4ade80' : '#fca5a5';
        resultadoDiv.style.marginTop = "20px";
        resultadoDiv.style.fontWeight = "bold";
    }
}