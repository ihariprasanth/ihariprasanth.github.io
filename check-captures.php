<?php
// check-captures.php - Check if captures folder has images

$capture_dir = 'Captures';
$images = [];

if (file_exists($capture_dir)) {
    $files = scandir($capture_dir);
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..' && preg_match('/\.jpg$/i', $file)) {
            $images[] = [
                'filename' => $file,
                'path' => $capture_dir . '/' . $file,
                'size' => filesize($capture_dir . '/' . $file),
                'date' => date('Y-m-d H:i:s', filemtime($capture_dir . '/' . $file))
            ];
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Captures Checker</title>
    <style>
        body {
            font-family: 'Sora', sans-serif;
            background: #111;
            color: #fff;
            margin: 0;
            padding: 30px;
        }
        h1 {
            color: #2563eb;
            margin-bottom: 10px;
        }
        .stats {
            background: #1a1a1a;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
            border: 1px solid #2563eb;
        }
        .stats p {
            margin: 5px 0;
            color: #b5b5b5;
        }
        .stats span {
            color: #00ffb7;
            font-weight: bold;
        }
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
        }
        .image-card {
            background: #1a1a1a;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #2563eb;
        }
        .image-card img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-bottom: 1px solid #333;
        }
        .info {
            padding: 15px;
        }
        .filename {
            color: #00ffb7;
            font-size: 0.8rem;
            word-break: break-all;
            margin-bottom: 5px;
        }
        .details {
            color: #b5b5b5;
            font-size: 0.8rem;
            margin: 3px 0;
        }
        .no-images {
            text-align: center;
            padding: 50px;
            background: #1a1a1a;
            border-radius: 10px;
            color: #b5b5b5;
        }
        .refresh-btn {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            font-family: inherit;
        }
        .refresh-btn:hover {
            background: #1d4ed8;
        }
    </style>
</head>
<body>
    <h1>📸 Captures Folder Checker</h1>
    
    <div class="stats">
        <p>📁 Folder path: <span><?php echo realpath($capture_dir) ?: 'Not found'; ?></span></p>
        <p>📊 Total images: <span><?php echo count($images); ?></span></p>
        <p>📦 Folder permissions: <span><?php echo file_exists($capture_dir) ? substr(sprintf('%o', fileperms($capture_dir)), -4) : 'N/A'; ?></span></p>
        <p>🔍 Folder exists: <span><?php echo file_exists($capture_dir) ? '✅ Yes' : '❌ No'; ?></span></p>
        <p>✏️ Folder writable: <span><?php echo is_writable($capture_dir) ? '✅ Yes' : '❌ No'; ?></span></p>
    </div>
    
    <?php if (empty($images)): ?>
        <div class="no-images">
            <p>📷 No images found in Captures folder yet.</p>
            <p>Try refreshing the page or check if camera permission was granted.</p>
            <button class="refresh-btn" onclick="location.reload()">🔄 Refresh Page</button>
        </div>
    <?php else: ?>
        <h2>📷 Captured Images (<?php echo count($images); ?>)</h2>
        <div class="gallery">
            <?php foreach ($images as $image): ?>
            <div class="image-card">
                <img src="<?php echo $image['path']; ?>" alt="Capture" onerror="this.src='https://via.placeholder.com/250x180?text=Error+Loading'">
                <div class="info">
                    <div class="filename">📄 <?php echo $image['filename']; ?></div>
                    <div class="details">📅 <?php echo $image['date']; ?></div>
                    <div class="details">💾 <?php echo round($image['size'] / 1024, 2); ?> KB</div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
    
    <script>
        // Auto refresh every 10 seconds to check for new images
        setTimeout(() => {
            location.reload();
        }, 10000);
    </script>
</body>
</html>
