declare module '*.json' {
  const value: import('geojson').FeatureCollection;
  export default value;
}
