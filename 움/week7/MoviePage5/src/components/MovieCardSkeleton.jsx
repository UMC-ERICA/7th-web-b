import * as S from './MovieCardSkeleton.style.js'

const MovieCardSkeleton = () => {
    return (
        <S.Container>
            <S.CardMain />
            <S.TextWrapper>
                <S.TitleBox />
                <S.DescriptionBox />
            </S.TextWrapper>
        </S.Container>
    );
};

export default MovieCardSkeleton;