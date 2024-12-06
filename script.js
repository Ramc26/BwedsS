$(document).ready(function() {
  // ------------- COUNTDOWN TIMER ------------- //
  function countdown() {
    const eventDate = new Date('2025-02-21T05:05:00'); // Sumuhurtham Date & Time
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      $('#timer').text("It's Sumuhurtham Time!");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    $('#timer').text(`${days} Days ${hours} Hrs ${minutes} Min ${seconds} Sec`);
  }

  // Update Timer Every Second
  setInterval(countdown, 1000);
  countdown();
  
  // ------------- TYPING EFFECT FOR SLOKA ------------- //
  // Initialize Typed.js for Sloka
  var typed = new Typed('.sloka', {
    strings: [
      `ఇయం సీత మమ సుతా సహ ధర్మచారిణి తవ।
ప్రతిచ్ఛ చేను భద్రం తే పాణిం గృహ్ణీష్వ పాణినా॥`
    ],
    typeSpeed: 30,        // Typing speed in milliseconds
    backSpeed: 0,         // Backspacing speed (not needed here)
    showCursor: false,    // Hide the cursor
    smartBackspace: false, // Disable smart backspace
    onComplete: function(self) {
      // After typing, fade in middle content (names and timer)
      $('.middle-content').addClass('visible');

      // After a short delay, fade in bottom content (Kalyanam image)
      setTimeout(function() {
        $('.bottom-content').addClass('visible');
      }, 1000); // Adjust delay as needed

      // Show the Play button after sloka typing is complete
      $('#audio-control-button').fadeIn(500); // Fade in over 0.5 seconds
    }
  });

  // Initialize fade-in classes for smooth appearance
  $('.middle-content, .bottom-content').addClass('fade-in');

  // ------------- AUDIO CONTROL BUTTON FUNCTIONALITY ------------- //
  var isPlaying = false; // Track if audio is playing
  var isMuted = false;   // Track if audio is muted

  $('#audio-control-button').on('click', function() {
    var audio = document.getElementById("my_audio");
    var icon = $('#audio-icon');

    if (!isPlaying) {
      // Attempt to play audio
      audio.play().then(function() {
        isPlaying = true;
        // Change icon to Mute
        icon.removeClass('bi-play-fill').addClass('bi-volume-up-fill');
        // Update ARIA label
        $('#audio-control-button').attr('aria-label', 'Mute Music');
      }).catch(function(error) {
        console.log("Audio playback failed:", error);
      });
    } else {
      if (!isMuted) {
        // Mute audio
        audio.muted = true;
        isMuted = true;
        // Change icon to Mute
        icon.removeClass('bi-volume-up-fill').addClass('bi-volume-mute-fill');
        // Update ARIA label
        $('#audio-control-button').attr('aria-label', 'Unmute Music');
      } else {
        // Unmute audio
        audio.muted = false;
        isMuted = false;
        // Change icon back to Volume Up
        icon.removeClass('bi-volume-mute-fill').addClass('bi-volume-up-fill');
        // Update ARIA label
        $('#audio-control-button').attr('aria-label', 'Mute Music');
      }
    }
  });
});
