export type Movie = {
    id: string;
    title: string;
    genre: string;
    year: number;
    rating: number;
    poster: string;
    isShowing: boolean;
  };
  
  export type MovieCardProps = {
    movie: Movie;
    layout?: 'row' | 'tile';
    onSelect: (id: string) => void;
  };


  