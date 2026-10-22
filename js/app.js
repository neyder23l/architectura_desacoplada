const questions = [
  {
    question: "¿Qué describe mejor una arquitectura de software?",
    options: [
      "El plano que organiza componentes y define cómo colaboran",
      "El lenguaje de programación usado para escribir una aplicación",
      "Una base de datos que guarda todos los datos del sistema",
      "La interfaz visual que ve el usuario"
    ],
    answer: 0,
    explanation: "La arquitectura define la organización, las responsabilidades y las relaciones entre las partes del sistema."
  },
  {
    question: "¿Qué significa desacoplar componentes?",
    options: [
      "Poner todos los componentes en el mismo archivo",
      "Reducir la dependencia directa para que puedan cambiar con más autonomía",
      "Eliminar la comunicación entre partes del sistema",
      "Usar obligatoriamente una tecnología distinta para cada componente"
    ],
    answer: 1,
    explanation: "Desacoplar reduce dependencias rígidas; los componentes aún colaboran mediante contratos definidos."
  },
  {
    question: "¿Cómo se organiza una aplicación basada en microservicios?",
    options: [
      "Como una sola pieza que siempre se despliega completa",
      "Como servicios pequeños y especializados que pueden desplegarse por separado",
      "Como varias interfaces que comparten una única responsabilidad",
      "Como una colección de bases de datos sin lógica de aplicación"
    ],
    answer: 1,
    explanation: "Cada microservicio se enfoca en una capacidad y puede tener un ciclo de vida independiente."
  },
  {
    question: "¿Qué mecanismos pueden usar los servicios para comunicarse?",
    options: [
      "Solo archivos compartidos en una carpeta",
      "Únicamente llamadas directas a la base de datos de otro servicio",
      "APIs HTTP/REST o mensajería",
      "Solo llamadas de voz entre los equipos"
    ],
    answer: 2,
    explanation: "Las APIs permiten solicitudes y respuestas; la mensajería también facilita comunicación asíncrona."
  },
  {
    question: "¿Es obligatorio que cada microservicio tenga una base de datos propia?",
    options: [
      "Sí, siempre y sin excepciones",
      "No; separar los datos es habitual, pero depende del contexto",
      "Sí, pero solo para servicios de pagos",
      "No, porque los microservicios no pueden usar bases de datos"
    ],
    answer: 1,
    explanation: "Mantener datos separados favorece la autonomía, aunque no es un requisito universal."
  },
  {
    question: "¿Cuál es una ventaja de la escalabilidad individual?",
    options: [
      "Permite asignar recursos al servicio con más demanda",
      "Evita que los servicios se comuniquen entre sí",
      "Hace innecesario monitorear la aplicación",
      "Garantiza que nunca haya errores"
    ],
    answer: 0,
    explanation: "Se pueden escalar los servicios con mayor carga sin ampliar toda la aplicación."
  },
  {
    question: "¿Qué reto suele aparecer al depurar microservicios?",
    options: [
      "Todos los errores ocurren en el navegador",
      "Un fallo puede recorrer varios servicios y ser más difícil de rastrear",
      "Los servicios no pueden registrar eventos",
      "El código deja de ser ejecutable"
    ],
    answer: 1,
    explanation: "Los errores distribuidos requieren registros, métricas y trazas para seguir el recorrido de una solicitud."
  },
  {
    question: "¿Cuál es una diferencia típica entre monolito y microservicios?",
    options: [
      "El monolito concentra funcionalidades; los microservicios las distribuyen en servicios independientes",
      "El monolito no tiene código y los microservicios sí",
      "Los microservicios siempre usan una sola tecnología y el monolito muchas",
      "No existe ninguna diferencia de estructura"
    ],
    answer: 0,
    explanation: "El monolito agrupa funcionalidades en una aplicación; microservicios las separan por capacidades."
  },
  {
    question: "En la tienda virtual del ejemplo, ¿qué responsabilidad corresponde al servicio de pedidos?",
    options: [
      "Validar la identidad del usuario",
      "Mostrar la interfaz de la tienda",
      "Registrar los artículos y coordinar los pasos de la orden",
      "Diseñar el catálogo de productos"
    ],
    answer: 2,
    explanation: "Pedidos registra la orden y coordina acciones como consultar inventario y procesar el pago."
  },
  {
    question: "¿Cuándo puede ser razonable comenzar con un monolito bien organizado?",
    options: [
      "Cuando todo sistema debe ser monolítico para siempre",
      "En un producto pequeño sin una necesidad concreta de distribución",
      "Solo cuando no hay usuarios",
      "Nunca; los microservicios son siempre mejores"
    ],
    answer: 1,
    explanation: "Un monolito bien organizado puede ser más simple al inicio; la arquitectura debe responder al contexto."
  }
];

