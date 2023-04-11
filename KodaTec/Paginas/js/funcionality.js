//Funcionalidad general
function validarCampo(field, regex, errorMessage) {
  var input = document.getElementById(field);
  console.log(input.value)

  if (input.value.trim() === "") {
      input.nextElementSibling.textContent = "Este campo debe ser llenado";
      return false;
  } else if (!input.checkValidity()) {
      console.log("El problema es el check")
      input.nextElementSibling.textContent = errorMessage;
      return false;
  } else if (regex && !regex.test(input.value)) {
    console.log("El problema es el regex")
      input.nextElementSibling.textContent = errorMessage;
      return false;
  } else {
      input.nextElementSibling.textContent = '';
      return true;
  }
}

// Funcionalidad carnet
function enviarCarnet() {
  if (validateCarnet()) {
    let formData = new FormData()
    formData.append("petName", document.getElementById("petName").value)
    formData.append("petBreed", document.getElementById("petBreed").value)
    formData.append("sex", document.getElementById("sex").value)
    formData.append("species", document.getElementById("species").value)
    formData.append("birthDate", document.getElementById("birthDate").value)
    formData.append("photoPet", document.getElementById("photoPet").files[0])

    let xhr = new XMLHttpRequest()
    xhr.open('POST', "../paginas/php/carnet.php", true)
    xhr.send(formData)
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
            console.log("Registro guardado")
            $("#message").html(`
            <div class="alert alert-success alert-dismissible show" id="alert" role="alert" data-auto-dismiss="3500">
                <strong>¡Hecho!</strong> ${response.message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Cerrar">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
            window.setTimeout(function() {
                $(".alert").addClass('d-none');
                // window.location.href = "../paginas/login.html";
            }, 5000);
        } else {
            console.log("Algo salio mal con la BD")
            document.getElementById("message").innerHTML = `
        <div class="alert alert-danger alert-dismissible show" id="alert" role="alert" data-auto-dismiss="3500">
            <strong>¡Algo salio mal!</strong> ${response.message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Cerrar">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
        window.setTimeout(function() {
            $(".alert").addClass('d-none');
        }, 5000);
        }
      } else if (xhr.readyState === 4 && xhr.status === 401) {
        console.log("Correo repetido")
        var response = JSON.parse(xhr.responseText);
        $("#message").html(`
        <div class="alert alert-danger alert-dismissible show" id="alert" role="alert" data-auto-dismiss="3500">
            <strong>¡Error!</strong> ${response.message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Cerrar">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `)
        window.setTimeout(function() {
            $(".alert").addClass('d-none');
        }, 5000);
      }
    }
  }else{
    document.querySelector("#message").innerHTML = `
        <div class="alert alert-danger alert-dismissible show" id="alert" role="alert" data-auto-dismiss="3500">
            <strong>¡Algo salio mal!</strong> El formulario no se llenó de manera correcta.
            <button type="button" class="close" data-dismiss="alert" aria-label="Cerrar">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
        window.setTimeout(function() {
            $(".alert").addClass('d-none');
        }, 5000);
  }
}
function validateCarnet() {
  let validPetName = validarCampo('petName', /^[a-zA-Z\s']+$/, 'Ingresa un nombre valido, solo se aceptan caracteres alfabéticos')
  let validpetBreed = validarCampo('petBreed', /^[a-zA-Z\s']+$/, 'Ingresa una raza valida, solo se aceptan caracteres alfabéticos')
  let validSex = validarCampo('sex', /^(Macho|Hembra)$/, 'Selecciona una de las dos opciones validas')
  let validSpecies = validarCampo('species', /^[a-zA-Z\s']+$/, 'Ingresa una especie valida, solo se permiten caracteres alfabéticos')
  let validBirthDate = validarCampo('birthDate', /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/, 'Ingresa una fecha valida')
  let validPhotoPet = validarCampo('photoPet', /\.(jpg|jpeg|png)$/i, 'Solo se permiten formatos, jpg, jpeg y png')

  if (!(validPetName && validpetBreed && validSex && validSpecies && validBirthDate && validPhotoPet)) {
    return false;
  }
  return true;
}

//Funcionalidad registro usuarios
function enviarRegistro() {
  if (validateForm()) {
      var formData = new FormData();
      formData.append("name", document.getElementById("name").value);
      formData.append("lastname", document.getElementById("lastname").value);
      formData.append("email", document.getElementById("email").value);
      formData.append("password", document.getElementById("password").value);

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "../paginas/php/registro.php", true);
      xhr.send(formData);
      xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if (response.success) {
              console.log("Registro guardado")
              $("#message").html(`
              <div class="alert alert-success alert-dismissible show" id="alert" role="alert" data-auto-dismiss="3500">
                  <strong>¡Hecho!</strong> ${response.message}
                  <button type="button" class="close" data-dismiss="alert" aria-label="Cerrar">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              `)
              window.setTimeout(function() {
                  $(".alert").addClass('d-none');
                  window.location.href = "../paginas/login.html";
              }, 5000);
          } else {
              console.log("Algo salio mal con la BD")
              document.getElementById("message").innerHTML = `
          <div class="alert alert-danger alert-dismissible show" id="alert" role="alert" data-auto-dismiss="3500">
              <strong>¡Algo salio mal!</strong> ${response.message}
              <button type="button" class="close" data-dismiss="alert" aria-label="Cerrar">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          `;
          window.setTimeout(function() {
              $(".alert").addClass('d-none');
          }, 5000);
          }
      } else if (xhr.readyState === 4 && xhr.status === 401) {
          console.log("Correo repetido")
          var response = JSON.parse(xhr.responseText);
          $("#message").html(`
          <div class="alert alert-danger alert-dismissible show" id="alert" role="alert" data-auto-dismiss="3500">
              <strong>¡Error!</strong> ${response.message}
              <button type="button" class="close" data-dismiss="alert" aria-label="Cerrar">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          `)
          window.setTimeout(function() {
              $(".alert").addClass('d-none');
          }, 5000);
      }};
  }else{
      document.querySelector("#message").innerHTML = `
          <div class="alert alert-danger alert-dismissible show" id="alert" role="alert" data-auto-dismiss="3500">
              <strong>¡Campos vacíos!</strong> El formulario no se llenó de manera correcta.
              <button type="button" class="close" data-dismiss="alert" aria-label="Cerrar">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          `;
          window.setTimeout(function() {
              $(".alert").addClass('d-none');
          }, 5000);
  }
}

function validateForm() {
  var validName = validarCampo('name', /^[a-zA-Z\s']+$/, 'Ingresa un nombre válido');
  var validLastName = validarCampo('lastname', /^[a-zA-Z\s']+$/, 'Ingresa un apellido válido');
  var validEmail = validarCampo('email', null, 'Ingresa un correo electrónico válido');
  var validPassword = validarCampo('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'Ingresa una contraseña segura (mínimo 8 caracteres, al menos una letra mayúscula, una letra minúscula y un número)');

  if (validName && validLastName && validEmail && validPassword) {
      return true;
  }else{
      return false
  }
}