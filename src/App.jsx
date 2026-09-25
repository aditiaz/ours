import React, { useState, useCallback, useRef, useEffect } from 'react';
import heroImage from './assets/hero-image.jpg';
import butterflyFlightWebp from './assets/butterfly_flight_3d.webp';
import butterflyRestingImg from './assets/butterfly_resting_side.png';
import { Heart, ArrowRight, Image as ImageIcon } from 'lucide-react';

/* ══════════════════════════════════
   LIVELY ATMOSPHERIC NATURE ELEMENTS
   ══════════════════════════════════ */

const Hills = () => (
  <svg className="hills" viewBox="0 0 1440 400" preserveAspectRatio="none">
    <defs>
      {/* Far Hill Gradient: soft atmospheric golden-lavender warm ridge */}
      <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C9BDAF" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#DDD3C5" stopOpacity="0.85" />
      </linearGradient>
      {/* Mid Hill Gradient: lush warm golden olive meadow ridge */}
      <linearGradient id="hillMid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B3A988" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#9C9572" stopOpacity="0.9" />
      </linearGradient>
      {/* Near Meadow Knoll */}
      <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C2BA9C" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#D5CDAF" stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Far Mountain Ridge */}
    <path d="M0 400 V230 C180 190, 360 170, 540 205 C720 240, 900 150, 1100 180 C1250 200, 1370 225, 1440 220 V400 Z" fill="url(#hillFar)" />
    {/* Mid Rolling Hills with Lush Meadow */}
    <path d="M0 400 V270 C200 245, 420 220, 640 255 C820 285, 980 215, 1200 245 C1340 265, 1400 270, 1440 268 V400 Z" fill="url(#hillMid)" />
    {/* Near Contour */}
    <path d="M0 400 V300 C220 280, 480 305, 750 280 C1020 255, 1280 290, 1440 285 V400 Z" fill="url(#hillNear)" />
  </svg>
);

const Tree1 = ({ x = 0, scale = 1, delay = 0 }) => (
  <div
    className="tree-sway"
    style={{
      position: 'absolute',
      bottom: '75px',
      left: `${x}%`,
      width: `${140 * scale}px`,
      transformOrigin: 'bottom center',
      animationDelay: `${delay}s`,
    }}
  >
    <svg viewBox="0 0 120 280" fill="none" style={{ transform: `scaleX(${scale > 0 ? 1 : -1})`, width: '100%' }}>
      {/* Trunk with shading */}
      <path d="M54 160 L50 280 H70 L66 160 Z" fill="#7D623F" opacity="0.35" />
      {/* Layered Canopies */}
      <ellipse cx="60" cy="95" rx="55" ry="85" fill="#8B9A6F" opacity="0.22" />
      <ellipse cx="44" cy="115" rx="38" ry="60" fill="#6E8255" opacity="0.18" />
      <ellipse cx="76" cy="105" rx="40" ry="65" fill="#9FB282" opacity="0.16" />
      <circle cx="60" cy="70" r="35" fill="#B3C496" opacity="0.14" />
    </svg>
  </div>
);

const PineTree = ({ x = 0, scale = 1, delay = -2.5 }) => (
  <div
    className="tree-sway"
    style={{
      position: 'absolute',
      bottom: '75px',
      left: `${x}%`,
      width: `${100 * scale}px`,
      transformOrigin: 'bottom center',
      animationDelay: `${delay}s`,
    }}
  >
    <svg viewBox="0 0 100 300" fill="none" style={{ width: '100%' }}>
      <rect x="44" y="200" width="12" height="100" rx="3" fill="#7D623F" opacity="0.32" />
      <path d="M50 20L15 140H85Z" fill="#7E9367" opacity="0.2" />
      <path d="M50 60L22 160H78Z" fill="#6A8054" opacity="0.18" />
      <path d="M50 100L28 200H72Z" fill="#91A779" opacity="0.16" />
    </svg>
  </div>
);

/* ══════════════════════════════════
   REALISTIC SOFT WATER LAKE WITH SUNLIGHT SHEEN
   Translucent aquatic depth nestled in the meadow valley,
   soft golden hour reflections, and realistic fine caustics
   ══════════════════════════════════ */

