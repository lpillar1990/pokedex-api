import React from "react";
import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

const Pokemon = ({ pokemon, index }) => {
  const pokeIndex = ("000" + (index + 1)).slice(-3);

  return (
    <Tilt>
      <Link href={`/pokemon/${pokemon.name}`}>
        <div className="relative flex flex-col items-center justify-center p-6 rounded bg-slate-900">
          <span className="absolute top-0 text-xl font-bold text-slate-300 right-3">
            #{pokeIndex}
          </span>
          <Image
            alt={pokemon.name}
            width={150}
            height={150}
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`}
          />
          <span className="text-xs font-semibold uppercase text-amber-400">
            {pokemon.name}
          </span>
        </div>
      </Link>
    </Tilt>
  );
};

export default Pokemon;
