import React from "react";
import { apps, wallpapers } from "~/configs";
import { minMarginY } from "~/utils";
import type { MacActions } from "~/types";

interface DesktopState {
  showApps: {
    [key: string]: boolean;
  };
  appsZ: {
    [key: string]: number;
  };
  maxApps: {
    [key: string]: boolean;
  };
  minApps: {
    [key: string]: boolean;
  };
  maxZ: number;
  showLaunchpad: boolean;
  currentTitle: string;
  hideDockAndTopbar: boolean;
  spotlight: boolean;
}

export default function Desktop(props: MacActions) {
  const [state, setState] = useState({
    showApps: {},
    appsZ: {},
    maxApps: {},
    minApps: {},
    maxZ: 2,
    showLaunchpad: false,
    currentTitle: "Finder",
    hideDockAndTopbar: false,
    spotlight: false
  } as DesktopState);

  const [spotlightBtnRef, setSpotlightBtnRef] =
    useState<React.RefObject<HTMLDivElement> | null>(null);

  const { dark, brightness } = useStore((state) => ({
    dark: state.dark,
    brightness: state.brightness
  }));

  const getAppsData = (): void => {
    let showApps = {},
      appsZ = {},
      maxApps = {},
      minApps = {};

    apps.forEach((app) => {
      showApps = {
        ...showApps,
        [app.id]: !!app.show
      };
      appsZ = {
        ...appsZ,
        [app.id]: 2
      };
      maxApps = {
        ...maxApps,
        [app.id]: false
      };
      minApps = {
        ...minApps,
        [app.id]: false
      };
    });

    setState({ ...state, showApps, appsZ, maxApps, minApps });
  };

  useEffect(() => {
    getAppsData();
  }, []);

  const toggleLaunchpad = (target: boolean): void => {
    const r = document.querySelector(`#launchpad`) as HTMLElement;
    if (target) {
      r.style.transform = "scale(1)";
      r.style.transition = "ease-in 0.2s";
    } else {
      r.style.transform = "scale(1.1)";
      r.style.transition = "ease-out 0.2s";
    }

    setState({ ...state, showLaunchpad: target });
  };

  const toggleSpotlight = (): void => {
    setState({ ...state, spotlight: !state.spotlight });
  };

  const setWindowPosition = (id: string): void => {
    const r = document.querySelector(`#window-${id}`) as HTMLElement;
    const rect = r.getBoundingClientRect();
    r.style.setProperty(
      "--window-transform-x",
      // "+ window.innerWidth" because of the boundary for windows
      (window.innerWidth + rect.x).toFixed(1).toString() + "px"
    );
    r.style.setProperty(
      "--window-transform-y",
      // "- minMarginY" because of the boundary for windows
      (rect.y - minMarginY).toFixed(1).toString() + "px"
    );
  };

  const setAppMax = (id: string, target?: boolean): void => {
    const maxApps = state.maxApps;
    if (target === undefined) target = !maxApps[id];
    maxApps[id] = target;
    setState({
      ...state,
      maxApps: maxApps,
      hideDockAndTopbar: target
    });
  };

  const setAppMin = (id: string, target?: boolean): void => {
    const minApps = state.minApps;
    if (target === undefined) target = !minApps[id];
    minApps[id] = target;
    setState({
      ...state,
      minApps: minApps
    });
  };
  
  const minimizeApp = (id: string): void => {
    console.log(`Minimizing app ${id}`);
    setWindowPosition(id);

    // Get the window element
    const windowEl = document.querySelector(`#window-${id}`) as HTMLElement;
    if (!windowEl) {
      console.error(`Window element #window-${id} not found!`);
      return;
    }

    // Get the corresponding dock icon position
    const dockIconEl = document.querySelector(`#dock-${id}`) as HTMLElement;
    if (!dockIconEl) {
      console.error(`Dock icon #dock-${id} not found!`);
      return;
    }

    // Get positions for calculation
    const dockRect = dockIconEl.getBoundingClientRect();
    const windowRect = windowEl.getBoundingClientRect();

    // Create a clone of the window for the animation
    const clone = windowEl.cloneNode(true) as HTMLElement;
    clone.id = `clone-${id}`;

    // Make all elements in clone non-interactive
    const allElements = clone.querySelectorAll("*");
    allElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.pointerEvents = "none";
      }
    });

    // Setup the animation container
    const animContainer = document.createElement("div");
    animContainer.className = "genie-container";
    document.body.appendChild(animContainer);

    // Position the clone container at the exact same position as the original window
    const genieEl = document.createElement("div");
    genieEl.className = "genie-effect";
    genieEl.style.width = `${windowRect.width}px`;
    genieEl.style.height = `${windowRect.height}px`;
    genieEl.style.top = `${windowRect.top}px`;
    genieEl.style.left = `${windowRect.left}px`;

    // Calculate target position - precise targeting for dock icon
    const targetX =
      dockRect.left + dockRect.width / 2 - (windowRect.left + windowRect.width / 2);

    // For Y, target the bottom of the screen where the dock is
    const targetY = window.innerHeight - windowRect.top - 50; // 50px from bottom

    // Set the CSS variables for animation
    genieEl.style.setProperty("--target-x", `${targetX}px`);
    genieEl.style.setProperty("--target-y", `${targetY}px`);

    // Add the clone to the animation element
    genieEl.appendChild(clone);
    animContainer.appendChild(genieEl);

    // Hide the original window immediately
    windowEl.style.opacity = "0";

    // Start the animation
    requestAnimationFrame(() => {
      genieEl.classList.add("genie-minimizing");
    });

    // Update app state
    setAppMin(id, true);

    // Clean up animation after it's done
    setTimeout(() => {
      animContainer.remove();
    }, 500); // Match this to the animation duration in CSS (0.5s)
  };

  // const minimizeApp = (id: string): void => {
  //   setWindowPosition(id);

  //   // Get the window element
  //   const windowEl = document.querySelector(`#window-${id}`) as HTMLElement;
  //   if (!windowEl) return;

  //   // Get the corresponding dock icon position
  //   const dockIconEl = document.querySelector(`#dock-${id}`) as HTMLElement;
  //   if (!dockIconEl) return;

  //   const dockRect = dockIconEl.getBoundingClientRect();
  //   const windowRect = windowEl.getBoundingClientRect();

  //   // Create a clone of the window for the animation
  //   const clone = windowEl.cloneNode(true) as HTMLElement;

  //   // Remove any interactive elements from the clone
  //   const interactiveElements = clone.querySelectorAll(
  //     'button, input, a, [role="button"]'
  //   );
  //   interactiveElements.forEach((el) => {
  //     (el as HTMLElement).style.pointerEvents = "none";
  //   });

  //   // Setup the animation container
  //   const animContainer = document.createElement("div");
  //   animContainer.className = "genie-container";
  //   document.body.appendChild(animContainer);

  //   // Position the clone at the same position as the original window
  //   const genieEl = document.createElement("div");
  //   genieEl.className = "genie-effect";
  //   genieEl.style.width = `${windowRect.width}px`;
  //   genieEl.style.height = `${windowRect.height}px`;
  //   genieEl.style.top = `${windowRect.top}px`;
  //   genieEl.style.left = `${windowRect.left}px`;
  //   genieEl.style.setProperty(
  //     "--target-x",
  //     `${dockRect.left + dockRect.width / 2 - (windowRect.left + windowRect.width / 2)}px`
  //   );
  //   genieEl.style.setProperty("--target-y", `${dockRect.top - windowRect.top}px`);

  //   // Add the clone to the animation element
  //   genieEl.appendChild(clone);
  //   animContainer.appendChild(genieEl);

  //   // Hide the original window immediately
  //   windowEl.style.opacity = "0";

  //   // Start the animation
  //   genieEl.classList.add("genie-minimizing");

  //   // Hide the window in our state management
  //   setAppMin(id, true);

  //   // Clean up animation after it's done
  //   setTimeout(() => {
  //     animContainer.remove();
  //   }, 400); // Match this to the animation duration
  // };

  const closeApp = (id: string): void => {
    setAppMax(id, false);
    const showApps = state.showApps;
    showApps[id] = false;
    setState({
      ...state,
      showApps: showApps,
      hideDockAndTopbar: false
    });
  };
  const openApp = (id: string): void => {
    // add it to the shown app list
    const showApps = state.showApps;
    showApps[id] = true;

    // move to the top (use a maximum z-index)
    const appsZ = state.appsZ;
    const maxZ = state.maxZ + 1;
    appsZ[id] = maxZ;

    // get the title of the currently opened app
    const currentApp = apps.find((app) => {
      return app.id === id;
    });
    if (currentApp === undefined) {
      throw new TypeError(`App ${id} is undefined.`);
    }

    setState({
      ...state,
      showApps: showApps,
      appsZ: appsZ,
      maxZ: maxZ,
      currentTitle: currentApp.title
    });

    const minApps = state.minApps;
    // if the app has already been shown but minimized
    if (minApps[id]) {
      // Get reference to the window
      const windowEl = document.querySelector(`#window-${id}`) as HTMLElement;
      if (windowEl) {
        // Restore visibility immediately
        windowEl.style.opacity = "1";

        // Get dock icon position for reference
        const dockIconEl = document.querySelector(`#dock-${id}`);
        if (dockIconEl) {
          // Position the window based on saved position
          windowEl.style.transform = `translate(${windowEl.style.getPropertyValue(
            "--window-transform-x"
          )}, ${windowEl.style.getPropertyValue("--window-transform-y")}) scale(1)`;

          // Add bounce animation class
          windowEl.classList.add("window-restoring");

          // Remove the animation class after it completes
          setTimeout(() => {
            windowEl.classList.remove("window-restoring");
          }, 500); // Match to animation duration
        } else {
          // Fallback if dock icon not found
          windowEl.style.transform = `translate(${windowEl.style.getPropertyValue(
            "--window-transform-x"
          )}, ${windowEl.style.getPropertyValue("--window-transform-y")}) scale(1)`;
          windowEl.style.transition = "ease-in 0.3s";
        }

        // Dock icon bounce effect
        const dockIcon = document.querySelector(`#dock-${id}`);
        if (dockIcon) {
          dockIcon.classList.add("dock-bounce");
          setTimeout(() => {
            dockIcon.classList.remove("dock-bounce");
          }, 500);
        }

        // Remove any leftover animation elements
        const leftoverAnims = document.querySelectorAll(".genie-container");
        leftoverAnims.forEach((el) => el.remove());
      }

      // remove it from the minimized app list
      minApps[id] = false;
      setState({ ...state, minApps });
    }
  };

  // const openApp = (id: string): void => {
  //   // add it to the shown app list
  //   const showApps = state.showApps;
  //   showApps[id] = true;

  //   // move to the top (use a maximum z-index)
  //   const appsZ = state.appsZ;
  //   const maxZ = state.maxZ + 1;
  //   appsZ[id] = maxZ;

  //   // get the title of the currently opened app
  //   const currentApp = apps.find((app) => {
  //     return app.id === id;
  //   });
  //   if (currentApp === undefined) {
  //     throw new TypeError(`App ${id} is undefined.`);
  //   }

  //   setState({
  //     ...state,
  //     showApps: showApps,
  //     appsZ: appsZ,
  //     maxZ: maxZ,
  //     currentTitle: currentApp.title
  //   });

  //   const minApps = state.minApps;
  //   // if the app has already been shown but minimized
  //   if (minApps[id]) {
  //     // Get reference to the window
  //     const windowEl = document.querySelector(`#window-${id}`) as HTMLElement;
  //     if (windowEl) {
  //       // Restore visibility - CRITICAL FIX
  //       windowEl.style.opacity = "1";

  //       // Move to window's last position
  //       windowEl.style.transform = `translate(${windowEl.style.getPropertyValue(
  //         "--window-transform-x"
  //       )}, ${windowEl.style.getPropertyValue("--window-transform-y")}) scale(1)`;
  //       windowEl.style.transition = "ease-in 0.3s";

  //       // Remove any leftover animation elements (just in case)
  //       const leftoverAnims = document.querySelectorAll(".genie-container");
  //       leftoverAnims.forEach((el) => el.remove());
  //     }

  //     // remove it from the minimized app list
  //     minApps[id] = false;
  //     setState({ ...state, minApps });
  //   }
  // };

  const renderAppWindows = () => {
    return apps.map((app) => {
      if (app.desktop && state.showApps[app.id]) {
        const props = {
          id: app.id,
          title: app.title,
          width: app.width,
          height: app.height,
          minWidth: app.minWidth,
          minHeight: app.minHeight,
          aspectRatio: app.aspectRatio,
          x: app.x,
          y: app.y,
          z: state.appsZ[app.id],
          max: state.maxApps[app.id],
          min: state.minApps[app.id],
          close: closeApp,
          setMax: setAppMax,
          setMin: minimizeApp,
          focus: openApp
        };

        return (
          <AppWindow key={`desktop-app-${app.id}`} {...props}>
            {app.content}
          </AppWindow>
        );
      } else {
        return <div key={`desktop-app-${app.id}`} />;
      }
    });
  };

  return (
    <div
      className="size-full overflow-hidden bg-center bg-cover"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`,
        filter: `brightness( ${(brightness as number) * 0.7 + 50}% )`
      }}
    >
      {/* Top Menu Bar */}
      <TopBar
        title={state.currentTitle}
        setLogin={props.setLogin}
        shutMac={props.shutMac}
        sleepMac={props.sleepMac}
        restartMac={props.restartMac}
        toggleSpotlight={toggleSpotlight}
        hide={state.hideDockAndTopbar}
        setSpotlightBtnRef={setSpotlightBtnRef}
      />

      {/* Desktop Apps */}
      <div className="window-bound z-10 absolute" style={{ top: minMarginY }}>
        {renderAppWindows()}
      </div>

      {/* Spotlight */}
      {state.spotlight && (
        <Spotlight
          openApp={openApp}
          toggleLaunchpad={toggleLaunchpad}
          toggleSpotlight={toggleSpotlight}
          btnRef={spotlightBtnRef as React.RefObject<HTMLDivElement>}
        />
      )}

      {/* Launchpad */}
      <Launchpad show={state.showLaunchpad} toggleLaunchpad={toggleLaunchpad} />

      {/* Dock */}
      <Dock
        open={openApp}
        showApps={state.showApps}
        showLaunchpad={state.showLaunchpad}
        toggleLaunchpad={toggleLaunchpad}
        hide={state.hideDockAndTopbar}
      />
    </div>
  );
}
