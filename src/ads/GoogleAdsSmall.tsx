import React, { useEffect } from 'react'

export function GoogleAdsSmall () {
  useEffect(() => {
    // @ts-ignore
    if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
      // @ts-ignore
      window.adsbygoogle.push({})
    } else {
      console.log('開発中なのでAdSense表示しない')
    }
  }, [])

  return (
    <>
      {/* Google adsense advertisement */}
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
        data-ad-client="ca-pub-7646050836920456"
        data-ad-slot="6588052635"></ins>
    </>
  )
}
