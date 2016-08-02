
define(['jquery', 'libs/Class','libs/slick','fastdom'], function(
    $, Class, slick , fastdom
){
            var IndexBanner= Class.extend({
                init: function () {
                    this.init_slick();
                    //console.log('subapp index banner  start !');
                },
                init_slick:function(){
                    $('#index-banners').slick({
                        centerMode: true,
                        arrows: true,
                        slidesToShow: 1,
                        centerPadding:'18%',
                        dots:false,
                        autoplay: true,
                        autoplaySpeed: 3000,

                        //centerPadding: '60px',
                        //slidesToShow: 3,
                        responsive: [
                            {
                                breakpoint: 768,
                                settings: {
                                    centerMode:false,
                                    slidesToShow:1,
                                    slidesToScroll:1,
                                    infinite: true
                                }
                            }
                        ]
                    }).on('beforeChange', this.beforeSlide.bind(this));
                },

                beforeSlide: function(event,slick,currentSlide,nextSlide){
                            //console.log('before change,currentSlide:');
                            //console.log(currentSlide);
                            //console.log('before change,nextSlide:');
                            //console.log(nextSlide);
                            this.nextSlide = nextSlide;
                            fastdom.write(this.doRenderSlide.bind(this));

                },

                doRenderSlide:function(){
                        $('#index-banners .banner-image-cell').removeClass('gk-slide-current');
                        var selector = '#index-banners .gk-slide-'+  this.nextSlide ;
                        $(selector).addClass('gk-slide-current');
                        //console.log('done');
                }

            });
    return IndexBanner;
});



