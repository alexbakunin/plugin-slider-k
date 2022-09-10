(function($) {

    $.fn.sliderK = function(options) {

        // опции
        var config = $.extend({}, {
            img: [
                // картинки в папке img
                // картинки должны иметь одинаковый размер или хотя бы одинаковые пропорции
                'img1.jpg',
                'img2.jpg',
                'img3.jpg',
                'img4.jpg',
                'img5.jpg',
            ],

            imgK: 0.625, // соотношение height/width картинок

            proc: 70, //ширина слйдера от родителя в процентах

            timeOneImg: 10000, //время показа одного изображения

            timeChangeImg: 3000, //время замены изображения другим

            loop: true // повтор всего цикла анимации
        }, options);

        function main(e) {
            e.prepend('<img id="slider-img" src="img/'+config.img[0]+'" alt="img">');
            e.css({
                'background-image': 'url(img/'+config.img[0]+')',
                'background-position': 'center',
                'background-size': 'cover'
            });
            $('#slider-img').css({
                width: '100%',
                height: '100%',
            });

            $(window).load(function(){
                divWparent = e.parent().width();
                divW = Math.floor(divWparent * config.proc / 100);
                divH = Math.floor(divW * config.imgK);
                e.width(divW);
                e.height(divH);
            });

            $(window).resize(function(){
                divWparent = e.parent().width();
                divW = Math.floor(divWparent * config.proc / 100);
                divH = Math.floor(divW * config.imgK);
                e.width(divW);
                e.height(divH);
            });


            i=1;
            function slider(){

                if(i > (config.img.length-1)){
                    if(config.loop){

                        $('#slider-img').attr({'src':'img/' + config.img[0]}).fadeTo(0, 0).fadeTo(config.timeChangeImg, 1, function(){
                            e.css({
                                'background-image': 'url(img/'+config.img[0]+')',
                                'background-position': 'center',
                                'background-size': 'cover'
                            });
                            i=1;
                        });

                    }else{
                        clearInterval(slider_k); // Остановка повтора цикла анимаций
                    }
                }else{
                    $('#slider-img').attr({'src':'img/' + config.img[i]}).fadeTo(0, 0).fadeTo(config.timeChangeImg, 1, function(){
                        e.css({
                            'background-image': 'url(img/'+config.img[i]+')',
                            'background-position': 'center',
                            'background-size': 'cover'
                        });
                        i++;
                    });
                }
            } //END slider()

            slider_k = setInterval(slider, config.timeOneImg);


        }
        this.each(function() { main($(this)); });
        return this;
    };
})(jQuery);