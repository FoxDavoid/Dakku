document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const heroBg = document.querySelector('.hero-bg-effect');
  const body = document.body;

  const slug = s => s.split('(')[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const allTracks = [
    {
      title: 'Nowhere',
      year: 2026,
      img: 'Dakku-Nowhere.webp',
      featured: true,
      yt: 'https://youtu.be/BNYslQXJJAs',
      dl: '7ycjgsnjonhezzq2lyg39/Nowhere.mp3?rlkey=622fdukehmsrqnhqal2nwj19l&st=peaoxplp&dl=1',
      sp: 'https://open.spotify.com/track/0freSMwIWFvEGWqVC9e9ph',
      ap: 'https://music.apple.com/us/album/nowhere-single/6816263641',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_kobAGUKMSbEgBla4gBaByEvNoxvfrn95U',
    },
    {
      title: 'Fragments',
      year: 2026,
      img: 'Dakku-Fragments.webp',
      yt: 'https://youtu.be/srAO21Elnb0',
      dl: 'xvxjhbsgyduiow3gy0hni/Fragments.mp3?rlkey=xgwdevzuouzr4stocaycs3jtz&st=linzyfga&dl=1',
      sp: 'https://open.spotify.com/track/675ZruCaYRLNcZnemZ3JkL',
      ap: 'https://music.apple.com/us/album/fragments-single/1886166291',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_mLg5Lj86x5YXdEkafQZ8-ENU_UeZJmxDI',
    },
    {
      title: 'Celestia',
      year: 2025,
      img: 'Dakku-Celestia.webp',
      yt: 'https://youtu.be/z-5qlTKZ2Vs',
      dl: '52yhozqx3sqk2e86ghwjo/Celestia.mp3?rlkey=jf02gd9azd9pxkg7h600f1p03&st=la20j8tc&dl=1',
      sp: 'https://open.spotify.com/track/0BOhM63JBseZRjA9qbbnzQ',
      ap: 'https://music.apple.com/us/album/celestia-single/1849767871',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_mhboHThwmcjfBTsL_HVfr7Hj3Z2srjCts',
    },
    {
      title: 'Poison',
      year: 2025,
      img: 'Dakku-Poison.webp',
      yt: 'https://youtu.be/lfxlNxUhuFI',
      dl: 'waf0vyclilg2sk3wupr5p/Poison.mp3?rlkey=r3bw4913uvsj23u3or01l6zum&st=4fmttvq4&dl=1',
      sp: 'https://open.spotify.com/track/5DBaZkN9zKnuffxipwCNMC',
      ap: 'https://music.apple.com/us/album/poison-single/1799346105',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_moqYcpkn4fhpJ265--m_20rEakYPTBqSE',
    },
    {
      title: 'Aura',
      year: 2024,
      img: 'Dakku-Aura.webp',
      yt: 'https://youtu.be/pR0HQUSnGTA',
      dl: '28q99i6uaxvztlyw3azzk/Aura.mp3?rlkey=xoyjc9wphqls7u9fvpl0ktgtl&st=k8swne3u&dl=1',
      sp: 'https://open.spotify.com/track/4RPTTJb0FyMGWcdThNv05p',
      ap: 'https://music.apple.com/us/album/aura-single/1772179881',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_nzK-BnwuZRiSHZJ5fapO8k167eXeuL55k',
    },
    {
      title: 'Kokkabiel (Remix)',
      year: 2024,
      img: 'Kokkabiel-Remix.webp',
      artist: 'Seld & TriangleReality',
      yt: 'https://youtu.be/eu7QqJAyIws',
      dl: 'hfqb0wajxn7a9a8go3bra/Kokkabiel-Dakku-Remix.mp3?rlkey=g9lc0q3oj6my5njg7vyx62t41&st=awgvk236&dl=1',
      sp: 'https://open.spotify.com/track/5qyvI52qwxtZYbLSQQTVCD',
      ap: 'https://music.apple.com/us/song/kokkabiel-dakku-remix/1754310981',
      ym: 'https://music.youtube.com/watch?v=zIGf48rYUmE',
    },
    {
      title: 'Stay',
      year: 2024,
      img: 'Dakku-Stay.webp',
      yt: 'https://youtu.be/XS2mU9t7Zbk',
      dl: '7u7c4worntt85lqisbsfs/Stay.mp3?rlkey=azix6cftd6rbswldh9zu7pkqc&st=h83tvxkb&dl=1',
      sp: 'https://open.spotify.com/track/1TQdZ4oFE0HDrzVmyO6tjq',
      ap: 'https://music.apple.com/us/album/stay-single/1733791496',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_mk33e0CZQQ666VUWJv4-xhDHRwx0hFTHE',
    },
    {
      title: 'Incandescent',
      year: 2023,
      img: 'Dakku-Incandescent.webp',
      yt: 'https://youtu.be/52sA96Vp3-4',
      dl: 'go4eatvis57imewcsme9g/Incandescent.mp3?rlkey=4l4tgrbrtbh6zr5vwpehfgy5c&st=le5xq43a&dl=1',
      sp: 'https://open.spotify.com/album/3p5sORwj2XvafImDqIfsZx',
      ap: 'https://music.apple.com/us/album/hysteria-single/1722465493',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_k_eZuY46ctJiHE_qG3kvMkPsZXSXVLhh0',
    },
    {
      title: 'Apotheosic',
      year: 2023,
      img: 'Dakku-Apotheosic.webp',
      yt: 'https://youtu.be/9BANJ6Zdba4',
      dl: 'pmlf1p9r0t1653641tdzp/Apotheosic.mp3?rlkey=hu1pejbx24wygc6k4k1eziriv&st=t1uobw97&dl=1',
      sp: 'https://open.spotify.com/album/3p5sORwj2XvafImDqIfsZx',
      ap: 'https://music.apple.com/us/album/hysteria-single/1722465493',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_k_eZuY46ctJiHE_qG3kvMkPsZXSXVLhh0',
    },
    {
      title: 'Hysteria',
      year: 2023,
      img: 'Dakku-Hysteria.webp',
      yt: 'https://youtu.be/h6BumTY_RAc',
      dl: 'h5js0jqzvimpqj5tj3odq/Hysteria.mp3?rlkey=dj5fh5p2gxcyat22jidus53lk&st=1e5molu1&dl=1',
      sp: 'https://open.spotify.com/album/3p5sORwj2XvafImDqIfsZx',
      ap: 'https://music.apple.com/us/album/hysteria-single/1722465493',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_k_eZuY46ctJiHE_qG3kvMkPsZXSXVLhh0',
    },
    {
      title: 'Ephemeral',
      year: 2023,
      img: 'Dakku-Ephemeral.webp',
      yt: 'https://youtu.be/r1Fx-4E43BU',
      dl: 'u5m5n14jmgjovzjnc5h6i/Ephemeral.mp3?rlkey=skt4wslj4pj5s102q7w8ngrle&st=meb0nctf&dl=1',
      sp: 'https://open.spotify.com/track/3DumAolgpvThvSCmDPwT71',
      ap: 'https://music.apple.com/us/album/ephemeral-single/1694013067',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_lcTdiORRMB9Rretrffh-eITPEgbViDkSk',
    },
    {
      title: 'Ather',
      year: 2023,
      img: 'Dakku-Ather.webp',
      yt: 'https://youtu.be/2eNY3nvEgIs',
      dl: 'stsjpp3vh0uom1ek1tqsb/Ather.mp3?rlkey=39cm9aft5ry93xm7no7roay17&st=y79w6mw2&dl=1',
      sp: 'https://open.spotify.com/track/4Lr31ZhQCO7blQwK3K8Mpx',
      ap: 'https://music.apple.com/us/album/ather-single/1672326224',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_kMvV1MsTh1r8FJ0IWc01GC2RMGflSBMkQ',
    },
    {
      title: 'Healing',
      year: 2022,
      img: 'Dakku-Healing.webp',
      yt: 'https://youtu.be/e9rjifWJJro',
      dl: 'yns878cvszaz6wd99sk4h/Healing.mp3?rlkey=yrl0az53fjppz90o0dytezx2e&st=rpcau2ek&dl=1',
      sp: 'https://open.spotify.com/track/4RbD98Ju5B0Ve6gsAOi9h1',
      ap: 'https://music.apple.com/us/album/healing-single/1655212349',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_kcpw12jpxMBFXtaMHhCJm3CsnMIzRT0Ow',
    },
    {
      title: 'Anyway',
      year: 2022,
      img: 'Dakku-Anyway.webp',
      yt: 'https://youtu.be/A_5UWTeE3Gk',
      dl: 'rpx20pjk1rqct3tj69r6p/Anyway.mp3?rlkey=zfxpruluc7eb52zy2spksdwls&st=imh0ufqx&dl=1',
      sp: 'https://open.spotify.com/track/4F4pkjM2t8vgIKtKc6cx1A',
      ap: 'https://music.apple.com/us/album/anyway-single/1644872575',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_lrjvJyEwSVO29cD_4cKJjRd5Lz8OvCm1c',
    },
    {
      title: 'Rest',
      year: 2022,
      img: 'Dakku-Rest.webp',
      yt: 'https://youtu.be/bw8QlmrtNOg',
      dl: 'koa0pvr00bdh4vvnlw58c/Rest.mp3?rlkey=day0tnponw0vnj8y1peviym0w&st=v8vg2idz&dl=1',
      sp: 'https://open.spotify.com/track/7r26wWSCKAF6HIvY0Sl3vv',
      ap: 'https://music.apple.com/us/album/rest-single/1796268655',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_nPyByZ-C12IL6oEf9pGOMYmjwQ2CzjrAs',
    },
    {
      title: 'Aiko',
      year: 2022,
      img: 'Dakku-Aiko.webp',
      yt: 'https://youtu.be/O-0ChQy8AvI',
      dl: 'ienwtgao9m8r39da4dv6h/Aiko.mp3?rlkey=se1mnpxtalqe5fio4tw97ut59&st=5loywnpu&dl=1',
      sp: 'https://open.spotify.com/track/0hNTHZ7BjJbtOzEipXu60j',
      ap: 'https://music.apple.com/us/album/aiko-single/1796271067',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_nUGtjDTfurTYx2SVrNKJLPYS4yQ0gBLek',
    },
    {
      title: 'Lost',
      year: 2022,
      img: 'Dakku-Lost.webp',
      yt: 'https://youtu.be/GJHdWE3Y-Kc',
      dl: 'imh0l2fg3hk14zgrzz4nv/Lost.mp3?rlkey=14yhq7fj32hewhs9c630653g4&st=i1defm4o&dl=1',
      sp: 'https://open.spotify.com/track/5MdLEHZWL3lyhKRHKXkyPh',
      ap: 'https://music.apple.com/us/album/lost-single/1796267202',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_kmuVenRzHINhMm0_15jkMRm0UkQGbyy38',
    },
    {
      title: 'Starlight',
      year: 2022,
      img: 'Dakku-Starlight.webp',
      yt: 'https://youtu.be/aLtatC0LpdA',
      dl: 'eaqb3nwqcg5ini23wg8uh/Starlight.mp3?rlkey=wj6cf5efo6ghy5uqja7svugdu&st=5kcix4ts&dl=1',
      sp: 'https://open.spotify.com/track/1NxfvIp2iW6MiK3KnhIt7c',
      ap: 'https://music.apple.com/us/album/starlight-single/1796271887',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_mCJIzdU_RAVZVW7MYFAVmiJf3W1HSkVZo',
    },
    {
      title: 'Euphoria',
      year: 2021,
      img: 'Dakku-Euphoria.webp',
      yt: 'https://youtu.be/eSDTTyu9Pr0',
      dl: 'oywsi6ygdmdbcjsyydc7b/Euphoria.mp3?rlkey=llpco5wk9ypl2ckw4127319f6&st=lg3njd84&dl=1',
      sp: 'https://open.spotify.com/album/5KtqBBg2wXdOIK0JapxiCG',
      ap: 'https://music.apple.com/us/album/euphoria-single/1848976135',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_ku73BW89o5Kx9JQ1MJ-j1KjkqLFT-yg3g',
    },
    {
      title: 'Sweetness',
      year: 2021,
      img: 'Dakku-Euphoria.webp',
      yt: 'https://youtu.be/VaXEED4exe4',
      dl: '9t21yzkil45nsr51c6i2q/Sweetness.mp3?rlkey=edrm3hgjto8ueq0uur3nywtuu&st=uzstctcm&dl=1',
      sp: 'https://open.spotify.com/album/5KtqBBg2wXdOIK0JapxiCG',
      ap: 'https://music.apple.com/us/album/euphoria-single/1848976135',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_ku73BW89o5Kx9JQ1MJ-j1KjkqLFT-yg3g',
    },
    {
      title: 'Abstract',
      year: 2021,
      img: 'Dakku-Euphoria.webp',
      yt: 'https://youtu.be/iEy398OMp6k',
      dl: 'owggm611bdj3xle6a2ngq/Abstract.mp3?rlkey=a05t1xjh47ogpoccsva6idxl4&st=pklov1b7&dl=1',
      sp: 'https://open.spotify.com/album/5KtqBBg2wXdOIK0JapxiCG',
      ap: 'https://music.apple.com/us/album/euphoria-single/1848976135',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_ku73BW89o5Kx9JQ1MJ-j1KjkqLFT-yg3g',
    },
    {
      title: 'Candy',
      year: 2021,
      img: 'Dakku-Candy.webp',
      yt: 'https://youtu.be/ymCRI2i1yPU',
      dl: 'n41olnqpk7sxffyh25kag/Candy.mp3?rlkey=c8jd3t0byzgwm53m71ug72geh&st=zlctr2o0&dl=1',
      sp: 'https://open.spotify.com/track/43gfUzpSqDMxjaRl0u3Uoc',
      ap: 'https://music.apple.com/us/album/candy-single/1796266098',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_k5hXFz9kOXjEDwCMeQXYwSfgG_nZzwpXA',
    },
    {
      title: 'You and Me',
      year: 2021,
      img: 'Dakku-You-And-Me.webp',
      yt: 'https://youtu.be/Di6x_ezlqXM',
      dl: 'tzbe1zljgn0i519ls97go/You-and-Me.mp3?rlkey=bu48ks3nsqel0nqih04trqt3u&st=zg8gpgva&dl=1',
      sp: 'https://open.spotify.com/track/7EtZgS6zovBYlzyrvSqxuo',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_kVthCOR4JWCUnAYge8pXQEivQql5f1rVk',
    },
    {
      title: 'Galaxy',
      year: 2021,
      img: 'Dakku-Galaxy.webp',
      yt: 'https://youtu.be/UWX0IypfGVQ',
      dl: 'yynfnaxlwms0528eq18i5/Galaxy.mp3?rlkey=yi5h8auaboc1mx4j1hqv0xb1w&st=yhpxx484&dl=1',
      sp: 'https://open.spotify.com/track/0sfgoKAPQvMSiWo4Q9ge3b',
      ap: 'https://music.apple.com/us/album/galaxy-single/1796266158',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_mUu-KeW_Vbxwah0uu5j6rs_yjkulu77I0',
    },
    {
      title: 'Alba',
      year: 2021,
      img: 'Dakku-Alba.webp',
      yt: 'https://youtu.be/xxiHqNyfh88',
      dl: '7o6vkh1k3qzpfr185bp0x/Alba.mp3?rlkey=3lmrnz39v4ttthycdkmf01wv8&st=bz6g32bl&dl=1',
      sp: 'https://open.spotify.com/track/7uK4b2vtb8oUlg9v52BoDh',
      ap: 'https://music.apple.com/us/album/alba-single/1796272347',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_kKEDyoBmXnIBdTsYPJro7ynxH1ii3dyRc',
    },
    {
      title: 'Lost in Paradise',
      year: 2021,
      img: 'Dakku-Lost-In-Paradise.webp',
      yt: 'https://youtu.be/5k9UyCZ3lxs',
      dl: 'uispcis7rf5m0ikiz3p8p/Lost-in-Paradise.mp3?rlkey=wbnalsfn78rof4g9xt9kahx6o&st=mo4t0c1j&dl=1',
      sp: 'https://open.spotify.com/track/5Ch5adGBTdwkFVy5hO4vOJ',
      ap: 'https://music.apple.com/us/album/lost-in-paradise-single/1796267690',
      ym: 'https://music.youtube.com/playlist?list=OLAK5uy_l0G1YRVZuzgTgCWUyP5e7OfTp6vVFvYL8',
    },
  ];

  // Generate discography cards
  const grid = document.querySelector('.tracks-grid');
  if (grid) {
    grid.innerHTML = allTracks.filter(t => !t.featured).map((t, i) => {
      const accent = i % 2 === 0 ? 'pink' : 'cyan';
      const artist = t.artist || 'DAKKU';
      const links = `<a href="${t.sp}" class="streaming-link" aria-label="Listen on Spotify" target="_blank"><i class="fab fa-spotify"></i></a>${t.ap ? `<a href="${t.ap}" class="streaming-link" aria-label="Listen on Apple Music" target="_blank"><i class="fab fa-apple"></i></a>` : ''}<a href="${t.ym}" class="streaming-link" aria-label="Listen on YouTube Music" target="_blank"><i class="fab fa-youtube"></i></a>`;
      const fontStyle = t.title === 'Kokkabiel (Remix)' ? ' style="font-size:1.35rem"' : '';
      return `<article class="track-card accent-${accent}" style="animation-delay:${i * 0.1}s"><div class="track-card-image"><img src="/img/${t.img}" alt="${t.title} album cover" loading="lazy"><a href="${t.yt}" class="card-play-btn-yt" target="_blank" aria-label="Watch ${t.title} on YouTube"><i class="fas fa-play"></i></a></div><div class="track-card-content"><div class="track-meta"><h3 class="track-title"${fontStyle}>${t.title}</h3><p class="track-artist">${artist} \u2022 ${t.year}</p></div><div class="track-actions"><div class="action-buttons"><button class="action-button play" aria-label="Play ${t.title}"><i class="fas fa-play"></i></button><a href="https://www.dropbox.com/scl/fi/${t.dl}" class="action-button download" aria-label="Download ${t.title}"><i class="fas fa-download"></i></a></div><div class="streaming-links">${links}</div></div></div></article>`;
    }).join('');
  }

  // Generate audio elements
  allTracks.forEach(t => {
    const id = slug(t.title);
    const el = document.createElement('audio');
    el.id = `${id}-audio`;
    el.preload = 'metadata';
    el.innerHTML = `<source src="audio/demo-${id}.mp3" type="audio/mp3">Your browser does not support the audio element.`;
    document.body.appendChild(el);
  });

  // Copyright year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // UTILITIES
  const toggleMobileMenu = close => {
    menuToggle.classList.toggle('active', !close);
    navMenu.classList.toggle('active', !close);
    body.style.overflow = close ? '' : 'hidden';
  };

  // NAVBAR SCROLL + PARALLAX
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    navbar.classList.toggle('scrolled', currentScroll > 100);
    if (heroBg && currentScroll < window.innerHeight) {
      heroBg.style.transform = `translateY(${currentScroll * 0.5}px) scale(${1 + currentScroll * 0.0002})`;
    }
  });

  // MOBILE MENU
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu(navMenu.classList.contains('active'));
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(true));
  });

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      toggleMobileMenu(true);
    }
  });

  // FAQ ACCORDION
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.closest('.faq-item');
      const wasActive = faqItem.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
      if (!wasActive) faqItem.classList.add('active');
    });

    question.setAttribute('tabindex', '0');
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });

  // AUDIO PLAYER
  let currentAudio = null;
  let currentButton = null;

  const fadeOutAudio = (audio, callback) => {
    const steps = 20;
    const stepTime = 1000 / steps;
    const stepDecrease = 1 / steps;
    audio.volume = 1;
    const interval = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume = Math.max(0, audio.volume - stepDecrease);
      } else {
        clearInterval(interval);
        audio.pause();
        audio.volume = 1;
        if (callback) callback();
      }
    }, stepTime);
  };

  const stopCurrentAudio = () => {
    if (currentAudio) {
      fadeOutAudio(currentAudio, () => {
        currentAudio.currentTime = 0;
        if (currentButton) {
          currentButton.querySelector('i')?.classList.replace('fa-stop', 'fa-play');
        }
        currentAudio = null;
        currentButton = null;
      });
    }
  };

  const dismissNotif = el => { el.classList.add('notification-out'); setTimeout(() => el.remove(), 400); };

  const showNotification = (message, type = 'default') => {
    const notif = document.createElement('div');
    notif.className = `notification notification-${type}`;
    notif.textContent = message;
    body.appendChild(notif);
    notif.addEventListener('click', () => dismissNotif(notif));
    setTimeout(() => dismissNotif(notif), 3000);
  };

  // Play buttons
  document.querySelectorAll('.play-button, .action-button.play').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const card = btn.closest('.track-card, .album-card');
      if (!card) return;

      const titleEl = card.querySelector('.track-title, .album-title');
      const trackTitle = titleEl ? titleEl.textContent.trim() : 'Track';
      const clean = slug(trackTitle);
      const audio = document.getElementById(`${clean}-audio`);

      if (!audio) {
        console.warn('Audio element not found:', trackTitle);
        return;
      }

      const icon = btn.querySelector('i');

      if (currentAudio === audio) {
        fadeOutAudio(audio, () => {
          audio.currentTime = 0;
          icon?.classList.replace('fa-stop', 'fa-play');
          currentAudio = null;
          currentButton = null;
        });
        return;
      }

      stopCurrentAudio();
      audio.currentTime = 0;
      audio.play()
        .then(() => {
          icon?.classList.replace('fa-play', 'fa-stop');
          currentAudio = audio;
          currentButton = btn;
          showNotification(`\u25B6 Playing: ${trackTitle}`, 'play');
        })
        .catch(err => {
          console.error('Playback error:', err);
          showNotification(`\u274C Error playing: ${trackTitle}`, 'error');
        });
      btn.classList.add('playing');
      setTimeout(() => btn.classList.remove('playing'), 400);
      audio.onended = () => {
        icon?.classList.replace('fa-stop', 'fa-play');
        currentAudio = null;
        currentButton = null;
      };
    });
  });

  // Download buttons
  document.querySelectorAll('.action-button.download').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.closest('.track-card')?.querySelector('.track-title')?.textContent || 'Track';
      showNotification(`\u2B07 Downloading: ${title}`, 'download');
      btn.classList.add('downloading');
      setTimeout(() => btn.classList.remove('downloading'), 400);
    });
  });

});
