<?php
  include_once('conexion.php');

    $name = $_POST['name'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $connect = conectar();

    // Verificar si el correo electrónico ya se encuentra registrado
    $consulta = "SELECT * FROM usuarios WHERE email = '$email'";
    $resultado = mysqli_query($connect, $consulta);
    if (mysqli_num_rows($resultado) > 0) {
      http_response_code(401);
      $response = array('error' => false, 'message' => 'El correo electrónico, ya se encuentra registrado.');
      echo json_encode($response);
      die();
    }

    // Preparar la consulta SQL para insertar un nuevo registro en la tabla de users
    $consulta = "INSERT INTO usuarios (nombre, apellido, email, password) VALUES ('$name', '$lastname', '$email', '$password')";
    // Ejecutar la consulta SQL
    $resultado = mysqli_query($connect, $consulta);
    // Cerrar la conexión a la base de datos
    cerrarConexion($connect);
    if ($resultado) {
      http_response_code(200);
      $response = array('success' => true, 'message' => 'El registro se realizó correctamente.');
      echo json_encode($response);
      die();
    } else {
      // Hubo un error al insertar el registro
      http_response_code(400);
      $response = array('error' => false, 'message' => 'Ocurrió un error al intentar registrar el usuario.');
      echo json_encode($response);
      die();
    }

?>