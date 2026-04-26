const DATA = {
  person: {
    name: "Anju मांजर",
    dateShort: "13 May 2026",

    mentorName: "Click Here👆🏻",
    mentorHandle: "@mr.__rahulraj",
    mentorUrl: "https://www.instagram.com/mr.__rahulraj?igsh=MWFsc3VzY3JpeWZn",
  },
  featured: {
    src: "./assets/photos/21.jpeg",
    caption: "  HAPPY BIRTHDAY TO THE MOST PRETTIEST GIRL THAT I SAW!",
  },
  memories: [
    {
      when: "2024",
      title: "The first Hello👋🏻",
      desc: "The start of “we just get each other” — and we’ve been collecting memories since.",
    },
    {
      when: "2025",
      title: "Fights🤜🏻 + fixes🫱🏻‍🫲🏻",
      desc: "We argue, we learn, we laugh again. Somehow we always come back stronger.",
    },
    {
      when: "Always",
      title: "Happiness & Laugh❤️😍",
      desc: "The silly teasing, the support, the warmth — my best friend, my mentor, my sister-like person.",
    },
  ],
  gallery: [
    { src: "./assets/photos/17.jpeg", caption: "A smile I’ll never forget" },
    { src: "./assets/photos/29.jpeg", caption: "Our thousand of tiny memories" },
    { src: "./assets/photos/anju.jpeg", caption: "Our first photograph." },
    { src: "./assets/photos/20.jpeg", caption: "A moment of peace" },
    { src: "./assets/photos/5.jpeg", caption: "Pure birthday energy" },
    { src: "./assets/photos/6.jpeg", caption: "Always shining" },
  ],
  wishes: [
    {
      title: "Health & happiness",
      text: "May your days be gentle, your sleep be peaceful, and your heart feel light—always.",
      from: "With love",
    },
    {
      title: "Dreams that come true",
      text: "May every dream you write down find its way into your real life—one brave step at a time.",
      from: "Always cheering you",
    },
    {
      title: "Confidence",
      text: "May you trust your voice, your choices, and your beautiful timing. You are more ready than you think.",
      from: "Proud of you",
    },
    {
      title: "A year of blessings",
      text: "May this year bring new opportunities, kind people, and reasons to smile every single week.",
      from: "Best wishes",
    },
    {
      title: "Strength with softness",
      text: "May you stay strong without becoming hard, and stay soft without becoming weak.",
      from: "A small reminder",
    },
    {
      title: "Pure joy",
      text: "May you feel loved today—in the loud ways and the quiet ways.",
      from: "Happy Birthday!",
    },
  ],
  letter: {
    paragraphs: [
      "13 May is special — because it gave this world someone who can be a best friend, a mentor, and the kind of sister you don’t need a label for.",
      "We said our first hello in 2024… and since then it’s been everything: fights, happiness, and that harmless flirting that always makes the day lighter.",
      "What I love most is this: even when we clash, we don’t lose each other. We talk, we fix, we come back — and that’s rare.",
      "On your birthday, I just want you to feel this clearly: I’m proud of you, I’m grateful for you, and I’m always here — not just for your best days, but for all of them.",
      "Happy Birthday, Anjali. Stay the same magic — and keep shining.",
    ],
  },
};

function $(selector, root = document) {
  return root.querySelector(selector);
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("data-")) node.setAttribute(k, v);
    else if (k === "html") node.innerHTML = v;
    else node.setAttribute(k, v);
  });
  children.forEach((c) => node.appendChild(c));
  return node;
}

function loadableImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function existingImageSources(candidates) {
  const checks = await Promise.all(candidates.map((src) => loadableImage(src)));
  return checks.filter(Boolean);
}

function startFeaturedSlideshow(featuredImg, sources, intervalMs = 750) {
  if (!featuredImg || sources.length === 0) return;
  if (sources.length === 1) {
    featuredImg.src = sources[0];
    return;
  }

  let i = 0;
  featuredImg.src = sources[i];
  window.setInterval(() => {
    i = (i + 1) % sources.length;
    featuredImg.classList.remove("is-switching");
    // Force restart of fade animation
    void featuredImg.offsetWidth;
    featuredImg.classList.add("is-switching");
    featuredImg.src = sources[i];
  }, intervalMs);
}

