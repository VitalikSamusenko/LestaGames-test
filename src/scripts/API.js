import data from './data.json'

const aboutTank = document.querySelector('.about-tank')
export const getData = (item='default') => {
    console.log(data[item])
}