import { useEffect, useState } from "react";
import api from "../apis/axiosInstance";

const useCustomFetch = (url) => {
    const [data, setData] = useState([]); // 필요에 따라 {}로 초기값 설정 가능
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(url); // api.get(url)로 변경
                console.log(response.data, 'API 응답 데이터'); // API 응답 데이터 확인
                setData(response.data.results || []);
            } catch (error) {
                console.error('데이터 가져오기 실패:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, isLoading, isError };
};

export default useCustomFetch;
