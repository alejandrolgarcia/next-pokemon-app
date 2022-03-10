import { FC } from 'react';
import Head from 'next/head';
import { Navbar } from '../ui/Navbar';

interface Props {
  title?: string; 
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
      <>
        <Head>
          <title>{ title || 'Pokemon App' }</title>
          <meta name="author" content="Wicho García" />
          <meta name="description" content="Información sobre el pokemon xxxx" />
          <meta name="keywords" content="xxx, pokemon, pokedex" />
        </Head>

        <Navbar />

        <main style={{
          padding: '0px 20px'
        }}>
          { children }
        </main>

      </>
  )
}
