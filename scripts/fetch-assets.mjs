// Descarga los recursos originales de la web de Wix para servirlos optimizados desde el propio sitio.
// Uso: npm run fetch:assets  (solo hace falta una vez; los ficheros ya descargados se omiten)
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const IMG = (id, max = 1800) => `https://static.wixstatic.com/media/${id}/v1/fit/w_${max},h_${max},q_90/${id}`;
const RAW = (id) => `https://static.wixstatic.com/media/${id}`;
const POSTER = (id) => `https://static.wixstatic.com/media/${id}f003.jpg/v1/fit/w_1280,h_1280,q_85/${id}f003.jpg`;
const VIDEO = (id, q) => `https://video.wixstatic.com/video/${id}/${q}/mp4/file.mp4`;

const images = {
  brand: {
    'logo-full.png': RAW('c7a391_3c79cb392ae042f0a857f74a51de69bc~mv2.png'),
    'logo-full-alt.png': RAW('c7a391_47d89a2f65144650bb588f7536fd9f5d~mv2.png'),
    'logo-3d-bevel.png': IMG('c7a391_cf26dcba68ab4ac2b77444f0aa8c3318~mv2.png', 1600),
    'isotipo-3d.png': IMG('c7a391_3f125bacbf014d8ea1d51f1260fca727~mv2.png', 1200),
    'isotipo-small.png': IMG('c7a391_aef0488c403f42c6abc63108047098f4~mv2.png', 600),
    'pattern.png': IMG('c7a391_25811bbfd44c46e5a1695c91ac488895~mv2.png', 1920),
    'footer-art.png': IMG('c7a391_7c8122cb0f9249199f2ef13896c19d4e~mv2.png', 1920),
    'landing-art.png': IMG('c7a391_96b7bfa181e74b77a38e1233aea7ac2b~mv2.png', 1600),
    'festivales-3d.png': IMG('c7a391_ffa3e995fce44b7bb6cb973cfcbc5a43~mv2.png', 1600),
  },
  home: Object.fromEntries(
    [
      'c7a391_294fe0828a8d4bc0be8f3e57dc1840fe~mv2.jpeg',
      'c7a391_4009b1c43ca14920bc365c77fd67c26f~mv2.jpeg',
      'c7a391_a67dabfc5fa04cb28e408bc543df452e~mv2.jpg',
      'c7a391_e5f32081317540e293b718d22e2a58dd~mv2.jpg',
      'c7a391_2d29e364025249d3b54b96d35f847801~mv2.jpeg',
      'c7a391_2199a62a05ce4af1921f1ce54d16ecaf~mv2.jpg',
      'c7a391_85c51d37567145189ca039f5d622362c~mv2.jpeg',
      'c7a391_764d910151ad4ef4ad5152f7ec489a51~mv2.jpg',
      'c7a391_f1a1aef8255c47d685103e65c59511e9~mv2.jpg',
    ].map((id, i) => [`home-${String(i + 1).padStart(2, '0')}${path.extname(id)}`, IMG(id)]),
  ),
  presskit: {
    'banner.png': IMG('c7a391_b59a31b1ae07484dac64434950383c91~mv2.png', 1920),
    'crossfader.png': IMG('c7a391_408fe5782ea54108b23c88bd291fb8d1~mv2.png'),
    'photo-2026.png': IMG('c7a391_ff0bb86c118d4b3bb442eb4ac96eadc3~mv2.png'),
    'photo-redes.jpg': IMG('c7a391_4ce1590b0d454907b98bb77ae02b7453~mv2.jpg'),
    'photo-rojo.jpg': IMG('c7a391_207533c20e7341cbaa4310c64e48140f~mv2.jpg'),
    'holi-2023.jpeg': IMG('c7a391_1d75fc4b50844d0e87444952774794dc~mv2.jpeg'),
    'photo-009.jpg': IMG('c7a391_12061bfd9a404dd0bb117b73581fb09e~mv2.jpg'),
    'photo-23.jpg': IMG('c7a391_43c3b0549de14ee18dbe594b50c0d6a6~mv2.jpg'),
    'extra.png': IMG('c7a391_d565eb806bf340a582031f572b831553~mv2.png'),
  },
  flyers: Object.fromEntries(
    [
      '1f933d40f4d047aea74dc48c43f61208', '014b46f669214a51a7dc2fd8800bbbe9', '99a90c6e777648edb4bfaafdc8c13c6f',
      '9f5f75fe4dee4bd9929699215394f177', 'c83979bc7715459383959b28b62510be', 'c676abe91ab248d694277e913eb4eba6',
      'e7dcd667f32d4cfc8d1d736a28ef3bd1', '8baf104282ca4b7db0da1955f90715e3', '396256fe38954ca4aa7e274e904bd2d7',
      '6d6276ba4a6847fa97cdf9d04b4de5e6', '53268933614b4ce8952212982c5175c7', '228ceab9861c4c67bfe9ef0425e74660',
      '7bc5dab868824e62bf9f2f48acd6404a', '54de355212aa4cd48acfbbf1a5607777', 'bb5c1a31c3cc46418c1ee543bb391da0',
      '0864b4f40867477cad3bac34d32e12b4', '2e18f1ee31444f309517214c1e1ac359', 'a786b3e1236d49d88be0dfd97b8c5210',
      'f30ec8a5a4e1499c81f5d5187532dc73', '3011c073c6c14f54b9287a7a7a77ab66', '3da9e458c52a477b82fce07fe69a570e',
      '3e805eeb58ee4afc95888b138643af8c', '14b25cf9cfb14d71926a735b46de0372', '5d316633581040cbaa0751fcd47bcd13',
    ].map((h, i) => [`flyer-${String(i + 1).padStart(2, '0')}.webp`, IMG(`c7a391_${h}~mv2.webp`, 1400)]),
  ),
  music: {
    'afro-bg.jpg': IMG('c7a391_b4fffd2cff564b8f8e3c7951a0aaae93~mv2.jpg'),
    'afro-cover.png': IMG('c7a391_356f84c9a3db4331bdfaab73e97fbeba~mv2.png', 1200),
    'techbass-deco.png': IMG('c7a391_cd10a2cad52a497291a6f755acea777f~mv2.png', 1600),
    'techbass-cover.png': IMG('c7a391_f257793dc793401b8e74eb74c3b4c19b~mv2.png', 1200),
    'zoewie-cover.png': IMG('c7a391_a45a97a4a39049379f501a4e49e3a67c~mv2.png', 1200),
    'zoewie-flare.png': IMG('c7a391_2711a535e77f4fdaac2391eb66f70bcf~mv2.png', 1600),
    'playlist-ene2022.png': IMG('c7a391_a6ee4a065f8148a9a3f4bea509e9f825~mv2.png', 1200),
    'playlist-dec2021.png': IMG('c7a391_d099dfa8be674df0a663e1a6ccc0dfa6~mv2.png', 1200),
    'playlist-nov2021.png': IMG('c7a391_abbb55fb94e440608f44254a3a0d6efa~mv2.png', 1200),
    'playlist-sep2021.png': IMG('c7a391_6899891a33e34e68bd741c574e856121~mv2.png', 1200),
    'vinyl-cover.png': IMG('c7a391_e2c42965f51044f9ac10bda1a5279c8d~mv2.png', 1200),
    'vinyl-bg.png': IMG('c7a391_005cd305e18f42a5ab742e781aa22524~mv2.png', 1600),
  },
  design: {
    ...Object.fromEntries(
      [
        '1a528044cd6347b0a855309b84c94132', 'a2041997ab8b42a09be4e08927d92141', '6bf1e58f9f104a70890d476d80e07fdc',
        'b501cc85497541ebb9e4431ae1fbf9c0', '66fef80da90549ff80abcf7088bad49d', 'ab38c28fa0cc4d64bc8aabdea0d17bc5',
        'dfa83207bdd84949b783fd7440a5f303', '4fe16c7992b248cf933999752ede6b9b', 'cd4d20b3464240f9a52f8ca3496a0492',
        'c9a9d98e487c4c6981e41f97e8295737', '62bf09a03f3d42e28342341289c6df43', 'ebc861647a2149d0811f4326d4c7196d',
      ].map((h, i) => [`logo-${String(i + 1).padStart(2, '0')}.png`, IMG(`c7a391_${h}~mv2.png`, 1000)]),
    ),
    'stickers.png': IMG('c7a391_290f7e8ab32c474ba438cf6c8c3e021d~mv2.png', 1400),
    'cards-2.png': IMG('c7a391_75637cb7fbea4506907cfe715b2de838~mv2.png', 1400),
    'cards-1.png': IMG('c7a391_d94a5c1438334892a25261b6ce92c050~mv2.png', 1400),
    'highlight-shows.png': IMG('c7a391_4d132260358943449c7c94e5331542ee~mv2.png', 600),
    'highlight-musica.png': IMG('c7a391_52dd1cd1de4b42cc9bf0acbf52704d43~mv2.png', 600),
    'highlight-diseno.png': IMG('c7a391_671a5e73e640475287f6538eab08044a~mv2.png', 600),
    'highlight-extra.png': IMG('c7a391_88e61acbff57493da2e87db367def3c0~mv2.png', 600),
    'highlight-hardware.png': IMG('c7a391_8e1de06b0d1d42d388f09fe317d17e92~mv2.png', 600),
  },
};

