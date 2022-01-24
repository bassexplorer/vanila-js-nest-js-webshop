export default async function fetchHtmlFile(fetchUrl) {
  const response = await fetch(fetchUrl);
  return await response.text();
}
