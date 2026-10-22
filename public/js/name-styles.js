(function () {
  const BOLD = mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵');
  const ITALIC = mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻');
  const MONO = mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿');
  const DOUBLE = mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡');
  const SCRIPT = mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', '𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏');
  const TINY = {
    A:'ᴀ',B:'ʙ',C:'ᴄ',D:'ᴅ',E:'ᴇ',F:'ғ',G:'ɢ',H:'ʜ',I:'ɪ',J:'ᴊ',K:'ᴋ',L:'ʟ',M:'ᴍ',N:'ɴ',O:'ᴏ',P:'ᴘ',Q:'ǫ',R:'ʀ',S:'s',T:'ᴛ',U:'ᴜ',V:'ᴠ',W:'ᴡ',X:'x',Y:'ʏ',Z:'ᴢ',
    a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ғ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'s',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ'
  };

  function mapRange(from, toChars) {
    const out = {};
    const chars = Array.from(toChars);
    from.split('').forEach((ch, i) => { out[ch] = chars[i] || ch; });
    return out;
  }
  function applyMap(str, table) {
    return str.split('').map((c) => table[c] || c).join('');
  }
  function fullwidth(str) {
    return str.split('').map((c) => {
      if (c === ' ') return '　';
      const code = c.charCodeAt(0);
      if (code >= 33 && code <= 126) return String.fromCharCode(code + 0xfee0);
      return c;
    }).join('');
  }
  function circled(str) {
    return str.split('').map((c) => {
      const u = c.toUpperCase();
      if (u >= 'A' && u <= 'Z') return String.fromCodePoint(0x24b6 + (u.charCodeAt(0) - 65));
      return c;
    }).join('');
  }

  window.sabbirNameStyles = function (name) {
    const n = name.trim();
    if (!n) return [];
    return [
      { id: 'plain', label: 'Normal', text: n },
      { id: 'bold', label: 'Bold', text: applyMap(n, BOLD) },
      { id: 'italic', label: 'Italic', text: applyMap(n, ITALIC) },
      { id: 'mono', label: 'Mono', text: applyMap(n, MONO) },
      { id: 'double', label: 'Double', text: applyMap(n, DOUBLE) },
      { id: 'script', label: 'Script', text: applyMap(n, SCRIPT) },
      { id: 'tiny', label: 'Tiny', text: applyMap(n, TINY) },
      { id: 'wide', label: 'Wide', text: fullwidth(n) },
      { id: 'circled', label: 'Circle', text: circled(n) },
      { id: 'upper', label: 'Caps', text: n.toUpperCase() },
      { id: 'star', label: 'Star', text: `✦ ${n} ✦` },
      { id: 'spark', label: 'Spark', text: `✧･ﾟ ${n} ･ﾟ✧` },
      { id: 'crown', label: 'Crown', text: `👑 ${n} 👑` },
      { id: 'game', label: 'Gamer', text: `【 ${n.toUpperCase()} 】` },
      { id: 'wave', label: 'Wave', text: `～☆ ${n} ☆～` },
      { id: 'heart', label: 'Heart', text: `♡ ${n} ♡` },
      { id: 'cloud', label: 'Cloud', text: `☁ ${n} ☁` },
      { id: 'brack', label: 'Bracket', text: `『 ${n} 』` },
      { id: 'dots', label: 'Dots', text: `• ${n} •` },
      { id: 'line', label: 'Line', text: n.split('').map((c) => c + '\u0332').join('') },
    ];
  };

  window.sabbirCopyChip = function (text) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-chip';
    btn.setAttribute('aria-label', 'Copy');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M6 16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span class="copy-chip-label">Copy</span>';
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(text); } catch {}
      btn.classList.add('is-copied');
      const label = btn.querySelector('.copy-chip-label');
      const lang = localStorage.getItem('site-lang') === 'bn' ? 'bn' : 'en';
      if (label) label.textContent = lang === 'bn' ? 'কপি হয়েছে' : 'Copied';
      setTimeout(() => {
        btn.classList.remove('is-copied');
        if (label) label.textContent = lang === 'bn' ? 'কপি' : 'Copy';
      }, 1200);
    });
    return btn;
  };
})();
