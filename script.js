// Simple interactions for Spotify Clone

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar Active State
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // 2. Simulated Progress Bar
    const progressBar = document.querySelector('.playback-bar .progress-bar');
    const currTime = document.querySelector('.curr-time');
    let isPlaying = false;
    let time = 0;

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    setInterval(() => {
        if (isPlaying && time < 213) { // 3:33 = 213s
            time++;
            progressBar.value = (time / 213) * 100;
            currTime.textContent = formatTime(time);
        }
    }, 1000);

    // 3. Play Button Toggle
    const playBtn = document.querySelector('.play-btn');
    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playBtn.src = './Assets/player_icon3.png'; // Assuming this is play, maybe need a pause icon
            // In a real app, we'd toggle the icon to pause
            playBtn.style.filter = 'invert(1) sepia(1) saturate(5) hue-rotate(90deg)'; // Green-ish tint to show active
        } else {
            playBtn.style.filter = 'invert(1)';
        }
    });

    // 4. Card Hover Play Simulation
    const cards = document.querySelectorAll('.music-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const trackName = card.querySelector('h3').textContent;
            const trackArtist = card.querySelector('p').textContent;
            const trackImg = card.querySelector('img').src;

            document.querySelector('.track-name').textContent = trackName;
            document.querySelector('.track-artist').textContent = trackArtist;
            document.querySelector('.track-img').src = trackImg;
            
            // Reset and play
            time = 0;
            isPlaying = true;
            playBtn.style.filter = 'invert(1) sepia(1) saturate(5) hue-rotate(90deg)';
        });
    });

    // 5. Volume Bar
    const volumeBar = document.querySelector('.volume-bar .progress-bar');
    volumeBar.addEventListener('input', (e) => {
        const volumeIcon = document.querySelector('.player-right .fa-volume-high');
        if (e.target.value == 0) {
            volumeIcon.className = 'fa-solid fa-volume-xmark';
        } else if (e.target.value < 50) {
            volumeIcon.className = 'fa-solid fa-volume-low';
        } else {
            volumeIcon.className = 'fa-solid fa-volume-high';
        }
    });
});
