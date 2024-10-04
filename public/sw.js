if (!self.define) {
  let e,
    a = {};
  const s = (s, i) => (
    (s = new URL(s + '.js', i).href),
    a[s] ||
      new Promise((a) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = s), (e.onload = a), document.head.appendChild(e);
        } else (e = s), importScripts(s), a();
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const c = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (a[c]) return;
    let t = {};
    const r = (e) => s(e, c),
      d = { module: { uri: c }, exports: t, require: r };
    a[c] = Promise.all(i.map((e) => d[e] || r(e))).then((e) => (n(...e), t));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: 'f69cef22e35280dcaa0c9597a4613a29' },
        {
          url: '/_next/static/KphNBaY34zvwMbnwA03ax/_buildManifest.js',
          revision: '3e2d62a10f4d6bf0b92e14aecf7836f4',
        },
        {
          url: '/_next/static/KphNBaY34zvwMbnwA03ax/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_next/static/chunks/1118-5430be51b162aced.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        { url: '/_next/static/chunks/1673-6d63a7a75a560203.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        { url: '/_next/static/chunks/231-a3b7098ef33fdc02.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        { url: '/_next/static/chunks/2683-258e3c3f35bc635a.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        { url: '/_next/static/chunks/3476-e7da7a1de6016bc8.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        { url: '/_next/static/chunks/460-2d28785e5da54f78.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        { url: '/_next/static/chunks/4868-54961ce9006eb59a.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        {
          url: '/_next/static/chunks/53c13509-f50c0921f29be2dc.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        { url: '/_next/static/chunks/5878-7940d51a204c7474.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        {
          url: '/_next/static/chunks/59650de3-f39afba10e6a7389.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        { url: '/_next/static/chunks/676-021e69c52831d8e2.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        { url: '/_next/static/chunks/7023-cb22a616fbb18b7b.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        { url: '/_next/static/chunks/7136-c2a8d88e30304df9.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        { url: '/_next/static/chunks/7776-8005daf60e4d81de.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        { url: '/_next/static/chunks/8125-05be3688319d7436.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        { url: '/_next/static/chunks/8173-591afe857cf81853.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        { url: '/_next/static/chunks/8609-b4e52be160198fe4.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        { url: '/_next/static/chunks/8701-4c57ca1769cc39ed.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        {
          url: '/_next/static/chunks/8e1d74a4-94d8aa5a341f4260.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        { url: '/_next/static/chunks/9383-e78b287ca86f47f1.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        {
          url: '/_next/static/chunks/94730671-4eb2d7ab90ae0bf7.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        { url: '/_next/static/chunks/9769-6128639d75d5ba55.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        { url: '/_next/static/chunks/998-b8f13c95babdcf95.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        {
          url: '/_next/static/chunks/app/(auth)/auth/layout-c1ee7de6499cf292.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/(auth)/auth/page-f2b20f683664d43c.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/(auth)/complete-registration/layout-096d0ef076e76808.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/(auth)/complete-registration/page-914797df43100bd5.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/(auth)/confirm-email/layout-68515cf81c2393ec.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/(auth)/confirm-email/page-fdac669f23344bfc.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/(auth)/reset-password/layout-040463ae967f0645.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/(auth)/reset-password/page-96cbebfa901efd14.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/(landing)/about/page-d4ae389169c151ab.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/(landing)/contact/page-a30312469f179241.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/(landing)/docs/page-77502421349cd2b0.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/(landing)/faq/page-7c87f95f21c51ca9.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/(landing)/features/page-355fb092b5c91cd8.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/(landing)/page-a70e2b2790472c4e.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/(landing)/pricing/page-e4c470a1c6b113a5.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/(landing)/support/page-8960a5b5351bfaca.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-0d8c8b0e97b7f6d4.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/admin/alerts/page-feec272fd363d71c.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/admin/layout-c91f474bd469d6af.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/admin/page-0da8843b2207652b.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/admin/printers/page-e897d15da9564efb.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/admin/products/page-353973e30f484a8f.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/admin/settings/page-a75ce58344c6275e.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/admin/users/page-40423b9eed51f34c.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/dashboard/alert/page-5156c2fc3cf92b20.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/dashboard/layout-bde42ff0a3d0548d.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/dashboard/page-4d13492f6ed4875f.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/dashboard/printer/page-b90c450b7c7310da.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/dashboard/profile/page-b83d42e21ea8ed5f.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/layout-7dbedd3a6763ee15.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/loading/page-37eca2ddd3b3d7b0.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/master/alerts/page-b0333750f474508f.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/master/layout-5214cd8aff8c9624.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/master/page-f5c26b145fdfee07.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/master/printers/page-4c5676e9f32a1a98.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/master/products/page-bca499cc34152e1d.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/master/settings/page-7999c460ac528f70.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/app/master/users/page-cef0bd4f105f2866.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/c916193b-d94cd4bfb2839168.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/ee560e2c-06827de3f5601c74.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/f8025e75-f80c70f931e17f22.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/fd9d1056-0150d2ee9c26ea87.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/framework-8e0e0f4a6b83a956.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        { url: '/_next/static/chunks/main-24ac8e061f69bc99.js', revision: 'KphNBaY34zvwMbnwA03ax' },
        {
          url: '/_next/static/chunks/main-app-2d471b787cf0a347.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/pages/_app-f870474a17b7f2fd.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-b979d41e79ea2add.js',
          revision: 'KphNBaY34zvwMbnwA03ax',
        },
        { url: '/_next/static/css/c291e1b4fc1addad.css', revision: 'c291e1b4fc1addad' },
        { url: '/_next/static/css/c783a56bcc8d97ff.css', revision: 'c783a56bcc8d97ff' },
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
        { url: '/images/background.png', revision: 'e8e7adaf05c5b861a2eb4488a87b5ed5' },
        { url: '/images/background_login.png', revision: '52f1f4a06510ab05c71398451775aeca' },
        { url: '/images/brand/brand-01.svg', revision: 'dc4066749d4d6c20e0a3698104a90e98' },
        { url: '/images/brand/brand-02.svg', revision: 'd921f4004cbabf4f6ae19e9f81244a20' },
        { url: '/images/brand/brand-03.svg', revision: '9825c6d6687baddce9d4f0362c3d4713' },
        { url: '/images/brand/brand-04.svg', revision: '8afb1fda360310405758d3d57f49fb97' },
        { url: '/images/brand/brand-05.svg', revision: '72f1102b8c2881b51780ff6d4e3ff7a5' },
        { url: '/images/cards/cards-01.png', revision: 'bee503d28d650dc258b6376511f5facd' },
        { url: '/images/cards/cards-02.png', revision: '704f58c328ebb8c091643b238bd1c62b' },
        { url: '/images/cards/cards-03.png', revision: '36a3fa394039239a716caf01970174ca' },
        { url: '/images/cards/cards-04.png', revision: '4443f6a85e3b7e775afc640584f866da' },
        { url: '/images/cards/cards-05.png', revision: '2d0223d89e31b56459d147647db3a7f0' },
        { url: '/images/cards/cards-06.png', revision: '080a048d0d862ef60ae4e67db3caf930' },
        { url: '/images/country/country-01.svg', revision: '2a2dd9b8512b64e4e927205ad8efe312' },
        { url: '/images/country/country-02.svg', revision: 'e09739635677494cfec7ad7034b0a858' },
        { url: '/images/country/country-03.svg', revision: 'f3f010d87ce8c22348dd792d325e8923' },
        { url: '/images/country/country-04.svg', revision: '6343fd13ac6a70faff561b0ce5371d8f' },
        { url: '/images/country/country-05.svg', revision: 'd0ecd941aef7d0de37a4703c716c7b76' },
        { url: '/images/country/country-06.svg', revision: '5f42612b0ba6f800c4c89d3eaf41c2b6' },
        { url: '/images/cover/cover-01.png', revision: '972c64bf2ce84e837c5b3a2094281e16' },
        { url: '/images/google.svg', revision: '686f8efa6e3e28e96d1c08399e8d353d' },
        { url: '/images/icon/icon-arrow-down.svg', revision: '30910ce45d8aac34be32c0be1a449bbd' },
        { url: '/images/icon/icon-calendar.svg', revision: 'e475877697d224a175f891c1d11ee044' },
        { url: '/images/icon/icon-copy-alt.svg', revision: 'bd36a650444473d4ef30d1832248f9a5' },
        { url: '/images/icon/icon-moon.svg', revision: 'f30643b5b1aafa148726e2c3f05a769f' },
        { url: '/images/icon/icon-sun.svg', revision: 'de2b2bd2d216b3ab90b05eed8ea755c8' },
        {
          url: '/images/illustration/illustration-01.svg',
          revision: '602e86f283c5f2112ae240c7277050a3',
        },
        {
          url: '/images/illustration/illustration-02.svg',
          revision: 'd4a9499f1ece2b6f2530665b7478af9e',
        },
        {
          url: '/images/illustration/illustration-03.svg',
          revision: '5d4e89741a522eb8f6fdf6a89458f01a',
        },
        {
          url: '/images/illustration/illustration-04.svg',
          revision: '7586d356e59fd022055674fca6c6e573',
        },
        { url: '/images/logo.png', revision: 'e4206a41a5689330c5750ad5b14bd9e2' },
        { url: '/images/logo/logo-icon.png', revision: 'e4206a41a5689330c5750ad5b14bd9e2' },
        { url: '/images/product/product-01.png', revision: '34be8cdb4dbf696fb0a39b39c5d94c4a' },
        { url: '/images/product/product-02.png', revision: '1a4633cb19e391dd753743d62b4a790b' },
        { url: '/images/product/product-03.png', revision: '2c213e5c10b79de985f7691ad21ca1e6' },
        { url: '/images/product/product-04.png', revision: 'f45c5f8c16c8db472e6b6d7c16cdae9b' },
        { url: '/images/product/product-thumb.png', revision: '9cb86c53190c3026fb88dd00c232dd57' },
        { url: '/images/restaurant.png', revision: 'd640bfbf41a9126ce764405885de90a4' },
        { url: '/images/task/task-01.jpg', revision: '557544c08de1aba4220b710b03d999b0' },
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
            cacheWillUpdate: async ({ request: e, response: a, event: s, state: i }) =>
              a && 'opaqueredirect' === a.type
                ? new Response(a.body, { status: 200, statusText: 'OK', headers: a.headers })
                : a,
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
        const a = e.pathname;
        return !a.startsWith('/api/auth/') && !!a.startsWith('/api/');
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
