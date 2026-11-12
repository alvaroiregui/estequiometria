const shapes = document.querySelectorAll("[data-color]");
const reset = document.getElementById("reiniciar");
const switchDiagram = document.getElementById("cambiar-esquema");
const diagramTitle = document.getElementById("titulo-esquema");
const stoichiometry = document.getElementById("estequiometria");
const solutions = document.getElementById("disoluciones");

for (const shape of shapes) {
  function toggleColor() {
    const isColored = shape.getAttribute("aria-pressed") === "true";
    shape.setAttribute("aria-pressed", String(!isColored));
  }

  shape.addEventListener("click", toggleColor);
  shape.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!event.repeat) {
        toggleColor();
      }
    }
  });
}

function resetColors(diagram) {
  for (const shape of diagram.querySelectorAll("[data-color]")) {
    shape.setAttribute("aria-pressed", "false");
  }
}

reset.addEventListener("click", () => {
  resetColors(solutions.hidden ? stoichiometry : solutions);
});

switchDiagram.addEventListener("click", () => {
  const showSolutions = solutions.hidden;
  stoichiometry.hidden = showSolutions;
  solutions.hidden = !showSolutions;
  switchDiagram.textContent = showSolutions ? "Estequiometría" : "Disoluciones";
  diagramTitle.textContent = showSolutions ? "Disoluciones" : "Cálculos estequiométricos";
  document.title = `${diagramTitle.textContent} · Álvaro Iregui`;
});

window.addEventListener("pageshow", () => {
  resetColors(stoichiometry);
  resetColors(solutions);
});
