<?php
// test-capture.php - Test if saving works

$capture_dir = 'Captures';

// Create folder if not exists
if (!file_exists($capture_dir)) {
    mkdir($capture_dir, 0777, true);
}

// Create a test image
$test_image = imagecreatetruecolor(320, 240);
$bg = imagecolorallocate($test_image, 37, 99, 235); // Blue background
$text_color = imagecolorallocate($test_image, 255, 255, 255);
imagefill($test_image, 0, 0, $bg);
imagestring($test_image, 5, 50, 100, "Test Capture " . date('H:i:s'), $text_color);

// Save test image
$filename = $capture_dir . '/test_' . date('Y-m-d_H-i-s') . '.jpg';
imagejpeg($test_image, $filename, 80);
imagedestroy($test_image);

echo "✅ Test image saved to: " . $filename . "<br>";
echo "📁 Folder path: " . realpath($capture_dir) . "<br>";
echo "🔍 Folder writable: " . (is_writable($capture_dir) ? 'Yes' : 'No') . "<br>";
echo "📊 Folder permissions: " . substr(sprintf('%o', fileperms($capture_dir)), -4) . "<br>";
?>

<a href="check-captures.php">📸 View Captures</a>
