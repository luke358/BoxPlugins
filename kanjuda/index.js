
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
    const lis = document.querySelectorAll('#searchList li')

    const data = Array.from(lis).map(li => {
      const href = li.querySelector('.detail .title a').href;
      const title = li.querySelector('.detail .title a').textContent;

      const picBlock = li.querySelector('.thumb a');

      const computedStyle = getComputedStyle(picBlock);
      const backgroundImage = computedStyle.getPropertyValue('background-image');
          
      const urlStartIndex = backgroundImage.indexOf('url("') + 5;
      const urlEndIndex = backgroundImage.lastIndexOf('")');
      const pic = backgroundImage.slice(urlStartIndex, urlEndIndex);

      return {
        href,pic,title
      }
    });
    window.ReactNativeWebView.postMessage(JSON.stringify({data, isEnd: true}));
  `,
  searchUrl: 'https://www.kanjuda.com/search.php?page=1&searchword={{kw}}',
  searchComplete,
  detailInjectCode: `
    const titles = Array.from(document.querySelectorAll('.myui-panel_hd ul li')).map(item => item.textContent);

    const data = Array.from(document.querySelectorAll('.tab-content.myui-panel_bd div.tab-pane')).map((item, index) => {
        return {
            data: Array.from(item.querySelectorAll('ul.myui-content__list li a')).map(item => {
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
    const iframeSrc = document.querySelector('iframe').contentDocument.documentElement.querySelector('iframe').src
    const videoUrl = iframeSrc.match(/url=.*?,([http|https].*?\.m3u8)/)[1];
    window.ReactNativeWebView.postMessage(videoUrl);
    `,
  videoComplete,
}