import { Button, Card, Grid, Row, Text } from '@nextui-org/react';
import { NextPage, GetStaticProps } from 'next';
import { pokeApi } from '../api';
import { Layout } from '../components/layouts';
import { PokemonCard } from '../components/pokemon';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Props {
    pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

    console.log('pokemons', pokemons);

    return (
        <Layout title='Listado de Pokemons'>
            <Grid.Container gap={ 2 } justify='flex-start'>
                {
                    pokemons.map( pokemon => (
                        <PokemonCard
                            pokemon={ pokemon }
                            key={ pokemon.id }
                        />
                    ))
                }
            </Grid.Container>
        </Layout>
    )
}

// solo se ejecuta en el lado del servidor y en tiempo de construccion

export const getStaticProps: GetStaticProps = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon/?limit=151');

    const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => ({
        ...pokemon,
        id: index + 1,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ index + 1 }.svg`
    }));

    // pokemons.map((pokemon, index) => {
    //     pokemon.id = index + 1,
    //     pokemon.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ index + 1 }.svg`
    // });

    // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg

    return {
        props: {
            pokemons
        }
    }
}

export default HomePage;
