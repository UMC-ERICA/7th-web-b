import MovieCardSkeleton from "./MovieCardSkeleton"

const MovieCardListSkeleton = ({number}) => {
    return (
        new Array(number).fill(0).map((_, ) => <MovieCardSkeleton />)
    );
};

export default MovieCardListSkeleton;