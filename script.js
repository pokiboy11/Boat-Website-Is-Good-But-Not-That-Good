async function lookup() {
  const num = document.getElementById("num").value.trim();
  const out = document.getElementById("output");

  if (!num) {
    out.innerHTML = "⚠ Number required";
    return;
  }

  out.innerHTML = "⌛ Fetching RAW API response…";

  try {
    const res = await fetch(`/api/lookup?num=${num}`);
    const text = await res.text();

    // 🔥 SHOW EXACT RESPONSE (NO PARSING)
    out.innerHTML = `
      <b>RAW API RESPONSE:</b><br><br>
      <pre style="white-space:pre-wrap">${text}</pre>
    `;
  } catch (e) {
    out.innerHTML = "✖ Fetch failed";
  }
}
