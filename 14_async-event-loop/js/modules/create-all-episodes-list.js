  import prepareElement from './prepare-element.js'
  import getLoadResourcesArray from './get-load-resources-array.js'
  import renderEpisodePage from './render-episode-page.js'

 function createAllEpisodesList(data, container) {
  const ul = prepareElement('ul', ['episode-list', 'p-2'])

  data.results.forEach(episode => {
    const div = prepareElement('div', ['card-subtitle', 'text-muted'], `Episode ${episode.episode_id}`)
    const li = prepareElement('li', ['bg-light', 'card-body', 'p-2'])
    li.style.order = episode.episode_id
    const h2 = prepareElement('h2', ['card-title', 'mb-2'], episode.title)
    const p = prepareElement('p', ['card-text', 'text-4rows'], episode.opening_crawl)
    const a = prepareElement('a', 'card-body', 'Read more')
    a.href = episode.url

    a.addEventListener('click', (e) => {
      e.preventDefault()
      history.pushState(null, '', `episode${episode.episode_id}`)
      container.innerHTML = '';
      renderEpisodePage(data, episode, getLoadResourcesArray(episode), container)
    })

    li.append(div)
    li.append(h2)
    li.append(p)
    li.append(a)
    ul.append(li)
  });
  return ul
};

export default createAllEpisodesList
