import { FC, useState } from 'react';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { Heart, TickSquare } from 'react-iconly';

import confetti from 'canvas-confetti';

import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { getPokemonData, localFavorites } from '../../utils';

interface Props {
    pokemon: Pokemon;
}

const PokemonByNamePage: FC<Props> = ({ pokemon }) => {

    const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites(pokemon.id) );
    
    const onToggleFavorite = () => {
        localFavorites.toogleFavorites( pokemon.id );
        setIsInFavorites(!isInFavorites);

        if(isInFavorites) return;

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0
            }
        })
    }

    return (
        <Layout title={ pokemon.name }>

            <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
                <Grid xs={ 12 } sm={ 4 }>
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                                alt={ pokemon.name }
                                width="100%"
                                height={ 200 }
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={ 12 } sm={ 8 }>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h2 transform='capitalize'>{ pokemon.name }</Text>
                            {/* <Button
                                color="gradient"
                                ghost={ !isInFavorites }
                                onClick={ onToggleFavorite }
                            >
                                { isInFavorites ? 'En mis favoritos' : 'Agregar a favoritos' }
                            </Button> */}
                            <Button
                                auto color="error"
                                icon={
                                    isInFavorites 
                                    ? <TickSquare set="bold" primaryColor="white"/>
                                    : <Heart primaryColor="white" filled />
                                }
                                onClick={ onToggleFavorite }
                            />
                        </Card.Header>
                        <Card.Body>
                            <Text size={ 30 }>Sprites:</Text>
                            <Container direction='row' display='flex' gap={ 0 }>
                                <Image
                                    src={ pokemon.sprites.front_default }
                                    alt={ pokemon.name }
                                    height={ 100 }
                                    width={ 100 }
                                />

                                <Image
                                    src={ pokemon.sprites.back_default }
                                    alt={ pokemon.name }
                                    height={ 100 }
                                    width={ 100 }
                                />

                                <Image
                                    src={ pokemon.sprites.front_shiny }
                                    alt={ pokemon.name }
                                    height={ 100 }
                                    width={ 100 }
                                />

                                <Image
                                    src={ pokemon.sprites.back_shiny }
                                    alt={ pokemon.name }
                                    height={ 100 }
                                    width={ 100 }
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
            
        </Layout>
    )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon/?limit=151');

    const pokemonName151: string[] = data.results.map( pokemon => pokemon.name );

    return {
        paths: pokemonName151.map( name => ({
            params: { name }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string };

    return {
        props: {
            pokemon: await getPokemonData( name )
        }
    }
}

export default PokemonByNamePage;
