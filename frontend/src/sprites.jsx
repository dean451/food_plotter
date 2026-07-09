// Plant sprites — each renders in a 24×24 coordinate space.
// Usage in SVG: <Sprite transform={`translate(${x},${y}) scale(${s})`} />

export const SPRITES = {

  'Tomato': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <circle cx="12" cy="14" r="8" fill="#e53935"/>
      <ellipse cx="9.5" cy="10.5" rx="2.2" ry="1.5" fill="#ef9a9a" fillOpacity="0.55"/>
      <path d="M12 9 C9.5 10.5 7 9.5 8.5 12.5 C9.5 10 14.5 10 15.5 12.5 C17 9.5 14.5 10.5 12 9 Z" fill="#2e7d32"/>
      <rect x="11.2" y="5" width="1.6" height="4" rx="0.8" fill="#388e3c"/>
      <ellipse cx="14.5" cy="6.5" rx="2.5" ry="1.2" fill="#4caf50" transform="rotate(30 14.5 6.5)"/>
    </g>
  ),

  'Carrot': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M10 9 C9 7 7 4 8.5 2 C9.5 4.5 10.5 7 10.5 9" fill="#388e3c"/>
      <path d="M12 9 C12 6 11.5 3 12.5 1.5 C13 4 13 6.5 12.5 9" fill="#43a047"/>
      <path d="M14 9 C15 7 17 4 15.5 2 C14.5 4.5 13.5 7 13.5 9" fill="#388e3c"/>
      <path d="M9 9 Q12 8.5 15 9 L13 22 Q12 23 11 22 Z" fill="#f4511e"/>
      <path d="M9.5 9.5 Q11.5 9 13 9.5 L12 16 Q11 16.5 10.5 15 Z" fill="#ff7043" fillOpacity="0.5"/>
      <path d="M10 13 Q12 12.5 14 13" stroke="#e64a19" fill="none" strokeWidth="0.7"/>
      <path d="M10.5 17 Q12 16.5 13.5 17" stroke="#e64a19" fill="none" strokeWidth="0.7"/>
    </g>
  ),

  'Lettuce': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <ellipse cx="5.5" cy="16" rx="5.5" ry="7" fill="#8bc34a" transform="rotate(-30 5.5 16)"/>
      <ellipse cx="18.5" cy="16" rx="5.5" ry="7" fill="#8bc34a" transform="rotate(30 18.5 16)"/>
      <ellipse cx="12" cy="19" rx="5" ry="5.5" fill="#8bc34a"/>
      <ellipse cx="7.5" cy="13" rx="4.5" ry="6" fill="#aed581" transform="rotate(-20 7.5 13)"/>
      <ellipse cx="16.5" cy="13" rx="4.5" ry="6" fill="#aed581" transform="rotate(20 16.5 13)"/>
      <ellipse cx="12" cy="15" rx="4" ry="5" fill="#c5e1a5"/>
      <ellipse cx="12" cy="13" rx="2.5" ry="3" fill="#dcedc8"/>
    </g>
  ),

  'Zucchini': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <ellipse cx="12" cy="14" rx="5" ry="8.5" fill="#2e7d32"/>
      <ellipse cx="12" cy="14" rx="2.5" ry="7" fill="#43a047"/>
      <ellipse cx="12" cy="14" rx="1" ry="5.5" fill="#66bb6a" fillOpacity="0.5"/>
      <path d="M7 13 Q8 10 12 10 Q16 10 17 13" stroke="#1b5e20" fill="none" strokeWidth="0.7"/>
      <path d="M7 17 Q8 20 12 20 Q16 20 17 17" stroke="#1b5e20" fill="none" strokeWidth="0.7"/>
      <path d="M9 22 Q10 20 12 21 Q14 20 15 22 Q14 24 12 24 Q10 24 9 22 Z" fill="#ffca28"/>
      <rect x="11.2" y="3" width="1.6" height="3" rx="0.8" fill="#33691e"/>
    </g>
  ),

  'Kale': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M12 22 Q8 20 5 16 Q4 12 7 10 Q8 12 10 11 Q9 8 12 7 Q15 8 14 11 Q16 12 17 10 Q20 12 19 16 Q16 20 12 22 Z" fill="#33691e"/>
      <path d="M12 20 Q9 18 7 15 Q6 12 8.5 11 Q9.5 13 11 12 Q10.5 10 12 9 Q13.5 10 13 12 Q14.5 13 15.5 11 Q18 12 17 15 Q15 18 12 20 Z" fill="#4caf50"/>
      <path d="M12 18 Q10 16 9 14 Q9 12 11 12 Q11.5 14 12 13 Q12.5 14 13 12 Q15 12 15 14 Q14 16 12 18 Z" fill="#81c784"/>
      <line x1="12" y1="7" x2="12" y2="22" stroke="#1b5e20" strokeWidth="0.8" fill="none"/>
    </g>
  ),

  'Pepper': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M12 5 L10 7 Q5 9 5 14 Q5 21 12 22 Q19 21 19 14 Q19 9 14 7 Z" fill="#66bb6a"/>
      <path d="M9 10 Q9 18 12 20" stroke="#4caf50" fill="none" strokeWidth="0.8"/>
      <path d="M15 10 Q15 18 12 20" stroke="#4caf50" fill="none" strokeWidth="0.8"/>
      <path d="M7 13 Q12 11 17 13" stroke="#4caf50" fill="none" strokeWidth="0.8"/>
      <path d="M12 4 Q10 5 10 7 Q12 6 14 7 Q14 5 12 4 Z" fill="#2e7d32"/>
      <rect x="11.2" y="2" width="1.6" height="3" rx="0.8" fill="#1b5e20"/>
    </g>
  ),

  'Cucumber': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <ellipse cx="12" cy="13" rx="5.5" ry="9" fill="#558b2f"/>
      <ellipse cx="12" cy="13" rx="3.5" ry="7.5" fill="#8bc34a"/>
      <ellipse cx="12" cy="13" rx="1.5" ry="5" fill="#c5e1a5" fillOpacity="0.7"/>
      <circle cx="9" cy="8" r="0.8" fill="#33691e"/>
      <circle cx="15" cy="8" r="0.8" fill="#33691e"/>
      <circle cx="8" cy="12" r="0.8" fill="#33691e"/>
      <circle cx="16" cy="12" r="0.8" fill="#33691e"/>
      <circle cx="9" cy="16" r="0.8" fill="#33691e"/>
      <circle cx="15" cy="16" r="0.8" fill="#33691e"/>
      <rect x="11.2" y="3" width="1.6" height="2.5" rx="0.8" fill="#33691e"/>
    </g>
  ),

  'Pumpkin': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M12 20 Q6 20 4 14 Q6 7 12 7 Q18 7 20 14 Q18 20 12 20 Z" fill="#e65100"/>
      <path d="M12 20 Q9 19 8 14 Q9 8 12 8 Q15 8 16 14 Q15 19 12 20 Z" fill="#f4511e"/>
      <path d="M12 20 Q10.5 19 10 14 Q10.5 9 12 9 Q13.5 9 14 14 Q13.5 19 12 20 Z" fill="#ff7043"/>
      <ellipse cx="12" cy="7.5" rx="3" ry="1" fill="#4e342e"/>
      <rect x="11" y="4" width="2" height="4" rx="1" fill="#33691e"/>
      <ellipse cx="16" cy="7" rx="3" ry="1.2" fill="#4caf50" transform="rotate(30 16 7)"/>
    </g>
  ),

  'Beans': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M5 18 Q8 8 14 6 Q17 8 16 11 Q10 10 8 18 Q6 20 5 18 Z" fill="#558b2f"/>
      <ellipse cx="9" cy="16" rx="1.5" ry="1" fill="#4caf50" transform="rotate(-60 9 16)"/>
      <ellipse cx="11" cy="12" rx="1.5" ry="1" fill="#4caf50" transform="rotate(-60 11 12)"/>
      <ellipse cx="13" cy="9" rx="1.5" ry="1" fill="#4caf50" transform="rotate(-60 13 9)"/>
      <path d="M19 6 Q16 16 10 18 Q7 17 8 14 Q14 15 16 6 Q18 4 19 6 Z" fill="#66bb6a"/>
      <ellipse cx="15" cy="8" rx="1.5" ry="1" fill="#81c784" transform="rotate(60 15 8)"/>
      <ellipse cx="13" cy="13" rx="1.5" ry="1" fill="#81c784" transform="rotate(60 13 13)"/>
      <ellipse cx="11" cy="17" rx="1.5" ry="1" fill="#81c784" transform="rotate(60 11 17)"/>
    </g>
  ),

  'Peas': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M3 12 Q3 9 6 8 Q8 7.5 10 8 Q12 7.5 14 8 Q16 7.5 18 8 Q21 9 21 12 Q21 15 18 16 Q16 16.5 14 16 Q12 16.5 10 16 Q8 16.5 6 16 Q3 15 3 12 Z" fill="#8bc34a"/>
      <circle cx="6.5" cy="12" r="2.2" fill="#4caf50"/>
      <circle cx="10.5" cy="12" r="2.2" fill="#4caf50"/>
      <circle cx="14.5" cy="12" r="2.2" fill="#4caf50"/>
      <circle cx="18" cy="12" r="1.8" fill="#4caf50"/>
      <path d="M5 9.5 Q12 8.5 19 9.5" stroke="#c5e1a5" fill="none" strokeWidth="0.8"/>
      <rect x="20.5" y="11.2" width="2.5" height="1.6" rx="0.8" fill="#388e3c"/>
    </g>
  ),

  'Spinach': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <ellipse cx="12" cy="20" rx="4" ry="6" fill="#4caf50"/>
      <ellipse cx="6" cy="17" rx="4" ry="6" fill="#4caf50" transform="rotate(-40 6 17)"/>
      <ellipse cx="18" cy="17" rx="4" ry="6" fill="#4caf50" transform="rotate(40 18 17)"/>
      <ellipse cx="5" cy="12" rx="3.5" ry="5.5" fill="#66bb6a" transform="rotate(-70 5 12)"/>
      <ellipse cx="19" cy="12" rx="3.5" ry="5.5" fill="#66bb6a" transform="rotate(70 19 12)"/>
      <ellipse cx="12" cy="13" rx="3" ry="4.5" fill="#81c784"/>
      <circle cx="12" cy="16" r="2" fill="#388e3c"/>
      <line x1="12" y1="14" x2="12" y2="22" stroke="#388e3c" strokeWidth="0.8"/>
    </g>
  ),

  'Garlic': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <ellipse cx="12" cy="15" rx="7" ry="8" fill="#fff8e1"/>
      <path d="M9 22 Q8 18 8.5 13 Q10 9 12 9" stroke="#e8d0a0" fill="none" strokeWidth="1.2"/>
      <path d="M15 22 Q16 18 15.5 13 Q14 9 12 9" stroke="#e8d0a0" fill="none" strokeWidth="1.2"/>
      <path d="M12 22 L12 9" stroke="#ddc880" fill="none" strokeWidth="0.8"/>
      <path d="M8 9 Q12 6 16 9" fill="#c8b870" stroke="#a89050" strokeWidth="0.5"/>
      <rect x="11.2" y="2.5" width="1.6" height="4" rx="0.8" fill="#66bb6a"/>
    </g>
  ),

  'Onion': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <ellipse cx="12" cy="16" rx="8" ry="7" fill="#c8a000"/>
      <ellipse cx="12" cy="16" rx="6" ry="5.5" fill="#e6b800"/>
      <ellipse cx="12" cy="16" rx="4" ry="4" fill="#ffd740"/>
      <path d="M5 14 Q6 9 12 8 Q18 9 19 14" stroke="#a07000" fill="none" strokeWidth="0.8"/>
      <path d="M10 8 Q9.5 5.5 10 3" stroke="#558b2f" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 8 Q12 5.5 12 2" stroke="#66bb6a" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 8 Q14.5 5.5 14 3" stroke="#558b2f" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
    </g>
  ),

  'Eggplant': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M12 22 Q6 22 5 16 Q4 9 12 6 Q20 9 19 16 Q18 22 12 22 Z" fill="#4a148c"/>
      <path d="M12 22 Q9 21 8.5 16 Q8 11 12 8" stroke="#7b1fa2" fill="none" strokeWidth="1"/>
      <ellipse cx="9.5" cy="10.5" rx="2" ry="1.5" fill="#9c27b0" fillOpacity="0.5"/>
      <path d="M12 7 C9 6 7 8 8 10 C9 8 11 8 12 7 C13 8 15 8 16 10 C17 8 15 6 12 7 Z" fill="#2e7d32"/>
      <rect x="11.2" y="3" width="1.6" height="4" rx="0.8" fill="#33691e"/>
    </g>
  ),

  'Radish': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <ellipse cx="8" cy="8" rx="3.5" ry="5" fill="#558b2f" transform="rotate(-20 8 8)"/>
      <ellipse cx="12" cy="7" rx="3" ry="5" fill="#66bb6a"/>
      <ellipse cx="16" cy="8" rx="3.5" ry="5" fill="#558b2f" transform="rotate(20 16 8)"/>
      <path d="M5 15 Q5 11 12 11 Q19 11 19 15 Q18 20 12 20 Q6 20 5 15 Z" fill="#e53935"/>
      <path d="M6.5 17 Q7 20 12 20 Q17 20 17.5 17 Q15 22 12 22 Q9 22 6.5 17 Z" fill="#ffebee"/>
      <ellipse cx="9" cy="14" rx="2" ry="1.5" fill="#ef9a9a" fillOpacity="0.5"/>
    </g>
  ),

  'Corn': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M12 3 Q6 6 5 12 Q7 16 12 18 Q6 15 5 12 Q6 6 12 3 Z" fill="#558b2f"/>
      <path d="M12 3 Q18 6 19 12 Q17 16 12 18 Q18 15 19 12 Q18 6 12 3 Z" fill="#4caf50"/>
      <ellipse cx="12" cy="14" rx="4.5" ry="8" fill="#fdd835"/>
      <rect x="9.5" y="7" width="1.5" height="1.5" rx="0.4" fill="#f9a825"/>
      <rect x="11.3" y="7" width="1.5" height="1.5" rx="0.4" fill="#ffd740"/>
      <rect x="13.1" y="7" width="1.5" height="1.5" rx="0.4" fill="#f9a825"/>
      <rect x="9.5" y="9" width="1.5" height="1.5" rx="0.4" fill="#ffa000"/>
      <rect x="11.3" y="9" width="1.5" height="1.5" rx="0.4" fill="#ffd740"/>
      <rect x="13.1" y="9" width="1.5" height="1.5" rx="0.4" fill="#ffa000"/>
      <rect x="9.5" y="11" width="1.5" height="1.5" rx="0.4" fill="#ffd740"/>
      <rect x="11.3" y="11" width="1.5" height="1.5" rx="0.4" fill="#f9a825"/>
      <rect x="13.1" y="11" width="1.5" height="1.5" rx="0.4" fill="#ffd740"/>
      <rect x="9.5" y="13" width="1.5" height="1.5" rx="0.4" fill="#f9a825"/>
      <rect x="11.3" y="13" width="1.5" height="1.5" rx="0.4" fill="#ffd740"/>
      <rect x="13.1" y="13" width="1.5" height="1.5" rx="0.4" fill="#ffa000"/>
      <path d="M10 6 Q11.5 4 12 3 Q12.5 4 14 6" stroke="#ffe082" fill="none" strokeWidth="0.8"/>
    </g>
  ),

  'Basil': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.2" y="8" width="1.6" height="14" rx="0.8" fill="#558b2f"/>
      <ellipse cx="8" cy="17" rx="4.5" ry="2.2" fill="#4caf50" transform="rotate(-35 8 17)"/>
      <ellipse cx="16" cy="17" rx="4.5" ry="2.2" fill="#4caf50" transform="rotate(35 16 17)"/>
      <ellipse cx="8.5" cy="13" rx="4" ry="2" fill="#66bb6a" transform="rotate(-30 8.5 13)"/>
      <ellipse cx="15.5" cy="13" rx="4" ry="2" fill="#66bb6a" transform="rotate(30 15.5 13)"/>
      <ellipse cx="9.5" cy="10" rx="3" ry="1.6" fill="#81c784" transform="rotate(-20 9.5 10)"/>
      <ellipse cx="14.5" cy="10" rx="3" ry="1.6" fill="#81c784" transform="rotate(20 14.5 10)"/>
      <ellipse cx="12" cy="8" rx="2" ry="1.5" fill="#a5d6a7"/>
    </g>
  ),

  'Mint': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.2" y="6" width="1.6" height="16" rx="0.8" fill="#00897b"/>
      <ellipse cx="8" cy="19" rx="4" ry="2.5" fill="#26a69a" transform="rotate(-35 8 19)"/>
      <ellipse cx="16" cy="19" rx="4" ry="2.5" fill="#26a69a" transform="rotate(35 16 19)"/>
      <ellipse cx="8.5" cy="15" rx="3.5" ry="2.2" fill="#4db6ac" transform="rotate(-30 8.5 15)"/>
      <ellipse cx="15.5" cy="15" rx="3.5" ry="2.2" fill="#4db6ac" transform="rotate(30 15.5 15)"/>
      <ellipse cx="9" cy="11" rx="3" ry="2" fill="#80cbc4" transform="rotate(-25 9 11)"/>
      <ellipse cx="15" cy="11" rx="3" ry="2" fill="#80cbc4" transform="rotate(25 15 11)"/>
      <ellipse cx="12" cy="6" rx="2" ry="2.5" fill="#ce93d8"/>
    </g>
  ),

  'Rosemary': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.4" y="4" width="1.2" height="18" rx="0.6" fill="#558b2f"/>
      <path d="M12 8 L7 6 M12 8 L7 9 M12 8 L8 12 M12 8 L17 6 M12 8 L17 9 M12 8 L16 12" stroke="#66bb6a" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M12 14 L7 12 M12 14 L7 15 M12 14 L8 18 M12 14 L17 12 M12 14 L17 15 M12 14 L16 18" stroke="#81c784" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="7.5" cy="9" r="1" fill="#ce93d8"/>
      <circle cx="16.5" cy="9" r="1" fill="#ce93d8"/>
      <circle cx="7.5" cy="15" r="1" fill="#ba68c8"/>
      <circle cx="16.5" cy="15" r="1" fill="#ba68c8"/>
    </g>
  ),

  'Thyme': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <line x1="12" y1="22" x2="12" y2="8" stroke="#795548" strokeWidth="1"/>
      <line x1="12" y1="16" x2="8" y2="12" stroke="#795548" strokeWidth="0.8"/>
      <line x1="12" y1="16" x2="16" y2="12" stroke="#795548" strokeWidth="0.8"/>
      <line x1="12" y1="11" x2="9" y2="8" stroke="#795548" strokeWidth="0.8"/>
      <line x1="12" y1="11" x2="15" y2="8" stroke="#795548" strokeWidth="0.8"/>
      <ellipse cx="7.5" cy="11.5" rx="1.5" ry="0.9" fill="#66bb6a" transform="rotate(-45 7.5 11.5)"/>
      <ellipse cx="8.5" cy="12.5" rx="1.5" ry="0.9" fill="#4caf50" transform="rotate(-45 8.5 12.5)"/>
      <ellipse cx="16.5" cy="11.5" rx="1.5" ry="0.9" fill="#66bb6a" transform="rotate(45 16.5 11.5)"/>
      <ellipse cx="15.5" cy="12.5" rx="1.5" ry="0.9" fill="#4caf50" transform="rotate(45 15.5 12.5)"/>
      <ellipse cx="8.5" cy="8" rx="1.5" ry="0.9" fill="#81c784" transform="rotate(-45 8.5 8)"/>
      <ellipse cx="15.5" cy="8" rx="1.5" ry="0.9" fill="#81c784" transform="rotate(45 15.5 8)"/>
      <circle cx="8" cy="11" r="1.2" fill="#f48fb1"/>
      <circle cx="16" cy="11" r="1.2" fill="#f48fb1"/>
      <circle cx="9" cy="8" r="1.2" fill="#f06292"/>
      <circle cx="15" cy="8" r="1.2" fill="#f06292"/>
    </g>
  ),

  'Strawberry': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M12 22 Q6 18 5 13 Q5 7 9 6 Q11 5.5 12 7 Q13 5.5 15 6 Q19 7 19 13 Q18 18 12 22 Z" fill="#e53935"/>
      <ellipse cx="9.5" cy="10" rx="2" ry="1.5" fill="#ef9a9a" fillOpacity="0.5"/>
      <ellipse cx="9" cy="12" rx="0.7" ry="0.9" fill="#ffcc80" transform="rotate(10 9 12)"/>
      <ellipse cx="12" cy="10" rx="0.7" ry="0.9" fill="#ffcc80"/>
      <ellipse cx="15" cy="12" rx="0.7" ry="0.9" fill="#ffcc80" transform="rotate(-10 15 12)"/>
      <ellipse cx="10" cy="16" rx="0.7" ry="0.9" fill="#ffcc80" transform="rotate(5 10 16)"/>
      <ellipse cx="14" cy="16" rx="0.7" ry="0.9" fill="#ffcc80" transform="rotate(-5 14 16)"/>
      <ellipse cx="12" cy="20" rx="0.7" ry="0.9" fill="#ffcc80"/>
      <path d="M12 8 C9 7 7 8 7 10 C8 9 10 9 12 8 C14 9 16 9 17 10 C17 8 15 7 12 8 Z" fill="#2e7d32"/>
      <path d="M9 7 C8 4 10 3 12 5 C14 3 16 4 15 7" stroke="#388e3c" fill="none" strokeWidth="1.2" strokeLinecap="round"/>
    </g>
  ),

  'Sunflower': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11" y="16" width="2" height="7" rx="1" fill="#558b2f"/>
      <ellipse cx="12" cy="5.5" rx="2.2" ry="4.5" fill="#fdd835"/>
      <ellipse cx="12" cy="5.5" rx="2.2" ry="4.5" fill="#fdd835" transform="rotate(45 12 12)"/>
      <ellipse cx="12" cy="5.5" rx="2.2" ry="4.5" fill="#fdd835" transform="rotate(90 12 12)"/>
      <ellipse cx="12" cy="5.5" rx="2.2" ry="4.5" fill="#fdd835" transform="rotate(135 12 12)"/>
      <ellipse cx="12" cy="5.5" rx="2.2" ry="4.5" fill="#ffcc02" transform="rotate(22.5 12 12)"/>
      <ellipse cx="12" cy="5.5" rx="2.2" ry="4.5" fill="#ffcc02" transform="rotate(67.5 12 12)"/>
      <ellipse cx="12" cy="5.5" rx="2.2" ry="4.5" fill="#ffcc02" transform="rotate(112.5 12 12)"/>
      <ellipse cx="12" cy="5.5" rx="2.2" ry="4.5" fill="#ffcc02" transform="rotate(157.5 12 12)"/>
      <circle cx="12" cy="12" r="4.8" fill="#4e342e"/>
      <circle cx="12" cy="12" r="3.5" fill="#6d4c41"/>
      <circle cx="11" cy="11" r="0.7" fill="#3e2723"/>
      <circle cx="13" cy="11" r="0.7" fill="#3e2723"/>
      <circle cx="12" cy="13" r="0.7" fill="#3e2723"/>
      <circle cx="10.2" cy="13" r="0.6" fill="#3e2723"/>
      <circle cx="13.8" cy="13" r="0.6" fill="#3e2723"/>
    </g>
  ),

  'Lavender': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <line x1="9" y1="22" x2="9" y2="10" stroke="#558b2f" strokeWidth="1.2"/>
      <line x1="12" y1="22" x2="12" y2="8" stroke="#558b2f" strokeWidth="1.2"/>
      <line x1="15" y1="22" x2="15" y2="10" stroke="#558b2f" strokeWidth="1.2"/>
      <ellipse cx="7.5" cy="17" rx="2" ry="1" fill="#8bc34a" transform="rotate(-30 7.5 17)"/>
      <ellipse cx="10.5" cy="17" rx="2" ry="1" fill="#8bc34a" transform="rotate(30 10.5 17)"/>
      <ellipse cx="10.5" cy="14" rx="2" ry="1" fill="#8bc34a" transform="rotate(-30 10.5 14)"/>
      <ellipse cx="13.5" cy="14" rx="2" ry="1" fill="#8bc34a" transform="rotate(30 13.5 14)"/>
      <rect x="8" y="4" width="2" height="7" rx="1" fill="#9c27b0"/>
      <circle cx="9" cy="4" r="1.5" fill="#ce93d8"/>
      <circle cx="9" cy="6.5" r="1.5" fill="#ab47bc"/>
      <circle cx="9" cy="9" r="1.5" fill="#7b1fa2"/>
      <rect x="11" y="2" width="2" height="7" rx="1" fill="#9c27b0"/>
      <circle cx="12" cy="2" r="1.5" fill="#ce93d8"/>
      <circle cx="12" cy="4.5" r="1.5" fill="#ba68c8"/>
      <circle cx="12" cy="7" r="1.5" fill="#9c27b0"/>
      <rect x="14" y="4" width="2" height="7" rx="1" fill="#9c27b0"/>
      <circle cx="15" cy="4" r="1.5" fill="#ba68c8"/>
      <circle cx="15" cy="6.5" r="1.5" fill="#ab47bc"/>
      <circle cx="15" cy="9" r="1.5" fill="#7b1fa2"/>
    </g>
  ),

  // ── Texas Natives ─────────────────────────────────────────────────────────────

  'Lantana': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.2" y="18" width="1.6" height="5" rx="0.8" fill="#558b2f"/>
      <ellipse cx="8" cy="17" rx="3.5" ry="2" fill="#4caf50" transform="rotate(-30 8 17)"/>
      <ellipse cx="16" cy="17" rx="3.5" ry="2" fill="#388e3c" transform="rotate(30 16 17)"/>
      <circle cx="10" cy="8" r="2.2" fill="#fdd835"/>
      <circle cx="14" cy="8" r="2.2" fill="#ff7043"/>
      <circle cx="12" cy="5.5" r="2.2" fill="#ffa726"/>
      <circle cx="12" cy="10.5" r="2.2" fill="#e53935"/>
      <circle cx="9" cy="11" r="1.8" fill="#fdd835"/>
      <circle cx="15" cy="11" r="1.8" fill="#ff7043"/>
      <circle cx="7.5" cy="7" r="1.8" fill="#e53935"/>
      <circle cx="16.5" cy="7" r="1.8" fill="#ffa726"/>
      <circle cx="10" cy="8" r="0.7" fill="#fff9c4"/>
      <circle cx="14" cy="8" r="0.7" fill="#fff9c4"/>
      <circle cx="12" cy="5.5" r="0.7" fill="#fff9c4"/>
      <circle cx="12" cy="10.5" r="0.7" fill="#fff9c4"/>
    </g>
  ),

  'Esperanza': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.2" y="14" width="1.6" height="9" rx="0.8" fill="#558b2f"/>
      <line x1="12" y1="17" x2="7" y2="13" stroke="#558b2f" strokeWidth="1.2"/>
      <line x1="12" y1="17" x2="17" y2="13" stroke="#558b2f" strokeWidth="1.2"/>
      <path d="M4 11 Q5 8 8 8 Q9.5 8 10 10 Q8.5 12 7 13 Q5 13 4 11 Z" fill="#fdd835"/>
      <path d="M7 8 Q8 6 8.5 8 Q9 6.5 10 8 Q9 8.5 8 9 Q7.5 8.5 7 8 Z" fill="#f9a825"/>
      <path d="M14 11 Q15 8 18 8 Q19.5 8 20 10 Q18.5 12 17 13 Q15 13 14 11 Z" fill="#ffd740"/>
      <path d="M17 8 Q18 6 18.5 8 Q19 6.5 20 8 Q19 8.5 18 9 Q17.5 8.5 17 8 Z" fill="#f9a825"/>
      <path d="M9 5 Q10 2 12 2 Q14 2 15 5 Q13.5 7 12 8 Q10.5 7 9 5 Z" fill="#ffca28"/>
      <path d="M10.5 2.5 Q12 1 13.5 2.5 Q13 3.5 12 4 Q11 3.5 10.5 2.5 Z" fill="#f9a825"/>
    </g>
  ),

  "Turk's Cap": ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.2" y="14" width="1.6" height="9" rx="0.8" fill="#33691e"/>
      <ellipse cx="8" cy="16" rx="4" ry="2.5" fill="#558b2f" transform="rotate(-30 8 16)"/>
      <path d="M12 14 Q8 11 7 8 Q8 5 10 5 Q11 7 10 9 Q11 11 12 14 Z" fill="#c62828"/>
      <path d="M12 14 Q9.5 11 9.5 8 Q10 5 12 5 Q13 7 12 9 Q12 11 12 14 Z" fill="#e53935"/>
      <path d="M12 14 Q14.5 11 14.5 8 Q14 5 12 5 Q11 7 12 9 Q12 11 12 14 Z" fill="#d32f2f"/>
      <path d="M12 14 Q16 11 17 8 Q16 5 14 5 Q13 7 14 9 Q13 11 12 14 Z" fill="#ef5350"/>
      <line x1="12" y1="9" x2="12" y2="5.5" stroke="#ffd740" strokeWidth="0.8"/>
      <circle cx="12" cy="5" r="1" fill="#ffd740"/>
    </g>
  ),

  'Texas Sage': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.2" y="15" width="1.6" height="8" rx="0.8" fill="#558b2f"/>
      <ellipse cx="8" cy="18" rx="3" ry="1.8" fill="#b0bec5" transform="rotate(-35 8 18)"/>
      <ellipse cx="16" cy="18" rx="3" ry="1.8" fill="#b0bec5" transform="rotate(35 16 18)"/>
      <ellipse cx="7" cy="14" rx="3" ry="1.8" fill="#90a4ae" transform="rotate(-40 7 14)"/>
      <ellipse cx="17" cy="14" rx="3" ry="1.8" fill="#90a4ae" transform="rotate(40 17 14)"/>
      <path d="M10 10 Q10 7 12 7 Q14 7 14 10 Q13 12 12 12 Q11 12 10 10 Z" fill="#9c27b0"/>
      <path d="M6 8 Q6 5 8 5 Q10 5 10 8 Q9 10 8 10 Q7 10 6 8 Z" fill="#ba68c8"/>
      <path d="M14 8 Q14 5 16 5 Q18 5 18 8 Q17 10 16 10 Q15 10 14 8 Z" fill="#ab47bc"/>
      <line x1="10" y1="10" x2="10" y2="12" stroke="#ce93d8" strokeWidth="0.8"/>
      <line x1="14" y1="10" x2="14" y2="12" stroke="#ce93d8" strokeWidth="0.8"/>
    </g>
  ),

  'Agarita': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <line x1="12" y1="22" x2="12" y2="12" stroke="#795548" strokeWidth="1.2"/>
      <path d="M12 12 Q10 10 11 7 Q12 5 12 7 Q12 5 13 7 Q14 10 12 12 Z" fill="#33691e"/>
      <line x1="11" y1="7" x2="10" y2="5" stroke="#1b5e20" strokeWidth="0.7"/>
      <line x1="13" y1="7" x2="14" y2="5" stroke="#1b5e20" strokeWidth="0.7"/>
      <path d="M10 14 Q6 13 5 10 Q5 8 7 9 Q7 7 8 9 Q9 8 9 10 Q11 12 10 14 Z" fill="#388e3c"/>
      <path d="M14 14 Q18 13 19 10 Q19 8 17 9 Q17 7 16 9 Q15 8 15 10 Q13 12 14 14 Z" fill="#43a047"/>
      <line x1="5.5" y1="9" x2="4" y2="8" stroke="#1b5e20" strokeWidth="0.8"/>
      <line x1="7" y1="8" x2="6.5" y2="6.5" stroke="#1b5e20" strokeWidth="0.8"/>
      <line x1="18.5" y1="9" x2="20" y2="8" stroke="#1b5e20" strokeWidth="0.8"/>
      <line x1="17" y1="8" x2="17.5" y2="6.5" stroke="#1b5e20" strokeWidth="0.8"/>
      <circle cx="8" cy="20" r="1.5" fill="#c62828"/>
      <circle cx="12" cy="21" r="1.5" fill="#d32f2f"/>
      <circle cx="16" cy="20" r="1.5" fill="#e53935"/>
    </g>
  ),

  'Texas Mountain Laurel': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <line x1="12" y1="22" x2="12" y2="14" stroke="#5d4037" strokeWidth="1.5"/>
      <line x1="12" y1="17" x2="7" y2="13" stroke="#5d4037" strokeWidth="1.2"/>
      <line x1="12" y1="17" x2="17" y2="13" stroke="#5d4037" strokeWidth="1.2"/>
      <circle cx="5" cy="14" r="1.8" fill="#7b1fa2"/>
      <circle cx="5" cy="17" r="1.8" fill="#9c27b0"/>
      <circle cx="4" cy="11.5" r="1.5" fill="#6a1b9a"/>
      <circle cx="7" cy="13" r="1.5" fill="#8e24aa"/>
      <circle cx="12" cy="12" r="2" fill="#7b1fa2"/>
      <circle cx="12" cy="15.5" r="2" fill="#9c27b0"/>
      <circle cx="10.5" cy="10" r="1.5" fill="#6a1b9a"/>
      <circle cx="13.5" cy="10" r="1.5" fill="#8e24aa"/>
      <circle cx="19" cy="14" r="1.8" fill="#7b1fa2"/>
      <circle cx="19" cy="17" r="1.8" fill="#9c27b0"/>
      <circle cx="17" cy="13" r="1.5" fill="#8e24aa"/>
      <circle cx="20" cy="11.5" r="1.5" fill="#6a1b9a"/>
    </g>
  ),

  'Rock Rose': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.2" y="16" width="1.6" height="7" rx="0.8" fill="#558b2f"/>
      <ellipse cx="8" cy="18" rx="3.5" ry="1.8" fill="#4caf50" transform="rotate(-25 8 18)"/>
      <ellipse cx="12" cy="8" rx="3.5" ry="5.5" fill="#f48fb1"/>
      <ellipse cx="12" cy="8" rx="3.5" ry="5.5" fill="#f48fb1" transform="rotate(72 12 12)"/>
      <ellipse cx="12" cy="8" rx="3.5" ry="5.5" fill="#ec407a" transform="rotate(144 12 12)"/>
      <ellipse cx="12" cy="8" rx="3.5" ry="5.5" fill="#f06292" transform="rotate(216 12 12)"/>
      <ellipse cx="12" cy="8" rx="3.5" ry="5.5" fill="#f48fb1" transform="rotate(288 12 12)"/>
      <circle cx="12" cy="12" r="2.5" fill="#ffd740"/>
      <circle cx="12" cy="12" r="1.5" fill="#f9a825"/>
    </g>
  ),

  'Flame Acanthus': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.2" y="16" width="1.6" height="7" rx="0.8" fill="#33691e"/>
      <ellipse cx="8" cy="18" rx="3.5" ry="2" fill="#4caf50" transform="rotate(-30 8 18)"/>
      <ellipse cx="16" cy="18" rx="3.5" ry="2" fill="#388e3c" transform="rotate(30 16 18)"/>
      <path d="M10 15 Q9 12 10 8 Q11 6 11 8 Q11.5 10 11 14 Q10.5 15.5 10 15 Z" fill="#e64a19"/>
      <path d="M10 8 Q9.5 6 11 5 Q12 5.5 11 8" fill="#ff7043"/>
      <path d="M14 15 Q13 12 14 8 Q15 6 15 8 Q15.5 10 15 14 Q14.5 15.5 14 15 Z" fill="#f4511e"/>
      <path d="M14 8 Q13.5 6 15 5 Q16 5.5 15 8" fill="#ff8a65"/>
      <path d="M12 13 Q11 10 12 6 Q13 4 13 6 Q13.5 8 13 12 Q12.5 14 12 13 Z" fill="#ff5722"/>
      <path d="M12 6 Q11.5 4 13 3 Q14 3.5 13 6" fill="#ffccbc"/>
    </g>
  ),

  'Blackfoot Daisy': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.2" y="17" width="1.6" height="6" rx="0.8" fill="#558b2f"/>
      <ellipse cx="9" cy="20" rx="3" ry="1.2" fill="#66bb6a" transform="rotate(-25 9 20)"/>
      <ellipse cx="12" cy="7" rx="1.8" ry="4.5" fill="white" stroke="#e0e0e0" strokeWidth="0.3"/>
      <ellipse cx="12" cy="7" rx="1.8" ry="4.5" fill="white" stroke="#e0e0e0" strokeWidth="0.3" transform="rotate(45 12 12)"/>
      <ellipse cx="12" cy="7" rx="1.8" ry="4.5" fill="white" stroke="#e0e0e0" strokeWidth="0.3" transform="rotate(90 12 12)"/>
      <ellipse cx="12" cy="7" rx="1.8" ry="4.5" fill="white" stroke="#e0e0e0" strokeWidth="0.3" transform="rotate(135 12 12)"/>
      <ellipse cx="12" cy="7" rx="1.8" ry="4.5" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="0.3" transform="rotate(22.5 12 12)"/>
      <ellipse cx="12" cy="7" rx="1.8" ry="4.5" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="0.3" transform="rotate(67.5 12 12)"/>
      <ellipse cx="12" cy="7" rx="1.8" ry="4.5" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="0.3" transform="rotate(112.5 12 12)"/>
      <ellipse cx="12" cy="7" rx="1.8" ry="4.5" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="0.3" transform="rotate(157.5 12 12)"/>
      <circle cx="12" cy="12" r="3.5" fill="#fdd835"/>
      <circle cx="12" cy="12" r="2" fill="#f9a825"/>
    </g>
  ),

  'Winecup': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.2" y="15" width="1.6" height="8" rx="0.8" fill="#558b2f"/>
      <ellipse cx="8.5" cy="18" rx="3.5" ry="2" fill="#66bb6a" transform="rotate(-25 8.5 18)"/>
      <path d="M12 15 Q8 13 7 10 Q7 7 9 7 Q10 8 10 10 Q11 12 12 13 Q13 12 14 10 Q14 8 15 7 Q17 7 17 10 Q16 13 12 15 Z" fill="#880e4f"/>
      <path d="M9 7 Q9 5 12 4 Q15 5 15 7" fill="#ad1457"/>
      <path d="M12 14 Q10 12 9.5 10 Q10 9 12 9 Q14 9 14.5 10 Q14 12 12 14 Z" fill="#e91e63" fillOpacity="0.6"/>
      <line x1="12" y1="9" x2="12" y2="6" stroke="white" strokeWidth="0.8"/>
      <circle cx="12" cy="5.5" r="1" fill="white"/>
    </g>
  ),

  'Autumn Sage': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.2" y="16" width="1.6" height="7" rx="0.8" fill="#33691e"/>
      <ellipse cx="8" cy="18" rx="3" ry="1.8" fill="#558b2f" transform="rotate(-30 8 18)"/>
      <ellipse cx="16" cy="18" rx="3" ry="1.8" fill="#4caf50" transform="rotate(30 16 18)"/>
      <rect x="11" y="3" width="2" height="1.5" rx="0.8" fill="#33691e"/>
      <rect x="11" y="6" width="2" height="1.5" rx="0.8" fill="#33691e"/>
      <rect x="11" y="9" width="2" height="1.5" rx="0.8" fill="#33691e"/>
      <path d="M11 4.5 Q10 3.5 10 5 Q10 6 11 6" stroke="#e53935" fill="#e53935" strokeWidth="0.3"/>
      <path d="M13 4.5 Q14 3.5 14 5 Q14 6 13 6" stroke="#e53935" fill="#e53935" strokeWidth="0.3"/>
      <path d="M11 7.5 Q10 6.5 10 8 Q10 9 11 9" stroke="#c62828" fill="#c62828" strokeWidth="0.3"/>
      <path d="M13 7.5 Q14 6.5 14 8 Q14 9 13 9" stroke="#c62828" fill="#c62828" strokeWidth="0.3"/>
      <path d="M11 10.5 Q10 9.5 10 11 Q10 12 11 12" stroke="#b71c1c" fill="#b71c1c" strokeWidth="0.3"/>
      <path d="M13 10.5 Q14 9.5 14 11 Q14 12 13 12" stroke="#b71c1c" fill="#b71c1c" strokeWidth="0.3"/>
    </g>
  ),

  'Purple Coneflower': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.2" y="17" width="1.6" height="6" rx="0.8" fill="#558b2f"/>
      <ellipse cx="8.5" cy="20" rx="3.5" ry="1.5" fill="#66bb6a" transform="rotate(-25 8.5 20)"/>
      <ellipse cx="12" cy="8.5" rx="2" ry="5" fill="#ab47bc" transform="rotate(-15 12 14)"/>
      <ellipse cx="12" cy="8.5" rx="2" ry="5" fill="#9c27b0" transform="rotate(15 12 14)"/>
      <ellipse cx="12" cy="8.5" rx="2" ry="5" fill="#ab47bc" transform="rotate(55 12 14)"/>
      <ellipse cx="12" cy="8.5" rx="2" ry="5" fill="#9c27b0" transform="rotate(-55 12 14)"/>
      <ellipse cx="12" cy="8.5" rx="2" ry="5" fill="#ba68c8" transform="rotate(95 12 14)"/>
      <ellipse cx="12" cy="8.5" rx="2" ry="5" fill="#ba68c8" transform="rotate(-95 12 14)"/>
      <ellipse cx="12" cy="8.5" rx="2" ry="5" fill="#ce93d8" transform="rotate(135 12 14)"/>
      <ellipse cx="12" cy="8.5" rx="2" ry="5" fill="#ce93d8" transform="rotate(-135 12 14)"/>
      <circle cx="12" cy="14" r="4" fill="#e65100"/>
      <circle cx="12" cy="14" r="3" fill="#bf360c"/>
      <ellipse cx="12" cy="12.5" rx="2" ry="1.5" fill="#f4511e"/>
    </g>
  ),

  'Sotol': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <line x1="12" y1="12" x2="12" y2="2" stroke="#66bb6a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="12" y2="22" stroke="#66bb6a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="2" y2="12" stroke="#66bb6a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="22" y2="12" stroke="#66bb6a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="4.9" y2="4.9" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="19.1" y2="4.9" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="4.9" y2="19.1" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="19.1" y2="19.1" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="4" y2="8" stroke="#81c784" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="20" y2="8" stroke="#81c784" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="4" y2="16" stroke="#81c784" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="20" y2="16" stroke="#81c784" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="8" y2="4" stroke="#a5d6a7" strokeWidth="1" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="16" y2="4" stroke="#a5d6a7" strokeWidth="1" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="8" y2="20" stroke="#a5d6a7" strokeWidth="1" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="16" y2="20" stroke="#a5d6a7" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2.5" fill="#33691e"/>
      <circle cx="12" cy="12" r="1.5" fill="#66bb6a"/>
    </g>
  ),

  'Mexican Feathergrass': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <ellipse cx="12" cy="21" rx="4" ry="2" fill="#8d6e63"/>
      <path d="M10 21 Q8 18 6 14 Q5 10 7 7" stroke="#c5e1a5" fill="none" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M11 21 Q10 17 9 13 Q8 9 10 6" stroke="#dce775" fill="none" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M12 21 Q12 17 11 13 Q11 9 12 5" stroke="#c5e1a5" fill="none" strokeWidth="1" strokeLinecap="round"/>
      <path d="M12 21 Q13 17 13 13 Q13 9 12 5" stroke="#dce775" fill="none" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M13 21 Q14 17 15 13 Q16 9 14 6" stroke="#c5e1a5" fill="none" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M14 21 Q16 18 18 14 Q19 10 17 7" stroke="#dce775" fill="none" strokeWidth="0.8" strokeLinecap="round"/>
      <ellipse cx="7" cy="7" rx="1.5" ry="3" fill="#dce775" fillOpacity="0.8" transform="rotate(-20 7 7)"/>
      <ellipse cx="10" cy="6" rx="1.5" ry="3" fill="#c5e1a5" fillOpacity="0.8" transform="rotate(-10 10 6)"/>
      <ellipse cx="12" cy="5" rx="1.5" ry="3" fill="#dce775" fillOpacity="0.8"/>
      <ellipse cx="14" cy="6" rx="1.5" ry="3" fill="#c5e1a5" fillOpacity="0.8" transform="rotate(10 14 6)"/>
      <ellipse cx="17" cy="7" rx="1.5" ry="3" fill="#dce775" fillOpacity="0.8" transform="rotate(20 17 7)"/>
    </g>
  ),

  'Broccoli': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.2" y="15" width="1.6" height="7" rx="0.8" fill="#33691e"/>
      <line x1="12" y1="17" x2="8.5" y2="14" stroke="#33691e" strokeWidth="1.2"/>
      <line x1="12" y1="17" x2="15.5" y2="14" stroke="#33691e" strokeWidth="1.2"/>
      <circle cx="12" cy="11" r="4.5" fill="#2e7d32"/>
      <circle cx="9"  cy="12" r="3"   fill="#388e3c"/>
      <circle cx="15" cy="12" r="3"   fill="#388e3c"/>
      <circle cx="12" cy="8.5" r="3"  fill="#43a047"/>
      <circle cx="9.5" cy="10" r="2"  fill="#4caf50"/>
      <circle cx="14.5" cy="10" r="2" fill="#4caf50"/>
      <circle cx="12" cy="7"   r="1.8" fill="#66bb6a"/>
    </g>
  ),

  'Cauliflower': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.2" y="15" width="1.6" height="7" rx="0.8" fill="#33691e"/>
      <line x1="12" y1="17" x2="8.5" y2="14" stroke="#33691e" strokeWidth="1.2"/>
      <line x1="12" y1="17" x2="15.5" y2="14" stroke="#33691e" strokeWidth="1.2"/>
      <path d="M7 14 Q6 10 9 8 Q10 12 12 11 Q14 12 15 8 Q18 10 17 14 Z" fill="#558b2f"/>
      <circle cx="12" cy="11" r="4.2" fill="#f5f0e8"/>
      <circle cx="9.5" cy="12" r="2.8" fill="#fafaf5"/>
      <circle cx="14.5" cy="12" r="2.8" fill="#fafaf5"/>
      <circle cx="12" cy="8.8" r="2.8" fill="#fafaf5"/>
      <circle cx="10" cy="10.5" r="1.8" fill="#fffff0"/>
      <circle cx="14" cy="10.5" r="1.8" fill="#fffff0"/>
      <circle cx="12" cy="9"   r="1.8" fill="#fffff0"/>
    </g>
  ),

  'Chiltepín': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.2" y="17" width="1.6" height="6" rx="0.8" fill="#558b2f"/>
      <line x1="12" y1="18" x2="8" y2="14" stroke="#558b2f" strokeWidth="1.2"/>
      <line x1="12" y1="18" x2="16" y2="14" stroke="#558b2f" strokeWidth="1.2"/>
      <line x1="8" y1="14" x2="6" y2="11" stroke="#4caf50" strokeWidth="1"/>
      <line x1="8" y1="14" x2="10" y2="10" stroke="#4caf50" strokeWidth="1"/>
      <line x1="16" y1="14" x2="14" y2="10" stroke="#4caf50" strokeWidth="1"/>
      <line x1="16" y1="14" x2="18" y2="11" stroke="#4caf50" strokeWidth="1"/>
      <ellipse cx="7" cy="12" rx="2.5" ry="1.5" fill="#66bb6a" transform="rotate(-35 7 12)"/>
      <ellipse cx="9.5" cy="11" rx="2.5" ry="1.5" fill="#4caf50" transform="rotate(10 9.5 11)"/>
      <ellipse cx="14.5" cy="11" rx="2.5" ry="1.5" fill="#66bb6a" transform="rotate(-10 14.5 11)"/>
      <ellipse cx="17" cy="12" rx="2.5" ry="1.5" fill="#4caf50" transform="rotate(35 17 12)"/>
      <circle cx="6" cy="10" r="1.5" fill="#c62828"/>
      <circle cx="10" cy="8.5" r="1.5" fill="#e53935"/>
      <circle cx="12" cy="7" r="1.5" fill="#c62828"/>
      <circle cx="14" cy="8.5" r="1.5" fill="#e53935"/>
      <circle cx="18" cy="10" r="1.5" fill="#c62828"/>
      <line x1="6" y1="8.5" x2="6" y2="7" stroke="#33691e" strokeWidth="0.6"/>
      <line x1="10" y1="7" x2="10" y2="5.5" stroke="#33691e" strokeWidth="0.6"/>
      <line x1="12" y1="5.5" x2="12" y2="4" stroke="#33691e" strokeWidth="0.6"/>
      <line x1="14" y1="7" x2="14" y2="5.5" stroke="#33691e" strokeWidth="0.6"/>
      <line x1="18" y1="8.5" x2="18" y2="7" stroke="#33691e" strokeWidth="0.6"/>
    </g>
  ),

  // ── Zone-expansion catalog ────────────────────────────────────────────────

  'Rhubarb': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="7.5" y="10" width="2" height="12" rx="1" fill="#c62828" transform="rotate(8 8.5 16)"/>
      <rect x="14.5" y="10" width="2" height="12" rx="1" fill="#c62828" transform="rotate(-8 15.5 16)"/>
      <rect x="11" y="9" width="2" height="13" rx="1" fill="#e53935"/>
      <ellipse cx="7" cy="7.5" rx="4" ry="3" fill="#388e3c"/>
      <ellipse cx="17" cy="7.5" rx="4" ry="3" fill="#388e3c"/>
      <ellipse cx="12" cy="6" rx="4.5" ry="3.2" fill="#4caf50"/>
      <ellipse cx="12" cy="7.5" rx="2.8" ry="1.8" fill="#66bb6a"/>
    </g>
  ),

  'Asparagus': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M8.6 22 L8.2 9 Q9.2 6 10.2 9 L9.8 22 Z" fill="#7cb342"/>
      <path d="M12.4 22 L11.8 6 Q12.9 2.5 14 6 L13.6 22 Z" fill="#558b2f"/>
      <path d="M16.2 22 L15.8 10 Q16.8 7 17.8 10 L17.2 22 Z" fill="#7cb342"/>
      <path d="M8.2 11 L7.4 12.5 M10.2 11 L11 12.5" stroke="#33691e" strokeWidth="0.7"/>
      <path d="M12 8.5 L11 10 M13.8 8.5 L14.8 10" stroke="#33691e" strokeWidth="0.7"/>
      <path d="M12.3 5 Q12.9 3.5 13.5 5 L12.9 6.5 Z" fill="#33691e"/>
    </g>
  ),

  'Horseradish': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M10 10 Q12 9 14 10 L12.8 21 Q12 22.5 11.2 21 Z" fill="#f0e8d5"/>
      <path d="M10.8 13 Q12 12.6 13.2 13 M11 16 Q12 15.6 13 16" stroke="#cbbba0" strokeWidth="0.6" fill="none"/>
      <ellipse cx="8" cy="6.5" rx="2" ry="4.5" fill="#43a047" transform="rotate(-18 8 6.5)"/>
      <ellipse cx="16" cy="6.5" rx="2" ry="4.5" fill="#43a047" transform="rotate(18 16 6.5)"/>
      <ellipse cx="12" cy="5.5" rx="2" ry="5" fill="#66bb6a"/>
    </g>
  ),

  'Potato': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <ellipse cx="12" cy="14.5" rx="8" ry="6" fill="#a1887f" transform="rotate(-12 12 14.5)"/>
      <ellipse cx="9.5" cy="12.5" rx="3" ry="2" fill="#bcaaa4" fillOpacity="0.6"/>
      <circle cx="9" cy="16" r="0.7" fill="#6d4c41"/>
      <circle cx="13" cy="12" r="0.7" fill="#6d4c41"/>
      <circle cx="15.5" cy="16.5" r="0.7" fill="#6d4c41"/>
      <circle cx="12" cy="18" r="0.7" fill="#6d4c41"/>
      <path d="M16.5 9.5 Q17.5 6.5 16 4.5" stroke="#7cb342" strokeWidth="1.2" fill="none"/>
      <ellipse cx="16.2" cy="4.5" rx="1.4" ry="0.9" fill="#8bc34a" transform="rotate(-30 16.2 4.5)"/>
    </g>
  ),

  'Beet': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M10 8.5 Q9 4.5 8 2.5 M12 8.5 Q12 4.5 12 2 M14 8.5 Q15 4.5 16 2.5" stroke="#c2185b" strokeWidth="1.1" fill="none"/>
      <ellipse cx="8" cy="3.5" rx="1.8" ry="2.8" fill="#388e3c" transform="rotate(-15 8 3.5)"/>
      <ellipse cx="12" cy="3" rx="1.8" ry="3" fill="#4caf50"/>
      <ellipse cx="16" cy="3.5" rx="1.8" ry="2.8" fill="#388e3c" transform="rotate(15 16 3.5)"/>
      <circle cx="12" cy="15" r="6.5" fill="#880e4f"/>
      <ellipse cx="9.8" cy="13" rx="2.2" ry="1.5" fill="#ad1457" fillOpacity="0.7"/>
      <path d="M12 21.5 L11.7 23.5" stroke="#880e4f" strokeWidth="1"/>
    </g>
  ),

  'Turnip': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M10 9 Q9.5 5.5 9 3.5 M12 9 Q12 5 12 3 M14 9 Q14.5 5.5 15 3.5" stroke="#7cb342" strokeWidth="1.1" fill="none"/>
      <ellipse cx="9" cy="4" rx="1.7" ry="2.6" fill="#43a047" transform="rotate(-12 9 4)"/>
      <ellipse cx="15" cy="4" rx="1.7" ry="2.6" fill="#43a047" transform="rotate(12 15 4)"/>
      <ellipse cx="12" cy="3.8" rx="1.7" ry="2.8" fill="#66bb6a"/>
      <circle cx="12" cy="15" r="6.5" fill="#f7f3ea"/>
      <path d="M5.8 13.2 Q8 9.4 12 9.2 Q16 9.4 18.2 13.2 Q15.5 11 12 11 Q8.5 11 5.8 13.2 Z" fill="#8e24aa"/>
      <path d="M12 21.5 L11.7 23.5" stroke="#d7ccc8" strokeWidth="1"/>
    </g>
  ),

  'Cabbage': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <ellipse cx="5.5" cy="14" rx="3.5" ry="5.5" fill="#8bc34a" transform="rotate(-25 5.5 14)"/>
      <ellipse cx="18.5" cy="14" rx="3.5" ry="5.5" fill="#8bc34a" transform="rotate(25 18.5 14)"/>
      <circle cx="12" cy="14" r="7.5" fill="#7cb342"/>
      <circle cx="12" cy="14" r="5" fill="#aed581"/>
      <circle cx="12" cy="14.5" r="2.8" fill="#c5e1a5"/>
      <path d="M6 11 Q9 7.5 12 7 M18 11 Q15 7.5 12 7" stroke="#558b2f" strokeWidth="0.7" fill="none"/>
    </g>
  ),

  'Brussels Sprouts': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11" y="4" width="2" height="18" rx="1" fill="#558b2f"/>
      <ellipse cx="9" cy="4.5" rx="2.8" ry="1.7" fill="#43a047" transform="rotate(-20 9 4.5)"/>
      <ellipse cx="15" cy="4.5" rx="2.8" ry="1.7" fill="#43a047" transform="rotate(20 15 4.5)"/>
      <circle cx="9" cy="9" r="2.1" fill="#7cb342"/>
      <circle cx="15" cy="11" r="2.1" fill="#7cb342"/>
      <circle cx="9" cy="14" r="2.1" fill="#7cb342"/>
      <circle cx="15" cy="16.5" r="2.1" fill="#7cb342"/>
      <circle cx="9" cy="19" r="2.1" fill="#7cb342"/>
      <circle cx="8.4" cy="8.4" r="0.8" fill="#aed581"/>
      <circle cx="14.4" cy="10.4" r="0.8" fill="#aed581"/>
      <circle cx="8.4" cy="13.4" r="0.8" fill="#aed581"/>
      <circle cx="14.4" cy="15.9" r="0.8" fill="#aed581"/>
      <circle cx="8.4" cy="18.4" r="0.8" fill="#aed581"/>
    </g>
  ),

  'Arugula': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M11.2 22 Q9.5 14 7.5 9.5 Q7 6.5 8.5 6 Q10 7 10.5 10 Q11.5 15 12 22 Z" fill="#388e3c"/>
      <path d="M12.8 22 Q13.8 14 15.8 9.5 Q16.3 6.5 17.3 7 Q17.8 8.5 16.5 11 Q14.8 15.5 13.8 22 Z" fill="#4caf50"/>
      <path d="M11.5 22 Q11.5 13 11.8 7 Q12 4 13 4.5 Q13.5 6 13.2 9 Q12.8 15 12.5 22 Z" fill="#66bb6a"/>
      <circle cx="7.8" cy="8" r="1" fill="#388e3c"/>
      <circle cx="16.8" cy="8.5" r="1" fill="#4caf50"/>
      <circle cx="12.5" cy="5.5" r="1" fill="#66bb6a"/>
    </g>
  ),

  'Bok Choy': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M8.8 22 Q7.8 15 8.3 11 L10.3 11 Q10.4 16 10.8 22 Z" fill="#f1f8e9"/>
      <path d="M13.2 22 Q13.6 16 13.7 11 L15.7 11 Q16.2 15 15.2 22 Z" fill="#f1f8e9"/>
      <path d="M11 22 Q11 15 11.2 10 L12.8 10 Q13 15 13 22 Z" fill="#fffde7"/>
      <ellipse cx="8" cy="7" rx="2.8" ry="4.5" fill="#2e7d32" transform="rotate(-15 8 7)"/>
      <ellipse cx="16" cy="7" rx="2.8" ry="4.5" fill="#2e7d32" transform="rotate(15 16 7)"/>
      <ellipse cx="12" cy="6" rx="3" ry="5" fill="#388e3c"/>
      <line x1="12" y1="3" x2="12" y2="9" stroke="#1b5e20" strokeWidth="0.6"/>
    </g>
  ),

  'Raspberry': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.4" y="3" width="1.2" height="4" rx="0.6" fill="#558b2f"/>
      <path d="M8.5 8 L12 6 L15.5 8 L12 9.5 Z" fill="#43a047"/>
      <circle cx="10" cy="11.5" r="2" fill="#c2185b"/>
      <circle cx="14" cy="11.5" r="2" fill="#c2185b"/>
      <circle cx="8.6" cy="14.8" r="2" fill="#ad1457"/>
      <circle cx="12" cy="14.8" r="2" fill="#c2185b"/>
      <circle cx="15.4" cy="14.8" r="2" fill="#ad1457"/>
      <circle cx="10.3" cy="18" r="2" fill="#c2185b"/>
      <circle cx="13.7" cy="18" r="2" fill="#ad1457"/>
      <circle cx="12" cy="20.7" r="1.9" fill="#c2185b"/>
      <circle cx="9.5" cy="11" r="0.6" fill="#f06292"/>
      <circle cx="11.5" cy="14.2" r="0.6" fill="#f06292"/>
    </g>
  ),

  'Blueberry': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M12 4 Q10 6 11.5 9" stroke="#558b2f" strokeWidth="1" fill="none"/>
      <ellipse cx="15.5" cy="5.5" rx="2.6" ry="1.5" fill="#66bb6a" transform="rotate(25 15.5 5.5)"/>
      <circle cx="12.5" cy="11.5" r="3.4" fill="#3f51b5"/>
      <circle cx="8.5" cy="16.5" r="3.4" fill="#3949ab"/>
      <circle cx="15.5" cy="17" r="3.1" fill="#5c6bc0"/>
      <path d="M11.5 9.3 L13.5 9.3 L12.5 10.5 Z" fill="#1a237e"/>
      <path d="M7.5 14.3 L9.5 14.3 L8.5 15.5 Z" fill="#1a237e"/>
      <circle cx="11" cy="10.5" r="0.8" fill="#9fa8da"/>
      <circle cx="7" cy="15.5" r="0.8" fill="#9fa8da"/>
    </g>
  ),

  'Currant': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M8 4 Q12 5 13.2 9.5" stroke="#558b2f" strokeWidth="1" fill="none"/>
      <ellipse cx="7.5" cy="5.5" rx="3" ry="2.2" fill="#4caf50" transform="rotate(-20 7.5 5.5)"/>
      <ellipse cx="10" cy="3.5" rx="2.4" ry="1.7" fill="#66bb6a" transform="rotate(15 10 3.5)"/>
      <path d="M13.2 9.5 Q13.8 15 14.8 20.5" stroke="#7cb342" strokeWidth="0.8" fill="none"/>
      <circle cx="13.4" cy="11.5" r="1.9" fill="#e53935"/>
      <circle cx="14" cy="15" r="1.9" fill="#c62828"/>
      <circle cx="14.6" cy="18.5" r="1.9" fill="#e53935"/>
      <circle cx="15" cy="21.5" r="1.7" fill="#c62828"/>
      <circle cx="12.9" cy="11" r="0.6" fill="#ef9a9a"/>
      <circle cx="13.5" cy="14.5" r="0.6" fill="#ef9a9a"/>
    </g>
  ),

  'Gooseberry': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.4" y="2.5" width="1.2" height="5.5" rx="0.6" fill="#795548"/>
      <ellipse cx="15.5" cy="4.5" rx="2.6" ry="1.6" fill="#66bb6a" transform="rotate(20 15.5 4.5)"/>
      <ellipse cx="12" cy="14.5" rx="6" ry="7" fill="#aed581"/>
      <path d="M9.5 8.4 Q9 14.5 9.5 20.6 M12 8 Q11.8 14.5 12 21.5 M14.5 8.4 Q15 14.5 14.5 20.6" stroke="#7cb342" strokeWidth="0.7" fill="none"/>
      <path d="M12 21.5 L12 23" stroke="#8d6e63" strokeWidth="0.9"/>
      <ellipse cx="9.8" cy="11" rx="1.7" ry="2.4" fill="#dcedc8" fillOpacity="0.7"/>
    </g>
  ),

  'Sorrel': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M8 22 Q6.5 14 6.5 9 Q6.5 6 8.5 6 Q10 7 9.8 11 Q9.5 16 9.5 22 Z" fill="#7cb342"/>
      <path d="M14.5 22 Q14.5 16 14.2 11 Q14 7 15.5 6 Q17.5 6 17.5 9 Q17.5 14 16 22 Z" fill="#7cb342"/>
      <path d="M11 22 Q10.8 14 11 8 Q11.2 4.5 12 4.5 Q12.8 4.5 13 8 Q13.2 14 13 22 Z" fill="#9ccc65"/>
      <line x1="12" y1="6" x2="12" y2="20" stroke="#558b2f" strokeWidth="0.5"/>
      <line x1="8" y1="8" x2="9.2" y2="19" stroke="#558b2f" strokeWidth="0.5"/>
      <line x1="16" y1="8" x2="14.8" y2="19" stroke="#558b2f" strokeWidth="0.5"/>
    </g>
  ),

  'Lovage': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="8.8" y="12" width="1.7" height="10" rx="0.85" fill="#8bc34a"/>
      <rect x="13.5" y="12" width="1.7" height="10" rx="0.85" fill="#7cb342"/>
      <rect x="11.1" y="10" width="1.8" height="12" rx="0.9" fill="#9ccc65"/>
      <circle cx="8" cy="9.5" r="2.2" fill="#388e3c"/>
      <circle cx="11" cy="8" r="2.2" fill="#43a047"/>
      <circle cx="9.5" cy="11" r="2" fill="#4caf50"/>
      <circle cx="14" cy="9" r="2.2" fill="#388e3c"/>
      <circle cx="16.2" cy="10.8" r="2" fill="#43a047"/>
      <circle cx="12.5" cy="6" r="2" fill="#66bb6a"/>
    </g>
  ),

  'Tarragon': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M12 22 Q10.5 13 8.5 5" stroke="#558b2f" strokeWidth="1" fill="none"/>
      <path d="M12 22 Q12 12 12 4" stroke="#33691e" strokeWidth="1" fill="none"/>
      <path d="M12 22 Q13.5 13 15.5 5" stroke="#7cb342" strokeWidth="1" fill="none"/>
      <ellipse cx="8.5" cy="7.5" rx="1.8" ry="0.55" fill="#66bb6a" transform="rotate(-55 8.5 7.5)"/>
      <ellipse cx="10" cy="11" rx="1.8" ry="0.55" fill="#4caf50" transform="rotate(-45 10 11)"/>
      <ellipse cx="12" cy="7" rx="1.8" ry="0.55" fill="#66bb6a" transform="rotate(-85 12 7)"/>
      <ellipse cx="12" cy="12" rx="1.8" ry="0.55" fill="#4caf50" transform="rotate(80 12 12)"/>
      <ellipse cx="15.5" cy="7.5" rx="1.8" ry="0.55" fill="#66bb6a" transform="rotate(55 15.5 7.5)"/>
      <ellipse cx="14" cy="11" rx="1.8" ry="0.55" fill="#4caf50" transform="rotate(45 14 11)"/>
    </g>
  ),

  'Chamomile': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M9 22 Q9 15 9 9 M15.5 22 Q15.5 17 15.5 12.5" stroke="#7cb342" strokeWidth="0.9" fill="none"/>
      <ellipse cx="9" cy="6.5" rx="1.5" ry="0.75" fill="#fafafa" transform="rotate(0 9 6.5)"/>
      <ellipse cx="9" cy="6.5" rx="1.5" ry="0.75" fill="#fafafa" transform="rotate(60 9 6.5)"/>
      <ellipse cx="9" cy="6.5" rx="1.5" ry="0.75" fill="#fafafa" transform="rotate(120 9 6.5)"/>
      <ellipse cx="9" cy="6.5" rx="2.6" ry="1.3" fill="#f5f5f5" transform="rotate(30 9 6.5)"/>
      <ellipse cx="9" cy="6.5" rx="2.6" ry="1.3" fill="#f5f5f5" transform="rotate(90 9 6.5)"/>
      <ellipse cx="9" cy="6.5" rx="2.6" ry="1.3" fill="#f5f5f5" transform="rotate(150 9 6.5)"/>
      <circle cx="9" cy="6.5" r="1.6" fill="#fbc02d"/>
      <ellipse cx="15.5" cy="10.5" rx="2.1" ry="1" fill="#f5f5f5" transform="rotate(30 15.5 10.5)"/>
      <ellipse cx="15.5" cy="10.5" rx="2.1" ry="1" fill="#f5f5f5" transform="rotate(90 15.5 10.5)"/>
      <ellipse cx="15.5" cy="10.5" rx="2.1" ry="1" fill="#f5f5f5" transform="rotate(150 15.5 10.5)"/>
      <circle cx="15.5" cy="10.5" r="1.3" fill="#f9a825"/>
      <ellipse cx="10.5" cy="16" rx="1.6" ry="0.5" fill="#8bc34a" transform="rotate(-40 10.5 16)"/>
      <ellipse cx="14" cy="18" rx="1.6" ry="0.5" fill="#8bc34a" transform="rotate(40 14 18)"/>
    </g>
  ),

  'Bee Balm': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.4" y="11" width="1.2" height="11" rx="0.6" fill="#558b2f"/>
      <ellipse cx="9.5" cy="16" rx="2.2" ry="0.9" fill="#43a047" transform="rotate(-35 9.5 16)"/>
      <ellipse cx="14.5" cy="18" rx="2.2" ry="0.9" fill="#43a047" transform="rotate(35 14.5 18)"/>
      <line x1="12" y1="9" x2="12" y2="3" stroke="#e53935" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="12" y1="9" x2="7.5" y2="4.5" stroke="#e53935" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="12" y1="9" x2="16.5" y2="4.5" stroke="#e53935" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="12" y1="9" x2="5.5" y2="8.5" stroke="#d32f2f" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="12" y1="9" x2="18.5" y2="8.5" stroke="#d32f2f" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="12" y1="9" x2="7" y2="12" stroke="#d32f2f" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="12" y1="9" x2="17" y2="12" stroke="#d32f2f" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="12" cy="9" r="1.6" fill="#ad1457"/>
    </g>
  ),

  'Black-Eyed Susan': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.4" y="13" width="1.2" height="9" rx="0.6" fill="#558b2f"/>
      <ellipse cx="14" cy="18.5" rx="2.2" ry="0.9" fill="#43a047" transform="rotate(35 14 18.5)"/>
      <ellipse cx="12" cy="9.5" rx="1.8" ry="5" fill="#fbc02d"/>
      <ellipse cx="12" cy="9.5" rx="1.8" ry="5" fill="#f9a825" transform="rotate(45 12 9.5)"/>
      <ellipse cx="12" cy="9.5" rx="1.8" ry="5" fill="#fbc02d" transform="rotate(90 12 9.5)"/>
      <ellipse cx="12" cy="9.5" rx="1.8" ry="5" fill="#f9a825" transform="rotate(135 12 9.5)"/>
      <circle cx="12" cy="9.5" r="2.5" fill="#4e342e"/>
      <circle cx="11.3" cy="8.8" r="0.8" fill="#6d4c41"/>
    </g>
  ),

  'Yarrow': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.4" y="10" width="1.2" height="12" rx="0.6" fill="#7cb342"/>
      <path d="M11.8 16 L9 13.5 M11.8 18.5 L9.5 17" stroke="#7cb342" strokeWidth="0.7"/>
      <path d="M12.2 17 L15 15 M12.2 20 L14.5 18.5" stroke="#7cb342" strokeWidth="0.7"/>
      <path d="M12 10 L7 7 M12 10 L9.5 6 M12 10 L12 5.5 M12 10 L14.5 6 M12 10 L17 7" stroke="#9ccc65" strokeWidth="0.7"/>
      <circle cx="7" cy="6.5" r="1.7" fill="#fafafa"/>
      <circle cx="9.5" cy="5.2" r="1.7" fill="#f5f5f5"/>
      <circle cx="12" cy="4.7" r="1.7" fill="#fafafa"/>
      <circle cx="14.5" cy="5.2" r="1.7" fill="#f5f5f5"/>
      <circle cx="17" cy="6.5" r="1.7" fill="#fafafa"/>
      <circle cx="8.3" cy="6" r="0.4" fill="#fdd835"/>
      <circle cx="12" cy="4.9" r="0.4" fill="#fdd835"/>
      <circle cx="15.7" cy="6" r="0.4" fill="#fdd835"/>
    </g>
  ),

  'Zinnia': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.4" y="14" width="1.2" height="8" rx="0.6" fill="#558b2f"/>
      <ellipse cx="9.8" cy="18.5" rx="2" ry="0.9" fill="#43a047" transform="rotate(-35 9.8 18.5)"/>
      <ellipse cx="12" cy="9" rx="2" ry="6" fill="#e91e63"/>
      <ellipse cx="12" cy="9" rx="2" ry="6" fill="#ec407a" transform="rotate(45 12 9)"/>
      <ellipse cx="12" cy="9" rx="2" ry="6" fill="#e91e63" transform="rotate(90 12 9)"/>
      <ellipse cx="12" cy="9" rx="2" ry="6" fill="#ec407a" transform="rotate(135 12 9)"/>
      <ellipse cx="12" cy="9" rx="1.5" ry="3.8" fill="#f48fb1"/>
      <ellipse cx="12" cy="9" rx="1.5" ry="3.8" fill="#f8bbd0" transform="rotate(60 12 9)"/>
      <ellipse cx="12" cy="9" rx="1.5" ry="3.8" fill="#f48fb1" transform="rotate(120 12 9)"/>
      <circle cx="12" cy="9" r="1.7" fill="#fdd835"/>
    </g>
  ),

  'Okra': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M9.8 21 Q8.8 20.2 9.4 18 L12.4 5.5 Q12.9 3.8 14 4.2 Q15.1 4.6 14.8 6.3 L11.9 19.3 Q11.3 21.6 9.8 21 Z" fill="#7cb342"/>
      <path d="M10.8 17.5 L13.3 6.5" stroke="#558b2f" strokeWidth="0.6" fill="none"/>
      <path d="M11.8 18.5 L14.1 7.5" stroke="#558b2f" strokeWidth="0.6" fill="none"/>
      <path d="M12.7 4.4 L14.9 5.2 L14.4 2.6 Z" fill="#33691e"/>
      <path d="M9.6 20.6 L9 22.5" stroke="#558b2f" strokeWidth="0.8"/>
    </g>
  ),

  'Sweet Potato': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <ellipse cx="12" cy="16" rx="8" ry="4.3" fill="#d84315" transform="rotate(-16 12 16)"/>
      <ellipse cx="9.8" cy="15" rx="3" ry="1.7" fill="#ff8a65" fillOpacity="0.55" transform="rotate(-16 9.8 15)"/>
      <path d="M7 14.5 Q9 15.5 11 15 M12 18 Q14 18.5 16 17.5" stroke="#bf360c" strokeWidth="0.6" fill="none"/>
      <path d="M15.3 13.3 Q14.6 8.5 16.5 5.5" stroke="#7cb342" strokeWidth="1" fill="none"/>
      <path d="M16.5 5.5 Q14.8 5 14.6 6.8 Q16 8.2 16.5 7 Q18 8 18.3 6.4 Q17.8 5 16.5 5.5 Z" fill="#66bb6a"/>
    </g>
  ),

  'Ginger': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M10.5 13.5 Q9.5 8.5 8 5 M13 13 Q13.3 8 14.5 4.5" stroke="#7cb342" strokeWidth="1.1" fill="none"/>
      <ellipse cx="7.8" cy="5.2" rx="2" ry="0.7" fill="#8bc34a" transform="rotate(-55 7.8 5.2)"/>
      <ellipse cx="14.7" cy="4.7" rx="2" ry="0.7" fill="#9ccc65" transform="rotate(60 14.7 4.7)"/>
      <ellipse cx="11.5" cy="14.5" rx="4.4" ry="3.1" fill="#debb8a"/>
      <ellipse cx="8" cy="17.5" rx="3.4" ry="2.7" fill="#cfa871"/>
      <ellipse cx="15.5" cy="17.5" rx="3.8" ry="2.9" fill="#d2a679"/>
      <ellipse cx="18" cy="13.5" rx="2.4" ry="2" fill="#debb8a"/>
      <path d="M9 14 Q11.5 13.2 14 14.3 M6 17 Q8 16.3 10 17.3 M13.5 17 Q15.5 16.3 17.5 17.3" stroke="#b08d57" strokeWidth="0.6" fill="none"/>
      <circle cx="12" cy="16.5" r="0.7" fill="#b08d57"/>
    </g>
  ),

  'Lemongrass': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M12 22 Q11 14 6 6" stroke="#9ccc65" strokeWidth="1.2" fill="none"/>
      <path d="M12 22 Q11.5 12 9.5 4" stroke="#c0ca33" strokeWidth="1.2" fill="none"/>
      <path d="M12 22 Q12 12 12 3" stroke="#7cb342" strokeWidth="1.2" fill="none"/>
      <path d="M12 22 Q12.5 12 14.5 4" stroke="#c0ca33" strokeWidth="1.2" fill="none"/>
      <path d="M12 22 Q13 14 18 6" stroke="#9ccc65" strokeWidth="1.2" fill="none"/>
      <path d="M10 22 L14 22 L13.3 17.5 Q12 16.5 10.7 17.5 Z" fill="#e6ee9c"/>
      <path d="M10.7 19 L13.3 19" stroke="#c0ca33" strokeWidth="0.6"/>
    </g>
  ),

  'Artichoke': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.3" y="18" width="1.4" height="5" rx="0.7" fill="#558b2f"/>
      <ellipse cx="12" cy="12.5" rx="6.5" ry="7" fill="#558b2f"/>
      <ellipse cx="8.5" cy="15" rx="2.4" ry="3.6" fill="#689f38" transform="rotate(25 8.5 15)"/>
      <ellipse cx="15.5" cy="15" rx="2.4" ry="3.6" fill="#689f38" transform="rotate(-25 15.5 15)"/>
      <ellipse cx="9.5" cy="10.5" rx="2.2" ry="3.4" fill="#7cb342" transform="rotate(18 9.5 10.5)"/>
      <ellipse cx="14.5" cy="10.5" rx="2.2" ry="3.4" fill="#7cb342" transform="rotate(-18 14.5 10.5)"/>
      <ellipse cx="12" cy="12.5" rx="2.2" ry="3.6" fill="#8bc34a"/>
      <path d="M12 6.5 L11 4.5 M12 6.5 L12 4 M12 6.5 L13 4.5" stroke="#aed581" strokeWidth="0.9" strokeLinecap="round"/>
    </g>
  ),

  'Fig': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.3" y="2.5" width="1.4" height="3.5" rx="0.7" fill="#33691e"/>
      <ellipse cx="16" cy="5" rx="2.6" ry="1.6" fill="#66bb6a" transform="rotate(20 16 5)"/>
      <path d="M12 5 Q12 9 8.5 11.5 Q6 14 7.2 17.5 Q8.8 22 12 22 Q15.2 22 16.8 17.5 Q18 14 15.5 11.5 Q12 9 12 5 Z" fill="#6a1b9a"/>
      <ellipse cx="9.8" cy="16" rx="2" ry="3" fill="#9c4dcc" fillOpacity="0.5"/>
      <circle cx="12" cy="20" r="0.9" fill="#4a148c"/>
    </g>
  ),

  'Pomegranate': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <circle cx="12" cy="14" r="7.5" fill="#c62828"/>
      <ellipse cx="9.5" cy="11.5" rx="2.6" ry="1.9" fill="#ef5350" fillOpacity="0.55"/>
      <path d="M9.5 7 L10 4.2 L11.4 6.3 L12 3.7 L12.6 6.3 L14 4.2 L14.5 7 Q12 8.3 9.5 7 Z" fill="#8e0000"/>
      <circle cx="14.5" cy="16.5" r="0.7" fill="#8e0000"/>
      <circle cx="12.5" cy="18" r="0.7" fill="#8e0000"/>
    </g>
  ),

  'Meyer Lemon': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M12 9.5 Q11.7 7 11.5 5.2" stroke="#558b2f" strokeWidth="1" fill="none"/>
      <path d="M10 6 Q12 4 14.5 5.5" stroke="#558b2f" strokeWidth="1" fill="none"/>
      <ellipse cx="9" cy="5.5" rx="2.7" ry="1.6" fill="#43a047" transform="rotate(-25 9 5.5)"/>
      <ellipse cx="14" cy="4.5" rx="2.4" ry="1.4" fill="#66bb6a" transform="rotate(15 14 4.5)"/>
      <ellipse cx="12" cy="14.5" rx="7" ry="5.6" fill="#fdd835" transform="rotate(-14 12 14.5)"/>
      <ellipse cx="17.8" cy="11.7" rx="1.2" ry="0.9" fill="#f9a825" transform="rotate(-14 17.8 11.7)"/>
      <ellipse cx="9.5" cy="12.5" rx="2.6" ry="1.8" fill="#fff59d" fillOpacity="0.7" transform="rotate(-14 9.5 12.5)"/>
    </g>
  ),

  'Banana': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="5.8" y="6" width="2.2" height="2.6" rx="0.9" fill="#8d6e63" transform="rotate(-25 6.9 7.3)"/>
      <path d="M6 8.5 Q7 16.5 13.5 19.3 Q17.8 20.8 18.9 17.8 Q18.4 17.3 16.8 17.3 Q10.8 16.6 8.2 10.3 Q7.6 8.9 7.4 7.9 Q6.4 7.6 6 8.5 Z" fill="#fdd835"/>
      <path d="M7.5 10.5 Q9.5 15.8 14.5 17.8" stroke="#fbc02d" strokeWidth="1.1" fill="none"/>
      <path d="M8.3 9 Q10.5 14.5 15.5 16.7" stroke="#fff59d" strokeWidth="0.8" fill="none"/>
      <circle cx="18.1" cy="18.3" r="1" fill="#795548"/>
    </g>
  ),

  'Pineapple': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M12 9 L9.2 2.5 L11.4 5.5 L12 1.5 L12.6 5.5 L14.8 2.5 L12 9 Z" fill="#558b2f"/>
      <path d="M12 9 L6.8 4.5 L10.5 8 M12 9 L17.2 4.5 L13.5 8" fill="#7cb342" stroke="#7cb342" strokeWidth="0.8"/>
      <ellipse cx="12" cy="16" rx="5.6" ry="7" fill="#f9a825"/>
      <path d="M7 13 L17 19 M7 16 L16.5 21.5 M7.5 19 L14 22.5 M17 13 L7 19 M17 16 L7.5 21.5 M16.5 19 L10 22.5 M9 10.5 L17 15" stroke="#ef8f00" strokeWidth="0.65" fill="none"/>
    </g>
  ),

  'Hibiscus': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <ellipse cx="12" cy="7" rx="3.2" ry="4.6" fill="#ec407a"/>
      <ellipse cx="7.3" cy="10.5" rx="3.2" ry="4.6" fill="#f06292" transform="rotate(-72 7.3 10.5)"/>
      <ellipse cx="16.7" cy="10.5" rx="3.2" ry="4.6" fill="#f06292" transform="rotate(72 16.7 10.5)"/>
      <ellipse cx="9.1" cy="16" rx="3.2" ry="4.6" fill="#ec407a" transform="rotate(-144 9.1 16)"/>
      <ellipse cx="14.9" cy="16" rx="3.2" ry="4.6" fill="#ec407a" transform="rotate(144 14.9 16)"/>
      <circle cx="12" cy="12" r="2" fill="#ad1457"/>
      <line x1="12" y1="12" x2="16.5" y2="6.5" stroke="#c2185b" strokeWidth="1"/>
      <circle cx="16.2" cy="6.8" r="0.7" fill="#fdd835"/>
      <circle cx="15.2" cy="7.9" r="0.55" fill="#fdd835"/>
      <circle cx="17" cy="5.8" r="0.55" fill="#fdd835"/>
    </g>
  ),

  // ── Originals that never got sprites ──────────────────────────────────────

  'Chives': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M9 22 Q8.5 13 8 6 M11.5 22 Q11.5 12 11.5 4.5 M14 22 Q14.5 13 15.5 7 M16.5 22 Q17.5 15 18.5 10" stroke="#7cb342" strokeWidth="1.1" fill="none"/>
      <circle cx="11.5" cy="3.5" r="2.1" fill="#ba68c8"/>
      <circle cx="10.6" cy="2.9" r="0.6" fill="#e1bee7"/>
      <circle cx="12.4" cy="3" r="0.5" fill="#ce93d8"/>
      <circle cx="11.3" cy="4.3" r="0.5" fill="#ce93d8"/>
    </g>
  ),

  'Cilantro': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M12 22 Q11 15 8.5 10 M12 22 Q12 14 12 8 M12 22 Q13 15 15.5 10" stroke="#7cb342" strokeWidth="0.9" fill="none"/>
      <circle cx="8" cy="8.5" r="1.7" fill="#4caf50"/>
      <circle cx="6.5" cy="10" r="1.4" fill="#66bb6a"/>
      <circle cx="9.7" cy="9.7" r="1.4" fill="#66bb6a"/>
      <circle cx="12" cy="6.5" r="1.7" fill="#43a047"/>
      <circle cx="10.5" cy="7.8" r="1.4" fill="#66bb6a"/>
      <circle cx="13.5" cy="7.8" r="1.4" fill="#66bb6a"/>
      <circle cx="16" cy="8.5" r="1.7" fill="#4caf50"/>
      <circle cx="17.5" cy="10" r="1.4" fill="#66bb6a"/>
      <circle cx="14.3" cy="9.7" r="1.4" fill="#66bb6a"/>
    </g>
  ),

  'Dill': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M12 22 L12 8 M12 14 Q9 12 7 12.5 M12 14 Q15 12 17 12.5 M12 18 Q10 17 8.5 17.5 M12 18 Q14 17 15.5 17.5" stroke="#7cb342" strokeWidth="0.9" fill="none"/>
      <path d="M12 8 L7.5 4.5 M12 8 L10 3.5 M12 8 L12 3 M12 8 L14 3.5 M12 8 L16.5 4.5" stroke="#9ccc65" strokeWidth="0.7" fill="none"/>
      <circle cx="7.5" cy="4.2" r="0.9" fill="#dce775"/>
      <circle cx="10" cy="3.2" r="0.9" fill="#dce775"/>
      <circle cx="12" cy="2.7" r="0.9" fill="#dce775"/>
      <circle cx="14" cy="3.2" r="0.9" fill="#dce775"/>
      <circle cx="16.5" cy="4.2" r="0.9" fill="#dce775"/>
    </g>
  ),

  'Leeks': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M10 22 L10 11 L14 11 L14 22 Z" fill="#f5f0e1"/>
      <path d="M11.3 22 L11.3 11.5 M12.7 22 L12.7 11.5" stroke="#dcd3ba" strokeWidth="0.6"/>
      <path d="M10 11.5 Q7 8 5.5 3.5 Q8 5.5 10.5 9" fill="#7da87b"/>
      <path d="M14 11.5 Q17 8 18.5 3.5 Q16 5.5 13.5 9" fill="#7da87b"/>
      <path d="M10.5 10.5 Q11 6 10.5 2.5 Q12 5.5 12 10 Z" fill="#94b493"/>
      <path d="M13.5 10.5 Q13 6 13.5 2.5 Q12.2 5 12.2 10 Z" fill="#a8c4a5"/>
      <path d="M9.5 21 Q12 21.8 14.5 21 L14 23 L10 23 Z" fill="#e8e0c8"/>
    </g>
  ),

  'Marigold': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <rect x="11.4" y="13" width="1.2" height="9" rx="0.6" fill="#558b2f"/>
      <ellipse cx="9.7" cy="18" rx="2" ry="0.8" fill="#43a047" transform="rotate(-40 9.7 18)"/>
      <ellipse cx="14.3" cy="19.5" rx="2" ry="0.8" fill="#43a047" transform="rotate(40 14.3 19.5)"/>
      <circle cx="12" cy="8.5" r="5.4" fill="#ef6c00"/>
      <circle cx="9.6" cy="6.8" r="1.9" fill="#f57c00"/>
      <circle cx="14.4" cy="6.8" r="1.9" fill="#f57c00"/>
      <circle cx="9.6" cy="10.2" r="1.9" fill="#f57c00"/>
      <circle cx="14.4" cy="10.2" r="1.9" fill="#f57c00"/>
      <circle cx="12" cy="8.5" r="2.6" fill="#ffa726"/>
      <circle cx="12" cy="8.5" r="1.2" fill="#ffcc80"/>
    </g>
  ),

  'Melon': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M14 7 Q15.5 4.5 18 4" stroke="#558b2f" strokeWidth="1" fill="none"/>
      <ellipse cx="18.5" cy="4.5" rx="1.9" ry="1.2" fill="#66bb6a" transform="rotate(25 18.5 4.5)"/>
      <circle cx="12" cy="14.5" r="7.5" fill="#c0ca33"/>
      <path d="M6 10.5 Q12 13 18 10.5 M4.8 16 Q12 18 19.2 16 M7 20 Q12 21.5 17 20" stroke="#9e9d24" strokeWidth="0.7" fill="none"/>
      <path d="M8 8.8 Q10 14.5 8.5 20.5 M16 8.8 Q14 14.5 15.5 20.5" stroke="#9e9d24" strokeWidth="0.7" fill="none"/>
      <ellipse cx="9.3" cy="11" rx="2.2" ry="1.6" fill="#dce775" fillOpacity="0.7"/>
    </g>
  ),

  'Nasturtium': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <circle cx="8.5" cy="16" r="4.6" fill="#66bb6a"/>
      <path d="M8.5 16 L8.5 11.4 M8.5 16 L4.5 14 M8.5 16 L6 19.8 M8.5 16 L11 19.8 M8.5 16 L12.5 14" stroke="#a5d6a7" strokeWidth="0.7"/>
      <circle cx="8.5" cy="16" r="1" fill="#c8e6c9"/>
      <circle cx="15.5" cy="8.5" r="2" fill="#e65100"/>
      <ellipse cx="15.5" cy="5.6" rx="2" ry="1.7" fill="#f57c00"/>
      <ellipse cx="12.8" cy="7.5" rx="2" ry="1.7" fill="#ff9800" transform="rotate(-72 12.8 7.5)"/>
      <ellipse cx="13.9" cy="10.6" rx="2" ry="1.7" fill="#f57c00" transform="rotate(-144 13.9 10.6)"/>
      <ellipse cx="17.1" cy="10.6" rx="2" ry="1.7" fill="#ff9800" transform="rotate(144 17.1 10.6)"/>
      <ellipse cx="18.2" cy="7.5" rx="2" ry="1.7" fill="#f57c00" transform="rotate(72 18.2 7.5)"/>
      <circle cx="15.5" cy="8.5" r="1" fill="#ffcc80"/>
      <path d="M15 11.5 Q13 15 10.5 16.5" stroke="#7cb342" strokeWidth="0.9" fill="none"/>
    </g>
  ),

  'Oregano': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M12 22 Q9 16 7 9 M12 22 Q12 15 12 7 M12 22 Q15 16 17 9" stroke="#558b2f" strokeWidth="0.9" fill="none"/>
      <ellipse cx="7" cy="8" rx="1.5" ry="1.1" fill="#66bb6a"/>
      <ellipse cx="8.3" cy="11.5" rx="1.4" ry="1" fill="#4caf50"/>
      <ellipse cx="9.6" cy="15" rx="1.4" ry="1" fill="#66bb6a"/>
      <ellipse cx="12" cy="6" rx="1.5" ry="1.1" fill="#4caf50"/>
      <ellipse cx="12" cy="10" rx="1.4" ry="1" fill="#66bb6a"/>
      <ellipse cx="12" cy="14" rx="1.4" ry="1" fill="#4caf50"/>
      <ellipse cx="17" cy="8" rx="1.5" ry="1.1" fill="#66bb6a"/>
      <ellipse cx="15.7" cy="11.5" rx="1.4" ry="1" fill="#4caf50"/>
      <ellipse cx="14.4" cy="15" rx="1.4" ry="1" fill="#66bb6a"/>
      <circle cx="7" cy="6.3" r="0.6" fill="#f8bbd0"/>
      <circle cx="12" cy="4.4" r="0.6" fill="#f8bbd0"/>
      <circle cx="17" cy="6.3" r="0.6" fill="#f8bbd0"/>
    </g>
  ),

  'Parsley': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M12 22 Q10.5 16 8.5 12 M12 22 Q12 15 12 10 M12 22 Q13.5 16 15.5 12" stroke="#558b2f" strokeWidth="0.9" fill="none"/>
      <circle cx="8" cy="10.5" r="1.6" fill="#2e7d32"/>
      <circle cx="6.6" cy="9.2" r="1.3" fill="#43a047"/>
      <circle cx="9.4" cy="9" r="1.3" fill="#43a047"/>
      <circle cx="8" cy="7.8" r="1.2" fill="#66bb6a"/>
      <circle cx="12" cy="8.5" r="1.6" fill="#2e7d32"/>
      <circle cx="10.6" cy="7.2" r="1.3" fill="#43a047"/>
      <circle cx="13.4" cy="7" r="1.3" fill="#43a047"/>
      <circle cx="12" cy="5.8" r="1.2" fill="#66bb6a"/>
      <circle cx="16" cy="10.5" r="1.6" fill="#2e7d32"/>
      <circle cx="14.6" cy="9.2" r="1.3" fill="#43a047"/>
      <circle cx="17.4" cy="9" r="1.3" fill="#43a047"/>
      <circle cx="16" cy="7.8" r="1.2" fill="#66bb6a"/>
    </g>
  ),

  'Sage': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M12 22 Q11 15 9 8 M12 22 Q13 15 15 8" stroke="#558b2f" strokeWidth="1" fill="none"/>
      <ellipse cx="8.5" cy="7" rx="1.8" ry="3.2" fill="#9caf88" transform="rotate(-18 8.5 7)"/>
      <ellipse cx="15.5" cy="7" rx="1.8" ry="3.2" fill="#9caf88" transform="rotate(18 15.5 7)"/>
      <ellipse cx="10" cy="12" rx="1.7" ry="3" fill="#aebf9a" transform="rotate(-25 10 12)"/>
      <ellipse cx="14" cy="12" rx="1.7" ry="3" fill="#aebf9a" transform="rotate(25 14 12)"/>
      <ellipse cx="12" cy="9" rx="1.6" ry="3" fill="#bccaa8"/>
      <line x1="8.5" y1="4.5" x2="8.5" y2="9.5" stroke="#7a8f68" strokeWidth="0.5"/>
      <line x1="15.5" y1="4.5" x2="15.5" y2="9.5" stroke="#7a8f68" strokeWidth="0.5"/>
    </g>
  ),

  'Swiss Chard': ({ transform }) => (
    <g transform={transform} style={{ pointerEvents: 'none' }}>
      <path d="M8.5 22 L8 12 L10 12 L10.2 22 Z" fill="#e53935"/>
      <path d="M11.2 22 L11 11 L13 11 L12.8 22 Z" fill="#fdd835"/>
      <path d="M14 22 L14 12 L16 12 L15.5 22 Z" fill="#e53935"/>
      <ellipse cx="8" cy="7.5" rx="3" ry="5" fill="#2e7d32" transform="rotate(-15 8 7.5)"/>
      <ellipse cx="16" cy="7.5" rx="3" ry="5" fill="#2e7d32" transform="rotate(15 16 7.5)"/>
      <ellipse cx="12" cy="6.5" rx="3.2" ry="5.5" fill="#388e3c"/>
      <path d="M12 2.5 L12 11 M8 4 L8.5 11 M16 4 L15.5 11" stroke="#1b5e20" strokeWidth="0.6" fill="none"/>
    </g>
  ),
}

// Renders a plant sprite (SVG) if one exists, falls back to the emoji otherwise.
// Works in both SVG and HTML contexts via a wrapper <svg> element.
export function PlantIcon({ name, emoji, size = 20 }) {
  const Sp = SPRITES[name]
  if (Sp) {
    return (
      <svg
        width={size} height={size}
        viewBox="0 0 24 24"
        style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      >
        <Sp transform="" />
      </svg>
    )
  }
  return <span style={{ fontSize: size * 0.8, lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
}

// Sprite component for a plant, or an emoji stand-in drawn in the same 24×24
// space — so a plant without a sprite still shows up on the yard canvas.
export function spriteFor(name, emoji) {
  const Sp = SPRITES[name]
  if (Sp) return Sp
  return function EmojiSprite({ transform }) {
    return (
      <g transform={transform} style={{ pointerEvents: 'none' }}>
        <text x="12" y="13" textAnchor="middle" dominantBaseline="central" fontSize="19" style={{ userSelect: 'none' }}>
          {emoji}
        </text>
      </g>
    )
  }
}