const quizContainer = document.querySelector("#quiz-questions");
const quizForm = document.querySelector("#quiz-form");
const resultContainer = document.querySelector("#quiz-result");
const quizMessage = document.querySelector("#quiz-message");
const progressLabel = document.querySelector("#progress-label");
const progressFill = document.querySelector("#progress-fill");
document.querySelector("#quiz-count-value").textContent = questions.length;

function renderQuestions() {
  quizContainer.innerHTML = questions.map((item, questionIndex) => `
    <fieldset class="question-card" id="question-${questionIndex}">
      <legend class="question-title"><span class="question-number">${String(questionIndex + 1).padStart(2, "0")}</span><span>${item.question}</span></legend>
      <div class="answer-list">
        ${item.options.map((option, optionIndex) => `
          <div class="answer-choice">
            <label class="answer-option">
              <input type="radio" name="question-${questionIndex}" value="${optionIndex}" aria-label="${String.fromCharCode(65 + optionIndex)}: ${option}">
              <span class="answer-letter" aria-hidden="true">${String.fromCharCode(65 + optionIndex)}</span>
              <span>${option}</span>
            </label>
            <p class="answer-feedback" hidden></p>
          </div>
        `).join("")}
      </div>
    </fieldset>
  `).join("");
}

function updateProgress() {
  const answered = questions.reduce((total, _, index) => total + (quizForm.querySelector(`input[name="question-${index}"]:checked`) ? 1 : 0), 0);
  progressLabel.textContent = `${answered} de ${questions.length} respondidas`;
  progressFill.style.width = `${(answered / questions.length) * 100}%`;
  quizMessage.classList.remove("error");
  quizMessage.textContent = answered === questions.length ? "¡Listo! Ya puedes revisar tus resultados." : "Selecciona una respuesta en cada pregunta.";
}

function showResults(answers) {
  questions.forEach((item, questionIndex) => {
    const choices = quizForm.querySelectorAll(`#question-${questionIndex} .answer-choice`);
    choices.forEach((choice, optionIndex) => {
      const label = choice.querySelector(".answer-option");
      const feedback = choice.querySelector(".answer-feedback");
      if (optionIndex === item.answer) {
        const answeredCorrectly = answers[questionIndex] === item.answer;
        label.classList.add(answeredCorrectly ? "answer-correct" : "answer-reference");
        feedback.classList.add(answeredCorrectly ? "is-correct" : "is-correction");
        feedback.textContent = `${answeredCorrectly ? "Correcta." : "Respuesta correcta."} ${item.explanation}`;
        feedback.hidden = false;
      } else if (optionIndex === answers[questionIndex]) {
        label.classList.add("answer-incorrect");
      }
    });
    quizForm.querySelector(`#question-${questionIndex}`).disabled = true;
  });
  quizForm.dataset.completed = "true";

  const correctCount = answers.reduce((total, answer, index) => total + (answer === questions[index].answer ? 1 : 0), 0);
  const incorrectCount = questions.length - correctCount;
  const percentage = Math.round((correctCount / questions.length) * 100);
  let headline = "Buen comienzo";
  let feedback = "Repasa las respuestas y vuelve a intentarlo para afianzar las ideas.";
  if (percentage >= 90) {
    headline = "¡Dominio excelente!";
    feedback = "Tienes una comprensión sólida de los fundamentos de microservicios.";
  } else if (percentage >= 70) {
    headline = "¡Vas muy bien!";
    feedback = "Comprendes las ideas principales. Revisa los detalles que te faltaron.";
  } else if (percentage >= 50) {
    headline = "Vas por buen camino";
    feedback = "Ya tienes una base. Repasar las explicaciones ayudará a conectar los conceptos.";
  }

  const details = questions.map((item, index) => {
    const correct = answers[index] === item.answer;
    return `<article class="result-detail ${correct ? "correct" : "incorrect"}">
      <h4>${String(index + 1).padStart(2, "0")}. ${item.question}</h4>
      <p><strong>${correct ? "Correcta" : "Tu respuesta:"}</strong> ${item.options[answers[index]]}</p>
      ${correct ? "" : `<p><strong>Respuesta correcta:</strong> ${item.options[item.answer]}</p>`}
    </article>`;
  }).join("");

  resultContainer.innerHTML = `
    <div class="result-summary">
      <div class="result-score"><strong>${correctCount}/${questions.length}</strong><span>${percentage}% de respuestas correctas</span></div>
      <div class="result-copy"><h3>${headline}</h3><p>${feedback}</p><p>${correctCount} correctas · ${incorrectCount} incorrectas</p></div>
    </div>
    <div class="result-details">${details}</div>
    <button class="retry-button" type="button" id="retry-quiz">Volver a intentarlo ↻</button>
  `;
  resultContainer.hidden = false;
  resultContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  document.querySelector("#retry-quiz").addEventListener("click", resetQuiz);
}

