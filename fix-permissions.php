<?php
// fix-permissions.php - Fix folder permissions

$capture_dir = 'Captures';

if (!file_exists($capture_dir)) {
    mkdir($capture_dir, 0777, true);
    echo "✅ Created Captures folder<br>";
}

// Set permissions
chmod($capture_dir, 0777);
echo "✅ Set folder permissions to 777<br>";

// Create .htaccess to protect folder
$htaccess = $capture_dir . '/.htaccess';
file_put_contents($htaccess, "Order Deny,Allow\nDeny from all\n");
echo "✅ Created .htaccess protection<br>";

echo "<br>📁 Folder path: " . realpath($capture_dir) . "<br>";
echo "🔍 Folder writable: " . (is_writable($capture_dir) ? 'Yes' : 'No') . "<br>";
echo "📊 Permissions: " . substr(sprintf('%o', fileperms($capture_dir)), -4) . "<br>";

// Test write
$test_file = $capture_dir . '/test_write.txt';
if (file_put_contents($test_file, 'test')) {
    echo "✅ Can write to folder<br>";
    unlink($test_file);
} else {
    echo "❌ Cannot write to folder<br>";
}
?>

<a href="test-capture.php">📸 Test Capture</a>
