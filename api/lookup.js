export default async function handler(req, res) {
  const { num } = req.query;

  if (!num) {
    return res.status(400).json({ error: "Number required" });
  }

  try {
    const apiResponse = await fetch(
      `https://osintx.site/api/api.php?key=ULTRACOREX&num=${num}`
    );

    const text = await apiResponse.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(text);

  } catch (error) {
    res.status(500).json({ error: "Backend fetch failed" });
  }
}
