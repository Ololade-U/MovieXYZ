import type { Genre } from "@/hooks/useGenre";
import { create } from "zustand";

interface MovieQuery {
  selectedGenre?: Genre | null;
  searchParam?: string | undefined;
  page?: number;
  selectedType?: string;
  isClicked?: boolean;
}

interface MovieQueryStore {
  MovieQuery: MovieQuery;
  setSelectedGenre: (Genre: Genre | null) => void;
  setSearchParam: (
    searchParam: string,
    selectedType: string | undefined
  ) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  resetPage: () => void;
  setSelectedType: (selectedType: string) => void;
  handleClick: () => void;
  resetClicked: () => void;
}

const useMovieQueryStore = create<MovieQueryStore>((set) => ({
  MovieQuery: { selectedType: "Movie", page: 1, isClicked: false },
  setSelectedGenre: (selectedGenre) =>
    set((store) => ({
      MovieQuery: { ...store.MovieQuery, selectedGenre, page: 1 },
    })),
  setSearchParam: (searchParam, selectedType) =>
    set(() => ({ MovieQuery: { searchParam, selectedType: selectedType } })),
  onNextPage: () =>
    set((store) => ({
      MovieQuery: {
        ...store.MovieQuery,
        page: store.MovieQuery.page && store.MovieQuery.page + 1,
      },
    })),
  onPrevPage: () =>
    set((store) => ({
      MovieQuery: {
        ...store.MovieQuery,
        page:
          store.MovieQuery.page && store.MovieQuery.page > 1
            ? store.MovieQuery.page - 1
            : store.MovieQuery.page,
      },
    })),
  resetPage: () =>
    set((store) => ({ MovieQuery: { ...store.MovieQuery, page: 1 } })),
  setSelectedType: (selectedType) =>
    set(() => ({ MovieQuery: { selectedType } })),
  handleClick: () =>
    set((store) => ({
      MovieQuery: {
        ...store.MovieQuery,
        isClicked: store.MovieQuery.isClicked == false ? true : false,
      },
    })),
  resetClicked: () =>
    set((store) => ({ MovieQuery: { ...store.MovieQuery, isClicked: false } })),
}));

export default useMovieQueryStore;
