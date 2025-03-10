<?php

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS")
{
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST")
{
    http_response_code(405);
    exit();
}

$rawData = json_decode(file_get_contents("php://input"), true);

if (!$rawData)
{
    http_response_code(400);
    exit();
}

$ip = $_SERVER["REMOTE_ADDR"];
$dir = __DIR__ . "/../users/$ip";
$timestamp = date("Y-m-d_H-i-s");
$logData = [];

if (!file_exists($dir))
{
    mkdir($dir, 0777, true);
}

foreach ($rawData as $key => $value)
{
    if ($key === "image")
    {
        file_put_contents("$dir/$timestamp.png", base64_decode($value));
    }
    else
    {
        $logData[] = "$key: " . json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}

if ($logData)
{
    file_put_contents("$dir/$timestamp.txt", implode(PHP_EOL, $logData) . PHP_EOL, FILE_APPEND);
}

http_response_code(200);
