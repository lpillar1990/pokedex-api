import Layout from "../components/Layout";
import { useState } from "react";
import Pokemon from "../components/Pokemon";
import Image from "next/image";

export default function Home({ initialPokemon }) {
  const [pokemon, setPokemon] = useState(initialPokemon);
  const [offset, setOffet] = useState(0);

  const fetchPokemon = async (url, next) => {
    const response = await fetch(url);
    const nextPokemon = await response.json();

    setOffet(next ? offset + 20 : offset - 20);
    setPokemon(nextPokemon);
  };

  return (
    <Layout title={"Pokédex"}>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemon.results.map((monster, index) => (
          <Pokemon key={index} pokemon={monster} index={index + offset} />
        ))}
      </div>
      <div className="flex justify-center gap-5 mt-10">
        <button
          disabled={!pokemon.previous}
          className="px-3 py-1 text-gray-200 rounded-full disabled:bg-gray-500 bg-slate-900"
          onClick={() => fetchPokemon(pokemon.previous, false)}
        >
          prev
        </button>
        <button
          disabled={!pokemon.next}
          className="px-3 py-1 text-white rounded-full disabled:bg-gray-500 bg-slate-900"
          onClick={() => fetchPokemon(pokemon.next, true)}
        >
          next
        </button>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const initialPokemon = await response.json();

  return {
    props: {
      initialPokemon,
    },
  };
}
