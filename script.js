const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbytxdMWmkomW9yqUjmx0gHEN4xAM-fhT-ePeQdqZQIL1geYgkY0kcfw43zk407grLXw/exec";

const form = document.querySelector("#checkin-form");
const button = form.querySelector("button[type='submit']");
const errorBox = document.querySelector("#form-error");

function campaignOrigin() {
  const params = new URLSearchParams(location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const values = keys.filter((key) => params.get(key)).map((key) => `${key}=${params.get(key)}`);
  return values.length ? `Landing Congreso 3D | ${values.join(" | ")}` : "Landing Congreso 3D";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorBox.hidden = true;
  button.disabled = true;
  button.firstChild.textContent = "REGISTRANDO… ";
  const data = Object.fromEntries(new FormData(form).entries());
  const payload = {
    nombre: data.name, email: data.email, whatsapp: data.whatsapp,
    diaPreferido: data.preferredDay, situacionImpresora: data.printerStatus,
    interesPrincipal: data.interest, ciudad: data.city,
    consentimiento: data.consent === "sí", origen: campaignOrigin()
  };
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST", mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    }
    document.querySelector("#landing").hidden = true;
    document.querySelector("#success").hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    errorBox.hidden = false;
    button.disabled = false;
    button.firstChild.textContent = "CONSEGUÍ TU ENTRADA GRATIS ";
  }
});

document.querySelector("#another-checkin").addEventListener("click", () => {
  form.reset();
  document.querySelector("#success").hidden = true;
  document.querySelector("#landing").hidden = false;
  button.disabled = false;
  button.firstChild.textContent = "CONSEGUÍ TU ENTRADA GRATIS ";
  document.querySelector("#checkin").scrollIntoView();
});
