(() => {
  const nowPlayingText = document.getElementById("nowPlayingText");
  const srStatus = document.getElementById("srStatus");

  const cymbalsPads = document.getElementById("cymbalsPads");
  const otherPads = document.getElementById("otherPads");

  const REGION_ORDER = ["drums", "cymbals", "other"];

  //  6 sounds total (3 in HTML + 3 injected by JS)
  // Drums: K, G, J  (already in HTML)
  // Cymbals: D, L   (JS adds)
  // Other: H        (JS adds)
  const SOUND_MAP = {
    K: { name: "Tom", region: "drums", file: "../sounds/tom.mp3" },
    G: { name: "Boom", region: "drums", file: "../sounds/boom.mp3" },
    J: { name: "Snare", region: "drums", file: "../sounds/snare.mp3" },

    D: { name: "Kick", region: "cymbals", file: "../sounds/kick.mp3" },
    L: { name: "Tink", region: "cymbals", file: "../sounds/tink.mp3" },

    H: { name: "Ride", region: "other", file: "../sounds/ride.mp3" }
  };

  // ---- Create pad button  ----
  function createPad({ key, name, region, file, index }) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pad";
    btn.dataset.region = region;
    btn.dataset.key = key;
    btn.dataset.label = name;
    btn.dataset.file = file;
    btn.dataset.index = String(index);
    btn.setAttribute("aria-label", `${name} pad. Key ${key}.`);

    const keySpan = document.createElement("span");
    keySpan.className = "pad-key";
    keySpan.setAttribute("aria-hidden", "true");
    keySpan.textContent = key;

    const nameSpan = document.createElement("span");
    nameSpan.className = "pad-name";
    nameSpan.setAttribute("aria-hidden", "true");
    nameSpan.textContent = name.toUpperCase();

    btn.appendChild(keySpan);
    btn.appendChild(nameSpan);

    return btn;
  }

  // Cymbals needs 2 pads (D, L)
  const cymbalKeys = ["D", "L"];
  cymbalKeys.forEach((k, i) => {
    const meta = SOUND_MAP[k];
    cymbalsPads.appendChild(createPad({ key: k, name: meta.name, region: meta.region, file: meta.file, index: i }));
  });

  // Other needs 1 pad (H)
  const otherKeys = ["H"];
  otherKeys.forEach((k, i) => {
    const meta = SOUND_MAP[k];
    otherPads.appendChild(createPad({ key: k, name: meta.name, region: meta.region, file: meta.file, index: i }));
  });

  // ---- Gather all pads (HTML + JS) ----
  const allPads = Array.from(document.querySelectorAll(".pad"));

  // ---- Audio cache ----
  const audioCache = new Map();

  function getAudio(key) {
    const k = key.toUpperCase();
    const meta = SOUND_MAP[k];
    if (!meta) return null;

    if (!audioCache.has(k)) {
      const a = new Audio(meta.file);
      a.preload = "auto";
      audioCache.set(k, a);
    }
    return audioCache.get(k);
  }

  function flashPad(padEl) {
    padEl.classList.add("pad--active");
    window.setTimeout(() => padEl.classList.remove("pad--active"), 180);
  }

  function setNowPlaying(text) {
    nowPlayingText.textContent = text;
    srStatus.textContent = text;
  }

  function playKey(key, focusPad = true) {
    const k = key.toUpperCase();
    const meta = SOUND_MAP[k];
    if (!meta) return;

    const audio = getAudio(k);
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(() => {
      srStatus.textContent = "Audio blocked. Click a pad once, then try again.";
    });

    setNowPlaying(`${meta.name} (${k})`);

    const padEl = allPads.find((p) => p.dataset.key?.toUpperCase() === k);
    if (padEl) {
      if (focusPad) padEl.focus();
      flashPad(padEl);
    }
  }

  // ---- Click + Enter/Space ----
  allPads.forEach((pad) => {
    pad.addEventListener("click", () => {
      playKey(pad.dataset.key);
    });

    pad.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        pad.click();
      }
    });
  });

  // ---- Region highlight when focus is inside ----
  const regions = Array.from(document.querySelectorAll(".region"));
  regions.forEach((region) => {
    region.addEventListener("focusin", () => region.classList.add("region--focused"));
    region.addEventListener("focusout", () => region.classList.remove("region--focused"));
  });

  // ---- Arrow key navigation ----
  function padsInRegion(regionName) {
    return allPads
      .filter((p) => p.dataset.region === regionName)
      .sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index));
  }

  function moveFocus(currentPad, direction) {
    const region = currentPad.dataset.region;
    const index = Number(currentPad.dataset.index);
    if (!region) return;

    const currentRegionPads = padsInRegion(region);
    const pos = currentRegionPads.indexOf(currentPad);

    // Left / Right within region
    if (direction === "left") {
      const next = currentRegionPads[pos - 1];
      if (next) next.focus();
      return;
    }
    if (direction === "right") {
      const next = currentRegionPads[pos + 1];
      if (next) next.focus();
      return;
    }

    // Up / Down between regions (try same index)
    const regionPos = REGION_ORDER.indexOf(region);
    const nextRegion = direction === "up" ? REGION_ORDER[regionPos - 1] : REGION_ORDER[regionPos + 1];
    if (!nextRegion) return;

    const nextPads = padsInRegion(nextRegion);
    if (!nextPads.length) return;

    const candidate = nextPads[index] || nextPads[nextPads.length - 1];
    candidate.focus();
  }

  // Global key handler:
  
  document.addEventListener("keydown", (e) => {
    // letter hotkeys
    if (/^[a-zA-Z]$/.test(e.key)) {
      const k = e.key.toUpperCase();
      if (SOUND_MAP[k]) {
        e.preventDefault();
        playKey(k, true);
        return;
      }
    }

    const activeEl = document.activeElement;
    const isPadFocused = activeEl && activeEl.classList?.contains("pad");
    if (!isPadFocused) return;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      moveFocus(activeEl, "left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      moveFocus(activeEl, "right");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      moveFocus(activeEl, "up");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      moveFocus(activeEl, "down");
    }
  });

  // initial status
  srStatus.textContent = "Ready. Tab to focus pads. Use arrow keys to move.";
})();

const buttons = document.querySelectorAll('button');
const status = document.getElementById('status');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    status.textContent = "Now Playing: " + button.textContent;
  });
});