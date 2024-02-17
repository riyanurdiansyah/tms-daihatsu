import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import axios, { CancelTokenSource } from "axios";
import useIntersectionObserver from "./useIntersectionObserver";
import useToken from "./useToken";
const api_backend = process.env.NEXT_PUBLIC_APP_API_BACKEND;

export function useFetchUmum<T = any>(
  //   jenisApi: any,
  link: string | null,
  refKomponen?: MutableRefObject<any>,
  denganToken = false
): any {
  // const dalamLayar = useCekDalamLayar(refKomponen);
  const dalamLayar = useIntersectionObserver(refKomponen!, {});
  const [dataJSON, setDataJSON] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [token] = useToken();
  const [error, setEror] = useState({
    error: false,
    message: "",
    responseCode: -1,
    data: null,
  });

  const reqSedangGetSebelumnya = useRef<CancelTokenSource | null>(null);
  const linkSebelumnya = useRef<string | null>(null);

  useEffect(() => {
    const apiTerpilih = api_backend;
    const benarDalamLayar = refKomponen === undefined || dalamLayar;
    const linkKosong = link === null || link === undefined;
    const linkTidakSama = linkSebelumnya.current !== link;

    const dataKosong = linkTidakSama || dataJSON === null;
    if (!benarDalamLayar || linkKosong || !dataKosong) return;
    const reqMicroservices = axios.CancelToken.source();

    reqSedangGetSebelumnya.current?.cancel();
    let cancelFetch = false;
    const fetch = async () => {
      setLoading(true);
      reqSedangGetSebelumnya.current = reqMicroservices;

      const hasilFetch = await fetchUmum(
        apiTerpilih,
        link,
        denganToken,
        token,
        reqMicroservices
      );
      if (cancelFetch) {
        return;
      }
      if (hasilFetch.success && hasilFetch.data) {
        setDataJSON(hasilFetch.data);
        setLoading(false);
      } else {
        setEror({
          error: true,
          message: hasilFetch.message,
          data: hasilFetch.data,
          responseCode: hasilFetch.responseCode,
        });
        setDataJSON(null);
      }
      linkSebelumnya.current = link;
      setLoading(false);
    };
    fetch();
    return () => {
      reqMicroservices.cancel();
      cancelFetch = true;
    };
  }, [link, dalamLayar, token]);

  return [dataJSON, loading, error];
}

export const fetchUmum = async (
  apiTerpilih: string | undefined,
  link: string,
  denganToken: boolean,
  token: string | null,
  reqCancelToken: any
) => {
  try {
    const response = await axios.get(`${apiTerpilih}${link}`, {
      headers:
        denganToken && token
          ? {
              Authorization: token,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            }
          : {},
      cancelToken: reqCancelToken.token,
    });
    return {
      success: true,
      message: response?.data?.data?.message || "Error tidak diketahui",
      data: response.data,
      responseCode: response.status,
    };
  } catch (e) {
    return {
      success: false,
      message: "Error tidak diketahui",
      data: null,
      responseCode: 400,
    };
  }
};

export function useFetchTrigger<T = any>(
  // jenisApi: TJenisAPI,
  link: string | null,
  denganToken = false
): any {
  const [loading, setLoading] = useState(true);
  const [token] = useToken();
  const [error, setEror] = useState({
    error: false,
    responseCode: -1,
    data: null,
    message: "",
  });

  const cancelTokenSebelumnya = useRef<CancelTokenSource | null>(null);
  const linkSebelumnya = useRef<string | null>(null);
  let cancelFetch = false;
  const cancelToken = axios.CancelToken.source();

  const fetch = async () => {
    const apiTerpilih = api_backend;
    const linkKosong = link === null || link === undefined;
    if (linkKosong) return null;

    cancelTokenSebelumnya.current?.cancel();
    const fetchData = async () => {
      setLoading(true);
      cancelTokenSebelumnya.current = cancelToken;

      const hasilFetch = await fetchUmum(
        apiTerpilih,
        link,
        denganToken,
        token,
        cancelToken
      );
      if (cancelFetch) {
        setLoading(false);
        return null;
      }
      if (hasilFetch.success && hasilFetch.data) {
        return hasilFetch.data as T;
      }
      setEror({
        error: true,
        data: hasilFetch.data,
        responseCode: hasilFetch.responseCode,
        message: "",
      });
      linkSebelumnya.current = link;
      setLoading(false);
      return null;
    };
    const hasilFetch = await fetchData();
    return hasilFetch;
  };

  return [fetch, loading, error];
}

export function usePostUmum<T = any>(
  // jenisApi: any,
  link: string | null,
  denganToken = true
): any {
  const [loading, setLoading] = useState(true);
  const [token] = useToken();

  const cancelTokenSebelumnya = useRef<CancelTokenSource | null>(null);
  const cancelToken = useRef(axios.CancelToken.source());

  const linkSebelumnya = useRef<string | null>(null);

  const post = useCallback(
    async (dataPost: any) => {
      const batalkan = {
        success: false,
        message: "link kosong",
        data: null,
        postedData: dataPost,
        responseCode: 499,
      } as any;
      const apiTerpilih = api_backend;
      const linkKosong = link === null || link === undefined;
      if (linkKosong) return batalkan;
      setLoading(true);
      cancelTokenSebelumnya.current?.cancel();
      cancelTokenSebelumnya.current = cancelToken.current;
      cancelToken.current = axios.CancelToken.source();
      const hasilFetch = await postUmum(
        apiTerpilih,
        dataPost,
        link,
        denganToken,
        token,
        cancelToken.current
      );
      linkSebelumnya.current = link;
      setLoading(false);
      return hasilFetch.data;
    },
    [link, token]
  );

  return [post, loading, cancelToken.current];
}

export const postUmum = async (
  apiTerpilih: string | undefined,
  postedData: any,
  link: string,
  denganToken: boolean,
  token: string | null,
  reqCancelToken: any
) => {
  try {
    const response = await axios.post(`${apiTerpilih}${link}`, postedData, {
      headers:
        denganToken && token
          ? {
              Authorization: token,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            }
          : {},
      cancelToken: reqCancelToken.token,
    });
    return {
      success: true,
      message: null,
      data: response.data,
      postedData: postedData,
      responseCode: response.status,
    };
  } catch (e) {
    return {
      success: false,
      message: JSON.stringify(e),
      data: null,
      postedData: postedData,
      responseCode: 400,
    };
  }
};
