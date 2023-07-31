const detailsData = () => {
  const preloader = document.querySelector('.preloder')
  
  const renderGanreList = (ganres) => {
    const dropdownBlock = document.querySelector('.header__menu .dropdown')

    ganres.forEach((ganre) => {
      dropdownBlock.insertAdjacentHTML(
        'beforeend', `
            <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>`,
      )
    })
  }

  const renderAnimeDetails = (array, itemID) => {
    const animeOdj = array.find((item) => item.id == itemID)
    const imageBlock = document.querySelector('.anime__details__pic')
    const viewBlock = imageBlock.querySelector('.view')
    const titleBlock = document.querySelector('.anime__details__title h3')
    const subTitleBlock = document.querySelector('.anime__details__title span')
    const descriptionBlock = document.querySelector('.anime__details__text p')
    const widgetList = document.querySelectorAll('.anime__details__widget ul li')
    const breadcrumb = document.querySelector('.breadcrumb__links span')

    if (animeOdj) {
      imageBlock.dataset.setbg = animeOdj.image
      viewBlock.insertAdjacentHTML(
        'beforeend', `
            <i class="fa fa-eye"></i> ${animeOdj.views}`,
      )

      titleBlock.textContent = animeOdj.title
      subTitleBlock.textContent = animeOdj['original-title']
      descriptionBlock.textContent = animeOdj.description
      breadcrumb.textContent = animeOdj.ganre

      widgetList[0].insertAdjacentHTML(
        'beforeend', `
        <span>Date aired:</span>${animeOdj.date}`,
      )
      widgetList[1].insertAdjacentHTML(
        'beforeend', `
        <span>Status:</span>${animeOdj.rating}`,
      )
      widgetList[2].insertAdjacentHTML(
        'beforeend', `
        <span>Genre:</span>${animeOdj.tags.join(", ")}`,
      )

      document.querySelectorAll('.set-bg').forEach((elem) => {
        elem.style.backgroundImage = `url(${elem.dataset.setbg})`
      })

      setTimeout(() => {
        preloader.classList.remove('active')
      }, 500)
    }
  }

  fetch('https://anime-a0299-default-rtdb.firebaseio.com/anime.json')
    .then((response) => response.json())
    .then((data) => {
      const ganres = new Set()
      const ganreParams = new URLSearchParams(window.location.search).get(
        'itemID',
      )

      data.forEach((item) => {
        ganres.add(item.ganre)
      })

      if (ganreParams) {
        renderAnimeDetails(data, [ganreParams])
      } else {
        console.log('Аниме отсутствует')
      }
      renderGanreList(ganres)
    })
}

detailsData()
