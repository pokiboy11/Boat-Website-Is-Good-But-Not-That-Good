function pick(obj, keys) {
  if (!obj) return "N/A";
  for (const k of keys) {
    if (obj[k] !== undefined && obj[k] !== null && String(obj[k]).trim() !== "") {
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

    // 🔥 NORMALIZE RESPONSE
    let record = null;

    if (Array.isArray(data)) {
      record = data[0];
    } else if (Array.isArray(data.data)) {
      record = data.data[0];
    } else if (data.data && typeof data.data === "object") {
      record = data.data;
    } else if (data.result) {
      record = data.result;
    } else {
      record = data;
    }

    // 🔥 MAP FIELDS
    const name = pick(record, ["name", "Name", "full_name"]);
    const father = pick(record, ["father", "father_name", "Father", "Father_Name", "spouse"]);
    const mobile = pick(record, ["mobile", "Mobile", "mobile_no", "Mobile_No", "number"]) || num;
    const altMobile = pick(record, ["alt_mobile", "alternate_mobile", "Alt_Mobile"]);
    const circle = pick(record, ["circle", "Circle", "telecom_circle"]);
    const id = pick(record, ["id", "ID", "ID_Number", "aadhaar", "aadhar"]);
    const address = pick(record, ["address", "Address", "full_address"]);
    const email = pick(record, ["email", "Email"]);

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
