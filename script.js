const upBtn = document.querySelector(".up-button");
const downBtn = document.querySelector(".down-button");
const sidebar = document.querySelector(".sidebar");
const container = document.querySelector(".container");
const mainSlide = document.querySelector(".main_slide");
const portfolio = document.querySelector('.main_slides:nth-child(3)');
const anyPortfolio = document.querySelectorAll('.main_slides:nth-child(3) > .main_slides_portfolio_slide');
const anyPortfolioPhotos = document.querySelectorAll('.main_slides_portfolio_slide > img');
const portfolioSlide = document.querySelector('.main_slides_portfolio_slide');
const portfolioSlide2 = document.querySelector('.main_slides_portfolio_slide:nth-child(2)');

const slidesCount = mainSlide.querySelectorAll(".main_slides").length
const portfolioSlidesCount = portfolio.querySelectorAll('.main_slides_portfolio_slide').length
let activeSlideIndex = 0
let activePortfolioSlideIndex = 0


mainSlide.style.top = `-${(slidesCount - 1) * 100}vh`
portfolioSlide.style.right = `-${(portfolioSlidesCount - 1) * 100}vw`
portfolioSlide2.style.right = `-${(portfolioSlidesCount - 2) * 80}vw`

upBtn.addEventListener("click", handleMouseClick)
downBtn.addEventListener("click", handleMouseClick)

document.addEventListener("keydown", event => {
    if (sidebar.style.transform !== `translateX(-1342px)`) {
        if (event.key === "ArrowUp") {
            changeSlide("up")
        } else if (event.key === "ArrowDown") {
            changeSlide("down")
        }
    }

    if (sidebar.style.transform === `translateX(-1342px)`) {
        if (event.key === "ArrowLeft") {
            changePortfolioSlide('left')
        } else if (event.key === "ArrowRight") {
            changePortfolioSlide('right')
        }
    }
})

document.addEventListener('click', (e) => {

    for (let i = 0; i < portfolioSlidesCount; i++) {
        if (e.target === anyPortfolio[i]) {
            if (sidebar.style.visibility === 'hidden') {
                wrapSlide(e.target)
            } else {
                unwrapSlide(e.target)
            }
        }
    }
    // if (e.target.className === 'main_slides_portfolio_slide_img' && sidebar.style.visibility === 'hidden') {
    //     e.target.style.transform = `translate3d(25vw,10vh,50vh)`
    // }
})


portfolio.addEventListener('mouseover', backMarker);
portfolio.addEventListener('mouseout', backMarkerReverse);

function unwrapSlide(e) {


    const slideWidth = container.clientWidth

    if (e === anyPortfolio[2] && anyPortfolio[2].style.transform === `translateX(-10vw)`) {
        e.style.transform = `translateX(0vw)`
    } else if (e !== anyPortfolio[2]) {
        e.style.transform = `translateX(0vw)`
    } else if (e === anyPortfolio[2]) {
        e.style.transform = `translateX(-10vw)`
    }
    sidebar.style.transform = `translateX(-20vw)`
    downBtn.style.transform = `translateX(-17.5vw) rotate(90deg)`
    upBtn.style.transform = `translateX(75vw)  rotate(90deg)`

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
    if (portfolio.style.transform !== `translateX(-20vw)`) {
        portfolio.style.cursor = 'pointer';
    }
}

function backMarkerReverse() {
    portfolio.style.cursor = 'default';
}

function changeSlide(direction) {
    if (direction === "up") {
        activeSlideIndex--
        if (activeSlideIndex < 0) {
            activeSlideIndex = slidesCount - 1
        }
        console.log();
    } else if (direction === "down") {

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
    if (direction === "left") {
        activePortfolioSlideIndex--
        if (activePortfolioSlideIndex < 0) {
            activePortfolioSlideIndex = portfolioSlidesCount - 1
        }


    } else if (direction === "right") {
        activePortfolioSlideIndex++
        console.log(activePortfolioSlideIndex);
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
    } else {
        portfolio.style.transform = `translateX(calc(-${activePortfolioSlideIndex * width}px - 10vw))`
    }

}


function handleMouseClick(e) {
    if (downBtn.style.transform === `translateX(-17.5vw) rotate(90deg)` && e.target.className.includes('down')) {
        changePortfolioSlide("left");
    } else if (upBtn.style.transform === `translateX(75vw) rotate(90deg)` && e.target.className.includes('up')) {
        changePortfolioSlide("right");
    } else if (e.target.className.includes('up')) {
        changeSlide('up');
    } else if (e.target.className.includes('down')) {
        changeSlide('down');
    }


}