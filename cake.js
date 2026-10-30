
const cakeModel = document.getElementById("cakeModel");
const micBtn = document.getElementById("micBtn");
const manualBlowBtn = document.getElementById("manualBlowBtn");
const micStatus = document.getElementById("micStatus");
const candleInstructions = document.getElementById("candleInstructions");
const cutSection = document.getElementById("cutSection");
const cutCakeBtn = document.getElementById("cutCakeBtn");
const birthdayFinal = document.getElementById("birthdayFinal");

let audioStream = null;
let audioContext = null;
let analyser = null;
let micAnimation = null;
let candlesExtinguished = false;

async function startMicrophone() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    micStatus.textContent = "Microphone is unavailable. Use the manual button.";
    return;
  }

  try {
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024;

    const microphone = audioContext.createMediaStreamSource(audioStream);
    microphone.connect(analyser);

    micBtn.disabled = true;
    micBtn.textContent = "🎤 Microphone Active";
    micStatus.textContent = "Microphone active! Blow gently near your microphone.";

    detectBlow();
  } catch (error) {
    micStatus.textContent =
      "Microphone permission unavailable. You can use the manual button.";
  }
}

function detectBlow() {
  if (!analyser || candlesExtinguished) return;

  const data = new Uint8Array(analyser.fftSize);

  function checkSound() {
    if (candlesExtinguished) return;

    analyser.getByteTimeDomainData(data);

    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const value = (data[i] - 128) / 128;
      sum += value * value;
    }

    const volume = Math.sqrt(sum / data.length);

    if (volume > 0.17) {
      extinguishCandles();
      return;
    }

    micAnimation = requestAnimationFrame(checkSound);
  }

  checkSound();
}

function stopMicrophone() {
  if (micAnimation) cancelAnimationFrame(micAnimation);

  if (audioStream) {
    audioStream.getTracks().forEach(track => track.stop());
    audioStream = null;
  }

  if (audioContext && audioContext.state !== "closed") {
    audioContext.close();
  }
}

function extinguishCandles() {
  if (candlesExtinguished) return;

  candlesExtinguished = true;
  stopMicrophone();

  cakeModel.classList.add("candles-out");
  micStatus.textContent = "Wish made! Your candles are out! ✨";

  candleInstructions.style.display = "none";
  cutSection.classList.add("show");
}

micBtn.addEventListener("click", startMicrophone);

manualBlowBtn.addEventListener("click", () => {
  extinguishCandles();
});

cutCakeBtn.addEventListener("click", () => {
  cakeModel.classList.add("sliced");
  cutCakeBtn.disabled = true;
  cutCakeBtn.textContent = "Cake Cut Successfully! 🎂";

  setTimeout(() => {
    cutSection.style.display = "none";
    birthdayFinal.classList.add("show");
    createFireworks();
  }, 1200);
});

function createFireworks() {
  const layer = document.getElementById("particles");

  for (let burst = 0; burst < 5; burst++) {
    setTimeout(() => {
      const x = 10 + Math.random() * 80;
      const y = 15 + Math.random() * 60;

      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("span");
        particle.className = "particle";
        particle.style.left = x + "vw";
        particle.style.top = y + "vh";

        const angle = Math.random() * Math.PI * 2;
        const distance = 60 + Math.random() * 150;

        particle.style.setProperty("--x", Math.cos(angle) * distance + "px");
        particle.style.setProperty("--y", Math.sin(angle) * distance + "px");

        layer.appendChild(particle);
        setTimeout(() => particle.remove(), 1800);
      }
    }, burst * 450);
  }
}

window.addEventListener("beforeunload", stopMicrophone);
