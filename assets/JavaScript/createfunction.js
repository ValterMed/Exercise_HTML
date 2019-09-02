function emailValidation(email) {
  var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email) ? true : alert("email incorrecto");
}

function createUser() {
  var email = document.getElementsByName("email")[0].value;
  if (emailValidation(email) ) {
    var name = document.getElementsByName("name")[0].value;
    var job = document.getElementsByName("job")[0].value;
    var phone = document.getElementsByName("phone")[0].value;
    $.ajax({
      url:"https://api.myjson.com/bins",
      type:"POST",
      data:`{"name":"${name}", "job":"${job}", "email":"${email}", "phone":"${phone}" }`,
      contentType:"application/json; charset=utf-8",
      dataType:"json",
      success: function(data, textStatus, jqXHR){
        console.log(data);
        console.log(textStatus);
        var redirect = data.uri;
        var pagina = `secondview.html?url=${redirect}`;
        goToNextPage(pagina)
      }
    });
  }
}

function goToNextPage(pagina) {
  location.href=pagina;
}

function getUser() {
  var fullParameter = window.location.search.substring(1);
  var parameter = fullParameter.split('=');
  parameter[1];

  $.ajax({
    url:parameter[1],
    type:"GET",
    success: function(data, textStatus, jqXHR){
      console.log(data);
      document.getElementsByClassName("get-name")[0].innerHTML = data.name;
      document.getElementsByClassName("get-job")[0].innerHTML = data.job;
      document.getElementsByClassName("get-email")[0].innerHTML = data.email;
      document.getElementsByClassName("get-phone")[0].innerHTML = data.phone;
    }
  });
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

function editUser() {
  var name = document.getElementsByClassName("get-name")[0].innerHTML;
  var job = document.getElementsByClassName("get-job")[0].innerHTML;
  var email = document.getElementsByClassName("get-email")[0].innerHTML;
  var phone = document.getElementsByClassName("get-phone")[0].innerHTML;
  var pagina = `thirdview.html?name=${name}&job=${job}&email=${email}&phone=${phone}`;
  goToNextPage(pagina);
}

function fillForm() {
  var nameValue = getQueryVariable("name");
  var nameWords = nameValue.split("%20");
  nameValue = nameWords.join(" ");
  var jobValue = getQueryVariable("job");
  var jobWords = jobValue.split("%20");
  jobValue = jobWords.join(" ");
  var emailValue = getQueryVariable("email");
  var phoneValue = getQueryVariable("phone");
  $('#put-name').val(nameValue);
  $('#put-job').val(jobValue);
  $('#put-email').val(emailValue);
  $('#put-phone').val(phoneValue);
}