const Lake = () => (
  <div className="lake-canvas-wrap">
    <svg className="lake-svg" viewBox="0 0 700 200" preserveAspectRatio="none">
      <defs>
        {/* Deep realistic water — rich teal-indigo centre fading to aquamarine shore */}
        <radialGradient id="lakeWaterDeep" cx="50%" cy="44%" r="56%">
          <stop offset="0%"   stopColor="#142E32" stopOpacity="0.95" />
          <stop offset="28%"  stopColor="#1B4445" stopOpacity="0.9"  />
          <stop offset="56%"  stopColor="#2F6862" stopOpacity="0.76" />
          <stop offset="78%"  stopColor="#5A9B95" stopOpacity="0.5"  />
          <stop offset="94%"  stopColor="#90C0B8" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#C4D8D5" stopOpacity="0.07" />
        </radialGradient>

        {/* Sky / atmosphere reflected on the upper water surface */}
        <linearGradient id="skyReflect" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#B8DEED" stopOpacity="0.42" />
          <stop offset="50%"  stopColor="#88C0D4" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4A9090" stopOpacity="0.04" />
        </linearGradient>

        {/* Golden-hour sun path — diagonal warm streak */}
        <linearGradient id="sunPath" x1="28%" y1="0%" x2="72%" y2="100%">
          <stop offset="0%"   stopColor="#FFE088" stopOpacity="0"    />
          <stop offset="30%"  stopColor="#FFD458" stopOpacity="0.25" />
          <stop offset="50%"  stopColor="#FFF4C8" stopOpacity="0.62" />
          <stop offset="70%"  stopColor="#FFD458" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FFE088" stopOpacity="0"    />
        </linearGradient>

        {/* Caustic ripple crest gradient */}
        <linearGradient id="crestGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.03" />
          <stop offset="50%"  stopColor="#FFFFFF" stopOpacity="0.7"  />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.03" />
        </linearGradient>

        {/* Edge shoreline vignette */}
        <radialGradient id="shoreVig" cx="50%" cy="50%" r="50%">
          <stop offset="68%"  stopColor="transparent" stopOpacity="0"   />
          <stop offset="100%" stopColor="#B8A88A"     stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* ── LAKE BODY — organic ellipse nestled in the valley ── */}
      <path
        d="M28 110 C72 38, 215 16, 350 16 C485 16, 628 38, 672 110 C695 148, 590 186, 350 186 C110 186, 5 148, 28 110 Z"
        fill="url(#lakeWaterDeep)"
      />

      {/* ── SKY REFLECTION — upper half of lake surface ── */}
      <path
        d="M28 110 C72 38, 215 16, 350 16 C485 16, 628 38, 672 110 L350 110 Z"
        fill="url(#skyReflect)"
      />

      {/* ── GOLDEN HOUR SUN PATH — diagonal shimmer lane ── */}
      <ellipse cx="350" cy="100" rx="175" ry="74" fill="url(#sunPath)" className="lake-sun-beam" />

      {/* ── SHORELINE WET RIM ── */}
      <path
        d="M24 110 C68 34, 212 12, 350 12 C488 12, 632 34, 676 110 C700 150, 594 190, 350 190 C106 190, 0 150, 24 110 Z"
        fill="none"
        stroke="#CEBFA0"
        strokeWidth="2"
        strokeOpacity="0.35"
      />

      {/* ── EDGE VIGNETTE — soft fade at shoreline ── */}
      <path
        d="M28 110 C72 38, 215 16, 350 16 C485 16, 628 38, 672 110 C695 148, 590 186, 350 186 C110 186, 5 148, 28 110 Z"
        fill="url(#shoreVig)"
      />


      {/* ── ATMOSPHERIC MIST PARTICLES ── subtle realism dots */}
      <circle cx="195" cy="98"  r="0.9" fill="#A8D8D4" opacity="0.55" className="mist-p mp-1" />
      <circle cx="515" cy="90"  r="0.8" fill="#98CCC8" opacity="0.50" className="mist-p mp-2" />
      <circle cx="155" cy="125" r="0.7" fill="#B4DED8" opacity="0.44" className="mist-p mp-3" />
      <circle cx="548" cy="118" r="1.0" fill="#A0D0CB" opacity="0.52" className="mist-p mp-4" />
    </svg>
  </div>
);

/* ══════════════════════════════════
   SWAN COURTSHIP DANCE RITUAL (From YouTube cvJN81HimWc)
   - Synchronized head-and-neck dipping and bowing
   - Graceful rise arching necks into the perfect heart
   - Tender bill-to-bill touching and affectionate nuzzle
   - Realistic concentric wave ripples pulsating from hulls
   - Distant perspective: floating serenely out in the lake
   ══════════════════════════════════ */

