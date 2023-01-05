import axios from "axios";
import { PokemonDetail } from "../interfaces/PokemonDetail"


export async function getPokemonsDetails(name: string): Promise<PokemonDetail>{

  const url = `${import.meta.env.VITE_POKEAPI}/pokemon/${name}`;

  const response = await axios.get<PokemonDetail>(url);
  
  return response.data; 
}