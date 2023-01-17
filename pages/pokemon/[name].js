import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Image from "next/image";
import { useRouter } from "next/router";

const Pokemon = ({ pokemon }) => {
  const [count] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const router = useRouter();
  const pokeIndex = ("000" + pokemon.id).slice(-3);
  const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  console.log(pokemon);

  const renderTypes = () =>
    pokemon.types.map((type) => (
      <li key={type.slot} className="px-2 py-1 rounded bg-slate-700">
        {type.type.name}
      </li>
    ));

  const renderStats = () =>
    pokemon.stats.map((stat, index) => (
      <div key={index} className="p-1 my-2 rounded bg-slate-700">
        <div
          className="px-2 rounded bg-slate-700"
          style={{ width: `${stat.base_stat}%` }}
        >
          {stat.stat.name}: {stat.base_stat}
        </div>
      </div>
    ));
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <Layout title={pokeName}>
      <div className="flex flex-col items-center justify-center">
        <span className="text-[90px] font-bold text-slate-600">
          #{pokeIndex}
        </span>
        <Image
          alt={pokemon.name}
          width={200}
          height={200}
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`}
        />
      </div>

      <div className="p-6 text-white rounded backdrop-blur-lg">
        <ul className="flex gap-5">{renderTypes()}</ul>

        <div className="backdrop-blur-lg">{renderStats()}</div>
      </div>
      <div>
        <div className="flex justify-center">
          <button
            className="px-4 py-2 my-2 font-bold text-white rounded-full bg-slate-700 hover:bg-slate-600"
            type="button"
            onClick={() => router.back()}
          >
            Back
          </button>
          <div className="flex px-4 py-2 mx-2 my-2 font-bold text-white rounded-full bg-slate-700 hover:bg-slate-600">
            <button type="button" onClick={() => setLikes(likes + 1)}>
              Like
            </button>
          </div>
          <div className="flex px-4 py-2 mx-2 my-2 font-bold text-white rounded-full bg-slate-700 hover:bg-slate-600">
            <button type="button" onClick={() => setDislikes(dislikes + 1)}>
              Dislike
            </button>
          </div>
        </div>
        <p className="flex justify-center py-2">Liked {likes} times</p>
        <p className="flex justify-center">Disliked {dislikes} times</p>
      </div>
    </Layout>
  );
};

export default Pokemon;

export async function getServerSideProps(context) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${context.query.name}`
  );
  const pokemon = await response.json();

  return {
    props: {
      pokemon,
    },
  };
}
