export type HistoryLocation = {
  pathname: string;
  search: string;
  hash: string;
};

export type History = {
  push: (path: string | Partial<HistoryLocation>) => void;
  replace: (path: string | Partial<HistoryLocation>) => void;
  goBack: () => void;
  goForward: () => void;
  listen: (listener: (location: HistoryLocation) => void) => () => void;
  location: HistoryLocation;
};

/**
 * Creates an in-memory history implementation suitable for server-side rendering
 * or testing.
 * @param initialPath The initial URL path (e.g., '/home?user=1').
 * @returns A History object.
 */
export function createMemoryHistory(initialPath: string = '/'): History {
  let stack: HistoryLocation[] = [];
  let index: number = -1;
  let listeners: Set<(location: HistoryLocation) => void> = new Set();

  function parsePath(path: string): HistoryLocation {
    const [pathnameAndSearch, hash = ''] = path.split('#');
    const [pathname, search = ''] = pathnameAndSearch.split('?');

    return {
      pathname: pathname || '/',
      search: search ? '?' + search : '',
      hash: hash ? '#' + hash : '',
    };
  }

  function formatLocation(loc: Partial<HistoryLocation>): string {
    const pathname = loc.pathname ?? stack[index]?.pathname ?? '/';
    const search = loc.search ?? stack[index]?.search ?? '';
    const hash = loc.hash ?? stack[index]?.hash ?? '';
    return `${pathname}${search}${hash}`;
  }

  function notify(location: HistoryLocation) {
    listeners.forEach(listener => listener(location));
  }

  function updateLocation(newLocation: HistoryLocation, action: 'PUSH' | 'REPLACE') {
    if (action === 'PUSH') {
      // Remove all locations after the current index
      stack = stack.slice(0, index + 1);
      stack.push(newLocation);
      index++;
    } else { // REPLACE
      if (index >= 0) {
        stack[index] = newLocation;
      } else {
        // Should only happen if replace is called immediately upon initialization
        stack.push(newLocation);
        index = 0;
      }
    }
    notify(currentLocation());
  }

  const initialLocation = parsePath(initialPath);
  stack.push(initialLocation);
  index = 0;

  const currentLocation = (): HistoryLocation => {
    return stack[index];
  };

  const history: History = {
    get location() {
      return currentLocation();
    },

    push(pathOrLocation) {
      const path = typeof pathOrLocation === 'string'
        ? pathOrLocation
        : formatLocation(pathOrLocation);
      
      const newLocation = parsePath(path);
      updateLocation(newLocation, 'PUSH');
    },

    replace(pathOrLocation) {
      const path = typeof pathOrLocation === 'string'
        ? pathOrLocation
        : formatLocation(pathOrLocation);

      const newLocation = parsePath(path);
      updateLocation(newLocation, 'REPLACE');
    },

    goBack() {
      if (index > 0) {
        index--;
        notify(currentLocation());
      }
    },

    goForward() {
      if (index < stack.length - 1) {
        index++;
        notify(currentLocation());
      }
    },

    listen(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }
  };

  return history;
}

/**
 * Creates a browser history implementation that uses the HTML5 History API.
 * This is the standard implementation for client-side applications.
 *
 * NOTE: This implementation assumes a standard browser environment.
 * @returns A History object.
 */
export function createBrowserHistory(): History {
  if (typeof window === 'undefined' || typeof window.history === 'undefined') {
    // Fallback for environments without window history (e.g., non-browser testing)
    // Though usually, if this is called, it means we expect a browser.
    console.warn('Browser history unavailable. Falling back to memory history.');
    return createMemoryHistory(window?.location?.pathname ?? '/');
  }

  const { history, location: winLocation } = window;
  let listeners: Set<(location: HistoryLocation) => void> = new Set();
  
  function getLocationFromWindow(): HistoryLocation {
    // Standard approach to extract location details from the window object
    return {
      pathname: winLocation.pathname,
      search: winLocation.search,
      hash: winLocation.hash,
    };
  }

  function formatLocation(loc: Partial<HistoryLocation>): string {
    const current = getLocationFromWindow();
    const pathname = loc.pathname ?? current.pathname;
    const search = loc.search ?? current.search;
    const hash = loc.hash ?? current.hash;
    return `${pathname}${search}${hash}`;
  }

  function notify(location: HistoryLocation) {
    listeners.forEach(listener => listener(location));
  }

  // Handle popstate events (browser back/forward buttons)
  function handlePopState() {
    notify(getLocationFromWindow());
  }

  window.addEventListener('popstate', handlePopState);

  const historyApi: History = {
    get location() {
      return getLocationFromWindow();
    },

    push(pathOrLocation) {
      const path = typeof pathOrLocation === 'string'
        ? pathOrLocation
        : formatLocation(pathOrLocation);

      history.pushState(null, '', path);
      notify(getLocationFromWindow());
    },

    replace(pathOrLocation) {
      const path = typeof pathOrLocation === 'string'
        ? pathOrLocation
        : formatLocation(pathOrLocation);

      history.replaceState(null, '', path);
      notify(getLocationFromWindow());
    },

    goBack() {
      history.go(-1);
      // Popstate handles notification
    },

    goForward() {
      history.go(1);
      // Popstate handles notification
    },

    listen(listener) {
      listeners.add(listener);

      // Return cleanup function
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
            // Optional: if we want to remove the popstate listener when no one is listening
            // window.removeEventListener('popstate', handlePopState);
        }
      };
    }
  };
  
  // Ensure we clean up the main popstate listener if the history object is discarded
  // Although typically history objects are long-lived (singletons).
  // return Object.assign(historyApi, { 
  //   destroy: () => window.removeEventListener('popstate', handlePopState) 
  // });

  return historyApi;
}

/**
 * Creates the appropriate history implementation based on the environment.
 * @param type 'browser' (default) or 'memory'.
 * @param initialPath Used only if type is 'memory'.
 */
export function createHistory(type: 'browser' | 'memory' = 'browser', initialPath?: string): History {
  if (type === 'memory') {
    return createMemoryHistory(initialPath);
  }

  // Check if we are in a browser environment
  if (typeof window !== 'undefined' && window.history) {
    return createBrowserHistory();
  }
  
  // Default to memory history if browser history is requested but unavailable (e.g. SSR)
  return createMemoryHistory(initialPath);
}

// Export the types for public consumption
export default History;