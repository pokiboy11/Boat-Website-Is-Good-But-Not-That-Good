async function lookup() {
  const num = document.getElementById("num").value.trim();
  const out = document.getElementById("output");

  if (!num) {
    out.innerHTML = "⚠ <b>Number is required</b>";
    return;
  }

  out.innerHTML = "⌛ Scanning databases...";

  try {
    // Call Vercel backend proxy (NOT the API directly)
    const response = await fetch(`/api/lookup?num=${num}`);
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      // If API returns non-JSON (rare but possible)
      out.innerHTML = `<pre>${text}</pre>`;
      return;
    }

    // Some APIs wrap response inside "data"
    const d = data.data ? data.data : data;

    out.innerHTML = `
      <div class="row">
        <div class="label">👤 Name</div>
        <div class="value">${d.name || "N/A"}</div>
      </div>

      <div class="row">
        <div class="label">🧔 Father/Spouse</div>
        <div class="value">${d.father || d.spouse || "N/A"}</div>
      </div>

      <div class="row">
        <div class="label">📞 Mobile</div>
        <div class="value">${d.mobile || num}</div>
      </div>

      <div class="row">
        <div class="label">📲 Alt Mobile</div>
        <div class="value">${d.alt_mobile || "N/A"}</div>
      </div>

      <div class="row">
        <div class="label">📍 Circle</div>
        <div class="value">${d.circle || "N/A"}</div>
      </div>

      <div class="row">
        <div class="label">🆔 ID</div>
        <div class="value">${d.id || "N/A"}</div>
      </div>

      <div class="row">
        <div class="label">🏠 Address</div>
        <div class="value">${d.address || "N/A"}</div>
      </div>

      <div class="row">
        <div class="label">✉️ Email</div>
        <div class="value">${d.email || "N/A"}</div>
      </div>
    `;

  } catch (err) {
    out.innerHTML = "✖ <b>System Error</b>";
  }
}
