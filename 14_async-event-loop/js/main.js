import renderMainPage from './modules/render-main-page.js'

const container = document.getElementById('list')
  renderMainPage(['./create-all-episodes-list.js', 
  'https://swapi.dev/api/films', 
  'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css',
  './css/style.css'], 
  container )