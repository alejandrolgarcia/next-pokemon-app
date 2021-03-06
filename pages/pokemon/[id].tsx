import { useEffect, useState } from 'react';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti';
import { Heart, TickSquare } from 'react-iconly';

import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces';
import { getPokemonData, localFavorites } from '../../utils';

interface Props {
    pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

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

// You should use getStaticPaths if you???re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pokemon151 = [...Array(151)].map( (value, index) => `${ index + 1 }` );

    return {
        paths: pokemon151.map( id => ({
            params: { id }
        })),
        // fallback: false
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string };

    const pokemon = await getPokemonData( id );

    if(!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            pokemon
        },
        revalidate: 86400, // 60 * 60 * 24 tiempo en segundos para revalidar la informacion de cada pagina!
    }
}

export default PokemonPage;