function resetQuiz() {
  quizForm.reset();
  quizForm.querySelectorAll("fieldset").forEach((fieldset) => { fieldset.disabled = false; });
  quizForm.querySelectorAll(".answer-choice").forEach((choice) => {
    choice.querySelector(".answer-option").classList.remove("answer-correct", "answer-reference", "answer-incorrect");
    const feedback = choice.querySelector(".answer-feedback");
    feedback.classList.remove("is-correct", "is-correction");
    feedback.textContent = "";
    feedback.hidden = true;
  });
  delete quizForm.dataset.completed;
  resultContainer.hidden = true;
  resultContainer.innerHTML = "";
  updateProgress();
  quizForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

renderQuestions();
quizContainer.addEventListener("change", updateProgress);
quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answers = questions.map((_, index) => quizForm.querySelector(`input[name="question-${index}"]:checked`));
  const missing = answers.flatMap((answer, index) => answer ? [] : [index + 1]);
  if (missing.length) {
    quizMessage.classList.add("error");
    quizMessage.textContent = `Completa las preguntas: ${missing.join(", ")}.`;
    quizForm.querySelector(`#question-${missing[0] - 1}`).scrollIntoView({ behavior: "smooth", block: "center" });
    quizForm.querySelector(`#question-${missing[0] - 1} input`).focus({ preventScroll: true });
    return;
  }
  showResults(answers.map((answer) => Number(answer.value)));
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.setAttribute("aria-label", expanded ? "Abrir menú" : "Cerrar menú");
  navigation.classList.toggle("is-open", !expanded);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    navigation.classList.remove("is-open");
  }
});

const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const browserThemeColor = document.querySelector('meta[name="theme-color"]');
const themeStorageKey = "arquitectura-lab-theme";
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let savedTheme = "";
try {
  savedTheme = localStorage.getItem(themeStorageKey) || "";
} catch {
  // El selector sigue funcionando aunque el navegador bloquee el almacenamiento.
}
let userHasChosenTheme = savedTheme === "light" || savedTheme === "dark";

function setTheme(theme, remember = true) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeIcon.textContent = isDark ? "☀" : "☾";
  browserThemeColor.content = isDark ? "#1E1B4B" : "#6D28D9";
  themeToggle.setAttribute("aria-label", `Cambiar a ${isDark ? "modo claro" : "modo oscuro"}`);
  themeToggle.title = `Cambiar a ${isDark ? "modo claro" : "modo oscuro"}`;
  if (remember) {
    userHasChosenTheme = true;
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch {
      // La preferencia solo se conserva mientras la página permanezca abierta.
    }
  }
}

setTheme(savedTheme || (systemTheme.matches ? "dark" : "light"), false);
systemTheme.addEventListener("change", (event) => {
  if (!userHasChosenTheme) setTheme(event.matches ? "dark" : "light", false);
});
themeToggle.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
  navigation.classList.remove("is-open");
});

const heroTitle = document.querySelector(".hero h1");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const titleWalker = document.createTreeWalker(heroTitle, NodeFilter.SHOW_TEXT);
  const titleNodes = [];
  while (titleWalker.nextNode()) titleNodes.push(titleWalker.currentNode);
  const titleParts = titleNodes.map((node) => node.textContent);
  titleNodes.forEach((node) => { node.textContent = ""; });
  heroTitle.classList.add("is-typing");

  let partIndex = 0;
  let characterIndex = 0;
  function typeTitleCharacter() {
    if (partIndex === titleParts.length) {
      window.setTimeout(() => heroTitle.classList.remove("is-typing"), 500);
      return;
    }
    const part = titleParts[partIndex];
    titleNodes[partIndex].textContent += part[characterIndex];
    characterIndex += 1;
    if (characterIndex === part.length) {
      partIndex += 1;
      characterIndex = 0;
    }
    window.setTimeout(typeTitleCharacter, 45);
  }
  typeTitleCharacter();
}

const videoSource = "video/video1.mp4";
const lessonVideo = document.querySelector("#lesson-video");
const videoPlaceholder = document.querySelector("#video-placeholder");
if (videoSource) {
  lessonVideo.src = videoSource;
  lessonVideo.hidden = false;
  videoPlaceholder.hidden = true;
  lessonVideo.addEventListener("error", () => {
    lessonVideo.hidden = true;
    videoPlaceholder.hidden = false;
  });
}
