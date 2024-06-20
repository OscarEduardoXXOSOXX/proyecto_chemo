<?php
// Verificar si se han enviado datos mediante el método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Aquí iría la lógica para verificar las credenciales del usuario
    // Por ejemplo, consultar una base de datos para verificar si el correo y la contraseña coinciden

    // Ejemplo de verificación de credenciales (simulado)
    $stored_email = "cliente@example.com";
    $stored_password = "contraseña123";

    // Comprobar si las credenciales coinciden
    if ($email === $stored_email && $password === $stored_password) {
        // Inicio de sesión exitoso
        session_start();
        $_SESSION["email"] = $email; // Guardar el correo electrónico en la sesión

        // Redirigir al usuario a la página de inicio
        header("Location: inicio.html");
        exit();
    } else {
        // Credenciales incorrectas, verificar si el usuario está registrado como cliente
        if ($email === $stored_email) {
            // Si el correo electrónico coincide pero la contraseña no, mostrar mensaje de error
            $error_message = "La contraseña es incorrecta. Inténtelo de nuevo.";
        } else {
            // Si el correo electrónico no coincide, redirigir al usuario a la página de registro
            header("Location: registro.html");
            exit();
        }
        // Redirigir de vuelta al formulario de inicio de sesión con un mensaje de error
        header("Location: clientes.html?error=" . urlencode($error_message));
        exit();
    }
} else {
    // Si se intenta acceder directamente a este script sin enviar datos por POST, redirigir al formulario de inicio de sesión
    header("Location: clientes.html");
    exit();
}
?>
