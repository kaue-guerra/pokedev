import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface PokedexProps {

}

interface PokemonListInterface{
  name: string;
  url: string;
}


export const Pokedex: React.FC<PokedexProps> = () => {
  
  const [pokemons, setPokemons] = useState<PokemonListInterface[]>([]);
  const [selectedPokemon, setselectedPokemon] = useState<PokemonListInterface | undefined>(undefined)
  const [selectedPokemonDetails, setselectedPokemonDetails] = useState<any | undefined>(undefined)

  useEffect(()=> {
    axios.get('https://pokeapi.co/api/v2/pokemon').then((response)=> setPokemons(response.data.results))
  },[]);

  useEffect(()=> {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon?.name}`).then((response)=> setselectedPokemonDetails(response.data))
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