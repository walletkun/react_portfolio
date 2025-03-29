import React from "react";
import { websites, wallpapers } from "~/configs";
import { checkURL } from "~/utils";
import type { SiteSectionData, SiteData } from "~/types";

interface SafariState {
  goURL: string;
  currentURL: string;
  embedError: boolean;
  loading: boolean;
}

interface SafariProps {
  width?: number;
}

interface NavProps {
  width: number;
  setGoURL: (url: string) => void;
}

interface NavSectionProps extends NavProps {
  section: SiteSectionData;
}

const restrictedDomains = [
  "google.com",
  "youtube.com",
  "facebook.com",
  "twitter.com",
  "instagram.com",
  "linkedin.com",
  "github.com",
  "amazon.com",
  "netflix.com",
  "spotify.com"
];

interface IsLikelyRestricted {
  (url: string | null | undefined): boolean;
}
const isLikelyRestricted: IsLikelyRestricted = (url) => {
  if (!url) return false;
  return restrictedDomains.some((domain) => url.includes(domain));
};

const EmbedRestrictedPage = ({ url, onOpenExternal }) => {
  const dark = useStore((state) => state.dark);

  return (
    <div
      className="w-full safari-content bg-center bg-cover overflow-y-scroll"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`
      }}
    >
      <div className="w-full h-full pb-10 backdrop-blur-2xl flex-center text-c-600 bg-c-100/80">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-2xl font-bold mb-4">This website cannot be embedded</div>
          <div className="text-sm mb-6">
            {url} has security restrictions that prevent it from being displayed in this
            browser window.
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => window.open(url, "_blank")}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Open in New Tab
            </button>
            <button
              onClick={onOpenExternal}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavSection = ({ width, section, setGoURL }: NavSectionProps) => {
  const grid = width < 640 ? "grid-cols-4" : "grid-cols-9";

  return (
    <div className="mx-auto w-full max-w-screen-md" p="t-8 x-4">
      <div className="font-medium ml-2" text="xl sm:2xl">
        {section.title}
      </div>
      <div className={`mt-3 grid grid-flow-row ${grid}`}>
        {section.sites.map((site: SiteData) => (
          <div key={`safari-nav-${site.id}`} className="h-28 flex flex-col">
            <div className="size-16 mx-auto rounded-md overflow-hidden bg-white">
              {site.img ? (
                <img
                  src={site.img}
                  alt={site.title}
                  title={site.title}
                  onClick={
                    site.inner ? () => setGoURL(site.link) : () => window.open(site.link)
                  }
                />
              ) : (
                <div
                  className="size-full flex-center cursor-default text-black"
                  onClick={
                    site.inner ? () => setGoURL(site.link) : () => window.open(site.link)
                  }
                >
                  <span text-lg>{site.title}</span>
                </div>
              )}
            </div>
            <span m="t-2 x-auto" text-sm>
              {site.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const numTracker = Math.floor(Math.random() * 99 + 1);

const NavPage = ({ width, setGoURL }: NavProps) => {
  const dark = useStore((state) => state.dark);

  const grid = width < 640 ? "grid-cols-4" : "grid-cols-8";
  const span = width < 640 ? "col-span-3" : "col-span-7";

  return (
    <div
      className="w-full safari-content overflow-y-scroll bg-center bg-cover text-c-black"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`
      }}
    >
      <div className="w-full min-h-full pt-8 bg-c-100/80 backdrop-blur-2xl">
        {/* Favorites */}
        <NavSection section={websites.favorites} setGoURL={setGoURL} width={width} />

        {/* Frequently Visited */}
        <NavSection section={websites.freq} setGoURL={setGoURL} width={width} />

        {/* Privacy Report */}
        <div className="mx-auto w-full max-w-screen-md" p="t-8 x-4 b-16">
          <div font="medium" text="xl sm:2xl">
            Privacy Report
          </div>
          <div
            className={`h-16 w-full mt-4 grid ${grid} shadow-md rounded-xl text-sm`}
            bg="gray-50/70 dark:gray-600/50"
          >
            <div className="col-start-1 col-span-1 flex-center space-x-2">
              <span className="i-fa-solid:shield-alt text-2xl" />
              <span className="text-xl">{numTracker}</span>
            </div>
            <div className={`col-start-2 ${span} hstack px-2`}>
              In the last seven days, Safari has prevent {numTracker} tracker from
              profiling you.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoInternetPage = () => {
  const dark = useStore((state) => state.dark);

  return (
    <div
      className="w-full safari-content bg-blue-50 overflow-y-scroll bg-center bg-cover"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`
      }}
    >
      <div className="w-full h-full pb-10 backdrop-blur-2xl flex-center text-c-600 bg-c-100/80">
        <div className="text-center">
          <div className="text-2xl font-bold">You Are Not Connected to the Internet</div>
          <div className="pt-4 text-sm">
            This page can't be displayed because your computer is currently offline.
          </div>
        </div>
      </div>
    </div>
  );
};

const Safari = ({ width }: SafariProps) => {
  const wifi = useStore((state) => state.wifi);
  const [state, setState] = useState<SafariState>({
    goURL: "",
    currentURL: "",
    embedError: false,
    loading: false
  });

  const iframeRef = useRef(null);

  useEffect(() => {
    // Reset the embed error when url changes
    if (state.goURL) {
      setState((prev) => ({ ...prev, embedError: false, loading: true }));
    }
  }, [state.goURL]);

  // Handling iframe load events
  const handleIframeLoad = () => {
    setState((prev) => ({ ...prev, loading: false }));
    // Trying to detect if the iframe loaded correctly
    try {
      // Throw an error if the iframe content is from a different origin
      const iframeContent = iframeRef.current?.contentWindow?.document;
      console.log("iframe successfully loaded: ", iframeContent ? true : false);
    } catch (error) {
      console.log("iframe cross-origin content loaded");
    }
  };

  // Handle the iframe error
  const handleIframeError = () => {
    console.error("iframe loaded fail");
    setState((prev) => ({ ...prev, embedError: true, loading: false }));
  };

  const setGoURL = (url: string) => {
    const isValid = checkURL(url);

    if (isValid) {
      if (url.substring(0, 7) !== "http://" && url.substring(0, 8) !== "https://")
        url = `https://${url}`;
    } else if (url !== "") {
      url = `https://www.google.com/search?q=${url}`;
    }

    // Checking if the URL is likely to be restricted before setting
    const likely = isLikelyRestricted(url);

    setState({
      ...state,
      goURL: url,
      currentURL: url,
      embedError: likely,
      loading: !likely
    });

    // If it's likely restricted, open in a new tab automatically
    if (likely && url) window.open(url, "_blank");
  };

  const resetUrl = () => {
    setState({
      goURL: "",
      currentURL: "",
      embedError: false,
      loading: false
    });
  };
  const pressURL = (e: React.KeyboardEvent) => {
    const keyCode = e.key;
    if (keyCode === "Enter") setGoURL((e.target as HTMLInputElement).value);
  };

  const buttonColor = state.goURL === "" ? "text-c-400" : "text-c-700";
  const grid = (width as number) < 640 ? "grid-cols-2" : "grid-cols-3";
  const hideLast = (width as number) < 640 ? "hidden" : "flex";

  return (
    <div className="w-full h-full">
      {/* browser topbar */}
      <div className={`h-10 grid ${grid} items-center bg-c-white`}>
        <div className="flex px-2">
          <button className={`safari-btn w-7 ${buttonColor}`} onClick={resetUrl}>
            <span className="i-jam:chevron-left text-xl" />
          </button>
          <button className="safari-btn w-7 text-c-400">
            <span className="i-jam:chevron-right text-xl" />
          </button>
          <button className="safari-btn w-9 ml-3 text-c-700">
            <span className="i-bi:layout-sidebar text-sm" />
          </button>
        </div>
        <div className="hstack space-x-2 px-2">
          <button className="safari-btn w-9 -ml-10 text-c-400">
            <span className="i-fa-solid:shield-alt text-sm" />
          </button>
          <input
            type="text"
            value={state.currentURL}
            onChange={(e) => setState({ ...state, currentURL: e.target.value })}
            onKeyPress={pressURL}
            className="h-6 w-full p-2 rounded font-normal no-outline text-sm text-center text-c-500 bg-c-200"
            border="2 transparent focus:blue-400 dark:focus:blue-500"
            placeholder="Search or enter website name"
          />
        </div>
        <div className={`${hideLast} justify-end space-x-2 px-2`}>
          <button className={`safari-btn w-9 ${buttonColor}`}>
            <span className="i-ion:share-outline" />
          </button>
          <button className="safari-btn w-9 text-c-700">
            <span className="i-ion:copy-outline" />
          </button>
        </div>
      </div>

      {/* browser content */}
      {!wifi ? (
        <NoInternetPage />
      ) : state.goURL === "" ? (
        <NavPage setGoURL={setGoURL} width={width as number} />
      ) : state.embedError ? (
        <EmbedRestrictedPage url={state.goURL} onOpenExternal={resetUrl} />
      ) : (
        <>
          {state.loading && (
            <div className="absolute inset-0 flex-center bg-white bg-opacity-75 z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          <iframe
            ref={iframeRef}
            title={"Safari clone browser"}
            src={state.goURL}
            className="safari-content w-full bg-white"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        </>
      )}
    </div>
  );
};

export default Safari;
