
var cagetory = document.querySelector('.cagetory__wrap')
var apiTour = 'https://632d7be60d7928c7d24c1655.mockapi.io/Tour'

function showCagetory() {

    if (cagetory) {
        cagetory.classList.remove('cagetory__wrap__close')
        cagetory.classList.add('cagetory__wrap__show')
        window.onscroll = function () { window.scrollTo(0, 0); };
    }

}
function closeCagetory() {
    if (cagetory) {
        cagetory.classList.remove('cagetory__wrap__show')
        cagetory.classList.add('cagetory__wrap__close')
        window.onscroll = function () { };

    }
}

function showMenu() {
    var menuHide = document.querySelector('.menuhide')
    var menuHideWrap = document.querySelector('.menuhide__wrap')
    if (menuHide) {

        menuHide.classList.add('showMenu')
        menuHide.classList.remove('closeMenu')
        window.onscroll = function () { window.scrollTo(0, 0); };
    }
    if (menuHideWrap) {
        menuHideWrap.addEventListener('click', function () {


            menuHide.classList.remove('showMenu')
            menuHide.classList.add('closeMenu')
            window.onscroll = function () { };
        })
    }

}
function showSingupForm() {

    const registerform = document.querySelector('.registerform')
    registerform.classList.remove('hideModal')
    registerform.classList.add('showModal')
    const modalBg = registerform.querySelector('.modal_background')
    modalBg.addEventListener('click', function () {
        registerform.classList.remove('showModal')
        registerform.classList.add('hideModal')
    })

}
function showSinginForm() {

    const login = document.querySelector('.loginform')
    login.classList.remove('hideModal')
    login.classList.add('showModal')
    const modalBg = login.querySelector('.modal_background')
    modalBg.addEventListener('click', function () {
        login.classList.remove('showModal')
        login.classList.add('hideModal')
    })

}
function getTourbyNumber() {
    getTours(function (tours) {

        var threeTour = tours.filter(function (tour) {
            return tour.id < 7
        })
        renderTour(threeTour)
    })
}
function onLoad() {
    getTourbyNumber()
}

function getTours(callback) {
    fetch(apiTour).then(function (reponse) {
        return reponse.json()
    })
        .then(callback)
        .catch(function () {
            alert("Có lỗi vui lòng reload")
        })
}
function renderTour(tours) {

    var tourBlock = document.querySelector('.container')
    var tourPackage = tourBlock.querySelector('.row')

    var htmls = tours.map(function (tour) {

        return `
        <div class="container__package col l-4 ms-6 s-12 ">
                    <div class="container__package__img">
                        <img src="./asserts/img/travel/${tour.img}" data-id="${tour.id}" onclick="showTourDetail(this);">
                        <div class="container__package__day"><span>${tour.numberofday}</span></div>
                    </div>
                    <a onclick="showTourDetail(this);"  class="container__package__detail" data-id="${tour.id}">
                        ${tour.title}
                    </a>
                    <div class="container__package__footer">
                        <button onclick="showTourDetail(this);" data-id="${tour.id}" class="container__package__book">
                      BOOK NOW
                        </button>
                        <div class="container__package__price">From</br>
                            <span>${tour.price}</span>
                        </div>
                    </div>
                </div>`
    })

    tourPackage.innerHTML = htmls.join('')

}

function showTourDetail(booking) {
    window.location = './cagetory.html'

    var id = booking.getAttribute('data-id')
    console.log(id)
    localStorage.setItem("detail", id)
}

onLoad()




