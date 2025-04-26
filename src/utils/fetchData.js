export async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
