var radios = document.querySelectorAll('input[name="lifecycle-stage"]');
var cta = document.getElementById("diagnostic-cta");

if (radios.length && cta) {
  radios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      var val = this.value;
      cta.href = "request.html?stage=" + encodeURIComponent(val);
      cta.textContent = val === "unsure"
        ? "Find the right starting point →"
        : "Start here →";
      cta.hidden = false;
    });
  });
}
