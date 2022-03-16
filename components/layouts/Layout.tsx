import { FC } from 'react';
import Head from 'next/head';
import { Navbar } from '../ui/Navbar';

interface Props {
  title?: string; 
}

const origin = ( typeof window === 'undefined' ) ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {

    return (
        <>
            <Head>
            <title>{ title || 'Pokemon App' }</title>
            <meta name="author" content="Wicho García" />
            <meta name="description" content="Información sobre el pokemon xxxx" />
            <meta name="keywords" content="xxx, pokemon, pokedex" />

            <meta property="og:title" content={`Aprendamos algo sobre ${ title }`}/>
            <meta property="og:description" content={`Toda la información que necesitas acerca de ${ title }`}/>
            <meta property="og:image" content={ `${ origin }/img/banner.png` } />

        </Head>

            <Navbar />

            <main style={{
            padding: '0px 10px'
            }}>
            { children }
            </main>

        </>
    )
}
