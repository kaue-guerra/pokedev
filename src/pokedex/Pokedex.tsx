import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PokemonDetail } from '../pokemon/interfaces/PokemonDetail';
import { getPokemonsDetails } from '../pokemon/services/getPokemonsDetails';
import { listPokemons, PokemonListInterface } from '../pokemon/services/listPokemons';

interface PokedexProps {

}

export const Pokedex: React.FC<PokedexProps> = () => {
  
  const [pokemons, setPokemons] = useState<PokemonListInterface[]>([]);
  const [selectedPokemon, setselectedPokemon] = useState<PokemonListInterface | undefined>(undefined);
  const [selectedPokemonDetails, setselectedPokemonDetails] = useState<PokemonDetail | undefined>(undefined);

  useEffect(()=> {
    listPokemons().then((response)=> setPokemons(response.results))
  },[]);

  useEffect(()=> {

    if(!selectedPokemon) return;

    getPokemonsDetails(selectedPokemon.name).then((response)=> setselectedPokemonDetails(response))
  },[selectedPokemon]);

  return(
    <div>
      <h1>Pokedex</h1>

      Pokemons:
      {pokemons.map((pokemon)=> <button onClick={()=> setselectedPokemon(pokemon)}>{pokemon.name}</button>)}

      <h2>Pokemon Selecionado: {selectedPokemon?.name || "Nenhum pokemon selecionado."}</h2>
      {JSON.stringify(selectedPokemonDetails, undefined, 2)}
    </div>
  )
} 