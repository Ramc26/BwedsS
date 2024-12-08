$(document).ready(function() {
  // Ensure audio and translate buttons are visible from the start
  $('#audio-control-button, .translate-button').show();

  // Initialize fade-in classes for smooth appearance (from original JS)
  $('.middle-content, .bottom-content').addClass('fade-in');

  var isPlaying = false; // Track if audio is playing
  var isMuted = false;   // Track if audio is muted

  // Show extensions after page load (from new JS)
  setTimeout(function() {
    $('.audio-extension').addClass('show-extension');
    $('.translate-extension').addClass('show-extension');
  }, 500); // Show after 0.5s

  setTimeout(function() {
    $('.audio-extension').removeClass('show-extension');
    $('.translate-extension').removeClass('show-extension');
  }, 10000); // Hide after 5 seconds visible (total 5.5s)

  // AUDIO CONTROL BUTTON FUNCTIONALITY (original logic retained)
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
        icon.removeClass('bi-volume-up-fill').addClass('bi-volume-mute-fill');
        $('#audio-control-button').attr('aria-label', 'Unmute Music');
      } else {
        // Unmute audio
        audio.muted = false;
        isMuted = false;
        icon.removeClass('bi-volume-mute-fill').addClass('bi-volume-up-fill');
        $('#audio-control-button').attr('aria-label', 'Mute Music');
      }
    }

    localStorage.setItem('isMuted', isMuted);
  });

  // COUNTDOWN TIMER with updated formatting from new JS (`|` separators)
  function countdown() {
    const eventDate = new Date('2025-02-21T05:05:00');
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

    $('#timer').text(`${days} Days | ${hours} Hrs | ${minutes} Min | ${seconds} Sec`);
  }

  // Update Timer Every Second (from original JS logic)
  setInterval(countdown, 1000);
  countdown();
  
  // TYPING EFFECT FOR SLOKA (original logic with fadeIn for buttons restored)
  var typed = new Typed('.sloka', {
    strings: [
      `ఇయం సీత మమ సుతా సహ ధర్మచారిణి తవ।
ప్రతిచ్ఛ చేను భద్రం తే పాణిం గృహ్ణీష్వ పాణినా॥`
    ],
    typeSpeed: 15,        // Typing speed in milliseconds
    backSpeed: 0,         // No backspacing needed
    showCursor: false,    // Hide the cursor
    smartBackspace: false, // Disable smart backspace
    onComplete: function(self) {
      // After typing, fade in middle content (names and timer)
      $('.middle-content').addClass('visible');

      // After a short delay, fade in bottom content (Kalyanam image)
      setTimeout(function() {
        $('.bottom-content').addClass('visible');
      }, 1000); // Adjust delay as needed

      // Show the Play and Translate buttons after sloka typing is complete
      $('#audio-control-button, .translate-button').fadeIn(500); // Fade them in over 0.5s
    }
  });


  document.getElementById('addToCalendarBtn').addEventListener('click', function() {
    // Event details
    const eventName = "Bharathi & Surya's Wedding";
    const eventDescription = "Wedding Invitation";
    const eventLocation = "Alluri SitaRamaraju Kalyana Mandapam, Jaggampeta";
    
    // Start/End times in UTC format (ICS requires UTC)
    // Event Start: 2025-02-21 05:05 AM local time
    // Adjust to UTC if needed. For simplicity, assume given time is UTC or your desired time zone.
    // Format: YYYYMMDDTHHMMSSZ (Z indicates UTC)
    const start = "20250221T050500Z"; 
    // Assuming a 2-hour event
    const end = "20250221T070500Z"; 
  
    const uid = "bharathi-surya-wedding-" + Date.now() + "@example.com";
    
    // ICS content
    const icsContent = 
  `BEGIN:VCALENDAR
  VERSION:2.0
  PRODID:-//YourOrg//YourApp//EN
  BEGIN:VEVENT
  UID:${uid}
  DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}
  DTSTART:${start}
  DTEND:${end}
  SUMMARY:${eventName}
  LOCATION:${eventLocation}
  DESCRIPTION:${eventDescription}
  END:VEVENT
  END:VCALENDAR`;
  
    // Create a Blob from the ICS content
    const blob = new Blob([icsContent], { type: 'text/calendar' });
  
    // Create a temporary link to download the file
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "Bharathi_Surya_Wedding.ics";
    document.body.appendChild(a);
    a.click();
  
    // Clean up the URL object
    setTimeout(function() {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  });
  
});
