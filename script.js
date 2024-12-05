$(document).ready(function() {
    // Countdown Timer
    function countdown() {
      const eventDate = new Date('2025-02-21T04:50:00'); // Sumuhurtham Date & Time
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
  