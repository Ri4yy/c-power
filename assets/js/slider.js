const swiperPartners = new Swiper('.swiper-build', {
    spaceBetween: 20,
    enabled: true,

    breakpoints: {
        320: {
            allowTouchMove: true,
            slidesPerView: 1.2,
            grid: {
                rows: 1,
                fill: "row",
            }
        },
        480: {
            allowTouchMove: true,
            slidesPerView: 2,
            grid: {
                rows: 1,
                fill: "row",
            }
        },
        768: {
            allowTouchMove: true,
            slidesPerView: 3,
            grid: {
                rows: 1,
                fill: "row",
            }
        },
        1024: {
            allowTouchMove: true,
            slidesPerView: 2,
            grid: {
                rows: 2,
                fill: "row",
            }
        },
        1280: {
            allowTouchMove: true,
            slidesPerView: 3,
            grid: {
                rows: 2,
                fill: "row",
            }
        },
        1921: {
            allowTouchMove: true,
            slidesPerView: 4,
            grid: {
                rows: 2,
                fill: "row",
            }
        },
    }
});

const swiperCard = new Swiper('.swiper-card', {
    // Optional parameters
    slidesPerView: 1,

    // If we need pagination
    pagination: {
        el: '.swiper-card__pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-card__next',
        prevEl: '.swiper-card__prev',
    },
});