const title = document.createElement('h1')
title.textContent = 'Dragon Ball Characters'
document.body.insertBefore(title, container)

document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('h1')
  title.innerHTML = title.textContent
    .split('')
    .map((letter) => `<span>${letter}</span>`)
    .join('')
})

const fetchAllCharacters = async () => {
  const totalCharacters = 58
  const charactersPerPage = 10
  const totalPages = Math.ceil(totalCharacters / charactersPerPage)
  let allCharacters = []

  for (let page = 1; page <= totalPages; page++) {
    const response = await fetch(
      `https://dragonball-api.com/api/characters?page=${page}`
    )
    const data = await response.json()

    if (data.items && Array.isArray(data.items)) {
      const filteredData = data.items.map((character) => ({
        name: character.name,
        image: character.image,
        description: character.description
      }))
      allCharacters = allCharacters.concat(filteredData)
    } else {
      console.error('Unexpected response format:', data)
    }
  }
  return allCharacters
}

const displayCharacters = (characters) => {
  const container = document.getElementById('container')
  characters.forEach((character) => {
    const characterElement = document.createElement('div')
    characterElement.classList.add('character')

    const characterFront = document.createElement('div')
    characterFront.classList.add('character-front')
    const characterName = document.createElement('h2')
    characterName.textContent = character.name
    const characterImage = document.createElement('img')
    characterImage.src = character.image
    characterImage.alt = character.name

    characterFront.appendChild(characterName)
    characterFront.appendChild(characterImage)

    const characterBack = document.createElement('div')
    characterBack.classList.add('character-back')
    const characterDescription = document.createElement('p')
    characterDescription.textContent = character.description
    characterBack.appendChild(characterDescription)

    characterElement.appendChild(characterFront)
    characterElement.appendChild(characterBack)

    document.body.appendChild(container)

    characterElement.addEventListener('click', () => {
      characterElement.classList.toggle('flipped')
      setTimeout(() => {
        characterElement.classList.remove('flipped')
      }, 9000) // Tiempo en milisegundos antes de que la carta vuelva a su posición inicial
    })

    container.appendChild(characterElement)
  })
}

fetchAllCharacters()
  .then((allCharacters) => {
    console.log(allCharacters)
    displayCharacters(allCharacters)
  })
  .catch((error) => console.error(error))

const footer = document.createElement('footer')
footer.textContent = '© 2025 Dragon Ball. All rights reserved. Cristty'
document.body.appendChild(footer)
