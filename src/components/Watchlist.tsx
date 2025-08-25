import useMovies from "@/hooks/useMovies";
import { SimpleGrid } from "@chakra-ui/react";
import MovieCardSkeleton from "./MovieCardSkeleton";
import EmptyPage from "./EmptyPage";
import MovieCard from "./MovieCard";
import useMovieQueryStore from "./Store";

const Watchlist = () => {
  const Skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const bookmarked = useMovieQueryStore((s) => s.MovieQuery.bookmarked);

  const { data: movies, error, isLoading, isRefetching } = useMovies();
  const watchList = movies?.filter(movie => bookmarked?.includes(movie.id))
  console.log(watchList)

  return (
    <>
      {watchList?.length == 0 && <EmptyPage />}
      {error && <div>{error.message}</div> }
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xlTo2xl: 4 }}
        gap={"1rem"}
        p={{ mdDown: "0 2rem", smTo2xl: "0 0 2rem" }}
      >
        {isLoading
          ? Skeleton.map((skeleton) => <MovieCardSkeleton key={skeleton} />)
          : isRefetching
          ? Skeleton.map((skeleton) => <MovieCardSkeleton key={skeleton} />)
          : ""}
        { watchList?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </SimpleGrid>
    </>
  );
};

export default Watchlist;
