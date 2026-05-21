 "use client";

import { useState } from "react";

export default function Home() {
  const [fromZip, setFromZip] = useState("");
  const [toZip, setToZip] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [shippingType, setShippingType] =
    useState("standard");

  const [results, setResults] = useState<
    {
      courier: string;
      price: string;
      delivery: string;
      link: string;
    }[]
  >([]);

  const handleSearch = () => {
    const volume =
      Number(length) *
      Number(width) *
      Number(height);

    const baseWeight = Number(weight) * 0.8;

    const volumePrice = volume / 5000;

    const expressExtra =
      shippingType === "express" ? 5 : 0;

    const fakeResults = [
      {
        courier: "GLS",
        priceNumber:
          5 +
          baseWeight +
          volumePrice +
          expressExtra,
        delivery:
          shippingType === "express"
            ? "24h"
            : "48h",
        link: "https://www.gls-italy.com",
      },

      {
        courier: "BRT",
        priceNumber:
          6 +
          baseWeight +
          volumePrice +
          expressExtra,
        delivery:
          shippingType === "express"
            ? "24h"
            : "72h",
        link: "https://www.brt.it",
      },

      {
        courier: "DHL",
        priceNumber:
          7 +
          baseWeight +
          volumePrice +
          expressExtra,
        delivery:
          shippingType === "express"
            ? "12h"
            : "48h",
        link: "https://www.dhl.com/it-it/home.html",
      },
    ];

    const sortedResults = fakeResults
      .sort(
        (a, b) =>
          a.priceNumber - b.priceNumber
      )
      .map((item) => ({
        courier: item.courier,
        price:
          "€" + item.priceNumber.toFixed(2),
        delivery: item.delivery,
        link: item.link,
      }));

    setResults(sortedResults);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Spedingo
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="CAP mittente"
            value={fromZip}
            onChange={(e) =>
              setFromZip(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="CAP destinatario"
            value={toZip}
            onChange={(e) =>
              setToZip(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Peso (kg)"
            value={weight}
            onChange={(e) =>
              setWeight(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <div className="grid grid-cols-3 gap-3">
            <input
              type="number"
              placeholder="Lunghezza"
              value={length}
              onChange={(e) =>
                setLength(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Larghezza"
              value={width}
              onChange={(e) =>
                setWidth(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Altezza"
              value={height}
              onChange={(e) =>
                setHeight(e.target.value)
              }
              className="border p-3 rounded-lg"
            />
          </div>

          <select
            value={shippingType}
            onChange={(e) =>
              setShippingType(e.target.value)
            }
            className="border p-3 rounded-lg"
          >
            <option value="standard">
              Standard
            </option>

            <option value="express">
              Express
            </option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-black text-white p-3 rounded-lg hover:opacity-80"
          >
            Cerca spedizione
          </button>
        </div>

        {results.length > 0 && (
          <div className="mt-8 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">
              Risultati spedizione
            </h2>

            {results.map((result, index) => (
              <div
                key={index}
                className="border rounded-2xl p-5 flex items-center justify-between bg-white shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold">
                    {result.courier.charAt(0)}
                  </div>

                  <div>
                    <p className="font-bold text-lg">
                      {result.courier}
                    </p>

                    <p className="text-sm text-gray-500">
                      Consegna {result.delivery}
                    </p>

                    {index === 0 && (
                      <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Miglior prezzo
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-2xl">
                    {result.price}
                  </p>

                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Vai al sito →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}