function applyPerson() {

  $("#footerName").textContent = DATA.person.name;
  $("#letterTo").textContent = DATA.person.name;
  $("#birthdayDate").textContent = DATA.person.dateShort;
  $("#letterDate").textContent = DATA.person.dateLong;
  const mentor = $("#mentorName");
  if (DATA.person.mentorUrl) {
    mentor.innerHTML = `<a href="#" class="js-wish-trigger">${DATA.person.mentorName}</a>`;
  } else {
    mentor.textContent = DATA.person.mentorName;
  }

  const from = $("#letterFrom");
  if (from) {
    from.textContent = DATA.person.mentorHandle || DATA.person.mentorName;
    if (DATA.person.mentorUrl && from.tagName.toLowerCase() === "a") {
      from.setAttribute("href", DATA.person.mentorUrl);
      from.setAttribute("target", "_blank");
      from.setAttribute("rel", "noreferrer noopener");
    }
  }

  const featuredImg = $("#featuredPhoto");
  const numbered = [];
  const exts = ["jpg", "jpeg", "png", "webp"];
  for (let n = 1; n <= 34; n += 1) {
    const two = String(n).padStart(2, "0");
    exts.forEach((ext) => {
      numbered.push(`./assets/photos/${two}.${ext}`);
      numbered.push(`./assets/photos/${n}.${ext}`);
    });
  }

  const featuredCandidates = [
    DATA.featured.src,
    "./assets/photos/featured.jpg",
    "./assets/photos/featured.jpeg",
    "./assets/photos/Featured.jpg",
    "./assets/photos/Featured.jpeg",
    "./assets/photos/21.jpeg",
    ...numbered,
  ];

  existingImageSources(featuredCandidates).then((resolved) => {
    const unique = [...new Set(resolved)];
    startFeaturedSlideshow(featuredImg, unique, 900);
  });
  $("#featuredCaption").textContent = DATA.featured.caption;
  document.title = `Happy Birthday, ${DATA.person.name}`;
}

function setUpWishPopup() {
  const popup = $("#wishPopup");
  const closeBtn = $("#wishPopupClose");
  const triggers = Array.from(document.querySelectorAll(".js-wish-trigger"));
  const noBtn = $("#wishNoBtn");
  const yesBtn = $("#wishYesBtn");
  const panda = $("#wishPanda");
  const actions = $("#wishFunActions");
  const insta = $("#wishPopupInsta");
  let tenorLoaded = false;
  if (!popup || !closeBtn || !noBtn || !yesBtn || !panda || !actions || !insta) return;

  insta.textContent = DATA.person.mentorHandle || "@mr.__rahulraj";
  insta.href = DATA.person.mentorUrl;

  const open = () => {
    panda.hidden = true;
    noBtn.style.left = "";
    noBtn.style.top = "";
    noBtn.style.right = "0";
    popup.showModal();
  };

  triggers.forEach((t) => {
    t.addEventListener("click", (e) => {
      e.preventDefault();
      open();
    });
  });

  closeBtn.addEventListener("click", () => popup.close());
  popup.addEventListener("click", (e) => {
    const rect = popup.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left + 12 && e.clientX <= rect.right - 12 && e.clientY >= rect.top + 12 && e.clientY <= rect.bottom - 12;
    if (!inside) popup.close();
  });

  const moveNo = () => {
    const area = actions.getBoundingClientRect();
    const btn = noBtn.getBoundingClientRect();
    const maxX = Math.max(8, area.width - btn.width - 8);
    const maxY = Math.max(8, area.height - btn.height - 8);
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    noBtn.style.right = "auto";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  };

  noBtn.addEventListener("mouseenter", moveNo);
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNo();
  });
  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveNo();
  });

  yesBtn.addEventListener("click", () => {
    panda.hidden = false;
    const funSection = popup.querySelector(".wish-popup__fun");
    if (funSection) {
      funSection.hidden = true;
    }
    if (!tenorLoaded) {
      panda.insertAdjacentHTML(
        "beforeend",
        `
        <div class="tenor-gif-embed" data-postid="9735738104198536439" data-share-method="host"
          data-aspect-ratio="1.3806" data-width="100%"><a
            href="https://tenor.com/view/bear-blowakiss-love-hearts-kissing-gif-9735738104198536439">Bear Blowakiss
            GIF</a>from <a href="https://tenor.com/search/bear-gifs">Bear GIFs</a></div>
      `
      );

      const tenorScript = document.createElement("script");
      tenorScript.type = "text/javascript";
      tenorScript.async = true;
      tenorScript.src = "https://tenor.com/embed.js";
      document.body.appendChild(tenorScript);
      tenorLoaded = true;
    }
  });
}

function renderMemories() {
  const wrap = $("#timeline");
  wrap.innerHTML = "";

  DATA.memories.forEach((m) => {
    const li = el("li", { class: "memory reveal", "data-reveal": "" }, [
      el("div", { class: "memory__badge", text: m.when }),
      el("div", {}, [
        el("h3", { class: "memory__title", text: m.title }),
        el("p", { class: "memory__desc", text: m.desc }),
      ]),
    ]);
    wrap.appendChild(li);
  });
}

