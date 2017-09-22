
//date block

$('.other-user-info').on('click', '.js_toggle', function(){
    $(this).find('.center-block').hide();
    $(this).addClass('input-block');
    $(this).removeClass('js_toggle');
    if($(this).closest('.block-1').hasClass('textar')) {
        $('.quote-block').hide();
    }
    //clear portfolio and skills in portfolio
    if($(this).closest('.block-1').hasClass('portf')) {
        $(this).closest('.block-1').find('.result-date ul').empty();
        $('.skills-text').empty();
    }
});


$('.input-date').on('click', '.js-close', function(e){
    e.stopPropagation();
    var array = $(this).parent().find('.inline-group');
    var elem = $(this);
    if($(this).closest('.block-1').hasClass('portf')) {
        portfolio.call(elem, array);
    }
    if($(this).closest('.block-1').hasClass('textar')) {
        comment.call(elem, array);
    }
    elem.parent().find('.result-date').show();
    elem.closest('div.block-1').removeClass('input-block').addClass('js_toggle');
});

function portfolio(array) {

    var portfolioSkills = "";
    var counterSkills = 0;

// clean existing skills under portfolio
    $('.skills-text').html('');

    $.each(array, function(i, item) {
        var proj = $(this).find('.proj-n').val();
        var skill = $(this).find('.skill-u').val();

        // in case we already have 3 skills - nope
        if(counterSkills < 3){
            // if we have comma, we need to count it as separate skills
            var pos =  skill.indexOf(',');
            while ( pos != -1 ) {
                counterSkills++;
                pos = skill.indexOf(',', pos+1);
            }
            // if this is last third skill, do not add comma at the end
            var separator = ', ';
            if(counterSkills == 2) separator = '';
            portfolioSkills +=  skill.trim() + separator;
            counterSkills++;
        }

        if (proj !== '' && skill !== '') {
            var li = '<li><strong>' + proj + ',</strong> <span>' + skill + '</span></li>';
            $(this).closest('.block-1').find('.result-date ul').append(li);
        }
    });

// append new skills
    $('.skills-text').append(portfolioSkills);
}



function comment(array) {
    $('.quote-block').show();

    var text = array.find('textarea').val();

    var block = $(this).closest('.block-1');
    block.find('.result-date p').text(text);

    var name = getName();
    block.find('.name-bq').text('- ' + name[0]);
}

function getName() {
    var fullname = $('#name').val();
    var name = fullname.split(' ');
    return name;
}



$('.skills-list').columnize({width:200, columns: 4});








