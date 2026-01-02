function renderAligned(data) {
  let html = "";

  // If array → take first record
  if (Array.isArray(data)) {
    data = data[0];
  }

  // If still not an object, show raw
  if (typeof data !== "object" || data === null) {
    return `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  }

  for (const key in data) {
    let value = data[key];

    // Convert objects/arrays to readable text
    if (typeof value === "object") {
      value = JSON.stringify(value, null, 2);
    }

    html += `
      <div class="row">
        <div class="label">🔹 ${key}</div>
        <div class="value">${value}</div>
      </div>
    `;
  }

  return html || "<b>No readable data found</b>";
}

async function lookup() {
  const num = document.getElementById("num").value.trim();
  const out = document.getElementById("output");

  if (!num) {
    out.innerHTML = "⚠ Number required";
    return;
  }

  out.innerHTML = "⌛ Fetching & aligning data…";

  try {
    const res = await fetch(`/api/lookup?num=${num}`);
    const text = await res.text();

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      out.innerHTML = `<pre>${text}</pre>`;
      return;
    }

    // Normalize common wrappers
    let record = json;
    if (json.data) record = json.data;
    if (json.result) record = json.result;

    out.innerHTML = renderAligned(record);

  } catch (e) {
    out.innerHTML = "✖ System error";
  }
}
