(function() {
    var body = document.body;
    var burgerMenu = document.getElementsByClassName('menu-opener')[0];

    burgerMenu.addEventListener('click', function toggleClasses() {
        [body].forEach(function (el) {
            el.classList.toggle('menu-open');
        });
    }, false);
})();

$('#name').focusout(function(){
    $(this).closest('.name-group').find('h1').text($(this).val()).show();
    $(this).hide();
});
$('.name-group').on('click', 'h1', function (){
    $(this).hide();
    $('#name').show().focus();
});

// add skill
$(document).on('click', '.inpsel', function(){
    $(this).hide();
    $('.skills').show();
});

//create skill block click or keypress enter
$('.skill-inp').keypress(function(e) {
    if((e.keyCode || e.which) == 13) {
        e.preventDefault();
        addtag();
    }
});
$(document).on('click', '.js-sendskill', function(){
    addtag();
});

//remove skill
$('.skills-block').on('click', '.js-remove', function(){
    $(this).closest('li').remove();
});

function addtag() {
    var text = $('#skills').val();
    if(text !== '') {
        $('#skills').val(''); //clear input
        var item = $("#plhItem").clone();
        $(item).removeAttr('id').find(".skill-item").addClass($('#tags').val()).text(text);
        $('#skills-block').append(item);
        $('.inpsel').show();
        $('.skills').hide();
    }
};

