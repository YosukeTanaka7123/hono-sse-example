import { useCallback, useEffect, useRef, useState } from "react";

type UseReadableStreamProps = {
  input: RequestInfo | URL;
};

const useReadableStream = (props: UseReadableStreamProps) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const decoder = useRef(new TextDecoder("utf-8"));

  const [data, setData] = useState<string>("");

  /**
   * ストリーミングを開始する関数
   * @returns
   * @description ストリーミングを開始し、データを取得します
   */
  const startStream = useCallback(async () => {
    // データを初期化
    setData("");
    setError(null);

    // AbortControllerを作成
    const abortController = new AbortController();
    const { signal } = abortController;
    abortControllerRef.current = abortController;

    // ストリーミングを開始
    setIsStreaming(true);
    try {
      const res = await fetch(props.input, { signal });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) {
        throw new Error("No reader available");
      }

      //　ストリームを読み取り、デコードしてデータに保存する
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          // 残りのバッファをフラッシュ
          const finalText = decoder.current.decode();
          if (finalText) {
            setData((prev) => prev + finalText);
          }
          break;
        }

        const text = decoder.current.decode(value, { stream: true });
        setData((prev) => prev + text);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("Unknown error"));
      }
    } finally {
      setIsStreaming(false);
    }
  }, [props.input]);

  /**
   * ストリームを中止する関数
   * @returns
   * @description ストリームを中止します
   */
  const abortStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  /**
   * ストリームデータをリセットする関数
   * @returns
   * @description ストリームデータをリセットします
   */
  const resetData = useCallback(() => {
    setData("");
    setError(null);
  }, []);

  // アンマウント時のクリーンアップ
  useEffect(() => {
    return () => {
      // コンポーネントのアンマウント時にストリーミングを中止
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { isStreaming, data, error, startStream, abortStream, resetData };
};

export default useReadableStream;
