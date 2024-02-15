import data from './data.json'

const aboutTank = document.querySelector('.about-tank')

export  const getData = (item = 'default') => {
    if (!data) return

    let tableRows = '',
        tableImages = '',
        name = ''

    if (data[item].name)
        name = `<h2 class="about-tank__title">${data[item].name}</h2>`
    if (data[item].img)
        data[item].img.map((item) => {
            tableImages += `<div class="about-tank__image"><img src="${item[0]}"><p>${item[1]}</p></div>`
        })
    data[item].info.map((row) => {
        tableRows += `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`
    })
    const template =
        name +
        `<div class="about-tank__images">${tableImages}</div>` +
        `<table class="about-tank__table">${tableRows}</table>`

    return template
}

const server = (item) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(item), 750)
})

export const post = async (item) => {
    aboutTank.innerHTML =
        '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
    const response = await server(item)
    const html = await getData(response)
    aboutTank.innerHTML = html
}
