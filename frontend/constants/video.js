export const _handleFetchVideosAsync = async () => {
  let result = await fetch(
    "https://www.youtube.com/youtubei/v1/search?prettyPrint=false",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        "sec-ch-ua-arch": '"x86"',
        "sec-ch-ua-bitness": '"64"',
        "sec-ch-ua-full-version": '"120.0.6099.109"',
        "sec-ch-ua-full-version-list":
          '"Not_A Brand";v="8.0.0.0", "Chromium";v="120.0.6099.109", "Google Chrome";v="120.0.6099.109"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-model": '""',
        "sec-ch-ua-platform": '"Linux"',
        "sec-ch-ua-platform-version": '"6.5.0"',
        "sec-ch-ua-wow64": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "same-origin",
        "sec-fetch-site": "same-origin",
        "x-client-data":
          "CJC2yQEIo7bJAQipncoBCNiSywEIkqHLAQj8mM0BCIegzQEIu8jNAQjd7M0BCIPwzQEYp+rNAQ==",
        "x-goog-visitor-id": "CgszVzJRbEk3bF9NTSj79ISyBjIKCgJZRRIEGgAgRA%3D%3D",
        "x-youtube-bootstrap-logged-in": "false",
        "x-youtube-client-name": "1",
        "x-youtube-client-version": "2.20240509.00.00",
        cookie:
          "GPS=1; YSC=C7A4NADzG7Q; VISITOR_INFO1_LIVE=3W2QlI7l_MM; VISITOR_PRIVACY_METADATA=CgJZRRIEGgAgRA%3D%3D; PREF=f7=4000&f6=40000000&tz=Asia.Aden",
        Referer: "https://www.youtube.com/results?search_query=",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: '{"context":{"client":{"hl":"en","gl":"YE","remoteHost":"185.71.133.3","deviceMake":"","deviceModel":"","visitorData":"CgszVzJRbEk3bF9NTSj79ISyBjIKCgJZRRIEGgAgRA%3D%3D","userAgent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36,gzip(gfe)","clientName":"WEB","clientVersion":"2.20240509.00.00","osName":"X11","osVersion":"","originalUrl":"https://www.youtube.com/?app=desktop&hl=de&themeRefresh=1","platform":"DESKTOP","clientFormFactor":"UNKNOWN_FORM_FACTOR","configInfo":{"appInstallData":"CPv0hLIGEM-osAUQ1-mvBRDj0bAFEInusAUQ0-CwBRC9tq4FEIjjrwUQ1-CwBRC36v4SENCNsAUQrNiwBRD-6rAFENngsAUQvZmwBRD0q7AFEIiHsAUQ7qKvBRD667AFENXdsAUQi8-wBRComrAFEMf9tyIQ8-uwBRClwv4SEI3MsAUQooGwBRCe5LAFENnJrwUQvYqwBRC70q8FENfnsAUQuOqwBRCcqv8SEOvo_hIQ7rOwBRCPxLAFEK3jsAUQyfevBRDd6P4SEPyFsAUQ0-GvBRDJ17AFEKKSsAUQ1YiwBRCCorAFEOrDrwUQ192wBRC8-a8FEPOhsAUQppqwBRD2q7AFEJ3QsAUQieiuBRDbr68FEIKi_xIQ57qvBRDeiP8SEJCysAUQ86n_EhD72rAFELfvrwUQu9iwBRCa8K8FEMzfrgUQ1tawBRDEzLAFEOuTrgUQ8-CwBRCs6rAFEL75rwUQ_-SwBRDnw7AFEPjSsAUQ2-SwBRCXg7AFELersAUQge2wBRD14LAFEO_NsAUQ4tSuBRDN17AFEPXksAUQi-ywBRCq2LAFEP3gsAUQ0eCwBRD55LAFEIO_sAUQp-OwBRDUoa8FEJaVsAUQ69uwBRD_37AFEJaf_xIQsdywBRDErP8SEP3QsAUQ3tuwBRCcy7AFKiBDQU1TRWhVSm9MMndETkhrQnFDUTlBdkwxQVFkQnc9PQ%3D%3D"},"userInterfaceTheme":"USER_INTERFACE_THEME_DARK","browserName":"Chrome","browserVersion":"120.0.0.0","acceptHeader":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7","deviceExperimentId":"ChxOek0yT0RJek5EYzJOall6TmpFMk1UTXpOZz09EPv0hLIGGPv0hLIG","screenWidthPoints":1133,"screenHeightPoints":966,"screenPixelDensity":1,"screenDensityFloat":1,"utcOffsetMinutes":180,"connectionType":"CONN_CELLULAR_3G","memoryTotalKbytes":"8000000","mainAppWebInfo":{"graftUrl":"https://www.youtube.com/results?search_query=","pwaInstallabilityStatus":"PWA_INSTALLABILITY_STATUS_CAN_BE_INSTALLED","webDisplayMode":"WEB_DISPLAY_MODE_BROWSER","isWebNativeShareAvailable":false},"timeZone":"Asia/Aden"},"user":{"lockedSafetyMode":false},"request":{"useSsl":true,"internalExperimentFlags":[],"consistencyTokenJars":[]},"clickTracking":{"clickTrackingParams":"CCsQ7OYFGAEiEwiFt4PVj4mGAxWqMvEFHcTnBxQ="},"adSignalsInfo":{"params":[{"key":"dt","value":"1715550867851"},{"key":"flash","value":"0"},{"key":"frm","value":"0"},{"key":"u_tz","value":"180"},{"key":"u_his","value":"7"},{"key":"u_h","value":"1080"},{"key":"u_w","value":"1920"},{"key":"u_ah","value":"1053"},{"key":"u_aw","value":"1850"},{"key":"u_cd","value":"24"},{"key":"bc","value":"31"},{"key":"bih","value":"966"},{"key":"biw","value":"1117"},{"key":"brdim","value":"70,27,70,27,1850,27,1850,1053,1133,966"},{"key":"vis","value":"1"},{"key":"wgl","value":"true"},{"key":"ca_type","value":"image"}]}},"continuation":"EtYHEgZzaG9ydHMayAdFdEVGa2dITkJUcVZBUktPQVNoaElIbHZkWFIxWW1WZmMyaHZjblJ6WDJWc2FXZHBZbXhsSURwMGVYQmxPbklnS0c0Z2VXOTFkSFZpWlY5bWJHRm5YMmhoYzE5d2NtVnRhV1Z5WlY5MmFXUmxiMTl0WlhSaFpHRjBZVDB4SURwMGVYQmxPbklwSUNodUlIbHZkWFIxWW1WZlpteGhaMTlvWVhOZmJHbDJaVjl6ZEhKbFlXMWZiV1YwWVdSaGRHRTlNU0E2ZEhsd1pUcHlLU2s0QVdBYVNySUVDaTBLQm5Ob2IzSjBjeFhfXzM5XzZnRVBDZzFhQ3dvSENJWUJFZ0FZQ3hoaDhnRUZDZ05CYkd6WUFnRzRBMkVLdWdFVl9fOV9mLW9CRHdvTldnc0tCd2lHQVJJQUdBc1lHdklCQ0FvR1UyaHZjblJ6d2dLT0FTaGhJSGx2ZFhSMVltVmZjMmh2Y25SelgyVnNhV2RwWW14bElEcDBlWEJsT25JZ0tHNGdlVzkxZEhWaVpWOW1iR0ZuWDJoaGMxOXdjbVZ0YVdWeVpWOTJhV1JsYjE5dFpYUmhaR0YwWVQweElEcDBlWEJsT25JcElDaHVJSGx2ZFhSMVltVmZabXhoWjE5b1lYTmZiR2wyWlY5emRISmxZVzFmYldWMFlXUmhkR0U5TVNBNmRIbHdaVHB5S1NuNEFnRzRBeG9LVVJYX18zOV82Z0VQQ2cxYUN3b0hDSVlCRWdBWUN4aEk4Z0VJQ2daV2FXUmxiM1BDQWhwNWIzVjBkV0psWDNacFpHVnZYM0JoWjJVZ09uUjVjR1U2Y3VnQ0FhZ0RBYmdEU01BREFjZ0RBZEFEQVFvdEZmX19mM19xQVE4S0RWb0xDZ2NJaGdFU0FCZ0xHQnp5QVFzS0NWVnVkMkYwWTJobFpNb0NBZ2dCdUFNY0Npc1ZfXzlfZi1vQkR3b05XZ3NLQndpR0FSSUFHQXNZU3ZJQkNRb0hWMkYwWTJobFpNb0NBaGdDdUFOS0NqSVZfXzlfZjJBSDZnRVBDZzFhQ3dvSENJWUJFZ0FZQ3hnSDhnRVRDaEZTWldObGJuUnNlU0IxY0d4dllXUmxaTGdEQndwUUZmX19mM19xQVE4S0RWb0xDZ2NJaGdFU0FCZ0xHQVR5QVFZS0JFeHBkbVhDQWlkNWIzVjBkV0psWDJ4cGRtVmZZbkp2WVdSallYTjBYM04wWVhSMWN6MHdJRHAwZVhCbE9uTG9BZ0c0QXdRWUMxb05DZ3NJQkNvSENJWUJFZ0FZQzNnQZABARiB4OgYIgtzZWFyY2gtcGFnZQ%3D%3D"}',
      method: "POST",
    },
  );
  const vid = await result.json();
  return vid.onResponseReceivedCommands[0].reloadContinuationItemsCommand
    .continuationItems[0].twoColumnSearchResultsRenderer.primaryContents
    .sectionListRenderer.contents[0].itemSectionRenderer.contents;
};

export const videos = [
  "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fqesa-f780b699-6a14-44fd-a606-c83b0b6b87f7/ImagePicker/1fb81507-5b24-4478-9249-91d85157cf8a.mp4",
  "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fqesa-f780b699-6a14-44fd-a606-c83b0b6b87f7/ImagePicker/08e9cba0-7851-4f16-a67a-8e96998202d0.mp4",
  "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fqesa-f780b699-6a14-44fd-a606-c83b0b6b87f7/ImagePicker/5d43b728-55b8-4c63-95cc-e1ec3391c1bb.mp4",
  "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fqesa-f780b699-6a14-44fd-a606-c83b0b6b87f7/ImagePicker/9b4323e8-f6ae-4fd9-968c-78cfbd252fec.mp4",
  "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fqesa-f780b699-6a14-44fd-a606-c83b0b6b87f7/ImagePicker/49dd7dbb-6e25-430c-83ee-da53513dfe87.mp4",
  "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fqesa-f780b699-6a14-44fd-a606-c83b0b6b87f7/ImagePicker/838089b3-deb1-449d-8aba-7bf5f18cc122.mp4",
];
