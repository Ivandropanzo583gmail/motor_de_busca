"use client";
import { useState } from "react";
import axios from "axios";

export default function SearchEngine() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResults([]);

    try {
      const response = await axios.get("https://api.duckduckgo.com/", {
        params: {
          q: query,
          format: "json",
        },
      });
      setResults(response.data.RelatedTopics || []);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🔍 Mini Motor de Pesquisa</h1>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite sua busca..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all"
        >
          Buscar
        </button>
      </form>
      {loading && <p className="mt-4 text-gray-600">Carregando...</p>}
      <ul className="mt-6 text-left space-y-4">
        {results.map((item: any, index) => (
          <li key={index} className="border-b pb-2">
            <a
              href={item.FirstURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium block"
            >
              {item.Text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}