function renderGallery() {
  const grid = $("#galleryGrid");
  grid.innerHTML = "";

  DATA.gallery.forEach((p, idx) => {
    const btn = el("button", {
      class: "photo reveal",
      type: "button",
      "data-reveal": "",
      "data-src": p.src,
      "data-caption": p.caption,
      "aria-label": `Open photo ${idx + 1}`,
    });

    const img = el("img", {
      src: p.src,
      alt: p.caption,
      loading: "lazy",
    });

    img.onerror = () => {
      btn.remove();
    };

    btn.appendChild(img);
    btn.appendChild(el("div", { class: "photo__cap", text: p.caption }));
    btn.addEventListener("click", () => openLightbox(p.src, p.caption));
    grid.appendChild(btn);
  });
}

function renderWishes() {
  const mount = $("#wishGrid");
  mount.innerHTML = "";

  const slider = el("div", {
    class: "wish-slider reveal",
    "data-reveal": "",
    "aria-label": "Swipe wishes one by one",
  });
  const viewport = el("div", { class: "wish-slider__viewport" });
  const track = el("div", { class: "wish-slider__track" });
  const controls = el("div", { class: "wish-slider__controls" });
  const prevBtn = el("button", { type: "button", class: "btn btn--ghost", "aria-label": "Previous wish", text: "← Prev" });
  const nextBtn = el("button", { type: "button", class: "btn btn--primary", "aria-label": "Next wish", text: "Next →" });
  const status = el("div", { class: "wish-slider__status", "aria-live": "polite" });

  DATA.wishes.forEach((w) => {
    const card = el("article", { class: "wish-slide" }, [
      el("div", { class: "wish-slide__sparkles", "aria-hidden": "true" }),
      el("h3", { class: "wish__title", text: w.title }),
      el("p", { class: "wish__text", text: w.text }),
      el("p", { class: "wish__from", text: `— ${w.from}` }),
    ]);
    track.appendChild(card);
  });

  viewport.appendChild(track);
  controls.appendChild(prevBtn);
  controls.appendChild(status);
  controls.appendChild(nextBtn);
  slider.appendChild(viewport);
  slider.appendChild(controls);
  mount.appendChild(slider);

  let index = 0;
  const max = DATA.wishes.length - 1;
  let startX = 0;
  let deltaX = 0;
  let isDragging = false;

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    status.textContent = `${index + 1} / ${DATA.wishes.length}`;
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  };

  const goTo = (nextIndex) => {
    if (nextIndex > max) index = 0;
    else if (nextIndex < 0) index = max;
    else index = nextIndex;
    update();
  };

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  const onStart = (x) => {
    startX = x;
    deltaX = 0;
    isDragging = true;
  };

  const onMove = (x) => {
    if (!isDragging) return;
    deltaX = x - startX;
  };

  const onEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    if (Math.abs(deltaX) > 55) {
      if (deltaX < 0) goTo(index + 1);
      else goTo(index - 1);
    }
  };

  viewport.addEventListener("touchstart", (e) => onStart(e.touches[0].clientX), { passive: true });
  viewport.addEventListener("touchmove", (e) => onMove(e.touches[0].clientX), { passive: true });
  viewport.addEventListener("touchend", onEnd);
  viewport.addEventListener("mousedown", (e) => onStart(e.clientX));
  window.addEventListener("mousemove", (e) => onMove(e.clientX));
  window.addEventListener("mouseup", onEnd);

  update();
}

function setUpReveal() {
  const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!("IntersectionObserver" in window)) {
    nodes.forEach((n) => n.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    },
    { threshold: 0.12 }
  );

  nodes.forEach((n) => io.observe(n));
}

function setUpLightbox() {
  const dlg = $("#lightbox");
  const closeBtn = $("#lightboxClose");

  closeBtn.addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => {
    const rect = dlg.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left + 12 && e.clientX <= rect.right - 12 && e.clientY >= rect.top + 12 && e.clientY <= rect.bottom - 12;
    if (!inside) dlg.close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dlg.open) dlg.close();
  });
}

function openLightbox(src, caption) {
  const dlg = $("#lightbox");
  const img = $("#lightboxImg");
  const cap = $("#lightboxCaption");
  img.src = src;
  img.alt = caption;
  cap.textContent = caption;
  dlg.showModal();
}

function letterText() {
  return DATA.letter.paragraphs.join("\n\n");
}

