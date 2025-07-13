<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

require 'vendor/autoload.php'; // Make sure to install PHPMailer and phpdotenv via Composer

// Load .env file
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Prevent direct script access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit;
}

// Sanitize and validate input
function sanitize_input($data)
{
    return htmlspecialchars(stripslashes(trim($data)));
}

// Validate email
function is_valid_email($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Collect and validate form data
$first_name = sanitize_input($_POST['firstName'] ?? '');
$last_name = sanitize_input($_POST['lastName'] ?? '');
$email = sanitize_input($_POST['email'] ?? '');
$phone_number = sanitize_input($_POST['phoneNumber'] ?? '');
$subject = sanitize_input($_POST['subject'] ?? '');
$message = sanitize_input($_POST['message'] ?? '');
$recaptcha_token = $_POST['recaptchaToken'] ?? ''; // Get the reCAPTCHA token

$errors = [];

// Validate inputs
if (empty($first_name)) {
    $errors[] = 'First name is required';
}

if (empty($last_name)) {
    $errors[] = 'Last name is required';
}

if (empty($phone_number)) {
    $errors[] = 'Phone number is required';
}

if (!is_valid_email($email)) {
    $errors[] = 'Invalid email address';
}

if (empty($message)) {
    $errors[] = 'Message is required';
}

// Verify reCAPTCHA
if (empty($recaptcha_token)) {
    $errors[] = 'reCAPTCHA token is required';
} else {
    $secret_key = $_ENV['RECAPTCHA_SECRET_KEY'];
    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret_key}&response={$recaptcha_token}");
    $response_keys = json_decode($response, true);

    if (intval($response_keys["success"]) !== 1) {
        $errors[] = 'reCAPTCHA verification failed';
    }
}

// If there are validation errors
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['errors' => $errors]);
    exit;
}

// Email configuration
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP(); // Send using SMTP
    $mail->Host       = $_ENV['SMTP_HOST']; // Load from .env
    $mail->SMTPAuth   = true; // Enable SMTP authentication
    $mail->Username   = $_ENV['SMTP_USERNAME']; // Load from .env
    $mail->Password   = $_ENV['SMTP_PASSWORD']; // Load from .env
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Enable SSL encryption
    $mail->Port       = $_ENV['SMTP_PORT']; // Load from .env

    // Recipients
    $mail->setFrom('noreply@businesstokenizer.com', 'Qdova Token Sale'); // Replace with your from email and name
    $mail->addAddress('as@businesstokenizer.com'); // Replace with the recipient's email

    // Content
    $formatted_message = nl2br(htmlspecialchars($message)); // Convert new lines to <br> and escape HTML
    $mail->isHTML(true); // Set email format to HTML
    $mail->Subject = 'Qdova Form Submission';
    $mail->Body    = "First Name: $first_name<br/>Last Name: $last_name<br/>Phone Number: $phone_number<br/>Email: <a href='mailto:$email'>$email</a><br/>Subject: $subject<br/><br/>Message:<br/>$formatted_message";

    // Send email
    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email: ' . $mail->ErrorInfo]);
}
exit;
