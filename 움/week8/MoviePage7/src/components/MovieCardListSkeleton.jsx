import MovieCardSkeleton from "./MovieCardSkeleton"

const MovieCardListSkeleton = ({number}) => {
    return (
        new Array(number).fill(0).map((_, index) => (
            <MovieCardSkeleton key={index} />
        ))
    );
};

export default MovieCardListSkeleton;