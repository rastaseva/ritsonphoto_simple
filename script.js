const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');
const sidebar = document.querySelector('.sidebar');
const container = document.querySelector('.container');
const mainSlide = document.querySelector('.main_slide');
const portfolio = document.querySelector('.main_slides:nth-child(3)');
const anyPortfolio = document.querySelectorAll('.main_slides:nth-child(3) > .main_slides_portfolio_slide');
const anyPortfolioPhotos = document.querySelectorAll('.main_slides_portfolio_slide > img');
const portfolioSlide = document.querySelector('.main_slides_portfolio_slide');
const portfolioSlide2 = document.querySelector('.main_slides_portfolio_slide:nth-child(2)');
const mobileMediaQuery = window.matchMedia('(max-width: 400px)');
const laptopMediaQuery = window.matchMedia('(min-width: 1020px)');
const wideScreenMediaQuery = window.matchMedia('(min-width: 1620px)');
const tabletMediaQuery = window.matchMedia('((max-width: 950px) and (min-width: 600px) and (max-height: 1400px) and (min-height: 800px))');
const longMobileQuery = window.matchMedia('(max-width: 450px) and (max-height: 850px)');
const longMobileQuery2 = window.matchMedia('(max-width: 450px) and (min-height: 900px)');

const slidesCount = mainSlide.querySelectorAll('.main_slides').length;
const portfolioSlidesCount = portfolio.querySelectorAll('.main_slides_portfolio_slide').length;
const photoSlidesCount = document.querySelectorAll('.main_slides_portfolio_slide > img').length;

let activeSlideIndex = 0
let activePortfolioSlideIndex = 0


mainSlide.style.top = `-${(slidesCount - 1) * 100}vh`
portfolioSlide.style.right = `-${(portfolioSlidesCount - 1) * 100}vw`
checkAdaptiveness()

upBtn.addEventListener('click', handleMouseClick)
downBtn.addEventListener('click', handleMouseClick)

document.addEventListener('keydown', event => {
    if (downBtn.style.transform === `translateX(-17.5vw) rotate(90deg)` && event.key === 'ArrowLeft') {
        console.log(downBtn.style.transform, event.key);
        changePortfolioSlide('left');
    } else if (upBtn.style.transform === `translateX(75vw) rotate(90deg)` && event.key === 'ArrowRight') {
        changePortfolioSlide('right');
    }
    if (event.key === 'ArrowUp' && downBtn.style.transform !== `translateX(-17.5vw) rotate(90deg)`) {
        changeSlide('up')
    } else if (event.key === 'ArrowDown' && upBtn.style.transform !== `translateX(75vw) rotate(90deg)`) {
        changeSlide('down')
    }
})
document.addEventListener('wheel', (e) => {
    if (e.deltaY === -100 && downBtn.style.transform !== `translateX(-17.5vw) rotate(90deg)`) {
        changeSlide('up')
    }
    if (e.deltaY === 100 && upBtn.style.transform !== `translateX(75vw) rotate(90deg)`) {
        changeSlide('down')
    }
});

document.addEventListener('click', (e) => {

    for (let i = 0; i < portfolioSlidesCount; i++) {
        if (e.target === anyPortfolio[i] || e.target.parentNode == anyPortfolio[i]) {
            if (sidebar.style.visibility === 'hidden') {
                wrapSlide(anyPortfolio[i])
            } else {
                unwrapSlide(anyPortfolio[i]);
            }
        }
    }
})


portfolio.addEventListener('mouseover', backMarker);
portfolio.addEventListener('mouseout', backMarkerReverse);

function checkAdaptiveness() {
    if (!longMobileQuery.matches && wideScreenMediaQuery.matches) {
        portfolioSlide2.style.right = `-${(portfolioSlidesCount - 2) * 80}vw`
    } else {
        portfolioSlide2.style.right = `-${(portfolioSlidesCount - 2) * 84}vw`

    }
}

