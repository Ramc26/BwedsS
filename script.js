$(document).ready(function() {
  const audioElement = document.getElementById("my_audio");
  const muteToggleButton = document.getElementById("mute-toggle-button");

  // Show modal on page load
  $('#welcomeModal').modal('show');

  // Handle click on "Open Invitation" button
  $('#startInvitation').on('click', function () {
    // Hide the modal
    $('#welcomeModal').modal('hide');

    // Play background music
    audioElement.play().then(() => {
      console.log("Audio playback started.");
      // Show mute/unmute button
      $(muteToggleButton).removeClass('d-none');
    }).catch((error) => {
      console.error("Error starting audio playback:", error);
    });
  });

  // Mute/Unmute Button Functionality
  let isMuted = false;
  $('#mute-toggle-button').on('click', function() {
    if (!isMuted) {
      audioElement.muted = true;
      isMuted = true;
      $(this).find('i').removeClass('bi-volume-up-fill').addClass('bi-volume-mute-fill');
    } else {
      audioElement.muted = false;
      isMuted = false;
      $(this).find('i').removeClass('bi-volume-mute-fill').addClass('bi-volume-up-fill');
    }
  });

  // Translate button visible from start
  $('.translate-button').show();

  // Initialize fade-in classes for smooth appearance
  $('.middle-content, .bottom-content').addClass('fade-in');

  // Show extensions after page load
  setTimeout(function() {
    $('.audio-extension').addClass('show-extension');
    $('.translate-extension').addClass('show-extension');
  }, 500);

  setTimeout(function() {
    $('.audio-extension').removeClass('show-extension');
    $('.translate-extension').removeClass('show-extension');
  }, 10000);

  // COUNTDOWN TIMER
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
  setInterval(countdown, 1000);
  countdown();
  
  // TYPING EFFECT FOR SLOKA
  var typed = new Typed('.sloka', {
    strings: [
      `ఇయం సీత మమ సుతా సహ ధర్మచారిణి తవ।
ప్రతిచ్ఛ చేను భద్రం తే పాణిం గృహ్ణీష్వ పాణినా॥`
    ],
    typeSpeed: 15,
    backSpeed: 0,
    showCursor: false,
    smartBackspace: false,
    onComplete: function(self) {
      // After typing, fade in middle content (names and timer)
      $('.middle-content').addClass('visible');

      // After a short delay, fade in bottom content (Kalyanam image)
      setTimeout(function() {
        $('.bottom-content').addClass('visible');
      }, 1000);
    }
  });

  // Add To Calendar Button (ICS Download)
  document.getElementById('addToCalendarBtn')?.addEventListener('click', function() {
    const eventName = "Bharathi & Surya's Wedding";
    const eventDescription = "Wedding Invitation";
    const eventLocation = "Alluri SitaRamaraju Kalyana Mandapam, Jaggampeta";
    
    // Start/End times in UTC format
    const start = "20250221T050500Z"; 
    const end = "20250221T070500Z"; 
  
    const uid = "bharathi-surya-wedding-" + Date.now() + "@example.com";
  
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

    const blob = new Blob([icsContent], { type: 'text/calendar' });
  
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "Bharathi_Surya_Wedding.ics";
    document.body.appendChild(a);
    a.click();
  
    setTimeout(function() {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  });
});
