if (!self.define) {
  let e,
    s = {};
  const i = (i, a) => (
    (i = new URL(i + '.js', a).href),
    s[i] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, c) => {
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[t]) return;
    let n = {};
    const r = (e) => i(e, t),
      o = { module: { uri: t }, exports: n, require: r };
    s[t] = Promise.all(a.map((e) => o[e] || r(e))).then((e) => (c(...e), n));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: 'afc21e13907755d923e87524be5c4863' },
        { url: '/_next/static/chunks/1118-5430be51b162aced.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/1940-ed7329f021edb440.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/231-44b663b9dfa02046.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/3030-37a7eb6da9996ea6.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/3203-35bcf5ed18af8f86.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/460-2d28785e5da54f78.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/4868-54961ce9006eb59a.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        {
          url: '/_next/static/chunks/53c13509-f50c0921f29be2dc.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        { url: '/_next/static/chunks/5750-6c92b93224a0e1c9.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/5878-7940d51a204c7474.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        {
          url: '/_next/static/chunks/59650de3-f39afba10e6a7389.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        { url: '/_next/static/chunks/676-021e69c52831d8e2.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/7023-cb22a616fbb18b7b.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/7136-c2a8d88e30304df9.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/7283-1464b8069267197a.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/7776-8005daf60e4d81de.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/8173-591afe857cf81853.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/8211-6ac31a7574b328c3.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/8609-512387e27595c0c6.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/8701-4c57ca1769cc39ed.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/881-7c839e88a7206fd5.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        {
          url: '/_next/static/chunks/8e1d74a4-94d8aa5a341f4260.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        { url: '/_next/static/chunks/9383-e78b287ca86f47f1.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        {
          url: '/_next/static/chunks/94730671-4eb2d7ab90ae0bf7.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        { url: '/_next/static/chunks/9769-249058bf8266ab03.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        { url: '/_next/static/chunks/998-afd08a1a4c283bd0.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        {
          url: '/_next/static/chunks/app/(auth)/auth/layout-526a5040e5eee251.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/(auth)/auth/page-77840fc89d4c4480.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/(auth)/complete-registration/layout-aacf91296e37c50b.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/(auth)/complete-registration/page-23334610d2c504a7.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/(auth)/confirm-email/layout-3a5e7eeaaab1d524.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/(auth)/confirm-email/page-5ef31b301472b92c.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/(auth)/reset-password/layout-c0cd5480293ae6b2.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/(auth)/reset-password/page-a97234872c87b767.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/(landing)/about/page-4de678bf0a5ce4ea.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/(landing)/contact/page-225744fe9da5d14f.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/(landing)/docs/page-12dac0e449a8c209.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/(landing)/faq/page-c8a0f6ba3cd1d1ca.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/(landing)/features/page-32971c285fcb494d.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/(landing)/page-0dc7d60400fdf25e.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/(landing)/pricing/page-219579d57f9f715a.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/(landing)/support/page-b59f40bb234b04f0.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-0d8c8b0e97b7f6d4.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/admin/alerts/page-d265e999527fe485.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/admin/layout-17eef70822056792.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/admin/page-de50f0e67e22d0f7.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/admin/printers/page-d761197cc5c6e39f.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/admin/products/page-bb597fc864a8d604.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/admin/settings/page-2728465e7d45d713.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/admin/subscription/page-7a4ec204b2b04cca.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/admin/users/page-926d5cf3e49a819c.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/dashboard/alert/page-afb9690955a32012.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/dashboard/layout-f90e9b1acf4226e6.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/dashboard/page-b392122e992e8708.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/dashboard/printer/page-2db195b6f9c87414.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/dashboard/profile/page-a32cee572d902fbe.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/layout-3ef958ca0c5e2f32.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/loading/page-0c09f842cf2e5d37.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/master/alerts/page-a923897493875e88.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/master/layout-dcf2ea8b3bb5134d.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/master/page-aff039cdba9d6d20.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/master/printers/page-84a63860e0df2c1b.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/master/products/page-1958849896f77447.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/master/settings/page-0aad71c4ce0e7016.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/app/master/users/page-505b61de457748a8.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/c916193b-d94cd4bfb2839168.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/ee560e2c-06827de3f5601c74.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/f8025e75-f80c70f931e17f22.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/fd9d1056-0150d2ee9c26ea87.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/framework-8e0e0f4a6b83a956.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        { url: '/_next/static/chunks/main-3bd745073de06893.js', revision: 'lesEEicmWRI9aKhgXhI26' },
        {
          url: '/_next/static/chunks/main-app-d29f07494708a42b.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/pages/_app-f870474a17b7f2fd.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-51898b4eecd9eb2d.js',
          revision: 'lesEEicmWRI9aKhgXhI26',
        },
        { url: '/_next/static/css/71756e95d5b08ebe.css', revision: '71756e95d5b08ebe' },
        { url: '/_next/static/css/85e36369910e8a45.css', revision: '85e36369910e8a45' },
        { url: '/_next/static/css/fc3cf4adc6ce29a3.css', revision: 'fc3cf4adc6ce29a3' },
        {
          url: '/_next/static/lesEEicmWRI9aKhgXhI26/_buildManifest.js',
          revision: '3e2d62a10f4d6bf0b92e14aecf7836f4',
        },
        {
          url: '/_next/static/lesEEicmWRI9aKhgXhI26/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/media/26a46d62cd723877-s.woff2',
          revision: 'befd9c0fdfa3d8a645d5f95717ed6420',
        },
        {
          url: '/_next/static/media/55c55f0601d81cf3-s.woff2',
          revision: '43828e14271c77b87e3ed582dbff9f74',
        },
        {
          url: '/_next/static/media/581909926a08bbc8-s.woff2',
          revision: 'f0b86e7c24f455280b8df606b89af891',
        },
        {
          url: '/_next/static/media/6d93bde91c0c2823-s.woff2',
          revision: '621a07228c8ccbfd647918f1021b4868',
        },
        {
          url: '/_next/static/media/97e0cb1ae144a2a9-s.woff2',
          revision: 'e360c61c5bd8d90639fd4503c829c2dc',
        },
        { url: '/_next/static/media/Satoshi-Black.12d5a2e3.ttf', revision: '12d5a2e3' },
        { url: '/_next/static/media/Satoshi-Black.28873509.woff', revision: '28873509' },
        { url: '/_next/static/media/Satoshi-Black.c6d20a6b.woff2', revision: 'c6d20a6b' },
        { url: '/_next/static/media/Satoshi-BlackItalic.22c3e8d9.woff', revision: '22c3e8d9' },
        { url: '/_next/static/media/Satoshi-BlackItalic.33bc16b8.ttf', revision: '33bc16b8' },
        { url: '/_next/static/media/Satoshi-BlackItalic.5400951d.woff2', revision: '5400951d' },
        { url: '/_next/static/media/Satoshi-Bold.12084922.woff2', revision: '12084922' },
        { url: '/_next/static/media/Satoshi-Bold.b28a04c4.woff', revision: 'b28a04c4' },
        { url: '/_next/static/media/Satoshi-Bold.c60efc8f.ttf', revision: 'c60efc8f' },
        { url: '/_next/static/media/Satoshi-BoldItalic.b59cf06f.woff', revision: 'b59cf06f' },
        { url: '/_next/static/media/Satoshi-BoldItalic.c1d97e57.ttf', revision: 'c1d97e57' },
        { url: '/_next/static/media/Satoshi-BoldItalic.e51fcc53.woff2', revision: 'e51fcc53' },
        { url: '/_next/static/media/Satoshi-Italic.3eb4bb53.woff2', revision: '3eb4bb53' },
        { url: '/_next/static/media/Satoshi-Italic.43440d31.woff', revision: '43440d31' },
        { url: '/_next/static/media/Satoshi-Italic.84cd9c1d.ttf', revision: '84cd9c1d' },
        { url: '/_next/static/media/Satoshi-Light.121b151d.ttf', revision: '121b151d' },
        { url: '/_next/static/media/Satoshi-Light.ce217c5d.woff', revision: 'ce217c5d' },
        { url: '/_next/static/media/Satoshi-Light.d3f699ab.woff2', revision: 'd3f699ab' },
        { url: '/_next/static/media/Satoshi-LightItalic.0d87c97a.woff2', revision: '0d87c97a' },
        { url: '/_next/static/media/Satoshi-LightItalic.51efbee6.woff', revision: '51efbee6' },
        { url: '/_next/static/media/Satoshi-LightItalic.58b0e971.ttf', revision: '58b0e971' },
        { url: '/_next/static/media/Satoshi-Medium.22539d17.woff2', revision: '22539d17' },
        { url: '/_next/static/media/Satoshi-Medium.8217b72e.ttf', revision: '8217b72e' },
        { url: '/_next/static/media/Satoshi-Medium.f3941e68.woff', revision: 'f3941e68' },
        { url: '/_next/static/media/Satoshi-MediumItalic.14c46485.ttf', revision: '14c46485' },
        { url: '/_next/static/media/Satoshi-MediumItalic.17afee50.woff2', revision: '17afee50' },
        { url: '/_next/static/media/Satoshi-MediumItalic.5450477c.woff', revision: '5450477c' },
        { url: '/_next/static/media/Satoshi-Regular.a12eb4fb.ttf', revision: 'a12eb4fb' },
        { url: '/_next/static/media/Satoshi-Regular.b1dca2a5.woff2', revision: 'b1dca2a5' },
        { url: '/_next/static/media/Satoshi-Regular.bb2accee.woff', revision: 'bb2accee' },
        {
          url: '/_next/static/media/a34f9d1faa5f3315-s.p.woff2',
          revision: 'd4fe31e6a2aebc06b8d6e558c9141119',
        },
        {
          url: '/_next/static/media/df0a9ae256c0569c-s.woff2',
          revision: 'd54db44de5ccb18886ece2fda72bdfe0',
        },
        { url: '/apple-splash-2778-1284.jpg', revision: '985b6dd737655dec43e4762b8b915164' },
        { url: '/apple-touch-icon.png', revision: '19285f597a3cb860396e6b57bca22086' },
        { url: '/browserconfig.xml', revision: 'b12227034b6bd8dfd0f73fadabf326f8' },
        { url: '/favicon-16x16.png', revision: '006c13d4c731ddec1ae05c21a89f61b6' },
        { url: '/favicon-32x32.png', revision: 'd065a1824e1f7aca81f8ae3969910218' },
        { url: '/favicon.ico', revision: 'ea2efdf3ec9f33d7944515389e8b39e0' },
        { url: '/icon-192x192.png', revision: '681bb129c694d714cbdb8c5573e4f418' },
        { url: '/icon-384x384.png', revision: '9027adc47b7542a95f83164312417ea6' },
        { url: '/images/background_login.png', revision: '6770b6b602d802fd6aaef0ff7db5124f' },
        { url: '/images/google.svg', revision: '686f8efa6e3e28e96d1c08399e8d353d' },
        { url: '/images/icon/icon-arrow-down.svg', revision: '30910ce45d8aac34be32c0be1a449bbd' },
        { url: '/images/icon/icon-calendar.svg', revision: 'e475877697d224a175f891c1d11ee044' },
        { url: '/images/icon/icon-copy-alt.svg', revision: 'bd36a650444473d4ef30d1832248f9a5' },
        { url: '/images/icon/icon-moon.svg', revision: 'f30643b5b1aafa148726e2c3f05a769f' },
        { url: '/images/icon/icon-sun.svg', revision: 'de2b2bd2d216b3ab90b05eed8ea755c8' },
        { url: '/images/logo.png', revision: 'e4206a41a5689330c5750ad5b14bd9e2' },
        { url: '/images/logo/logo-icon.png', revision: 'e4206a41a5689330c5750ad5b14bd9e2' },
        { url: '/images/restaurant.png', revision: 'd640bfbf41a9126ce764405885de90a4' },
        { url: '/images/user/user-01.png', revision: 'e0f0924114d36cb96876c0cc30063bd7' },
        { url: '/images/user/user-02.png', revision: 'de3bd868997d3f445348922df73d8226' },
        { url: '/images/user/user-03.png', revision: '93b7c0c394b231732ebe8806448a95a8' },
        { url: '/images/user/user-04.png', revision: '118e66657a14921a61abc7d21261188b' },
        { url: '/images/user/user-05.png', revision: 'd74bb3c54d3e3c32c73829d652d0d6f4' },
        { url: '/images/user/user-06.png', revision: '975408d09dc079b97f4ae46480af7ef5' },
        { url: '/images/user/user-07.png', revision: 'e3058df7afaaf5b2dedd732445cfea5b' },
        { url: '/images/user/user-08.png', revision: '960cd052c95c75462fae0c9930a202db' },
        { url: '/images/user/user-09.png', revision: '15693dc3edc4775c384585aa757f2421' },
        { url: '/images/user/user-10.png', revision: '8bbed9cfd9a9e8a7d5ab3e1a43737380' },
        { url: '/images/user/user-11.png', revision: '11f4a43c10ec710e5e41f261a629ca82' },
        { url: '/images/user/user-12.png', revision: '8530b9ec54e0b67cb52b44bcbae5482c' },
        { url: '/images/user/user-13.png', revision: 'cdb3cc59c44f18a8029a032a3952663d' },
        { url: '/logo_1.png', revision: 'db252816ded035f62740c8907b54cc58' },
        { url: '/manifest.json', revision: 'e7a6a578ae9d363108b0e99fbaac111d' },
        { url: '/mstile-150x150.png', revision: '4d8caeaa6465637b8147accba3483e1d' },
        { url: '/placeholder.svg', revision: '35707bd9960ba5281c72af927b79291f' },
        { url: '/safari-pinned-tab.svg', revision: '8571cca172b432b1e861b1106c99ca57' },
        { url: '/service-work.js', revision: 'a3d145c7578c2cdd38ad1de5aeaa203c' },
        { url: '/site.webmanifest', revision: '976ddd0f9529d58b506f46157cbd4073' },
        {
          url: '/users/6681a00ab7ee1dcc9c0b32da.jpg',
          revision: 'b0e2248397fdb3d7264179e8733367f4',
        },
        {
          url: '/users/6681a00ab7ee1dcc9c0b32da.png',
          revision: '2457ed05c3df85f4140bfbfcbc8d4dc2',
        },
        { url: '/video/video.mp4', revision: '49cbf043aa39d4ef522a752159491487' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: i, state: a }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET',
    );
});
