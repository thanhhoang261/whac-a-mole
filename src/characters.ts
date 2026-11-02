// Character asset configurations: Authentic Bubu & Dudu and Vector mode
export type SkinMode = 'real' | 'vector';

export const ASSETS = {
  real: {
    // 100% Authentic Bubu & Dudu (Huang Xiao B) Transparent Animated Stickers
    duduNormal: `<img src="/assets/bubu_dudu/dudu_normal.gif" class="char-img" alt="Dudu (Gấu Nâu)" />`,
    duduWhacked: `<img src="/assets/bubu_dudu/dudu_hit.gif" class="char-img hit-dudu-anim" alt="Dudu Khóc" />`,
    bubuNormal: `<img src="/assets/bubu_dudu/bubu_normal.gif" class="char-img" alt="Bubu (Gấu Trúc)" />`,
    bubuAngry: `<img src="/assets/bubu_dudu/bubu_angry.webp" class="char-img angry-bubu-anim" alt="Bubu Giận Dỗi" />`,
    bobaItem: `<div class="boba-container"><img src="/assets/bubu_dudu/boba_cup.gif" class="char-img boba-shine" alt="Ly Trà Sữa Trân Châu" /></div>`
  },
  vector: {
    // DUDU (Normal) - Chú Gấu Nâu (Brown Bear)
    duduNormal: `
      <svg viewBox="0 0 140 140" class="char-svg">
        <defs>
          <radialGradient id="duduBody" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#C59B79"/>
            <stop offset="100%" stop-color="#9C6B45"/>
          </radialGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#5C3D28" flood-opacity="0.25"/>
          </filter>
        </defs>
        <g filter="url(#softShadow)">
          <circle cx="36" cy="38" r="19" fill="#8D5B39"/>
          <circle cx="36" cy="38" r="11" fill="#BA8E6C"/>
          <circle cx="104" cy="38" r="19" fill="#8D5B39"/>
          <circle cx="104" cy="38" r="11" fill="#BA8E6C"/>
          <circle cx="70" cy="74" r="48" fill="url(#duduBody)"/>
        </g>
        <ellipse cx="44" cy="80" rx="9" ry="5" fill="#E88A80" opacity="0.45"/>
        <ellipse cx="96" cy="80" rx="9" ry="5" fill="#E88A80" opacity="0.45"/>
        <ellipse cx="70" cy="84" rx="22" ry="16" fill="#F4E8DC"/>
        <ellipse cx="70" cy="78" rx="7" ry="5" fill="#3B2314"/>
        <path d="M 64 85 Q 70 91 76 85" fill="none" stroke="#3B2314" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="70" y1="81" x2="70" y2="85" stroke="#3B2314" stroke-width="2.5"/>
        <circle cx="51" cy="67" r="5.5" fill="#2B1810"/>
        <circle cx="49" cy="65" r="2" fill="#FFFFFF"/>
        <circle cx="89" cy="67" r="5.5" fill="#2B1810"/>
        <circle cx="87" cy="65" r="2" fill="#FFFFFF"/>
        <ellipse cx="36" cy="115" rx="14" ry="11" fill="#9C6B45" stroke="#7A4B29" stroke-width="2"/>
        <ellipse cx="104" cy="115" rx="14" ry="11" fill="#9C6B45" stroke="#7A4B29" stroke-width="2"/>
      </svg>
    `,

    // DUDU (Whacked) - Bị đập choáng váng
    duduWhacked: `
      <svg viewBox="0 0 140 140" class="char-svg hit-dudu-anim">
        <defs>
          <radialGradient id="duduHitBody" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#BF9573"/>
            <stop offset="100%" stop-color="#8C5C38"/>
          </radialGradient>
        </defs>
        <g class="spinning-stars">
          <text x="25" y="24" font-size="20">⭐</text>
          <text x="65" y="14" font-size="22">💫</text>
          <text x="100" y="26" font-size="18">✨</text>
        </g>
        <circle cx="36" cy="42" r="18" fill="#8C5C38"/>
        <circle cx="36" cy="42" r="10" fill="#B08362"/>
        <circle cx="104" cy="42" r="18" fill="#8C5C38"/>
        <circle cx="104" cy="42" r="10" fill="#B08362"/>
        <ellipse cx="70" cy="78" rx="51" ry="44" fill="url(#duduHitBody)"/>
        <ellipse cx="43" cy="84" rx="11" ry="6" fill="#FF7070" opacity="0.6"/>
        <ellipse cx="97" cy="84" rx="11" ry="6" fill="#FF7070" opacity="0.6"/>
        <ellipse cx="70" cy="87" rx="22" ry="15" fill="#F4E8DC"/>
        <ellipse cx="70" cy="81" rx="7" ry="5" fill="#3B2314"/>
        <ellipse cx="70" cy="93" rx="6" ry="7" fill="#6B1D1D" stroke="#3B2314" stroke-width="2"/>
        <g stroke="#2B1810" stroke-width="2.5" fill="none" stroke-linecap="round">
          <path d="M 47 70 A 5 5 0 0 1 54 67 A 6 6 0 0 1 56 75 A 8 8 0 0 1 45 76"/>
          <path d="M 85 70 A 5 5 0 0 1 92 67 A 6 6 0 0 1 94 75 A 8 8 0 0 1 83 76"/>
        </g>
        <ellipse cx="70" cy="35" rx="8" ry="10" fill="#FF8A8A" stroke="#E55B5B" stroke-width="2"/>
      </svg>
    `,

    // BUBU (Normal) - Chuẩn Gấu Trúc Panda (Tai đen, nơ hồng, mắt đen má hồng)
    bubuNormal: `
      <svg viewBox="0 0 140 140" class="char-svg">
        <defs>
          <radialGradient id="bubuPandaBody" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="90%" stop-color="#FBF8F9"/>
            <stop offset="100%" stop-color="#EDE6EB"/>
          </radialGradient>
        </defs>
        <!-- Panda Black Ears -->
        <circle cx="34" cy="38" r="19" fill="#2E1C24"/>
        <circle cx="106" cy="38" r="19" fill="#2E1C24"/>
        <!-- Pink Bow -->
        <g transform="translate(6, -4)">
          <path d="M 94 28 C 88 23, 88 34, 94 34 Z M 104 28 C 110 23, 110 34, 104 34 Z" fill="#FF708F"/>
          <circle cx="99" cy="31" r="4" fill="#FF477E"/>
        </g>
        <!-- Head -->
        <circle cx="70" cy="76" r="48" fill="url(#bubuPandaBody)" stroke="#E5D8DF" stroke-width="1.5"/>
        <!-- Big Pink Blush -->
        <ellipse cx="40" cy="83" rx="12" ry="7" fill="#FF85A1" opacity="0.7"/>
        <ellipse cx="100" cy="83" rx="12" ry="7" fill="#FF85A1" opacity="0.7"/>
        <!-- Nose & Mouth -->
        <ellipse cx="70" cy="80" rx="4" ry="3" fill="#2E1C24"/>
        <path d="M 65 85 Q 70 89 75 85" fill="none" stroke="#2E1C24" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Eyes with highlight -->
        <circle cx="49" cy="69" r="6" fill="#2E1C24"/>
        <circle cx="47" cy="66" r="2.2" fill="#FFFFFF"/>
        <circle cx="91" cy="69" r="6" fill="#2E1C24"/>
        <circle cx="89" cy="66" r="2.2" fill="#FFFFFF"/>
        <!-- Paws -->
        <ellipse cx="36" cy="116" rx="13" ry="10" fill="#2E1C24"/>
        <ellipse cx="104" cy="116" rx="13" ry="10" fill="#2E1C24"/>
      </svg>
    `,

    // BUBU (Angry) - Chuẩn Gấu Trúc giận dỗi bốc hỏa
    bubuAngry: `
      <svg viewBox="0 0 140 140" class="char-svg angry-bubu-anim">
        <defs>
          <radialGradient id="bubuAngryPanda" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFF0F5"/>
            <stop offset="100%" stop-color="#FFCAD4"/>
          </radialGradient>
        </defs>
        <!-- Flame on Head -->
        <path d="M 70 12 C 60 22 62 30 68 34 C 64 28 68 20 74 15 C 72 24 80 27 78 35 C 84 30 84 20 70 12 Z" fill="#FF3D00"/>
        <path d="M 70 20 C 65 26 66 30 70 34 C 73 30 76 26 70 20 Z" fill="#FFD600"/>
        <!-- Ears -->
        <circle cx="34" cy="40" r="18" fill="#2E1C24"/>
        <circle cx="106" cy="40" r="18" fill="#2E1C24"/>
        <!-- Head -->
        <circle cx="70" cy="76" r="49" fill="url(#bubuAngryPanda)" stroke="#FFAAA6" stroke-width="2"/>
        <ellipse cx="38" cy="83" rx="14" ry="9" fill="#FF477E" opacity="0.8"/>
        <ellipse cx="102" cy="83" rx="14" ry="9" fill="#FF477E" opacity="0.8"/>
        <!-- Angry eyes > < -->
        <path d="M 43 68 L 52 74 L 43 80" fill="none" stroke="#2E1C24" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M 97 68 L 88 74 L 97 80" fill="none" stroke="#2E1C24" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- Pout mouth -->
        <ellipse cx="70" cy="80" rx="4" ry="3" fill="#2E1C24"/>
        <path d="M 64 91 Q 70 85 76 91" fill="none" stroke="#2E1C24" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="32" cy="104" r="12" fill="#2E1C24"/>
        <circle cx="108" cy="104" r="12" fill="#2E1C24"/>
      </svg>
    `,

    // BOBA ITEM
    bobaItem: `
      <svg viewBox="0 0 140 140" class="char-svg boba-shine">
        <defs>
          <linearGradient id="teaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F2D2AE"/>
            <stop offset="65%" stop-color="#DEB078"/>
            <stop offset="100%" stop-color="#C28A4A"/>
          </linearGradient>
        </defs>
        <text x="20" y="35" font-size="20">✨</text>
        <text x="105" y="45" font-size="20">✨</text>
        <rect x="74" y="10" width="10" height="45" rx="4" fill="#FF5E7E" transform="rotate(12 74 10)"/>
        <rect x="75" y="16" width="3" height="35" rx="1" fill="#FFFFFF" opacity="0.6" transform="rotate(12 74 10)"/>
        <path d="M 42 45 L 48 116 C 49 122 55 126 62 126 L 78 126 C 85 126 91 122 92 116 L 98 45 Z" fill="url(#teaGradient)" stroke="#8C5C2C" stroke-width="3"/>
        <ellipse cx="70" cy="45" rx="30" ry="8" fill="#FFFFFF" stroke="#8C5C2C" stroke-width="3"/>
        <ellipse cx="70" cy="53" rx="27" ry="7" fill="#FFFFFF" opacity="0.9"/>
        <circle cx="56" cy="116" r="5" fill="#2E1C0C"/>
        <circle cx="68" cy="118" r="5" fill="#2E1C0C"/>
        <circle cx="82" cy="115" r="5.5" fill="#2E1C0C"/>
        <circle cx="62" cy="108" r="4.5" fill="#2E1C0C"/>
        <circle cx="76" cy="107" r="5" fill="#2E1C0C"/>
        <circle cx="86" cy="108" r="4" fill="#2E1C0C"/>
        <circle cx="63" cy="80" r="2.5" fill="#3B2314"/>
        <circle cx="77" cy="80" r="2.5" fill="#3B2314"/>
        <path d="M 68 85 Q 70 88 72 85" fill="none" stroke="#3B2314" stroke-width="2" stroke-linecap="round"/>
        <text x="63" y="101" font-size="12">💖</text>
      </svg>
    `
  },

  // BURROW HOLE
  burrowFront: `
    <svg viewBox="0 0 160 70" class="burrow-front-svg">
      <defs>
        <radialGradient id="holeBg" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stop-color="#3D2619"/>
          <stop offset="100%" stop-color="#24160E"/>
        </radialGradient>
        <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#80E27E"/>
          <stop offset="100%" stop-color="#4CAF50"/>
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="36" rx="66" ry="24" fill="#8D5B4C"/>
      <ellipse cx="80" cy="34" rx="60" ry="18" fill="url(#holeBg)"/>
      <path d="M 12 40 C 25 32 45 42 60 38 C 75 34 85 40 100 36 C 115 32 135 40 148 42 C 152 50 142 58 130 60 C 100 64 60 64 30 60 C 18 58 8 50 12 40 Z" fill="url(#grassGrad)"/>
      <circle cx="35" cy="46" r="3.5" fill="#FF85A1"/>
      <circle cx="35" cy="46" r="1.5" fill="#FFD166"/>
      <circle cx="125" cy="48" r="4" fill="#FFF"/>
      <circle cx="125" cy="48" r="1.5" fill="#FFD166"/>
    </svg>
  `
};
