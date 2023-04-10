<?php

  include_once('./conexion.php');

  $petName = $_POST['petName'];
  $petBreed = $_POST['petBreed'];
  $sex = $_POST['sex'];
  $species = $_POST['species'];
  $birthDate = $_POST['birthDate'];
  $photoPet = $_FILES['photoPet'];

  // Verificar si se subió correctamente la imagen
if ($photoPet['error'] === UPLOAD_ERR_OK) {
  // Ruta temporal del archivo subido
  $tmpFilePath = $photoPet['tmp_name'];

  // Obtener la extensión del archivo
  $ext = strtolower(pathinfo($photoPet['name'], PATHINFO_EXTENSION));

  // Generar un nombre único para el archivo
  $fileName = uniqid('photo_') . '.' . $ext;

  // Mover el archivo de la ruta temporal a la carpeta deseada
  $destPath = '../pet_photos/';
  move_uploaded_file($tmpFilePath, $destPath . $fileName);

  // Guardar la ruta de la imagen en la base de datos
  $rutaImagen = $destPath . $fileName;
} else {
  // Error al subir la imagen
  $rutaImagen = '';
}

$connect = conectar();

$sql = "INSERT INTO pets (pet_name, pet_breed, sex, species, birth_date, photo_pet) 
        VALUES ('$petName', '$petBreed', '$sex', '$species', '$birthDate', '$rutaImagen')";

$resultado = mysqli_query($connect, $sql);

cerrarConexion($connect);

if ($resultado) {
  http_response_code(200);
  $response = array('success' => true, 'message' => 'El registro se realizó correctamente.');
} else {
  // Hubo un error al insertar el registro
  http_response_code(400);
  $response = array('error' => true, 'message' => 'Ocurrió un error al intentar registrar a la mascota.');
}

header("X-Message: $resultado");

header('Content-Type: application/json');
echo json_encode($response);
die();