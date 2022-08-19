
export default function getLoadResourcesArray(episode) {
  const loadResourcesArray = []
  episode.planets.forEach(planet => {
    loadResourcesArray.push(planet)
});

  episode.species.forEach(specie => {
    loadResourcesArray.push(specie)
});
return loadResourcesArray
}