const SwanPairHeart = () => (
  <div className="swan-heart-wrapper">
    <svg width="165" height="90" viewBox="0 0 340 180" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        {/* Soft Water Shadow Under Hulls */}
        <radialGradient id="swanWaterShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B3330" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#2E4D4A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2E4D4A" stopOpacity="0" />
        </radialGradient>
        {/* Shimmering reflection gradient */}
        <linearGradient id="reflShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
        </linearGradient>
      </defs>




      {/* ── LEFT SWAN (COURTSHIP DANCE DIP, RISE & HEART FORM) ── */}
      <g className="swan-left-group">
        {/* Body: Pure Luminous White with feathered depth */}
        <path d="M55 125 C50 113, 60 95, 85 91 C110 87, 135 97, 150 111 C154 117, 152 127, 144 131 C128 137, 75 137, 55 125 Z" fill="#FFFFFF" filter="drop-shadow(0 2px 5px rgba(0,0,0,0.08))" />
        {/* Wing Feathers */}
        <path d="M78 103 C95 97, 118 101, 132 113" stroke="#D3C7B5" strokeWidth="1.5" fill="none" opacity="0.75" />
        <path d="M88 113 C105 109, 124 115, 136 123" stroke="#D3C7B5" strokeWidth="1.3" fill="none" opacity="0.65" />
        <path d="M56 125 C42 121, 34 109, 40 103 C46 109, 54 115, 62 119 Z" fill="#FFFFFF" />

        {/* Neck & Head Assembly (Performs Courtship Dipping & Heart Rise) */}
        <g className="swan-neck-left">
          <path d="M146 117 C138 100, 120 80, 118 61 C116 41, 132 25, 152 29 C162 31, 168 39, 168 51 C164 51, 160 45, 154 40 C146 35, 134 43, 134 59 C134 75, 148 95, 152 110 Z" fill="#FFFFFF" />
          <g className="swan-head-left">
            <path d="M160 38 C164 35, 167 37, 167 41 C167 43, 163 44, 160 42 Z" fill="#1A1510" />
            <circle cx="161" cy="39" r="1.15" fill="#FFFFFF" />
            {/* Orange Beak */}
            <path d="M164 41 L169.5 53 L161 48 Z" fill="#E87625" />
          </g>
        </g>
      </g>

      {/* ── RIGHT SWAN (COURTSHIP DANCE DIP, RISE & HEART FORM) ── */}
      <g className="swan-right-group">
        {/* Body: Pure Luminous White */}
        <path d="M285 125 C290 113, 280 95, 255 91 C230 87, 205 97, 190 111 C186 117, 188 127, 196 131 C212 137, 265 137, 285 125 Z" fill="#FFFFFF" filter="drop-shadow(0 2px 5px rgba(0,0,0,0.08))" />
        {/* Wing Feathers */}
        <path d="M262 103 C245 97, 222 101, 208 113" stroke="#D3C7B5" strokeWidth="1.5" fill="none" opacity="0.75" />
        <path d="M252 113 C235 109, 216 115, 204 123" stroke="#D3C7B5" strokeWidth="1.3" fill="none" opacity="0.65" />
        <path d="M284 125 C298 121, 306 109, 300 103 C294 109, 286 115, 278 119 Z" fill="#FFFFFF" />

        {/* Neck & Head Assembly (Performs Courtship Dipping & Heart Rise) */}
        <g className="swan-neck-right">
          <path d="M194 117 C202 100, 220 80, 222 61 C224 41, 208 25, 188 29 C178 31, 172 39, 172 51 C176 51, 180 45, 186 40 C194 35, 206 43, 206 59 C206 75, 192 95, 188 110 Z" fill="#FFFFFF" />
          <g className="swan-head-right">
            <path d="M180 38 C176 35, 173 37, 173 41 C173 43, 177 44, 180 42 Z" fill="#1A1510" />
            <circle cx="179" cy="39" r="1.15" fill="#FFFFFF" />
            {/* Orange Beak (Touches left swan beak at apex) */}
            <path d="M176 41 L170.5 53 L179 48 Z" fill="#E87625" />
          </g>
        </g>
      </g>
    </svg>
  </div>
);



/* ══════════════════════════════════
   3D REALISTIC BUTTERFLY SYSTEM
   Real 3D wing flapping cycle + upright side profile
   ══════════════════════════════════ */

const speciesFilters = {
  1: 'none',                                              // Authentic Amber Monarch
  2: 'hue-rotate(24deg) saturate(1.22) brightness(1.02)', // Warm Honey / Golden Swallowtail
  3: 'hue-rotate(-22deg) saturate(1.1) brightness(0.96)', // Tawny Rose / Painted Lady
};

const RealisticSideButterfly = ({ className = '', species = 1, size = 70 }) => {
  const filterStyle = speciesFilters[species] || 'none';

  return (
    <div className={`real-bf-root ${className}`} style={{ width: size, height: size * 1.05 }}>
      {/* Authentic 3D Wing Flapping: Flaps continuously during flight, landing, and perching */}
      <div className="real-bf-layer wings-flying">
        <img
          src={butterflyFlightWebp}
          alt="Realistic flapping butterfly"
          className="bf-flying-3d"
          style={{ filter: filterStyle }}
        />
      </div>
    </div>
  );
};

/* Photo butterfly wrapper (view menyamping) */
const PhotoButterfly = ({ className, species = 1, size = 70 }) => (
  <div className={className} style={{ position: 'absolute', zIndex: 60 }}>
    <div className="butterfly-wind-gust">
      <RealisticSideButterfly className="photo-butterfly" species={species} size={size} />
    </div>
  </div>
);

/* ══════════════════════════════════
   ROMANTIC BOTANICAL TULIP COMPONENT
   ══════════════════════════════════ */

