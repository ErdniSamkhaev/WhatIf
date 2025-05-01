// src/api/history.js
export async function generateScenario(query) {
  const response = await fetch("http://localhost:3000/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) throw new Error("Ошибка при генерации сценария");
  return await response.json();
}
