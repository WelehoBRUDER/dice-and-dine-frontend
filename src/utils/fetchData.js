export async function fetchData(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
