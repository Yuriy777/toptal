
//show profile image
function handleFileSelect(evt) {
    var file = evt.target.files;
    var f = file[0];
    if (!f.type.match('image.*')) {
        alert("Image only please....");
    }
    var reader = new FileReader();
    reader.onload = (function(theFile) {
        return function(e) {
            var span = document.createElement('span');
            span.innerHTML = ['<img class="thumb" title="', escape(theFile.name), '" src="', e.target.result, '" />'].join('');
            if ($('#output').html() !== '') {
                document.getElementById('output').innerHTML = '';
                document.getElementById('path').innerHTML = '';
            }

            document.getElementById('output').insertBefore(span, null);
            $('#path').append(escape(theFile.name));
        };
    })(f);
    reader.readAsDataURL(f);
    $('.overlay').css('display', 'none');
    //hide block with name of img
    setTimeout(function(){
        $('.bl-addimg').hide();
    }, 1000);
}
$('#file').on('change', handleFileSelect);
$(document).on('click', '.p-img', function(){
    $('.add-file').hide();
    $('.bl-addimg').show();
});


