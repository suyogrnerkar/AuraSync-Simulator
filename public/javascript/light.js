$(document).ready(function() {
  let API_URL = 'http://192.168.2.5:3000/api/data';
  let fadeTimeAll = 3000;
  let fadeTime = 2000;
  let interval = 5000;


  $('body').addClass('night');
  // $('.bulb-light').click(function() {
  //   $('body').toggleClass('night');
  // });
  $('.bulb-light').fadeTo(fadeTimeAll , 0);


  function doAjax() {
    $.ajax({
      type: 'GET',
      url: API_URL,
      data: $(this).serialize(),
      dataType: 'json',
      crossDomain : true,
      success: function (data) {
        let brightness;
        
        console.log(data.luminosity);

        if (Number.parseFloat(data.luminosity) <= 990) {
          brightness = 0;
        }
        else if (Number.parseFloat(data.luminosity) > 990 &&
                 Number.parseFloat(data.luminosity) <= 991) {
          brightness = 0.1;
        }
        else if (Number.parseFloat(data.luminosity) > 991 && 
                 Number.parseFloat(data.luminosity) <= 992) {
          brightness = 0.2;
        }
        else if (Number.parseFloat(data.luminosity) > 992 &&
                 Number.parseFloat(data.luminosity) <= 993) {
          brightness = 0.3;
        }
        else if (Number.parseFloat(data.luminosity) > 993 && 
                 Number.parseFloat(data.luminosity) <= 994) {
          brightness = 0.4;
        }
        else if (Number.parseFloat(data.luminosity) > 994 &&
                 Number.parseFloat(data.luminosity) <= 995) {
          brightness = 0.5;
        }
        else if (Number.parseFloat(data.luminosity) > 995 &&
                 Number.parseFloat(data.luminosity) <= 996) {
          brightness = 0.6;
        }
        else if (Number.parseFloat(data.luminosity) > 996 &&
                 Number.parseFloat(data.luminosity) <= 997) {
          brightness = 0.7;
        }
        else if (Number.parseFloat(data.luminosity) > 997 &&
                 Number.parseFloat(data.luminosity) <= 998) {
          brightness = 0.8;
        }
        else if (Number.parseFloat(data.luminosity) > 998 &&
                 Number.parseFloat(data.luminosity) <= 999) {
          brightness = 0.9;
        }
        else if (Number.parseFloat(data.luminosity) > 999 &&
                 Number.parseFloat(data.luminosity) <= 1000) {
          brightness = 1;
        }
        else {
          brightness = 0;
        }

        console.log(data, brightness);
        $(`#${data.wifi}`).fadeTo(fadeTime , brightness);
        $('.bulb-light').not(`#${data.wifi}`).fadeTo(fadeTime , 0);
      },
      complete: function (data) {
        setTimeout(doAjax, interval);
      }
    });
  }

  setTimeout(doAjax, interval);
});