function pick(obj, keys) {
  for (const k of keys) {
    if (obj[k] && obj[k].toString().trim() !== "") {
      return obj[k];
    }
  }
  return "N/A";
}

async function lookup() {
  const num = document.getElementById("num").value.trim();
  const out = document.getElementById("output");

  if (!num) {
    out.innerHTML = "⚠ Number required";
    return;
  }

  out.innerHTML = "⌛ Scanning databases…";

  try {
    const res = await fetch(`/api/lookup?num=${num}`);
    const raw = await res.text();

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      out.innerHTML = `<pre>${raw}</pre>`;
      return;
    }

    const d = data.data || data;

    const name = pick(d, ["name", "Name", "full_name", "customer_name"]);
    const father = pick(d, ["father", "father_name", "Father_Name", "spouse"]);
    const mobile = pick(d, ["mobile", "mobile_no", "Mobile", "Mobile_No"]) || num;
    const altMobile = pick(d, ["alt_mobile", "alternate_mobile", "Alt_Mobile"]);
    const circle = pick(d, ["circle", "telecom_circle", "Circle"]);
    const id = pick(d, ["id", "ID", "aadhaar", "aadhar", "ID_Number"]);
    const address = pick(d, ["address", "Address", "full_address"]);
    const email = pick(d, ["email", "Email"]);

    out.innerHTML = `
      <div class="row"><div class="label">👤 Name</div><div class="value">${name}</div></div>
      <div class="row"><div class="label">🧔 Father/Spouse</div><div class="value">${father}</div></div>
      <div class="row"><div class="label">📞 Mobile</div><div class="value">${mobile}</div></div>
      <div class="row"><div class="label">📲 Alt Mobile</div><div class="value">${altMobile}</div></div>
      <div class="row"><div class="label">📍 Circle</div><div class="value">${circle}</div></div>
      <div class="row"><div class="label">🆔 ID</div><div class="value">${id}</div></div>
      <div class="row"><div class="label">🏠 Address</div><div class="value">${address}</div></div>
      <div class="row"><div class="label">✉️ Email</div><div class="value">${email}</div></div>
    `;

  } catch (e) {
    out.innerHTML = "✖ System error";
  }
}
