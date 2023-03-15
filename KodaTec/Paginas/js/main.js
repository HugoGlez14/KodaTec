(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Date and time picker
    $('#date').datetimepicker({
        format: 'L'
    });
    $('#time').datetimepicker({
        format: 'LT'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        center: true,
        autoplay: true,
        smartSpeed: 2000,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

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

function validarCampo(field, regex, errorMessage) {
    var input = document.getElementById(field);

    if (input.value.trim() === "") {
        input.nextElementSibling.textContent = "Este campo debe ser llenado";
        return false;
    } else if (!input.checkValidity()) {
        input.nextElementSibling.textContent = errorMessage;
        return false;
    } else if (regex && !regex.test(input.value)) {
        input.nextElementSibling.textContent = errorMessage;
        return false;
    } else {
        input.nextElementSibling.textContent = '';
        return true;
    }
}

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