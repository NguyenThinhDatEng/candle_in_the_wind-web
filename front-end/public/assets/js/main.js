$(".single-item").slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    speed: 300,
    prevArrow: false,
    nextArrow: false
});

$('.responsive').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});


