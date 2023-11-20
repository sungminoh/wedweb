import { useEffect, useState } from "react";


export const useIsBride = () => {
  const [isBride, setIsBride] = useState<boolean>(false);
  useEffect(() => {
    console.log('useIsBride useEffect')
    if (typeof window === "undefined") return;

    if (window.location.hostname.match(/heejae/)
      && !window.location.hostname.match(/sungmin/)) {
      setIsBride(true)
    }

  }, [])
  return isBride;
}