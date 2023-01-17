import Head from "next/head";
export default function Home({ children, title }) {
  return (
    <div className="bg-gradient-to-l from-[#0971a5] via-[#d027c2] to-[#71e66d]">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container max-w-xl min-h-screen mx-auto pt-7">
        {children}
      </main>
    </div>
  );
}
