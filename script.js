const synth = window.speechSynthesis;
const descriptionEl = document.getElementById("description");
const sentenceNodes = Array.from(document.querySelectorAll(".sentence"));
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const stopBtn = document.getElementById("stop-btn");
const themeToggle = document.getElementById("theme-toggle");
const languageSelect = document.getElementById("language-select");
const loadingScreen = document.getElementById("loading-screen");
const statusText = document.getElementById("status-text");
const speedRadioNodes = document.querySelectorAll('input[name="speed"]');

let utterance = null;
let selectedRate = 1;
let sentenceRanges = [];

function vibrateSoft() {
  if ("vibrate" in navigator) {
    navigator.vibrate(20);
  }
}

function setStatus(message) {
  statusText.textContent = message;
}

function detectLanguageFromDocument() {
  return document.documentElement.lang === "tr" ? "tr-TR" : "en-US";
}

function getSpeechLanguage() {
  const manualLanguage = languageSelect.value;
  if (manualLanguage === "auto") {
    return detectLanguageFromDocument();
  }
  return manualLanguage;
}

function clearHighlights() {
  sentenceNodes.forEach((node) => node.classList.remove("is-active"));
}

function buildSentenceRanges(fullText) {
  sentenceRanges = [];
  let cursor = 0;
  sentenceNodes.forEach((node, index) => {
    const sentence = node.textContent.trim();
    const startIndex = fullText.indexOf(sentence, cursor);
    const endIndex = startIndex + sentence.length;
    sentenceRanges.push({ index, startIndex, endIndex });
    cursor = endIndex;
  });
}

function highlightByCharIndex(charIndex) {
  const active = sentenceRanges.find(
    (range) => charIndex >= range.startIndex && charIndex < range.endIndex
  );

  clearHighlights();

  if (active) {
    sentenceNodes[active.index].classList.add("is-active");
  }
}

function getDescriptionText() {
  return sentenceNodes
    .map((sentenceNode) => sentenceNode.textContent.trim())
    .join(" ");
}

function stopSpeech() {
  synth.cancel();
  clearHighlights();
  setStatus("Durduruldu.");
}

function createUtterance() {
  const text = getDescriptionText();
  buildSentenceRanges(text);
  const nextUtterance = new SpeechSynthesisUtterance(text);
  nextUtterance.lang = getSpeechLanguage();
  nextUtterance.rate = selectedRate;

  nextUtterance.onstart = () => {
    setStatus("Sesli rehber oynatiliyor...");
  };

  nextUtterance.onboundary = (event) => {
    if (typeof event.charIndex === "number") {
      highlightByCharIndex(event.charIndex);
    }
  };

  nextUtterance.onend = () => {
    clearHighlights();
    setStatus("Okuma tamamlandi.");
  };

  nextUtterance.onerror = () => {
    clearHighlights();
    setStatus("Bir seslendirme hatasi olustu.");
  };

  return nextUtterance;
}

function playSpeech() {
  if (!("speechSynthesis" in window)) {
    setStatus("Bu tarayici Web Speech API desteklemiyor.");
    return;
  }

  if (synth.paused) {
    synth.resume();
    setStatus("Ses devam ediyor...");
    return;
  }

  stopSpeech();
  utterance = createUtterance();
  synth.speak(utterance);
}

function pauseSpeech() {
  if (synth.speaking && !synth.paused) {
    synth.pause();
    setStatus("Duraklatildi.");
  }
}

function applyStoredTheme() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "dark") {
    document.body.classList.add("dark");
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  setStatus(isDark ? "Karanlik mod aktif." : "Aydinlik mod aktif.");
}

function bindEvents() {
  playBtn.addEventListener("click", () => {
    vibrateSoft();
    playSpeech();
  });

  pauseBtn.addEventListener("click", () => {
    vibrateSoft();
    pauseSpeech();
  });

  stopBtn.addEventListener("click", () => {
    vibrateSoft();
    stopSpeech();
  });

  themeToggle.addEventListener("click", () => {
    vibrateSoft();
    toggleTheme();
  });

  speedRadioNodes.forEach((speedNode) => {
    speedNode.addEventListener("change", (event) => {
      selectedRate = Number(event.target.value);
      setStatus(`Ses hizi ${selectedRate}x olarak ayarlandi.`);

      if (synth.speaking) {
        playSpeech();
      }
    });
  });

  languageSelect.addEventListener("change", () => {
    setStatus(`Dil secimi guncellendi: ${getSpeechLanguage()}.`);
    if (synth.speaking) {
      playSpeech();
    }
  });
}

function hideLoadingScreen() {
  window.setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 1000);
}

function init() {
  applyStoredTheme();
  bindEvents();
  hideLoadingScreen();
}

init();
