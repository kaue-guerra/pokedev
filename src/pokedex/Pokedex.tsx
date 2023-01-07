import { useEffect, useState } from 'react';
import { PokemonDetail } from '../pokemon/interfaces/PokemonDetail';
import { getPokemonsDetails } from '../pokemon/services/getPokemonsDetails';
import { listPokemons, PokemonListInterface } from '../pokemon/services/listPokemons';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';

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
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokedex
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

    <Container maxWidth="lg">
      <Box mt={2}>
      <Grid container spacing={2} >
        {pokemons.map((pokemon)=> (
        <Grid item xs={6} lg={3}>
          <Card variant="outlined">
            <CardActionArea>
              <CardContent onClick={()=> setselectedPokemon(pokemon)} >
                <Typography variant="h5" component="h2">
                  {pokemon.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        ))}
      </Grid>

        <h2>Pokemon Selecionado: {selectedPokemon?.name || "Nenhum pokemon selecionado."}</h2>
        {JSON.stringify(selectedPokemonDetails, undefined, 2)}
      </Box>
    </Container> 


     
    </div>
  )
} 