function setUpLetter() {
  const type = $("#typewriter");
  const playBtn = $("#playLetter");
  const instantBtn = $("#instantLetter");
  const copyBtn = $("#copyLetter");

  let activeTimer = null;
  let isTyping = false;

  const stop = () => {
    isTyping = false;
    if (activeTimer) window.clearTimeout(activeTimer);
    activeTimer = null;
  };

  const showInstant = () => {
    stop();
    type.textContent = letterText();
    type.classList.add("is-done");
  };

  const typeOut = () => {
    stop();
    type.classList.remove("is-done");
    type.textContent = "";
    isTyping = true;

    const full = letterText();
    let i = 0;

    const step = () => {
      if (!isTyping) return;
      type.textContent += full[i] || "";
      i += 1;

      if (i >= full.length) {
        isTyping = false;
        type.classList.add("is-done");
        return;
      }

      const ch = full[i - 1];
      const base = 22 + Math.random() * 44;
      const extra = ch === "\n" ? 220 : ch === "." || ch === "!" || ch === "?" ? 240 : ch === "," ? 120 : 0;
      activeTimer = window.setTimeout(step, base + extra);
    };

    step();
  };

  playBtn.addEventListener("click", typeOut);
  instantBtn.addEventListener("click", showInstant);
  copyBtn.addEventListener("click", async () => {
    const txt = letterText();
    try {
      await navigator.clipboard.writeText(txt);
      copyBtn.textContent = "Copied!";
      window.setTimeout(() => (copyBtn.textContent = "Copy text"), 1200);
    } catch {
      copyBtn.textContent = "Copy failed";
      window.setTimeout(() => (copyBtn.textContent = "Copy text"), 1200);
    }
  });

  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) showInstant();
  else typeOut();
}

function setUpOpeningScreen() {
  const opening = $("#openingScreen");
  const revealBtn = $("#revealBtn");
  const main = $("#main");
  if (!opening || !revealBtn || !main) return;

  document.body.style.overflow = "hidden";

  const reveal = () => {
    main.hidden = false;
    playPaperBlast(5000);
    opening.classList.add("is-hiding");
    document.body.style.overflow = "";
    window.setTimeout(() => opening.remove(), 520);
  };

  revealBtn.addEventListener("click", reveal, { once: true });
  revealBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") reveal();
  });
}

function playPaperBlast(durationMs = 5000) {
  const layer = $("#paperBlast");
  if (!layer) return;
  layer.innerHTML = "";

  const colors = ["#ff4fd8", "#7c5cff", "#42e2b8", "#ffd166", "#ff8fab", "#8ec5ff"];
  const pieces = 160;

  for (let i = 0; i < pieces; i += 1) {
    const bit = document.createElement("span");
    bit.className = "paper-bit";
    const x = Math.round((Math.random() - 0.5) * window.innerWidth * 1.6);
    const w = Math.round(8 + Math.random() * 10);
    const h = Math.round(10 + Math.random() * 16);
    const r = Math.round(220 + Math.random() * 920);
    const t = Math.round(1500 + Math.random() * 1700);
    const d = Math.round(Math.random() * 3600);
    const c = colors[Math.floor(Math.random() * colors.length)];

    bit.style.setProperty("--x", `${x}px`);
    bit.style.setProperty("--w", `${w}px`);
    bit.style.setProperty("--h", `${h}px`);
    bit.style.setProperty("--r", `${r}deg`);
    bit.style.setProperty("--t", `${t}ms`);
    bit.style.setProperty("--d", `${d}ms`);
    bit.style.setProperty("--c", c);
    layer.appendChild(bit);
  }

  window.setTimeout(() => {
    layer.innerHTML = "";
  }, durationMs);
}

function setUpBirthdaySong() {
  const song = $("#birthdaySong");
  if (!song) return;

  const unlockEvents = ["click", "touchstart", "keydown"];
  let started = false;

  const clearUnlockListeners = () => {
    unlockEvents.forEach((eventName) => {
      document.removeEventListener(eventName, tryPlaySong, true);
    });
  };

  const tryPlaySong = () => {
    if (started) return;
    const playPromise = song.play();

    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          started = true;
          clearUnlockListeners();
        })
        .catch(() => {
          // Browser may block autoplay until a user gesture.
        });
      return;
    }

    started = true;
    clearUnlockListeners();
  };

  tryPlaySong();
  unlockEvents.forEach((eventName) => {
    document.addEventListener(eventName, tryPlaySong, true);
  });
}

function boot() {
  setUpBirthdaySong();
  setUpOpeningScreen();
  applyPerson();
  setUpWishPopup();
  renderMemories();
  renderGallery();
  renderWishes();
  setUpReveal();
  setUpLightbox();
  setUpLetter();
}

document.addEventListener("DOMContentLoaded", boot);

