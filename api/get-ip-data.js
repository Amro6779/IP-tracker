export default async function handler(request, response) {
  let ip = request.query.ip;

  let apiUrl = !ip
    ? `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.API_KEY}`
    : `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.API_KEY}&ipAddress=${ip}`;

  try {
    let ipResponse = await fetch(apiUrl);
    let data = await ipResponse.json();
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Something went wrong" });
  }
}