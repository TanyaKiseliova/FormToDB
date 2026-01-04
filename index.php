<?php
$dbFile = __DIR__ . "/src/db.db";

try {
    $pdo = new PDO("sqlite:" . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS requests (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           first_name TEXT NOT NULL, 
           last_name TEXT NOT NULL, 
           middle_name TEXT, 
           birth_date TEXT,
           marital_status TEXT, 
           email TEXT,
           phone TEXT,     
           about TEXT
        )
    ");
} catch (PDOException $e) {
    die("Ошибка подключения к базе: " . $e->getMessage());
}

function clean($v) {
    return htmlspecialchars(trim($v ?? ""), ENT_QUOTES, "UTF-8");
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $firstName     = clean($_POST["first_name"] ?? "");
    $lastName      = clean($_POST["last_name"] ?? "");
    $middleName    = clean($_POST["middle_name"] ?? "");
    $birthDate     = clean($_POST["birth_date"] ?? "");
    $maritalStatus = clean($_POST["marital_status"] ?? "");
    $email         = clean($_POST["email"] ?? "");
    $about         = clean($_POST["about"] ?? "");

    $phones = $_POST["phone"] ?? [];
    if (!is_array($phones)) {
        $phones = [$phones];
    }

    $phones = array_values(array_filter(array_map(
        fn($p) => preg_replace('/\D+/', '', $p),
        $phones
    )));

    $phonesString = implode(", ", $phones);

    $errors = [];
    if ($firstName === "") $errors[] = "Введите имя";
    if ($lastName === "")  $errors[] = "Введите фамилию";
    if ($email === "" && $phonesString === "") $errors[] = "Заполните хотя бы email или телефон";
    if ($email !== "" && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Некорректный email";
    }

    if (!empty($errors)) {
        echo "<h3 style='color:red;'>Исправьте ошибки:</h3>";
        foreach ($errors as $err) echo "<p>$err</p>";
        echo '<a href="index.html">Назад</a>';
        exit;
    }

    $stmt = $pdo->prepare("
        INSERT INTO requests (
            first_name, last_name, middle_name, birth_date, marital_status,
            email, phone, about
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $firstName, $lastName, $middleName, $birthDate, $maritalStatus,
        $email, $phonesString, $about
    ]);

    echo "<h2 style='color:green;'>Успешно</h2>";
    echo "<p>Заявка сохранена.</p>";
    exit;
}
?>
