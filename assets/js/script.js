document.addEventListener('DOMContentLoaded', (e) => {
    let menu = document.querySelector('.menu'),
        btnMenu = document.querySelector('.btn-menu');

    btnMenu.addEventListener('click', (e) => {
        menu.classList.toggle('menu--open')

        btnMenu.classList.toggle('btn-menu--open')
    })

    function resize() {
        let width = window.innerWidth;

        if (width > 768) {
            menu.classList.remove('menu--open')
            btnMenu.classList.remove('btn-menu--open')
        } else {
            return
        }
    }

    window.addEventListener('resize', () => {
        resize()
    })
    resize()


    // Модальное окно
    function showModal(btnOpen, modalBody) {
        btnOpen.click(function () {
            modalBody.addClass('active');
            $('html').addClass('no-scroll');
            return false;
        });

        $(document).keydown(function (e) {
            if (e.keyCode === 27) {
                e.stopPropagation();
                modalBody.removeClass('active');
                $('html').removeClass('no-scroll');
            }
        });

        modalBody.click(function (e) {
            if ($(e.target).closest('.modal__wrapper').length == 0) {
                $(this).removeClass('active');
                $('html').removeClass('no-scroll');
            }
        });

        $('.close-modal').click((e) => {
            modalBody.removeClass('active');
            $('html').removeClass('no-scroll');
        })
    }
    showModal($('.open-modal'), $('.modal--form'));

    // Видеоплеер
    $('.click-for-video').click(function () {
        $(this).css('display', 'none')
        $('.complex__btn').css('display', 'none');
        $(this).closest('.complex__body').addClass('full-screen')

        $('div.complex__video').css('display', 'block');
        $('iframe.complex__video').prop('src', 'https://player.vimeo.com/video/1006746739?autoplay=1&amp;mute=1&title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479');
    });

    // Fancybox
    Fancybox.bind('[data-fancybox="video"]', {
        groupAttr: false
    })

    Fancybox.bind('[data-fancybox="build"]', {
        compact: false,
        contentClick: "iterateZoom",
        Images: {
            Panzoom: {
                maxScale: 2,
            },
        },
        wheel: "slide",
        Toolbar: {
            display: {
                left: [
                    "infobar",
                ],
                middle: [],
                right: [
                    "iterateZoom",
                    "close",
                ],
            }
        }
    });

    Fancybox.bind('[data-fancybox="card"]', {
        compact: false,
        contentClick: "iterateZoom",
        Images: {
            Panzoom: {
                maxScale: 2,
            },
        },
        wheel: "slide",
        Toolbar: {
            display: {
                left: [
                    "infobar",
                ],
                middle: [],
                right: [
                    "iterateZoom",
                    "close",
                ],
            }
        }
    });
})