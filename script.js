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
  });
  $(document).ready(function() {
    // Typing Effect for Sloka
    function typeText(element, text, speed, callback) {
      let i = 0;
      function type() {
        if (i < text.length) {
          let currentChar = text.charAt(i);
          if (currentChar === '\n') {
            element.append('<br>'); // Insert a line break
          } else {
            element.append(currentChar);
          }
          i++;
          setTimeout(type, speed);
        } else {
          if (callback) callback();
        }
      }
      type();
    }
  
    // Get the sloka text with newline characters
    const slokaText = `ఇయం సీత మమ సుతా సహ ధర్మచారిణి తవ।
  ప్రతిచ్ఛ చేను భద్రం తే పాణిం గృహ్ణీష్వ పాణినా॥`;
  
    // Start typing the sloka
    typeText($('.sloka'), slokaText, 40, function() {
      // After typing, fade in middle content (names and timer)
      $('.middle-content').addClass('visible');
  
      // After a short delay, fade in bottom content (Kalyanam image)
      setTimeout(function() {
        $('.bottom-content').addClass('visible');
      }, 1000); // Adjust delay as needed
    });
  
    // Initialize fade-in classes
    $('.middle-content, .bottom-content').addClass('fade-in');
  });
  