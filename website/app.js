$(document).ready(function () {
    var currentPageI = -1;
    var screenWidht = $(window).width();
    var pages = [
        $('div.boxMember1'),
        $('div.boxMember2'),
        $('div.boxMember3'),
        $('div.boxMember4'),
        $('div.boxMember5'),
        $('div.boxMember6')
    ];
    var viewsWidth = screenWidht;
    var showPage = function (index) {
        if (index === currentPageI) {
            return;
        }
        var currentPage = pages[currentPageI];
        if (currentPage) {
            currentPage.stop().animate({
                left: -viewsWidth
            })
        }
        var nextPage = pages[index];
        nextPage
            .stop()
            .css({
                left: viewsWidth
            })
            .animate({
                left: 0
            })
        currentPageI = index;
    }
    // show default page
    showPage(0);
    $('a.boxMember1').click(showPage.bind(null, 0));
    $('a.boxMember2').click(showPage.bind(null, 1));
    $('a.boxMember3').click(showPage.bind(null, 2));
    $('a.boxMember4').click(showPage.bind(null, 3));
    $('a.boxMember5').click(showPage.bind(null, 4));
    $('a.boxMember6').click(showPage.bind(null, 5));


    $('.left-right').mouseover(function () {
        $('.slider').stop().animate({
            right: 0
        }, 400);
    }).mouseout(function () {
        $('.slider').stop().animate({
            right: '-screenWidht'
        }, 400);
    });

});