// Vídeos: "Así lo vivimos" (inicio) y "Visuales" (diseño)
const liveIds = [
  '7f9b0bd808164c46a43564ce6e8cefd9', '291998cd64a3455b9ecc6cda5206f524', 'e682fd27cd56412f9f009893a99e7347',
  'b5d23d627e834a229e32c071fe3ac1bd', 'fef7901173924184aab856ad9b4db796', 'b5d3e53724e84d73bc573f01d5c38866',
  'e0bbf6fe69384bf5aa2093370b9f3a9b', '342ea1b979254dc1b87a1700f1572f3c', 'b356c428911c4faf9201a6179e53368e',
  'c341baf9c4bf4c36ac923b4885fd4369', 'afd9ccc3688b4fc796b2d8eb968a3ead', '85dc03005cf743b78441a135a15538da',
  'a38e98bade6c4bb0858347feb0def8ea', 'b7c5b27390e249f99597aceb152bf826', 'f3956c9de4c54f158dd65d4825496970',
];
const visualIds = [
  '88053b7d9658462dbb1cea6809a3cf82', '5bd0416dd11b430f993138870b9e01f6', 'dc5c604175fc4585ba832be49db9cfb0',
  '1e023bc32f4b4c51a007fa200ec62b77', '202a473def714426aafa680a10978c34', 'bc8adf00066742668a20fe35057e2fce',
  '2ec7d1f68cf449df908a73a0c305280e', '1405609393c3469e886c6b680aef46fa', '69ada1a314714032a12765167a05b8c2',
  '926099c78df94b00af350040d18794f8', '0d1b41a2734f4d26a86fabb5d699896f',
];
const videos = {
  live: liveIds.map((h, i) => [`live-${String(i + 1).padStart(2, '0')}`, `c7a391_${h}`]),
  visuals: visualIds.map((h, i) => [`visual-${String(i + 1).padStart(2, '0')}`, `c7a391_${h}`]),
  hero: [['hero-logo', 'c7a391_93003f37f3ab4711a314bc503aeb364e'], ['bg-smoke', '11062b_d2b05a3fb9914896aefc471d4ebf1418']],
};

async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return 'skip';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  return 'ok';
}

const jobs = [];
for (const [group, files] of Object.entries(images)) {
  for (const [name, url] of Object.entries(files)) jobs.push([url, path.join(root, 'src/assets', group, name)]);
}
for (const [group, list] of Object.entries(videos)) {
  for (const [name, id] of list) {
    jobs.push([POSTER(id), path.join(root, 'src/assets/posters', `${name}.jpg`), { optional: true }]);
    jobs.push([[VIDEO(id, '720p'), VIDEO(id, '480p'), VIDEO(id, '360p')], path.join(root, 'public/media', group, `${name}.mp4`)]);
  }
}

let failed = 0;
const queue = [...jobs];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const [urls, dest, opts] = queue.shift();
      const candidates = Array.isArray(urls) ? urls : [urls];
      let done = false;
      for (const u of candidates) {
        try { console.log(await download(u, dest), path.relative(root, dest)); done = true; break; } catch { /* siguiente calidad */ }
      }
      if (!done) { if (!opts?.optional) failed++; console.warn('FAIL', path.relative(root, dest)); }
    }
  }),
);
console.log(failed ? `${failed} descargas fallidas` : 'Todo descargado');
