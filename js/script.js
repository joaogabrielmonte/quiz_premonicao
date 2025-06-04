const questions = document.querySelectorAll('.question');
const nextButtons = document.querySelectorAll('.next-button');
let currentQuestion = 0;

// Gabarito
const answers = {
    q1: "C", // Gato miando 3x
    q2: "A", // Visão
    q3: "A", // Invocação do Mal
    q4: "A", // Impala
    q5: "A", // Sal
    q6: "B"  // A morte se aproxima
};

// Avança perguntas
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        const radios = questions[currentQuestion].querySelectorAll('input[type="radio"]');
        const checked = Array.from(radios).some(r => r.checked);

        if (!checked) {
            alert('Responda antes de continuar...');
            return;
        }

        questions[currentQuestion].classList.remove('active');
        currentQuestion++;

        if (currentQuestion < questions.length) {
            questions[currentQuestion].classList.add('active');
        }
    });
});

// Verifica respostas
document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let acertos = 0;
    for (let key in answers) {
        const checked = document.querySelector(`input[name="${key}"]:checked`);
        if (checked && checked.value === answers[key]) {
            acertos++;
        }
    }

    if (acertos === Object.keys(answers).length) {
        // Se acertou tudo → vai pro resultado.html
        window.location.href = 'resultado.html';
    } else {
        // Se errou → jumpscare + reinicia
        const audio = new Audio('som/jumpscare.ogg');
        audio.play();

        document.body.innerHTML = `
            <div style="background-color:black; color:red; height:100vh; display:flex; justify-content:center; align-items:center; font-size:3rem; text-align:center;">
                <div>❌ Você não escapou da morte...<br> Tente de novo! 💀</div>
            </div>
        `;

        setTimeout(() => {
            location.reload();
        }, 5000); // 5 segundos para reiniciar
    }
});
