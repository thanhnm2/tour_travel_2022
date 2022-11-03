
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
function onLoad() {
    var id = localStorage.getItem("detail")
    getTours(function (tours) {
        renderTour(tours, id || 1)
    })
    // localStorage.clear();
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
function renderTour(tours, id = 1) {
    var tourBlock = document.querySelector('.container__detail')
    var tourPackage = tourBlock.querySelector('.row')

    var htmls = tours.map(function (tour) {
        if (tour.id == id)
            return `
        <div class="tour__detail">
                    <div class="tour__package">
                        <div class="tour__package__img">
                            <img src="./asserts/img/travel/${tour.img}" alt="">
                        </div>
                        <div class="tour__pakage__voting">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="tour__package__title">
                            <span>${tour.title}</span>
                        </div>
                        <div class="tour__package__detail">
                            <span>${tour.description}</span>
                        </div>
                    </div>
                    <div class="tour__booking">
                        <div class="tour__booking__title">
                            <span> Book This Tour</span>
                        </div>
                        <div class="tour__booking__group">
                            <input type="text" class="tour__booking__name" placeholder="Your full name">
                            <input type="email" class="tour__booking__email" placeholder="Your email">
                            <input type="number" class="tour__booking__phone" placeholder="Your phone">
                            <input type="date" class="tour__booking__date">
                            <textarea placeholder="Type your message"></textarea>
                            <button class="tour__booking__btn" onclick="showResult();">Book Now</button>
                        </div>
                    </div>
                </div>`
    })
    tourPackage.innerHTML = htmls.join('')

}
function showResult() {
    var islogin = sessionStorage.getItem('login')
    if (islogin != 1) {
        alert('You can log in before booking')
        return;
    }
    const main = document.getElementById('toast');
    let booking = document.querySelector('.tour__booking__group')
    let name = booking.querySelector('.tour__booking__name')
    let email = booking.querySelector('.tour__booking__email')
    let phone = booking.querySelector('.tour__booking__phone')
    let date = booking.querySelector('.tour__booking__date')

    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (name.value == '' || email.value == '' || phone.value == '' || date.value == '') {
        if (main) {
            const toast = document.createElement('div')
            toast.classList.add('toasterror');
            toast.innerHTML = `        
                        <div class="iconerror">
                            <i class="fa-solid fa-circle-check " ></i>
                        </div>
                        <div class="body">
                            <h3 class="title">Error</h3>
                            <p class="message">Type your infomation</p>
                        </div>               
                        `
            main.appendChild(toast);

            setTimeout(function () {
                main.removeChild(toast);
            }, 3000)
        }
    }
    else if (regex.test(email.value) == false) {
        if (main) {

            const toast = document.createElement('div')
            toast.classList.add('toasterror');

            toast.innerHTML = `        
                    <div class="iconerror">
                        <i class="fa-solid fa-circle-check " ></i>
                    </div>
                    <div class="body">
                        <h3 class="title">Error</h3>
                        <p class="message">Type your email</p>
                    </div>               
                    `
            main.appendChild(toast);

            setTimeout(function () {
                main.removeChild(toast);
            }, 3000)
        }
    }
    else {
        if (main) {

            const toast = document.createElement('div')
            toast.classList.add('toastsuccess');

            toast.innerHTML = `        
                    <div class="iconsuccess">
                        <i class="fa-solid fa-circle-check " ></i>
                    </div>
                    <div class="body">
                        <h3 class="title">Success</h3>
                        <p class="message">Booking Success</p>
                    </div>               
                    `
            main.appendChild(toast);
            name.value = ''
            email.value = ''
            phone.value = ''
            date.value = ''

            setTimeout(function () {
                main.removeChild(toast);
            }, 3000)
        }
    }
}
onLoad()

