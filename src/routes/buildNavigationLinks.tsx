interface Route {
  path: string;
  element: JSX.Element;
  label?: string;
}

const BuildNavigationLinks = (routes: Route[]) => {
  return routes
    .filter((route) => route.label)
    .map(({ path, label }) => ({ path, name: label! }));
};

export default BuildNavigationLinks;
