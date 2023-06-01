$(document).ready(function () {
    let leftBlockVisible = true;

    $('#arrow-left').click(function () {
        if (leftBlockVisible) {
            $('.cont1').animate({ width: '0%' }, 300);
            // $('.cont2').animate({ width: '100%' }, 300);
            $(this).toggleClass('arrow-right arrow-left');
        } else {
            $('.cont1').animate({ width: '28%' }, 300);
            $(this).toggleClass('arrow-right arrow-left');
        }
        leftBlockVisible = !leftBlockVisible;
    });

    let minBlockHeight = 100;
    let sliderFirstDragging = false;
    let sliderSecondDragging = false;
    let prevY;

    $('.linear1').mousedown(function (e) {
        e.preventDefault();
        sliderFirstDragging = true;
        prevY = e.pageY;
    });

    $('.linear2').mousedown(function (e) {
        e.preventDefault();
        sliderSecondDragging = true;
        prevY = e.pageY;
    });

    $(document).mousemove(function (e) {
        if (sliderFirstDragging) {
            var deltaY = e.pageY - prevY;
            var upperBlockHeight = $('.box3').height();
            var lowerBlockHeight = $('.box4').height();
            var rightBlockHeight = $('.box2').height();
            var leftBlockHeight = $('.box1').height();

            if (upperBlockHeight + deltaY >= minBlockHeight && lowerBlockHeight - deltaY >= minBlockHeight) {
                $('.box3').height(upperBlockHeight + deltaY);
                $('.box4').height(lowerBlockHeight - deltaY);

                prevY = e.pageY;
            }
        } else if (sliderSecondDragging) {
            var deltaY = e.pageY - prevY;
            var rightBlockHeight = $('.box2').height();
            var leftBlockHeight = $('.box1').height();

            if (leftBlockHeight + deltaY >= minBlockHeight && rightBlockHeight - deltaY >= minBlockHeight) {
                $('.box2').height(rightBlockHeight - deltaY);
                $('.box1').height(leftBlockHeight + deltaY);
                prevY = e.pageY;
            }
        }
    });

    $(document).mouseup(function () {
        sliderFirstDragging = false;
        sliderSecondDragging = false;
    });
});