const tulipPalettes = {
  blush: {
    back: ['#EAA296', '#C8786B'],
    left: ['#F5BDB3', '#D98577'],
    right: ['#EDAAA0', '#C87567'],
    center: ['#FCE0DA', '#F0ABA0', '#D1796B'],
  },
  cream: {
    back: ['#EFE5D8', '#D4C2AB'],
    left: ['#FFFDF9', '#E8D9C5'],
    right: ['#F8EFE4', '#DFCEB8'],
    center: ['#FFFFFF', '#F5ECE0', '#DECBB5'],
  },
  terracotta: {
    back: ['#E29252', '#BD6A2C'],
    left: ['#F2AE74', '#D97A38'],
    right: ['#EAA165', '#C96E2E'],
    center: ['#FAD0A8', '#EDA468', '#D47330'],
  },
  rose: {
    back: ['#DF9FA9', '#BD7481'],
    left: ['#EDB7C0', '#D38694'],
    right: ['#E5A6B1', '#C57584'],
    center: ['#FCE1E6', '#EAA6B2', '#CE7E8C'],
  },
};

const Tulip = ({
  variant = 'blush',
  scale = 1,
  tilt = 0,
  delay = 0,
  flip = false,
  className = '',
  style = {},
}) => {
  const p = tulipPalettes[variant] || tulipPalettes.blush;
  const uid = useRef(`tulip-${Math.random().toString(36).substr(2, 6)}`).current;

  return (
    <div
      className={`tulip-wrapper ${className}`}
      style={{
        width: `${80 * scale}px`,
        height: `${160 * scale}px`,
        transform: `rotate(${tilt}deg) scaleX(${flip ? -1 : 1})`,
        animationDelay: `${delay}s`,
        ...style,
      }}
    >
      <svg viewBox="0 0 120 220" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`stem-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6C8C56" />
            <stop offset="100%" stopColor="#4E6E3A" />
          </linearGradient>
          <linearGradient id={`leaf-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7FA668" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#5B8246" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id={`back-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.back[0]} />
            <stop offset="100%" stopColor={p.back[1]} />
          </linearGradient>
          <linearGradient id={`left-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={p.left[0]} />
            <stop offset="100%" stopColor={p.left[1]} />
          </linearGradient>
          <linearGradient id={`right-${uid}`} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.right[0]} />
            <stop offset="100%" stopColor={p.right[1]} />
          </linearGradient>
          <linearGradient id={`ctr-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.center[0]} />
            <stop offset="50%" stopColor={p.center[1]} />
            <stop offset="100%" stopColor={p.center[2]} />
          </linearGradient>
        </defs>

        {/* Stem */}
        <path d="M58 80 C56 120, 60 170, 58 220" stroke={`url(#stem-${uid})`} strokeWidth="4.5" strokeLinecap="round" fill="none" />

        {/* Left Leaf */}
        <path d="M58 180 C40 160, 20 120, 26 85 C32 105, 48 135, 58 150 Z" fill={`url(#leaf-${uid})`} />

        {/* Right Leaf */}
        <path d="M58 195 C75 175, 95 135, 90 95 C86 118, 72 145, 58 165 Z" fill={`url(#leaf-${uid})`} />

        {/* Flower Head */}
        <g transform="translate(58, 70)">
          <path d="M0 -42 C-14 -32, -18 -8, 0 12 C18 -8, 14 -32, 0 -42 Z" fill={`url(#back-${uid})`} />
          <path d="M0 12 C-16 10, -28 -10, -22 -32 C-18 -42, -6 -38, -2 -22 C-10 -6, -8 4, 0 12 Z" fill={`url(#left-${uid})`} />
          <path d="M0 12 C16 10, 28 -10, 22 -32 C18 -42, 6 -38, 2 -22 C10 -6, 8 4, 0 12 Z" fill={`url(#right-${uid})`} />
          <path d="M0 14 C-14 12, -16 -12, -8 -36 C-2 -44, 2 -44, 8 -36 C16 -12, 14 12, 0 14 Z" fill={`url(#ctr-${uid})`} />
          <ellipse cx="0" cy="13" rx="6" ry="3" fill="#587644" />
        </g>
      </svg>
    </div>
  );
};

const Firefly = ({ className }) => (
  <div className={`firefly ${className}`}><div className="firefly-glow" /></div>
);

/* ══════════════════════════════════
   REALISTIC BOTANICAL FALLING LEAVES
   Natural shapes, distinct petiole stems, realistic leaf venation,
   and authentic botanical colors (greens, autumn golds, warm ambers)
   ══════════════════════════════════ */

// Leaf Type 1: Realistic Ovate / Elm Leaf
const OvateLeaf = ({ size = 24, fill = '#558E40', highlight = '#6EA852', vein = '#375D26', stem = '#305221' }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 32 48" fill="none">
    {/* Petiole Stem */}
    <path d="M16 42 Q16 47 18 48" stroke={stem} strokeWidth="1.8" strokeLinecap="round" />
    {/* Leaf Blade Base */}
    <path d="M16 2 C18 10, 28 18, 28 30 C28 39, 21 42, 16 42 C11 42, 4 39, 4 30 C4 18, 14 10, 16 2 Z" fill={fill} />
    {/* Sunlit Facet Highlight */}
    <path d="M16 2 C17 10, 24 18, 25 30 C25 37, 20 40, 16 42 Z" fill={highlight} opacity="0.8" />
    {/* Central Vein */}
    <path d="M16 4 V42" stroke={vein} strokeWidth="1.2" />
    {/* Lateral Secondary Veins */}
    <path d="M16 14 Q21 12 25 16 M16 22 Q22 20 26 26 M16 30 Q21 28 24 35" stroke={vein} strokeWidth="0.8" opacity="0.65" />
    <path d="M16 14 Q11 12 7 16 M16 22 Q10 20 6 26 M16 30 Q11 28 8 35" stroke={vein} strokeWidth="0.8" opacity="0.65" />
  </svg>
);

// Leaf Type 2: Realistic Slender Lanceolate / Willow Leaf
const LanceolateLeaf = ({ size = 22, fill = '#689E50', highlight = '#81BA67', vein = '#3E6B2C', stem = '#2D4D20' }) => (
  <svg width={size} height={size * 1.6} viewBox="0 0 28 46" fill="none">
    <path d="M14 40 Q14 45 15 46" stroke={stem} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M14 2 C16 9, 25 16, 25 28 C25 36, 19 40, 14 40 C9 40, 3 36, 3 28 C3 16, 12 9, 14 2 Z" fill={fill} />
    <path d="M14 2 C15 9, 21 16, 21 28 C21 35, 17 38, 14 40 Z" fill={highlight} opacity="0.8" />
    <path d="M14 4 V40" stroke={vein} strokeWidth="1.1" />
    <path d="M14 13 Q19 12 22 15 M14 21 Q20 20 23 24 M14 29 Q19 28 22 33" stroke={vein} strokeWidth="0.7" opacity="0.6" />
    <path d="M14 13 Q9 12 6 15 M14 21 Q8 20 5 24 M14 29 Q9 28 6 33" stroke={vein} strokeWidth="0.7" opacity="0.6" />
  </svg>
);

// Leaf Type 3: Realistic 3-Lobed Maple Leaf
const LobedLeaf = ({ size = 26, fill = '#D66736', highlight = '#EB7B48', vein = '#87351A', stem = '#6E2C1A' }) => (
  <svg width={size} height={size * 1.15} viewBox="0 0 40 46" fill="none">
    <path d="M20 39 Q20 44 21 45" stroke={stem} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M20 2 C23 8, 29 10, 27 16 C33 16, 38 21, 35 27 C34 32, 27 36, 20 39 C13 36, 6 32, 5 27 C2 21, 7 16, 13 16 C11 10, 17 8, 20 2 Z" fill={fill} />
    <path d="M20 2 C22 8, 26 10, 25 16 C29 16, 34 20, 32 25 C31 31, 25 35, 20 39 Z" fill={highlight} opacity="0.8" />
    <path d="M20 5 V39" stroke={vein} strokeWidth="1.2" />
    <path d="M20 18 L31 22 M20 18 L9 22" stroke={vein} strokeWidth="0.9" opacity="0.75" />
    <path d="M20 26 L29 30 M20 26 L11 30" stroke={vein} strokeWidth="0.8" opacity="0.6" />
  </svg>
);

/* Authentic Botanical Palette: Natural Greens & Autumn Ambers */
const leafThemes = [
  // Fresh botanical foliage greens
  { fill: '#4E8338', highlight: '#68A44F', vein: '#325A24', stem: '#27471C' },
  { fill: '#558E40', highlight: '#6EA852', vein: '#375D26', stem: '#305221' },
  { fill: '#689E50', highlight: '#81BA67', vein: '#3E6B2C', stem: '#2D4D20' },
  { fill: '#3E6D2B', highlight: '#52873B', vein: '#264719', stem: '#1E3814' },
  // Golden autumn sunlit leaves
  { fill: '#DF9F32', highlight: '#F0B54A', vein: '#9E6819', stem: '#7A4E1B' },
  { fill: '#E8A938', highlight: '#F5BE52', vein: '#A87320', stem: '#825415' },
  // Warm amber maple & honey ochre
  { fill: '#D66736', highlight: '#EB7B48', vein: '#87351A', stem: '#6E2C1A' },
  { fill: '#CF7D32', highlight: '#E5954B', vein: '#8C4D19', stem: '#703A10' },
];

const leaves = Array.from({ length: 20 }, (_, i) => {
  const comps = [OvateLeaf, LanceolateLeaf, LobedLeaf];
  const Comp = comps[i % comps.length];
  const theme = leafThemes[i % leafThemes.length];
  
  // Predictable staggered values to replace nth-child css
  const lefts = [3, 9, 16, 23, 30, 37, 44, 52, 59, 66, 73, 80, 87, 94, 6, 27, 49, 71, 84, 14];
  const durations = [34, 44, 32, 50, 38, 54, 42, 36, 48, 40, 52, 34, 46, 56, 40, 48, 38, 50, 44, 58];
  const delays = [0, 2.5, 5, 1, 7, 3.5, 6, 8.5, 0.5, 7.5, 9, 11, 4, 13, 14.5, 12, 16, 15, 10.5, 17];
  
  return {
    id: i,
    size: 20 + (i % 5) * 3, // 20px to 32px natural size
    Comp,
    theme,
    left: `${lefts[i]}%`,
    dur: `${durations[i]}s`,
    delay: `${delays[i]}s`,
  };
});

/* ══════════════════════════════════
   STUCK LEAVES
   Leaves that have landed on UI elements
   ══════════════════════════════════ */
const StuckLeaf = ({ top, left, right, bottom, rotate, LeafType, theme, size, delay = '0s', dur = '18s' }) => (
  <div 
    className="stuck-leaf-wrapper"
    style={{ 
      top, left, right, bottom,
      '--stuck-delay': delay,
      '--stuck-dur': dur
    }}
  >
    <div className="stuck-leaf-gust">
      <div 
        className="stuck-leaf-sway"
        style={{ 
          '--base-rot': `${rotate}deg`
        }}
      >
        <LeafType size={size} fill={theme.fill} highlight={theme.highlight} vein={theme.vein} stem={theme.stem} />
      </div>
    </div>
  </div>
);

const romanticQuotes = [
  {
    text: "“Love one another, but make not a bond of love: let it rather be a moving sea between the shores of your souls.”",
    author: "— Kahlil Gibran",
  },
  {
    text: "“If I were to tell you that I love you in the water, would you become the river?”",
    author: "— Mahmoud Darwish",
  },
  {
    text: "“Love touches all things with its warmth, and whatever it touches awakens into beauty.”",
    author: "— Kahlil Gibran",
  },
  {
    text: "“You are my exile, and you are my homeland; where you are is where I belong.”",
    author: "— Mahmoud Darwish",
  },
  {
    text: "“When love beckons to you, follow him, though his ways are hard and steep.”",
    author: "— Kahlil Gibran",
  },
  {
    text: "“I love you so that my love may teach me how to see the world as a poem.”",
    author: "— Mahmoud Darwish",
  },
];

function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [quoteFade, setQuoteFade] = useState(true);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteFade(false);
      setTimeout(() => {
        setQuoteIdx((prev) => (prev + 1) % romanticQuotes.length);
        setQuoteFade(true);
      }, 500);
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for scroll-triggered timeline animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.timeline-item').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.05);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.05);
      setMouse({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const cx = (e.clientX / window.innerWidth - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;
    targetRef.current = { x: cx, y: cy };
  }, []);

  const px = (intensity) => ({
    transform: `translate(${mouse.x * intensity}px, ${mouse.y * intensity}px)`,
  });

  return (
    <div className="landing-container" onMouseMove={handleMouseMove}>

      {/* Atmospheric Golden Hour Sky Glow & Warm Sunbeams */}
      <div className="sky-glow" />
      <div className="golden-hour-beams" />

      {/* Drifting Clouds Layer */}
      <div className="layer-clouds">
        <svg className="cloud cloud-1" viewBox="0 0 400 120">
          <path d="M50 80 A40 40 0 0 1 120 40 A60 60 0 0 1 230 30 A50 50 0 0 1 320 50 A40 40 0 0 1 350 80 Z" fill="#FFF" />
        </svg>
        <svg className="cloud cloud-2" viewBox="0 0 400 120">
          <path d="M40 85 A45 45 0 0 1 130 45 A65 65 0 0 1 240 35 A55 55 0 0 1 330 55 A45 45 0 0 1 360 85 Z" fill="#FFF" />
        </svg>
        <svg className="cloud cloud-3" viewBox="0 0 400 120">
          <path d="M60 80 A35 35 0 0 1 115 45 A55 55 0 0 1 210 35 A45 45 0 0 1 290 55 A35 35 0 0 1 330 80 Z" fill="#FFF" />
        </svg>
      </div>

      {/* Layer 0: Rolling Hills with Rich Atmospheric Gradients */}
      <div className="layer-hills" style={px(-25)}>
        <Hills />
      </div>

      {/* Layer 1: Living Swaying Trees */}
      <div className="layer-trees" style={px(-18)}>
        <Tree1 x={-2} scale={1.3} delay={0} />
        <PineTree x={8} scale={1.1} delay={-3} />
        <Tree1 x={82} scale={1.2} delay={-1.5} />
        <PineTree x={92} scale={1} delay={-4} />
        <Tree1 x={72} scale={0.9} delay={-2} />
        <PineTree x={-1} scale={0.8} delay={-5} />
      </div>

      {/* Layer 2: Shimmering Lake & Loving Pair of Swans Forming a Heart */}
      <div className="layer-lake" style={px(-12)}>
        <Lake />
        <SwanPairHeart />
      </div>

      {/* Layer 3: Lush & Abundant Tulip Meadow */}
      <div className="layer-tulips" style={px(-6)}>
        {/* Left Lush Tulip Bed */}
        <div className="tulip-cluster-left">
          <Tulip variant="terracotta" scale={0.75} tilt={-14} delay={-0.5} />
          <Tulip variant="cream" scale={0.94} tilt={-6} delay={-1.8} />
          <Tulip variant="blush" scale={0.82} tilt={3} delay={-3.0} />
          <Tulip variant="rose" scale={0.98} tilt={-10} delay={-1.2} />
          <Tulip variant="cream" scale={0.76} tilt={8} delay={-2.4} />
          <Tulip variant="blush" scale={0.88} tilt={-4} delay={-0.8} />
          <Tulip variant="terracotta" scale={0.7} tilt={12} delay={-3.5} />
        </div>



        {/* Right Lush Tulip Bed */}
        <div className="tulip-cluster-right">
          <Tulip variant="blush" scale={0.72} tilt={-12} delay={-2.2} />
          <Tulip variant="rose" scale={0.92} tilt={4} delay={-0.8} />
          <Tulip variant="cream" scale={0.84} tilt={-8} delay={-1.5} />
          <Tulip variant="terracotta" scale={0.96} tilt={10} delay={-3.2} />
          <Tulip variant="rose" scale={0.78} tilt={-5} delay={-1.9} />
          <Tulip variant="blush" scale={0.88} tilt={8} delay={-0.4} />
          <Tulip variant="cream" scale={0.68} tilt={-15} delay={-2.8} />
        </div>
      </div>


      {/* Layer 4: Fireflies */}
      <div className="layer-fireflies" style={px(5)}>
        <Firefly className="ff-1" />
        <Firefly className="ff-2" />
        <Firefly className="ff-3" />
        <Firefly className="ff-4" />
        <Firefly className="ff-5" />
        <Firefly className="ff-6" />
        <Firefly className="ff-7" />
        <Firefly className="ff-8" />
      </div>

      {/* Layer 5: Foreground Grass */}
      <div className="layer-grass" style={px(15)}>
        <svg className="grass-fg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0 100V70C20 65 40 72 60 68C100 60 140 70 180 65C220 58 260 67 300 62C340 55 380 66 420 60C460 52 500 64 540 58C580 50 620 62 660 56C700 48 740 60 780 54C820 46 860 58 900 52C940 44 980 56 1020 50C1060 42 1100 54 1140 48C1180 40 1220 52 1260 46C1300 38 1340 50 1380 44C1400 40 1420 48 1440 42V100Z" fill="#C8A882" opacity="0.08"/>
        </svg>
      </div>

      {/* Layer 6: REALISTIC 3D FALLING LEAVES (Falls in front of the photo frame!) */}
      <div className="leaves-canvas" style={px(8)}>
        {leaves.map((leaf) => {
          const LeafComp = leaf.Comp;
          return (
            <div 
              className="leaf-item" 
              key={leaf.id}
              style={{
                left: leaf.left,
                '--leaf-dur': leaf.dur,
                '--leaf-delay': leaf.delay
              }}
            >
              <div className="leaf-wind-gust">
                <div 
                  className="leaf-spin" 
                  style={{
                    '--leaf-dur': leaf.dur,
                    '--leaf-delay': leaf.delay
                  }}
                >
                  <LeafComp
                    size={leaf.size}
                    fill={leaf.theme.fill}
                    highlight={leaf.theme.highlight}
                    vein={leaf.theme.vein}
                    stem={leaf.theme.stem}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <a href="#" className="logo">
          <Heart size={20} fill="currentColor" />
          Our Space
        </a>
        <div className="nav-links">
          <a href="#">Story</a>
          <a href="#">Memories</a>
          <a href="#">Adventures</a>
        </div>
      </nav>

      {/* Page Content */}
      <section className="page">
        <div className="photo-frame" style={px(-10)}>
          <img src={heroImage} alt="Us" className="couple-photo" />

          {/* Leaves resting on the arch frame (accounting for padding 2.4rem top, 1.5rem sides) */}
          <StuckLeaf top="28px" left="55%" rotate={95} LeafType={OvateLeaf} theme={leafThemes[4]} size={20} delay="0s" dur="22s" />
          <StuckLeaf top="50%" right="12px" rotate={-85} LeafType={LobedLeaf} theme={leafThemes[6]} size={18} delay="-1s" dur="16s" />

          {/* Butterfly 2: Operates on right side of frame & right meadow */}
          <PhotoButterfly className="pb-right" species={2} size={64} />
        </div>

        <div className="content" style={px(5)}>
          <p className="tagline">Our Little Corner</p>
          <h1 className="title">
            <span className="title-line-1">
              <span className="word-every">
                <span className="letter-e-anchor">
                  <span className="letter-e">E</span>
                  {/* Butterfly 1: Dedicated to letter E. Perches long, flies around, returns */}
                  <div className="e-butterfly-flyer">
                    <div className="butterfly-wind-gust">
                      <div className="bf-on-e-orient">
                        <RealisticSideButterfly species={1} size={48} />
                      </div>
                    </div>
                  </div>
                </span>very
              </span>
              {' '}moment with{' '}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                you
                <StuckLeaf top="-2px" right="-2px" rotate={80} LeafType={LanceolateLeaf} theme={leafThemes[7]} size={16} delay="-2s" dur="19s" />
              </span>
            </span>
            <span className="title-line-2">
              is a{' '}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <em className="title-em">beautiful blessing</em>
                <StuckLeaf bottom="4px" left="-5px" rotate={90} LeafType={LobedLeaf} theme={leafThemes[0]} size={14} delay="-0.5s" dur="25s" />
              </span>
            </span>
          </h1>
          <div className="divider">
            <span className="divider-line" />
            <span className="divider-gem">✦</span>
            <span className="divider-line" />
          </div>
          <p className="subtitle">
            A place to store all of our favorite memories, silly photos,
            and the little things that make our journey so special.
          </p>
          <div className="cta-row">
            <button className="btn btn-primary">
              Our Memories <ArrowRight size={16} />
              <StuckLeaf top="-6px" left="8px" rotate={85} LeafType={LanceolateLeaf} theme={leafThemes[5]} size={18} delay="-3s" dur="21s" />
            </button>
            <button className="btn btn-outline">
              <ImageIcon size={16} /> Gallery
              <StuckLeaf top="-4px" right="10px" rotate={95} LeafType={OvateLeaf} theme={leafThemes[2]} size={16} delay="-1.5s" dur="20s" />
            </button>
          </div>

          <div className="quote-box">
            <div className={`quote-container ${quoteFade ? 'quote-in' : 'quote-out'}`}>
              <p className="quote">
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  <StuckLeaf top="-2px" left="-4px" rotate={75} LeafType={LobedLeaf} theme={leafThemes[7]} size={14} delay="-0.2s" dur="17s" />
                  {romanticQuotes[quoteIdx].text.substring(0, 5)}
                </span>
                {romanticQuotes[quoteIdx].text.substring(5)}
              </p>
              <span className="quote-author">{romanticQuotes[quoteIdx].author}</span>
            </div>
          </div>

          {/* Scroll down hint */}
          <div className="scroll-hint">
            <span className="scroll-hint-text">Our Story</span>
            <svg className="scroll-hint-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
         SCROLL-TRIGGERED STORY TIMELINE
         ══════════════════════════════════ */}
      <section className="story-section">
        <div className="story-inner">
          <h2 className="story-heading">Our Journey Together</h2>
          <p className="story-subheading">Every chapter written with love</p>

          <div className="timeline">
            <div className="timeline-line" />

            <div className="timeline-item timeline-left">
              <div className="timeline-dot" />
              <div className="timeline-card">
                <span className="timeline-date">The Beginning</span>
                <h3 className="timeline-title">When Our Eyes First Met</h3>
                <p className="timeline-text">
                  A glance across the room, a smile that changed everything.
                  Some moments are so perfect they rewrite the future.
                </p>
              </div>
            </div>

            <div className="timeline-item timeline-right">
              <div className="timeline-dot" />
              <div className="timeline-card">
                <span className="timeline-date">First Adventure</span>
                <h3 className="timeline-title">Discovering the World Together</h3>
                <p className="timeline-text">
                  Our first trip, our first sunset shared, our first of a thousand
                  moments that made the world feel brand new.
                </p>
              </div>
            </div>

            <div className="timeline-item timeline-left">
              <div className="timeline-dot" />
              <div className="timeline-card">
                <span className="timeline-date">Growing Together</span>
                <h3 className="timeline-title">Through Every Season</h3>
                <p className="timeline-text">
                  We learned that love isn't just about the sunny days — it's about
                  holding hands through the storms and dancing in the rain.
                </p>
              </div>
            </div>

            <div className="timeline-item timeline-right">
              <div className="timeline-dot" />
              <div className="timeline-card">
                <span className="timeline-date">Forever & Always</span>
                <h3 className="timeline-title">This Is Just the Start</h3>
                <p className="timeline-text">
                  Every love story is beautiful, but ours is our favorite.
                  Here's to all the chapters yet to be written.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="story-footer">
          <Heart size={18} fill="currentColor" />
          <span>Made with love, for the one I love</span>
        </div>
      </section>
    </div>
  );
}

export default App;
