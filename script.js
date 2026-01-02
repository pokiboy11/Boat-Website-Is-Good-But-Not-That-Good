function row(label, value) {
  if (value === undefined || value === null || String(value).trim() === "") {
    return "";
  }
  return `
    <div class="row">
      <div class="label">${label}</div>
      <div class="value">${value}</div>
    </div>
  `;
}

function renderResults(results) {
  let html = "";

  results.forEach((r, i) => {
    html += `
      <div style="margin-bottom:20px">
        <b>▶ RESULT ${i + 1}</b><br><br>

        ${row("👤 Name", r.name)}
        ${row("🧔 Father/Spouse", r.father_name)}
        ${row("📞 Mobile", r.mobile)}
        ${row("📲 Alt Mobile", r.alt_mobile)}
        ${row("📍 Circle", r.circle)}
        ${row("🆔 ID", r.id || r.id_number)}
        ${row("🏠 Address", r.address)}
        ${row("✉️ Email", r.email)}
      </div>
      <hr style="border-color:#00ff88">
    `;
  });

  return html || "<b>No readable records found</b>";
}

async function lookup() {
  const num = document.getElementById("num").value.trim();
  const out = document.getElementById("output");

  if (!num) {
    out.innerHTML = "⚠ Number required";
    return;
  }

  out.innerHTML = "⌛ Formatting results…";

  try {
    const res = await fetch(`/api/lookup?num=${num}`);
    const data = await res.json();

    if (!data.success || !Array.isArray(data.result)) {
      out.innerHTML = "<b>No valid data found</b>";
      return;
    }

    out.innerHTML = renderResults(data.result);

  } catch (e) {
    out.innerHTML = "✖ System error";
  }
}
