document.addEventListener("DOMContentLoaded", () => {
  const giftbox = document.getElementById("giftbox");
  const canvas = document.getElementById("confetti-canvas");
  const confetti = canvas.getContext("2d");
  const nextSection = document.getElementById("message");
  let unwrapped = false;

  const pieces = [];
  const numConfetti = 150;
  const colors = ["#fbb1bd", "#b3e5fc", "#d1c4e9", "#ffe082", "#a5d6a7"];

  for (let i = 0; i < numConfetti; i++) {
    pieces.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight - window.innerHeight,
      radius: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocity: Math.random() * 3 + 2
    });
  }

  function drawConfetti() {
    confetti.clearRect(0, 0, canvas.width, canvas.height);
    for (let piece of pieces) {
      confetti.beginPath();
      confetti.arc(piece.x, piece.y, piece.radius, 0, Math.PI * 2);
      confetti.fillStyle = piece.color;
      confetti.fill();

      piece.y += piece.velocity;
      if (piece.y > canvas.height) {
        piece.y = -10;
        piece.x = Math.random() * canvas.width;
      }
    }
    requestAnimationFrame(drawConfetti);
  }

  // 🎁 Giftbox click event
  if (giftbox) {
    giftbox.addEventListener("click", () => {
      if (unwrapped) return;
      unwrapped = true;

      giftbox.classList.add("open");
      document.querySelector(".click-to-open").style.opacity = 0;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawConfetti();

      setTimeout(() => {
        nextSection?.classList.add("show");
      }, 1500);

      setTimeout(() => {
        document.getElementById("twilight")?.scrollIntoView({ behavior: "smooth" });
      }, 6000);
    });
  }

  // 💌 Flip card interaction
  const card = document.getElementById("card");
  if (card) {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  }

  // 🎂 Candle Blow Out Interaction
  const flame = document.getElementById("flame");
  const wishMessage = document.getElementById("wishMessage");

  flame?.addEventListener("click", () => {
    flame.style.opacity = 0;
    wishMessage?.classList.add("show");
  });

  // Optional: For mobile tap on the whole candle
  document.querySelector(".candle")?.addEventListener("click", () => {
    flame?.style.setProperty("opacity", "0");
    wishMessage?.classList.add("show");
  });

  // 🔽 Optional scroll helper
  window.scrollToSection = function(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
});

// 🧭 Scroll Reveal for Vintage Letter
const scrollImage = document.querySelector(".scroll-image");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        scrollImage.classList.add("unroll");
        observer.unobserve(scrollImage); // Only once
      }
    });
  },
  { threshold: 0.3 }
);

if (scrollImage) {
  observer.observe(scrollImage);
}