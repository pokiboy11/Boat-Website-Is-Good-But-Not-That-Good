async function lookup() {
  const num = document.getElementById("num").value.trim();
  const out = document.getElementById("output");

  if (!num) {
    out.innerHTML = "⚠ Number required";
    return;
  }

  out.innerHTML = "⌛ Scanning databases…";

  try {
    const res = await fetch(
      `https://osintx.site/api/api.php?key=Mayank&num=${num}`
    );

    const data = await res.json(); // API DOES RETURN JSON

    // Some APIs wrap data inside "data"
    const d = data.data ? data.data : data;

    out.innerHTML = `
      <div class="row"><div class="label">👤 Name</div><div class="value">${d.name || "N/A"}</div></div>
      <div class="row"><div class="label">🧔 Father/Spouse</div><div class="value">${d.father || d.spouse || "N/A"}</div></div>
      <div class="row"><div class="label">📞 Mobile</div><div class="value">${d.mobile || num}</div></div>
      <div class="row"><div class="label">📲 Alt Mobile</div><div class="value">${d.alt_mobile || "N/A"}</div></div>
      <div class="row"><div class="label">📍 Circle</div><div class="value">${d.circle || "N/A"}</div></div>
      <div class="row"><div class="label">🆔 ID</div><div class="value">${d.id || "N/A"}</div></div>
      <div class="row"><div class="label">🏠 Address</div><div class="value">${d.address || "N/A"}</div></div>
      <div class="row"><div class="label">✉️ Email</div><div class="value">${d.email || "N/A"}</div></div>
    `;

  } catch (e) {
    out.innerHTML = "✖ Error fetching data";
  }
}
