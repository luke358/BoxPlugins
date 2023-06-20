
function searchComplete({ result }) {
  return JSON.parse(result)
}
function detailComplete({ result }) {
  return JSON.parse(result)
}
function videoComplete({ result }) {
  return JSON.parse(result)
}
module.exports = {
  platform: '起飞影视',
  searchInjectCode: `
    const lis = document.querySelectorAll('.module-items .module-item');

    const data = Array.from(lis).map(li => {
      const href = li.querySelector('a').href;
      const pic = li.querySelector('.module-item-pic img').src;
      const title = li.querySelector('.module-card-item-info .module-card-item-title strong').textContent
      return {
        href,pic,title
      }
    });
    window.ReactNativeWebView.postMessage(JSON.stringify({data, isEnd: true}));
  `,
  searchUrl: 'https://qfitv.com/index.php/vod/search/page/1/wd/{{kw}}.html',
  searchComplete,
  detailInjectCode: `
      const titles = Array.from(document.querySelectorAll('.module-tab-items .module-tab-item')).map(item => item.textContent);
      const data = Array.from(document.querySelectorAll('.module-list')).map((item, index) => {
          return {
              data: Array.from(item.querySelectorAll('a')).map(item => {
              const href = item.href;
              const title = item.textContent;
              return {href, title}
          }),
              title: titles[index]
          }
      })
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
      `,
  detailComplete,
  videoInjectCode: `
      const iframeSrc = document.querySelector('#playleft iframe').src;
      const videoUrl = iframeSrc.match(/url=(.*)/)[1];
      window.ReactNativeWebView.postMessage(videoUrl);
    `,
  videoComplete,
}