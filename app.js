/* Echo landing — config wiring, the launch demo, coin bursts, the phone app, counters. */
(function () {
  'use strict';
  var C = window.ECHO || {};
  var $ = function (id) { return document.getElementById(id); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var money = function (n, d) { return '$' + n.toLocaleString('en-US', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };
  var rnd = function (a, b) { return a + Math.random() * (b - a); };
  var LOGO = '<svg viewBox="0 0 48 40"><use href="#logo"/></svg>';
  var ICON = function (id) { return '<svg><use href="#' + id + '"/></svg>'; };

  /* ---------- config ---------- */
  $$('[data-x]').forEach(function (a) { if (C.x) { a.href = C.x; a.hidden = false; } });
  $$('[data-app]').forEach(function (a) { if (C.app) { a.href = C.app; a.target = '_blank'; a.rel = 'noopener'; } });
  /* CA bar on top: "coming soon" until config.contract is filled */
  var tb = $('topbar');
  if (C.contract) {
    $('tb-ca').textContent = C.contract;
    var tc = $('tb-copy'); tc.hidden = false;
    tc.onclick = function () {
      (navigator.clipboard ? navigator.clipboard.writeText(C.contract) : Promise.reject()).then(function () { tc.textContent = 'Copied'; }, function () { tc.textContent = 'Copy failed'; });
      setTimeout(function () { tc.textContent = 'Copy'; }, 1600);
    };
    if (C.trade) { var tt = $('tb-trade'); tt.href = C.trade; tt.hidden = false; }
    $('tb-note').remove();
  } else tb.classList.add('soon');
  if (C.contract) {
    $('ca-v').textContent = C.contract;
    var cp = $('ca-copy'); cp.hidden = false;
    cp.onclick = function () {
      (navigator.clipboard ? navigator.clipboard.writeText(C.contract) : Promise.reject()).then(function () { cp.textContent = 'Copied'; }, function () { cp.textContent = 'Copy failed'; });
      setTimeout(function () { cp.textContent = 'Copy'; }, 1600);
    };
    if (C.trade) { var tr = $('ca-trade'); tr.href = C.trade; tr.hidden = false; }
  }

  /* ---------- little generated avatars (no external images) ---------- */
  var PAL = [['#FFC94D', '#FF9F2E'], ['#B9C3D6', '#59667F'], ['#9FE3B5', '#4AA77A'], ['#F6AFC8', '#C56A93'], ['#A9B8FF', '#5B66D6'], ['#FFB38A', '#E06A3B'], ['#8FE0F0', '#3794A8'], ['#E3D27A', '#8E8034']];
  function avatar(i) {
    var p = PAL[i % PAL.length], v = i % 4, id = 'g' + i + Math.floor(Math.random() * 1e6);
    var eyes = v === 0 ? '<rect x="9" y="17" width="9" height="5" rx="2" fill="#111"/><rect x="22" y="17" width="9" height="5" rx="2" fill="#111"/><path d="M18 19h4" stroke="#111" stroke-width="1.6"/>'
      : v === 1 ? '<circle cx="15" cy="19" r="2.4" fill="#1b1b1b"/><circle cx="25" cy="19" r="2.4" fill="#1b1b1b"/>'
      : v === 2 ? '<path d="M12 19q3-3 6 0M22 19q3-3 6 0" fill="none" stroke="#1b1b1b" stroke-width="2" stroke-linecap="round"/>'
      : '<circle cx="15" cy="19" r="3.4" fill="#fff"/><circle cx="25" cy="19" r="3.4" fill="#fff"/><circle cx="15.6" cy="19.4" r="1.8" fill="#111"/><circle cx="25.6" cy="19.4" r="1.8" fill="#111"/>';
    return '<svg viewBox="0 0 40 40"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + p[0] + '"/><stop offset="1" stop-color="' + p[1] + '"/></linearGradient></defs>' +
      '<rect width="40" height="40" fill="#1a1d1c"/><circle cx="20" cy="24" r="17" fill="url(#' + id + ')"/>' + eyes +
      '<path d="M17 27q3 2.5 6 0" fill="none" stroke="#1b1b1b" stroke-width="1.8" stroke-linecap="round"/></svg>';
  }
  function catThumb() {
    return '<svg viewBox="0 0 64 64"><rect width="64" height="64" fill="#F4CF6A"/><path d="M6 14 14 2l8 12zM42 14l8-12 8 12z" fill="#E9B94A"/>' +
      '<circle cx="20" cy="30" r="10" fill="#fff"/><circle cx="44" cy="30" r="10" fill="#fff"/><circle cx="20" cy="31" r="7" fill="#D9772F"/><circle cx="44" cy="31" r="7" fill="#D9772F"/>' +
      '<circle cx="20" cy="31" r="3.4" fill="#2a1a10"/><circle cx="44" cy="31" r="3.4" fill="#2a1a10"/><circle cx="18" cy="28" r="1.6" fill="#fff"/><circle cx="42" cy="28" r="1.6" fill="#fff"/>' +
      '<path d="M29 42h6l-3 3z" fill="#C0603A"/><path d="M32 45v3M28 50q4 3 8 0" stroke="#7a4a2a" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>';
  }
  function boostThumb() {
    return '<svg viewBox="0 0 64 64"><defs><radialGradient id="bt" cx=".5" cy="1" r="1"><stop offset="0" stop-color="#2f6b4c"/><stop offset="1" stop-color="#0f1311"/></radialGradient></defs><rect width="64" height="64" fill="url(#bt)"/>' +
      '<g transform="translate(14 17) scale(.75)" fill="#5FFFA8"><path d="M26 6H15a14 14 0 0 0 0 28H19L23 24H15a4 4 0 0 1 0-8H22Z"/><path d="M22 34H33a14 14 0 0 0 0-28H29L25 16H33a4 4 0 0 1 0 8H26Z"/></g></svg>';
  }
  function tungThumb() {
    return '<svg viewBox="0 0 64 64"><rect width="64" height="64" fill="#8B5A34"/><rect x="18" y="8" width="28" height="52" rx="12" fill="#C68A55"/><rect x="18" y="8" width="28" height="52" rx="12" fill="none" stroke="#6e4426" stroke-width="2"/>' +
      '<circle cx="27" cy="26" r="3.6" fill="#fff"/><circle cx="38" cy="26" r="3.6" fill="#fff"/><circle cx="27.5" cy="26.5" r="1.8" fill="#111"/><circle cx="38.5" cy="26.5" r="1.8" fill="#111"/>' +
      '<path d="M26 36q6 4 12 0" stroke="#3b2414" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="44" y="30" width="16" height="5" rx="2.5" fill="#E9D6B8" transform="rotate(-30 52 32)"/></svg>';
  }
  $('lav').innerHTML = tungThumb();

  /* ---------- coin bursts ---------- */
  var layer = $('coins');
  function coinEl() {
    var c = document.createElement('div'); c.className = 'coin';
    c.innerHTML = '<b class="back">' + LOGO + '</b><i></i><b class="front">' + LOGO + '</b>';
    layer.appendChild(c); return c;
  }
  function burst(x, y, n) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var coins = [];
    for (var i = 0; i < (n || 16); i++) {
      coins.push({ el: coinEl(), x: x + rnd(-60, 60), y: y + rnd(-10, 10), z: rnd(-80, 260), vx: rnd(-11, 11), vy: rnd(-19, -8), vz: rnd(-4, 6),
        rx: rnd(0, 360), ry: rnd(0, 360), vrx: rnd(-9, 9), vry: rnd(-14, 14), s: rnd(.6, 1.35) });
    }
    var t0 = performance.now();
    (function step(now) {
      var alive = 0, H = window.innerHeight;
      coins.forEach(function (c) {
        if (!c.el) return;
        c.vy += .55; c.x += c.vx; c.y += c.vy; c.z += c.vz; c.rx += c.vrx; c.ry += c.vry; c.vx *= .992;
        c.el.style.transform = 'translate3d(' + c.x + 'px,' + c.y + 'px,' + c.z + 'px) scale(' + c.s + ') rotateX(' + c.rx + 'deg) rotateY(' + c.ry + 'deg)';
        if (c.y > H + 120 || now - t0 > 4000) { c.el.remove(); c.el = null; } else alive++;
      });
      if (alive) requestAnimationFrame(step);
    })(t0);
  }
  function burstFrom(el, n) { var r = el.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, n); }

  function setRing(ring, pctEl, p) {
    ring.style.strokeDashoffset = (47.1 * (1 - p / 100)).toFixed(1);
    pctEl.textContent = Math.round(p) + '%';
  }

  /* ---------- hero launcher (plays a short demo, then it's yours) ---------- */
  var lname = $('lname'), lrow = lname.parentNode, lbox = $('lbox'), lbtn = $('launch-btn'), cursor = $('cursor'), launcher = $('launcher');
  var demoOn = true, fillT = null;
  function stopDemo() { demoOn = false; cursor.style.opacity = 0; }
  lname.addEventListener('focus', stopDemo);
  lname.addEventListener('input', function () { lrow.classList.remove('ok'); });
  lbox.onclick = function () { stopDemo(); if (lname.value.trim()) { lrow.classList.remove('ok'); void lrow.offsetWidth; lrow.classList.add('ok'); } else lname.focus(); };
  function launchHero() {
    var name = lname.value.trim() || 'My Campaign';
    lname.value = name; lrow.classList.add('ok');
    burstFrom(lbtn, 18);
    var card = $('launched'); card.hidden = false; card.style.animation = 'none'; void card.offsetWidth; card.style.animation = '';
    $('launched-name').textContent = name;
    var p = 0, target = Math.round(rnd(38, 75)), ring = $('launched-ring'), pe = $('launched-pct');
    setRing(ring, pe, 0); clearInterval(fillT);
    fillT = setInterval(function () { p = Math.min(target, p + rnd(1, 4)); setRing(ring, pe, p); if (p >= target) clearInterval(fillT); }, 140);
    lbtn.textContent = 'Campaign launched ✓';
    setTimeout(function () { lbtn.textContent = 'Launch Campaign'; }, 2200);
  }
  lbtn.onclick = function (e) { if (e.isTrusted) stopDemo(); launchHero(); };

  function moveCursor(el, dx, dy) {
    var a = launcher.getBoundingClientRect(), r = el.getBoundingClientRect();
    cursor.style.transform = 'translate(' + (r.left - a.left + (dx == null ? r.width * .62 : dx)) + 'px,' + (r.top - a.top + (dy == null ? r.height * .55 : dy)) + 'px)';
  }
  function click(cb) { cursor.classList.add('click'); setTimeout(function () { cursor.classList.remove('click'); cb && cb(); }, 160); }
  function demo() {
    if (!demoOn) return;
    var txt = 'Tung Campaign', i = 0;
    cursor.style.transition = 'none'; moveCursor(lname, 20, 60); void cursor.offsetWidth; cursor.style.transition = '';
    cursor.style.opacity = 1;
    var typer = setInterval(function () {
      if (!demoOn) return clearInterval(typer);
      lname.value = txt.slice(0, ++i);
      if (i >= txt.length) {
        clearInterval(typer);
        moveCursor(lbox, 12, 14);
        setTimeout(function () { if (!demoOn) return; click(function () { lrow.classList.add('ok'); });
          setTimeout(function () { if (!demoOn) return; moveCursor(lbtn);
            setTimeout(function () { if (!demoOn) return; click(launchHero); setTimeout(function () { cursor.style.opacity = 0; demoOn = false; }, 900); }, 1000);
          }, 900);
        }, 950);
      }
    }, 75);
  }
  setTimeout(demo, 1500);

  /* ---------- reveal + count-up ---------- */
  function countUp(el) {
    var to = +el.getAttribute('data-count'), pre = el.getAttribute('data-prefix') || '', t0 = performance.now(), D = 1400;
    (function f(now) {
      var k = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - k, 3);
      el.textContent = pre + Math.round(to * e).toLocaleString('en-US');
      if (k < 1) requestAnimationFrame(f);
    })(t0);
  }
  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target; io.unobserve(el);
      if (el.hasAttribute('data-count')) countUp(el); else el.classList.add('in');
    });
  }, { threshold: .18 });
  $$('.reveal,[data-count]').forEach(function (el) { io.observe(el); });

  /* "how" lines light up as you scroll past them */
  var hls = $$('[data-hl]');
  function onScroll() { var H = window.innerHeight; hls.forEach(function (h) { var r = h.getBoundingClientRect(); h.classList.toggle('on', r.top + r.height / 2 < H * .62); }); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- marquee ---------- */
  var MQ = [['@mochi', 'earned', '$419', 'on Cets everywhere'], ['Echo Boost', 'is', '45% filled', ''], ['@kaimori', 'earned', '$286', 'on Echo Boost'], ['Tung Campaign', 'launched with a', '$2,400', 'pool'],
    ['@ava_reyes', 'earned', '$253', 'on Cets everywhere'], ['5,320', 'creators', 'on Echo', ''], ['Cets everywhere', 'pays', '$2/1K', 'views'], ['@noodle.eth', 'earned', '$98', 'on Tung Campaign']];
  var mqh = MQ.map(function (m) { return '<span><svg style="width:14px;height:14px;color:#5FFFA8"><use href="#logo"/></svg><b>' + m[0] + '</b> ' + m[1] + ' <em>' + m[2] + '</em> ' + m[3] + '</span>'; }).join('');
  $('mq').innerHTML = mqh + mqh;

  /* ---------- the phone app ---------- */
  var TOP = [['@mochi', 419, 0], ['@kaimori', 286, 1], ['@ava_reyes', 253, 2]];
  $('podium').innerHTML = TOP.map(function (t, i) {
    return '<div><span class="av">' + avatar(t[2]) + '<span class="rk">' + (i + 1) + '</span></span><span class="amt">$' + t[1] + '</span><span class="hdl">' + t[0] + '</span></div>';
  }).join('');
  var socials = '<span class="socials">' + ICON('i-x') + ICON('i-tt') + ICON('i-ig') + ICON('i-yt') + '</span>';
  var CAMPS = [
    { t: 'Cets everywhere', th: catThumb(), cr: 4, pool: 8814, left: '23d left', rate: '$2/1K', p: 88, hot: true, s: socials },
    { t: 'Echo Boost', th: boostThumb(), cr: 12, pool: 1500, left: '9d left', rate: '$2/1K', p: 45, s: '<span class="socials">' + ICON('i-x') + '</span>' },
    { t: 'Tung Campaign', th: tungThumb(), cr: 7, pool: 2400, left: '14d left', rate: '$3/1K', p: 21, s: '<span class="socials">' + ICON('i-x') + ICON('i-tt') + '</span>' }
  ];
  $('camps').innerHTML = CAMPS.map(function (c, k) {
    return '<div class="camp' + (c.hot ? ' hot' : '') + '"><span class="thumb">' + c.th + c.s + '</span><div class="info"><span class="t">' + c.t + '</span>' +
      '<span class="cr"><i><span>' + avatar(k) + '</span><span>' + avatar(k + 1) + '</span><span>' + avatar(k + 2) + '</span></i>' + c.cr + ' creators</span>' +
      '<span class="m"><b>' + money(c.pool) + '</b><span class="muted">' + c.left + '</span><span class="rate">' + c.rate + '</span></span>' +
      '<span class="bar"><i style="width:' + c.p + '%"></i></span></div></div>';
  }).join('');
  $('ph-live').textContent = CAMPS.length + ' live';
  // the "paid" number ticks up a little while you look at it
  var paid = 1186;
  setInterval(function () {
    var r = $('attend').getBoundingClientRect(); if (r.bottom < 0 || r.top > window.innerHeight) return;
    paid += Math.round(rnd(1, 9)); $('ph-paid').textContent = money(paid); $('ph-week').textContent = '+' + money(paid) + ' this week';
  }, 1700);

  // falling $ coins around the phone
  var rain = $('rain'), rh = '';
  for (var d = 0; d < 16; d++) {
    var sz = Math.round(rnd(16, 34)), dur = rnd(4.5, 9).toFixed(1);
    rh += '<span class="drop" style="left:' + rnd(0, 96).toFixed(1) + '%;width:' + sz + 'px;height:' + sz + 'px;opacity:' + rnd(.35, .95).toFixed(2) + ';animation-duration:' + dur + 's;animation-delay:-' + rnd(0, dur).toFixed(1) + 's;--spin:' + (Math.random() < .5 ? '-' : '') + Math.round(rnd(180, 900)) + 'deg">' +
      '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13.5" fill="none" stroke="currentColor" stroke-width="3"/><g transform="translate(6 6) scale(.84)"><use href="#i-dollar"/></g></svg></span>';
  }
  rain.innerHTML = rh;
  function sizeRain() { rain.style.setProperty('--h', (rain.offsetHeight + 80) + 'px'); $$('.drop', rain).forEach(function (s) { s.style.setProperty('--h', (rain.offsetHeight + 80) + 'px'); }); }
  sizeRain(); window.addEventListener('resize', sizeRain);

  /* ---------- campaign builder ---------- */
  var bBudget = $('b-budget'), bRate = $('b-rate');
  function rangeFill(r) { r.style.setProperty('--p', ((r.value - r.min) / (r.max - r.min) * 100) + '%'); }
  function plats() { return $$('.plat.on').map(function (b) { return b.getAttribute('data-p'); }); }
  function updBuilder() {
    var ps = plats(), rate = +bRate.value, budget = Math.max(0, +bBudget.value || 0);
    $('b-only').textContent = ps.length === 1 ? 'Only available on ' + ps[0] : 'On ' + ps.join(', ');
    $('b-rate-v').textContent = '$' + rate + '/1K';
    $('b-est').textContent = '≈ ' + Math.round(budget / rate * 1000).toLocaleString('en-US') + ' views to fill the pool';
    rangeFill(bRate);
  }
  $$('.plat').forEach(function (b) {
    b.onclick = function () { if (b.classList.contains('on') && plats().length === 1) return; b.classList.toggle('on'); updBuilder(); };
  });
  bBudget.oninput = updBuilder; bRate.oninput = updBuilder; updBuilder();

  var HANDLES = ['@mochi', '@kaimori', '@ava_reyes', '@noodle.eth', '@zenji', '@lilpump_fi', '@marlo', '@degen_kat', '@sora.x', '@bitbae'];
  var feedT = null;
  $('b-launch').onclick = function () {
    var btn = this, name = $('b-name').value.trim() || 'Echo Boost', budget = Math.max(100, +bBudget.value || 1500), rate = +bRate.value;
    burstFrom(btn, 20);
    var live = $('b-live'); live.hidden = false; live.style.animation = 'none'; void live.offsetWidth; live.style.animation = '';
    $('bl-name').textContent = name;
    var feed = $('bl-feed'), spent = 0, ring = $('bl-ring'), pe = $('bl-pct'), k = 0, ps = plats();
    feed.innerHTML = ''; setRing(ring, pe, 0); clearInterval(feedT);
    btn.textContent = 'Live ✓';
    feedT = setInterval(function () {
      var views = Math.round(rnd(8, 160)) * 1000, pay = Math.min(budget - spent, views / 1000 * rate), pl = ps[k % ps.length];
      spent += pay; k++;
      var row = document.createElement('div');
      row.innerHTML = '<i>' + avatar(k) + '</i><b>' + HANDLES[k % HANDLES.length] + '</b> posted on ' + pl + ' · ' + (views / 1000) + 'K views<em>+' + money(pay, 2) + '</em>';
      feed.insertBefore(row, feed.firstChild);
      if (feed.children.length > 5) feed.lastChild.remove();
      setRing(ring, pe, spent / budget * 100);
      if (spent >= budget - .001) {
        clearInterval(feedT); pe.textContent = '100%';
        var done = document.createElement('div'); done.innerHTML = '<svg><use href="#i-check"/></svg><b>Pool filled</b> · ' + money(budget) + ' paid to creators';
        feed.insertBefore(done, feed.firstChild); btn.textContent = 'Launch Campaign';
      }
    }, 900);
  };

  /* ---------- rolling "User rewards" number ---------- */
  var roll = $('roll'), rv = 1240.98, built = '';
  function renderRoll(v) {
    var s = money(v, 2);
    if (s.length !== built.length) {
      roll.innerHTML = s.split('').map(function (ch) {
        return /\d/.test(ch) ? '<span class="col"><span>' + '0123456789'.split('').map(function (n) { return '<i>' + n + '</i>'; }).join('') + '</span></span>' : '<span class="col">' + ch + '</span>';
      }).join('');
      void roll.offsetWidth;
    }
    built = s;
    var cols = roll.children;
    s.split('').forEach(function (ch, i) { if (/\d/.test(ch)) cols[i].firstChild.style.transform = 'translateY(-' + (+ch * 1.12).toFixed(2) + 'em)'; });
  }
  renderRoll(rv);
  var rollIo = new IntersectionObserver(function (e) {
    if (!e[0].isIntersecting) return; rollIo.disconnect();
    setTimeout(function () { rv = 9821.28; renderRoll(rv); }, 300);
    setInterval(function () { rv += rnd(2, 38); renderRoll(rv); }, 2200);
  }, { threshold: .5 });
  rollIo.observe(roll);

  /* ---------- earnings calculator ---------- */
  var cViews = $('c-views'), cRate = 2;
  function views() { return Math.round(1000 * Math.pow(10, cViews.value / 100 * 3.7) / 1000) * 1000; }
  function fmtViews(v) { return v >= 1e6 ? (v / 1e6).toFixed(v >= 1e7 ? 0 : 1).replace('.0', '') + 'M' : Math.round(v / 1000) + 'K'; }
  function updCalc() {
    var v = views(); $('c-views-v').textContent = fmtViews(v) + ' views';
    $('c-earn').textContent = money(v / 1000 * cRate, 2); rangeFill(cViews);
  }
  cViews.oninput = updCalc;
  $$('#c-rates button').forEach(function (b) {
    b.onclick = function () { $$('#c-rates button').forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); cRate = +b.getAttribute('data-r'); updCalc(); };
  });
  updCalc();

  /* ---------- weekly board ---------- */
  var BOARD = [['@mochi', 419, '209K views'], ['@kaimori', 286, '143K views'], ['@ava_reyes', 253, '126K views'], ['@noodle.eth', 98, '49K views'], ['@zenji', 71, '35K views']];
  $('board').innerHTML = BOARD.map(function (b, i) {
    return '<li><span class="n">0' + (i + 1) + '</span><span class="av">' + avatar(i) + '</span><b>' + b[0] + '</b><span class="v">' + b[2] + '</span><span class="amt">$' + b[1] + '</span></li>';
  }).join('');

  /* the film plays muted when it scrolls in, until someone presses play themselves */
  var film = $('film-v'), touched = false;
  film.addEventListener('volumechange', function () { if (!film.muted) touched = true; });
  film.muted = true;
  new IntersectionObserver(function (e) {
    if (touched) return;
    if (e[0].isIntersecting) { var p = film.play(); if (p && p.catch) p.catch(function () {}); } else film.pause();
  }, { threshold: .5 }).observe(film);
})();
