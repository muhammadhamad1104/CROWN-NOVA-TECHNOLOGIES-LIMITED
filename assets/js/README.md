# JavaScript Libraries for Crown Nova Technologies Limited

This website uses the following JavaScript libraries:

## Required Libraries

1. **jQuery 3.3.1** (jquery-3.3.1.min.js)
   - Download from: https://code.jquery.com/jquery-3.3.1.min.js
   - Or use CDN: `<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>`

2. **Bootstrap 4.x** (bootstrap.min.js)
   - Download from: https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js
   - Or use CDN: `<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>`

3. **Owl Carousel 2** (owl.carousel.js)
   - Download from: https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js
   - Or use CDN: `<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>`

4. **Waypoints** (jquery.waypoints.min.js)
   - Download from: https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js
   - Or use CDN: `<script src="https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js"></script>`

5. **CountUp.js** (jquery.countup.js)
   - Download from: https://cdnjs.cloudflare.com/ajax/libs/jquery-countto/1.2.0/jquery.countTo.min.js
   - Or use CDN: `<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-countto/1.2.0/jquery.countTo.min.js"></script>`

## Custom Scripts

- **main.js** - Main functionality (✓ Created)
- **theme-change.js** - Dark/Light theme switcher (✓ Created)

## Usage

### Option 1: Download Libraries Locally
Download each library from the links above and place them in the `assets/js/` folder.

### Option 2: Use CDN (Recommended for faster loading)
Update HTML files to use CDN links instead of local files:

```html
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

<!-- Bootstrap -->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

<!-- Owl Carousel -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>

<!-- Waypoints -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js"></script>

<!-- CountTo -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-countto/1.2.0/jquery.countTo.min.js"></script>

<!-- Theme Change -->
<script src="assets/js/theme-change.js"></script>

<!-- Main Script -->
<script src="assets/js/main.js"></script>
```

## PowerShell Commands to Download Libraries

Run these commands in PowerShell from the project root directory:

```powershell
# jQuery
Invoke-WebRequest -Uri "https://code.jquery.com/jquery-3.3.1.min.js" -OutFile "assets/js/jquery-3.3.1.min.js"

# Bootstrap
Invoke-WebRequest -Uri "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" -OutFile "assets/js/bootstrap.min.js"

# Owl Carousel
Invoke-WebRequest -Uri "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" -OutFile "assets/js/owl.carousel.js"

# Waypoints
Invoke-WebRequest -Uri "https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js" -OutFile "assets/js/jquery.waypoints.min.js"

# CountTo
Invoke-WebRequest -Uri "https://cdnjs.cloudflare.com/ajax/libs/jquery-countto/1.2.0/jquery.countTo.min.js" -OutFile "assets/js/jquery.countup.js"
```