function unwrapSlide(e) {


    if (e === anyPortfolio[2] && anyPortfolio[2].style.transform === `translateX(-10vw)`) {
        e.style.transform = `translateX(0vw)`
    } else if (e !== anyPortfolio[2]) {
        e.style.transform = `translateX(0vw)`
    } else if (e === anyPortfolio[2]) {
        if (longMobileQuery2.matches) {
            e.style.transform = `translateX(-14vw)`
        } else {
            e.style.transform = `translateX(-10vw)`
        }
    }
    sidebar.style.transform = `translateX(-20vw)`

    if (wideScreenMediaQuery.matches) {
        downBtn.style.transform = `translateX(-17.5vw) rotate(90deg)`
        upBtn.style.transform = `translateX(75vw)  rotate(90deg)`
    } else if (tabletMediaQuery.matches) {
        downBtn.style.transform = `translateX(-18.5vw) rotate(90deg)`
        upBtn.style.transform = `translateX(73vw)  rotate(90deg)`
    } else if (laptopMediaQuery.matches) {
        downBtn.style.transform = `translateX(-17.5vw) rotate(90deg)`
        upBtn.style.transform = `translateX(69vw)  rotate(90deg)`
    } else if (longMobileQuery2.matches) {
        downBtn.style.transform = `translateX(-18vw) rotate(90deg)`
        upBtn.style.transform = `translateX(70vw)  rotate(90deg)`
    } else if (mobileMediaQuery.matches) {
        downBtn.style.transform = `translateX(-17.5vw) rotate(90deg)`
        upBtn.style.transform = `translateX(68vw)  rotate(90deg)`
    }


    setTimeout(() => {
        sidebar.style.visibility = 'hidden'
    }, 280);
}

function wrapSlide(e) {
    if (e === anyPortfolio[2] && anyPortfolio[2].style.transform === `translateX(0vw)`) {
        e.style.transform = `translateX(0vw)`
    } else if (e === anyPortfolio[2]) {
        e.style.transform = `translateX(0vw)`
    } else {
        anyPortfolio[2].style.transform = `translateX(-10vw)`
        e.style.transform = `translateX(10vw)`
    }
    sidebar.style.transform = `translateX(0vw)`
    sidebar.style.visibility = 'visible'
    downBtn.style.transform = `translateX(-100%)`
    upBtn.style.transform = `translate3d(0vw,-100%,0)`
}

function backMarker() {
    if (portfolio.style.transform !== 'translateX(-20vw)') {
        portfolio.style.cursor = 'pointer';
    }
}

function backMarkerReverse() {
    portfolio.style.cursor = 'default';
}

function changeSlide(direction) {
    if (direction === 'up') {
        activeSlideIndex--
        if (activeSlideIndex < 0) {
            activeSlideIndex = slidesCount - 1
        }
    }
    if (direction === 'down') {

        activeSlideIndex++
        if (activeSlideIndex === slidesCount) {
            activeSlideIndex = 0
        }
    }

    const height = container.clientHeight

    mainSlide.style.transform = `translateY(${activeSlideIndex * height}px)`

    sidebar.style.transform = `translateY(-${activeSlideIndex * height}px)`
}

function changePortfolioSlide(direction) {
    if (direction === 'left') {
        activePortfolioSlideIndex--
        if (activePortfolioSlideIndex < 0) {
            activePortfolioSlideIndex = portfolioSlidesCount - 1
        }


    }
    if (direction === 'right') {
        activePortfolioSlideIndex++
        if (activePortfolioSlideIndex === portfolioSlidesCount) {
            activePortfolioSlideIndex = 0
        }
    }

    const height = portfolio.clientHeight
    const width = portfolio.clientWidth

    if (activePortfolioSlideIndex === 0) {
        portfolio.style.transform = `translateX(-${activePortfolioSlideIndex * width}px)`
    } else if (activePortfolioSlideIndex === 2) {
        portfolio.style.transform = `translateX(calc(-${activePortfolioSlideIndex * width}px - 50vw))`
    } else if (longMobileQuery.matches) {
        portfolio.style.transform = `translateX(calc(-${activePortfolioSlideIndex * width}px - 15vw))`
    } else {
        portfolio.style.transform = `translateX(calc(-${activePortfolioSlideIndex * width}px - 10vw))`
    }

}

function handleMouseClick(e) {
    if (downBtn.style.transform.includes(`rotate(90deg)`) && e.target.className.includes('down')) {
        changePortfolioSlide('left');
    } else if (upBtn.style.transform.includes(`rotate(90deg)`) && e.target.className.includes('up')) {
        changePortfolioSlide('right');
    } else if (e.target.className.includes('up')) {
        changeSlide('up');
    } else if (e.target.className.includes('down')) {
        changeSlide('down');
    }


}