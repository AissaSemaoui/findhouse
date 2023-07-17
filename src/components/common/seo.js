import Head from 'next/head'

const Seo = ({ pageTitle, font }) => (
  <>
    <Head key={Seo}>
      <title>
        {pageTitle && `${pageTitle} || Fiecare isi poate gasi casa ideala`}
      </title>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="keywords"
        content="advanced custom search, agentie, agent, agent imobiliar, business, chirie, comerciale, oficii, terenuri, apartamente, case, case pe pamant, google maps, idx agent, real estate, real estate agent, real estate agency, realtor"
      />
      <meta name="description" content="Fiecare isi poate gasi casa ideala." />
      <meta name="ibthemes" content="ATFN" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      {font && <link href={font} rel="stylesheet" />}
      <link rel="icon" href="favicon.ico" />
    </Head>
  </>
)

export default Seo
