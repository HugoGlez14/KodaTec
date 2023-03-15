<?php
function conectar()
{
  $db_host = "localhost";
  $db_name = "kodatec";
  $db_user = "mich";
  $db_password = "12345678";


  $conexion = mysqli_connect($db_host, $db_user, $db_password, $db_name);

  if (mysqli_connect_errno()) {
    die('Error de conexión a la base de datos: ' . mysqli_connect_error());
  }

  return $conexion;
}

function cerrarConexion($conexion)
{
  mysqli_close($conexion);
}
?>
