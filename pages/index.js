import { useRouter } from "next/router";
import Seo from "../components/Seo";

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(
      {
        pathname: `movies/${id}`,
        query: {
          title,
        },
      },
      `movies/${id}`
    );
  };

  return (
    <div>
      <Seo title="Home" />
      {results?.map((movie) => (
        <div
          key={movie.id}
          onClick={() => onClick(movie.id, movie.original_title)}
        >
          <div>
            <a>{movie.original_title}</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const { results } = await (
    await fetch("http://localhost:3000/api/movies")
  ).json();
  return {
    props: {
      results,
    },
  };
}
