import { useCallback, useEffect, useRef, useState } from "react";

type UseSSEProps = {
  url: string | URL;
};

const useSSE = (props: UseSSEProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const eventSourceRef = useRef<EventSource>(null);

  /**
   * SSE接続を開始する関数
   * @returns
   * @description SSE接続を開始する関数を返します
   */
  const connect = useCallback(() => {
    // データを初期化
    setData([]);
    setError(null);

    // 既存の接続をクリーンアップ
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // EventSourceオブジェクトを作成
    const eventSource = new EventSource(props.url);
    eventSourceRef.current = eventSource;

    // 接続が開いたとき
    eventSource.onopen = () => {
      setIsConnected(true);
    };

    // カスタムイベントを受信したとき
    eventSource.addEventListener("custom", (event) => {
      setData((prev) => [...prev, `${event.lastEventId}: ${event.data}`]);
    });

    // メッセージを受信したとき
    eventSource.onmessage = (event) => {
      console.log("Message received:", event.data);
    };

    // エラーが発生したとき
    eventSource.onerror = (_event) => {
      const error = new Error("SSE Error occurred");
      console.error("SSE Error occurred:", error);
      setError(error);
    };
  }, [props.url]);

  /**
   * SSE接続を切断する関数
   * @returns
   * @description SSE接続を切断する関数を返します
   */
  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    setIsConnected(false);
  }, []);

  // アンマウント時のクリーンアップ
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      setIsConnected(false);
    };
  }, []);

  return {
    isConnected,
    data,
    error,
    connect,
    disconnect,
  };
};
export default useSSE;
