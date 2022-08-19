import prepareElement from './prepare-element.js'
import createAllEpisodesList from './create-all-episodes-list.js'

const container = document.getElementById('list')

export default function createEpisode(data, episode, planetsArray, speciesArray) {
  const episodeContainer = prepareElement('div', 'p-5') 
  const id = prepareElement('p', ['card-subtitle', 'text-muted'], `Episode ${episode.episode_id}`)
  const h1 = prepareElement('h1', 'text-title', episode.title)
  const p = prepareElement('p', ['card-text'], episode.opening_crawl)

  const planetsTitle = prepareElement('p', ['card-text'], 'Planets:')
  const planetsList = prepareElement('ul', ['card-text'])
  planetsArray.forEach(planet => {
    const li = prepareElement('li', 'card-text', planet.name)
    planetsList.append(li)
  })

  const speciesTitle = prepareElement('p', ['card-text'], 'Species:')
  const speciesList = prepareElement('ul', ['card-text'])
  speciesArray.forEach(specie => {
    const li = prepareElement('li', 'card-text', specie.name)
    speciesList.append(li)
  })
  
  const btn = prepareElement('button', ['btn-secondary', 'js-btn-back'], 'Back to episodes')
  btn.addEventListener('click', () => {
    history.pushState(null, '', `/`)
    container.innerHTML = '';
    container.append(createAllEpisodesList(data, container))
  })

  episodeContainer.append(id)
  episodeContainer.append(h1)
  episodeContainer.append(p)
  episodeContainer.append(planetsTitle)
  episodeContainer.append(planetsList)
  episodeContainer.append(speciesTitle)
  episodeContainer.append(speciesList)
  episodeContainer.append(btn)

  return episodeContainer
}