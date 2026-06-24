/* ============================================
   AM — App logic
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // Custom cursor
  // ============================================
  const cursor = document.querySelector('.cursor');
  const cursorRing = document.querySelector('.cursor-ring');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });
  function ringLoop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(ringLoop);
  }
  ringLoop();

  document.addEventListener('mouseover', e => {
    const t = e.target;
    if (t.closest('a, button, .song-row, .album-card, .artist-tile, .t-bar, .t-volume-bar, .disc-stage')) {
      cursor.classList.add('is-hover');
      cursorRing.classList.add('is-hover');
    }
  });
  document.addEventListener('mouseout', e => {
    const t = e.target;
    if (t.closest('a, button, .song-row, .album-card, .artist-tile, .t-bar, .t-volume-bar, .disc-stage')) {
      cursor.classList.remove('is-hover');
      cursorRing.classList.remove('is-hover');
    }
  });

  // ============================================
  // Intro video — loops while user is here; scroll/click to enter
  // ============================================
  const intro = document.querySelector('.intro');
  const introVideo = document.querySelector('#intro-video');
  const introBloomVideo = document.querySelector('#intro-bloom-video');
  const introEnter = document.querySelector('#intro-enter');
  const introProgress = document.querySelector('.intro-progress > span');
  const loader = document.querySelector('.loader'); // may be null now
  const navBrand = document.querySelector('#nav-brand');

  let introFinished = false;
  let introStartedAt = performance.now();
  let toastShown = false;

  function finishIntro() {
    if (introFinished) return;
    introFinished = true;
    intro.classList.add('is-done');
    document.body.classList.add('is-revealed');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    setTimeout(() => {
      try { introVideo.pause(); } catch (e) {}
      try { introBloomVideo && introBloomVideo.pause(); } catch (e) {}
      observeReveal();
    }, 1200);
  }

  function reopenIntro() {
    introFinished = false;
    toastShown = false;
    introStartedAt = performance.now();
    intro.classList.remove('is-done');
    document.body.classList.remove('is-revealed');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, left: 0 });
    introToast.classList.remove('is-on');
    introProgress.style.width = '0%';
    try {
      introVideo.currentTime = 0;
      introVideo.play();
    } catch (e) {}
    // restart toast timer
    setTimeout(() => {
      if (!toastShown && !introFinished) {
        toastShown = true;
        introToast.classList.add('is-on');
      }
    }, 5000);
  }

  // Lock scroll while intro is active
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  introVideo.addEventListener('loadedmetadata', () => {
    const p = introVideo.play();
    if (p && p.catch) p.catch(() => {});
  });

  // Keep the bloom layer mirrored to the main video's currentTime + play state
  const bloomVideo = introBloomVideo;
  if (bloomVideo) {
    // Mirror currentTime every frame for accurate sync (matters during reverse playback)
    function mirrorLoop() {
      if (!introFinished && bloomVideo) {
        try {
          if (Math.abs(bloomVideo.currentTime - introVideo.currentTime) > 0.05) {
            bloomVideo.currentTime = introVideo.currentTime;
          }
        } catch (e) {}
      }
      requestAnimationFrame(mirrorLoop);
    }
    mirrorLoop();
    introVideo.addEventListener('play',  () => { try { bloomVideo.play();  } catch (e) {} });
    introVideo.addEventListener('pause', () => { try { bloomVideo.pause(); } catch (e) {} });
  }

  const introToast = document.querySelector('#intro-toast');

  introVideo.addEventListener('timeupdate', () => {
    if (!introVideo.duration) return;
    const ratio = (introVideo.currentTime % introVideo.duration) / introVideo.duration;
    introProgress.style.width = (ratio * 100) + '%';

    // Show the "scroll to enter" toast halfway through the first playthrough
    const elapsed = (performance.now() - introStartedAt) / 1000;
    const halfway = introVideo.duration / 2;
    if (!toastShown && elapsed >= halfway) {
      toastShown = true;
      introToast.classList.add('is-on');
    }
  });

  // Fallback: even if timeupdate is sparse, show the toast at 5s
  setTimeout(() => {
    if (!toastShown && !introFinished) {
      toastShown = true;
      introToast.classList.add('is-on');
    }
  }, 5000);

  // Scroll / wheel / touch / keyboard all trigger the transition
  function onIntroDismiss(e) {
    if (introFinished) return;
    if (e && e.cancelable) e.preventDefault();
    finishIntro();
  }

  window.addEventListener('wheel', onIntroDismiss, { passive: false });
  window.addEventListener('touchmove', onIntroDismiss, { passive: false });
  introEnter.addEventListener('click', onIntroDismiss);
  intro.addEventListener('click', e => {
    // click anywhere on the intro also enters
    if (!introFinished) onIntroDismiss(e);
  });

  document.addEventListener('keydown', e => {
    if (introFinished) return;
    if (['ArrowDown', 'PageDown', ' ', 'Enter', 'Escape'].includes(e.key)) {
      onIntroDismiss(e);
    }
  });

  // Touch swipe-down also dismisses
  let touchStartY = 0;
  window.addEventListener('touchstart', e => {
    if (!introFinished) touchStartY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchend', e => {
    if (introFinished) return;
    const dy = (e.changedTouches[0]?.clientY ?? touchStartY) - touchStartY;
    if (Math.abs(dy) > 12) finishIntro();
  }, { passive: true });

  // Fallback — if video never loads metadata, still allow entering after 4s
  // (No loader to hide anymore — kept for safety only.)

  // ============================================
  // Particles (disabled — removed per user request)
  // ============================================

  // ============================================
  // Nav scroll state + active link
  // ============================================
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');

    // active section
    const sections = ['np', 'songs', 'artists', 'albums', 'foot'];
    let active = 'np';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.45 && r.bottom > window.innerHeight * 0.45) active = id;
    }
    navLinks.forEach(a => {
      if (a.dataset.target === active) a.classList.add('is-active');
      else a.classList.remove('is-active');
    });
  });

  // ============================================
  // Scroll reveal observer
  // ============================================
  function observeReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.reveal, .reveal-blur, .reveal-tilt, .reveal-slide-l, .reveal-clip').forEach(el => {
      io.observe(el);
    });
  }

  // ============================================
  // Audio engine + UI wiring
  // ============================================
  const engine = new AudioEngine();
  const tracks = window.TRACKS;
  const artists = window.ARTISTS;
  const albums = window.ALBUMS;
  let currentIdx = 0;

  function formatTime(s) {
    s = Math.max(0, Math.floor(s));
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m + ':' + String(sec).padStart(2, '0');
  }

  function formatPlays(s) { return s; } // already pre-formatted in data

  // ===== NOW PLAYING ELEMENTS =====
  const studio = document.querySelector('.studio');
  const npTitle = document.querySelector('#np-title');
  const npArtist = document.querySelector('#np-artist');
  const npAlbum = document.querySelector('#np-album');
  const npBar = document.querySelector('#np-bar');
  const npBarFill = document.querySelector('#np-bar > span');
  const npElapsed = document.querySelector('#np-elapsed');
  const npRemain = document.querySelector('#np-remain');
  const playBtn = document.querySelector('#play-btn');
  const prevBtn = document.querySelector('#prev-btn');
  const nextBtn = document.querySelector('#next-btn');
  const shuffleBtn = document.querySelector('#shuffle-btn');
  const repeatBtn = document.querySelector('#repeat-btn');
  const volTrack = document.querySelector('#vol-track');
  const volFill = document.querySelector('#vol-track > span');
  const waveCanvas = document.querySelector('#waveform-canvas');
  const wCtx = waveCanvas.getContext('2d');
  const discVinyl = document.querySelector('#disc-vinyl');
  const disc = document.querySelector('#disc');
  const discLabel = document.querySelector('#disc-label');

  function setTrackUI(t) {
    npTitle.textContent = t.title;
    npArtist.innerHTML = '<b>' + t.artist + '</b>';
    npAlbum.textContent = t.album + ' · ' + t.year;
    discLabel.textContent = t.title;
    // Apply per-track color to the page (CSS custom property cascade)
    studio.style.setProperty('--track-color', t.color);
    studio.style.setProperty('--track-glow', hexToRgba(t.color, 0.45));
    studio.style.setProperty('--artist-glow', hexToRgba(t.color, 0.08));
    studio.style.setProperty('--artist-glow-2', hexToRgba(t.color, 0.04));
    // Mark active row
    document.querySelectorAll('.song-row').forEach(r => {
      const isActive = parseInt(r.dataset.idx) === currentIdx;
      r.classList.toggle('is-playing', isActive);
      if (isActive) r.style.setProperty('--row-color', t.color);
    });
  }

  function hexToRgba(hex, a) {
    const h = hex.replace('#', '');
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
  }

  function setPlayIcon(playing) {
    playBtn.innerHTML = playing
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8V4z"/></svg>';
    discVinyl.classList.toggle('is-spinning', playing);
    disc.classList.toggle('is-playing', playing);
  }

  function playIndex(i) {
    currentIdx = (i + tracks.length) % tracks.length;
    const t = tracks[currentIdx];
    setTrackUI(t);
    engine.play(t);
    setPlayIcon(true);
  }

  // ===== BUILD SONGS LIST =====
  const songsEl = document.querySelector('#songs-list');
  tracks.forEach((t, i) => {
    const row = document.createElement('div');
    row.className = 'song-row';
    row.dataset.idx = i;
    row.style.setProperty('--row-color', t.color);
    row.innerHTML = `
      <div class="idx">
        <span class="idx-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="idx-play"><svg viewBox="0 0 16 16" fill="currentColor"><path d="M3 2l11 6-11 6V2z"/></svg></span>
        <span class="now-bars"><span></span><span></span><span></span></span>
      </div>
      <div class="song-art"></div>
      <div class="song-info">
        <div class="name">${t.title}</div>
        <div class="artist">${t.artist}</div>
      </div>
      <div class="album">${t.album}</div>
      <div class="plays">${t.plays}</div>
      <div class="duration">${formatTime(t.duration)}</div>
    `;
    row.addEventListener('click', () => playIndex(i));
    songsEl.appendChild(row);
  });

  // ===== BUILD ARTIST RAIL =====
  const railEl = document.querySelector('#artist-rail');
  artists.forEach((artist) => {
    const tile = document.createElement('article');
    tile.className = 'artist-tile';
    tile.style.setProperty('--artist-color', artist.color);
    tile.innerHTML = `
      <div class="artist-tile-bg"></div>
      <div class="artist-tile-glyph">${artist.initials}</div>
      <div class="artist-tile-info">
        <div class="top">
          <div class="artist-tile-meta">${artist.tag.split(' · ')[0]} · <b>${artist.tag.split(' · ')[1] || ''}</b></div>
          <div class="artist-tile-num">${artist.listeners}</div>
        </div>
        <div>
          <div class="artist-tile-name">${artist.name}</div>
          <div class="artist-tile-tag">${artist.tag}</div>
          <div class="artist-tile-listeners">
            <span class="n">${artist.listeners}</span>
            <span class="l">Monthly</span>
          </div>
          <button class="artist-tile-play">
            <span class="ico"><svg viewBox="0 0 16 16" fill="currentColor"><path d="M3 2l11 6-11 6V2z"/></svg></span>
            <span>Play Top</span>
          </button>
        </div>
      </div>
    `;
    // Mouse-following gradient
    tile.addEventListener('mousemove', e => {
      const r = tile.getBoundingClientRect();
      tile.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      tile.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
    // 3D tilt
    tile.addEventListener('mousemove', e => {
      const r = tile.getBoundingClientRect();
      const cx = r.width / 2;
      const cy = r.height / 2;
      const dx = (e.clientX - r.left - cx) / cx;
      const dy = (e.clientY - r.top - cy) / cy;
      tile.style.transform = `perspective(1200px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translateY(-4px)`;
    });
    tile.addEventListener('mouseleave', () => {
      tile.style.transform = '';
    });
    // Play artist's top song
    tile.querySelector('.artist-tile-play').addEventListener('click', (e) => {
      e.stopPropagation();
      const firstIdx = tracks.findIndex(t => t.artistId === artist.id);
      if (firstIdx >= 0) playIndex(firstIdx);
    });
    railEl.appendChild(tile);
  });

  // Rail arrows
  const railWrap = document.querySelector('#artist-rail');
  document.querySelector('#rail-prev').addEventListener('click', () => {
    railWrap.scrollBy({ left: -400, behavior: 'smooth' });
  });
  document.querySelector('#rail-next').addEventListener('click', () => {
    railWrap.scrollBy({ left: 400, behavior: 'smooth' });
  });

  // ===== BUILD ALBUMS GRID =====
  const albumsEl = document.querySelector('#albums-grid');
  albums.forEach((album, i) => {
    const card = document.createElement('article');
    card.className = 'album-card';
    card.style.setProperty('--album-color', album.color);
    card.innerHTML = `
      <div class="album-cover-3d">
        <div class="album-art"></div>
        <div class="album-art-blob b1"></div>
        <div class="album-art-blob b2"></div>
        <div class="album-art-grain"></div>
        <div class="gloss"></div>
        <span class="album-num">AM · ${String(i + 1).padStart(2, '0')}</span>
        <span class="album-type">${album.type}</span>
        <span class="album-glyph">${album.title}</span>
      </div>
      <div class="album-info">
        <div>
          <div class="t">${album.title}</div>
          <div class="sub">${album.artist} · ${album.tracks} tracks</div>
        </div>
        <div class="year">${album.year}</div>
      </div>
    `;
    // 3D mouse tilt on cover
    const cover = card.querySelector('.album-cover-3d');
    card.addEventListener('mousemove', e => {
      const r = cover.getBoundingClientRect();
      const cx = r.width / 2;
      const cy = r.height / 2;
      const dx = (e.clientX - r.left - cx) / cx;
      const dy = (e.clientY - r.top - cy) / cy;
      cover.style.transform = `rotateY(${dx * 12}deg) rotateX(${-dy * 12}deg) translateZ(0)`;
    });
    card.addEventListener('mouseleave', () => {
      cover.style.transform = '';
    });
    // Click → play first song from that album
    card.addEventListener('click', () => {
      const i = tracks.findIndex(t => t.albumId === album.id);
      if (i >= 0) playIndex(i);
    });
    albumsEl.appendChild(card);
  });

  // ===== INITIAL STATE =====
  setTrackUI(tracks[0]);
  engine.currentTrack = tracks[0];

  // ===== TRANSPORT EVENTS =====
  playBtn.addEventListener('click', () => {
    if (!engine.currentTrack || (!engine.playing && engine.elapsed === 0 && !engine.ctx)) {
      playIndex(currentIdx);
    } else if (engine.playing) {
      engine.pause();
      setPlayIcon(false);
    } else {
      engine.resume();
      setPlayIcon(true);
    }
  });

  prevBtn.addEventListener('click', () => playIndex(currentIdx - 1));
  nextBtn.addEventListener('click', () => playIndex(currentIdx + 1));

  shuffleBtn.addEventListener('click', () => {
    engine.shuffle = !engine.shuffle;
    shuffleBtn.classList.toggle('is-on', engine.shuffle);
  });
  repeatBtn.addEventListener('click', () => {
    engine.repeat = !engine.repeat;
    repeatBtn.classList.toggle('is-on', engine.repeat);
  });

  engine.onTrackEnd = () => {
    if (engine.repeat) playIndex(currentIdx);
    else if (engine.shuffle) playIndex(Math.floor(Math.random() * tracks.length));
    else playIndex(currentIdx + 1);
  };

  // Seek
  npBar.addEventListener('click', e => {
    const r = npBar.getBoundingClientRect();
    const ratio = (e.clientX - r.left) / r.width;
    engine.seek(ratio);
  });

  // Volume
  volTrack.addEventListener('click', e => {
    const r = volTrack.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    engine.setVolume(ratio);
    volFill.style.width = (ratio * 100) + '%';
  });
  engine.setVolume(0.7);
  volFill.style.width = '70%';

  // Tick → progress UI
  engine.onTick(p => {
    if (!p.duration) return;
    npBarFill.style.width = (p.ratio * 100) + '%';
    npElapsed.textContent = formatTime(p.elapsed);
    npRemain.textContent = '-' + formatTime(p.duration - p.elapsed);
  });

  // Waveform
  function drawWave() {
    const data = engine.getAnalyserData();
    const w = waveCanvas.width = waveCanvas.offsetWidth * (window.devicePixelRatio || 1);
    const h = waveCanvas.height = waveCanvas.offsetHeight * (window.devicePixelRatio || 1);
    wCtx.clearRect(0, 0, w, h);
    const barCount = 80;
    const bw = w / barCount;
    const trackColor = engine.currentTrack ? engine.currentTrack.color : '#f0c75e';
    for (let i = 0; i < barCount; i++) {
      let v;
      if (data) {
        const idx = Math.floor((i / barCount) * data.length * 0.7);
        v = data[idx] / 255;
      } else {
        v = 0.12 + Math.sin(Date.now() * 0.002 + i * 0.3) * 0.04;
      }
      const bh = Math.max(2, v * h * 0.95);
      const x = i * bw + bw * 0.25;
      const y = h - bh;
      const g = wCtx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, trackColor);
      g.addColorStop(1, hexToRgba(trackColor, 0.2));
      wCtx.fillStyle = g;
      wCtx.fillRect(x, y, bw * 0.5, bh);
    }
    requestAnimationFrame(drawWave);
  }
  drawWave();

  // ============================================
  // 3D mouse parallax on disc
  // ============================================
  const discStage = document.querySelector('#disc-stage');
  discStage.addEventListener('mousemove', e => {
    const r = discStage.getBoundingClientRect();
    const cx = r.width / 2;
    const cy = r.height / 2;
    const dx = (e.clientX - r.left - cx) / cx;
    const dy = (e.clientY - r.top - cy) / cy;
    disc.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg)`;
  });
  discStage.addEventListener('mouseleave', () => {
    disc.style.transform = '';
  });
  discStage.addEventListener('click', () => engine.toggle && (engine.playing ? (engine.pause(), setPlayIcon(false)) : (engine.resume(), setPlayIcon(true))));

  // ============================================
  // Scroll-driven parallax helpers
  // ============================================
  function onScrollParallax() {
    const featured = document.querySelector('.featured');
    if (!featured) return;
    const rect = featured.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
    // disc rises slightly as we scroll
    if (disc) {
      disc.style.setProperty('--scroll-y', progress + '');
    }
  }
  window.addEventListener('scroll', onScrollParallax, { passive: true });

  // ============================================
  // Smooth scroll for nav links
  // ============================================
  navLinks.forEach(a => {
    a.addEventListener('click', e => {
      const target = a.dataset.target;
      const el = document.getElementById(target);
      if (el) {
        e.preventDefault();
        window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // Easter egg — "AM"
  // ============================================
  const easter = document.querySelector('.easter');
  const easterClose = document.querySelector('#easter-close');
  let buffer = '';
  document.addEventListener('keydown', e => {
    buffer = (buffer + e.key.toLowerCase()).slice(-6);
    if (buffer.endsWith('am') && e.key.toLowerCase() === 'm') {
      easter.classList.add('is-on');
    }
    if (e.key === 'Escape') easter.classList.remove('is-on');
  });
  easterClose.addEventListener('click', () => easter.classList.remove('is-on'));

  // Click brand: replay intro (5x clicks → easter egg)
  let brandClicks = 0;
  let brandTimer;
  navBrand.addEventListener('click', (e) => {
    e.preventDefault();
    brandClicks++;
    clearTimeout(brandTimer);
    brandTimer = setTimeout(() => brandClicks = 0, 1200);
    if (brandClicks >= 5) {
      easter.classList.add('is-on');
      brandClicks = 0;
      return;
    }
    reopenIntro();
  });

  // ============================================
  // Live clock
  // ============================================
  const clock = document.querySelector('#nav-clock');
  function tickClock() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    clock.textContent = hh + ':' + mm + ':' + ss;
  }
  setInterval(tickClock, 1000);
  tickClock();

})();
