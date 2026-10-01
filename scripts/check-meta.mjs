const meetings = await (await fetch('http://127.0.0.1:3000/meetings')).text();
const detail = await (await fetch('http://127.0.0.1:3000/meetings/1')).text();

function tags(html) {
  return html.match(/<title>.*?<\/title>|<meta[^>]*(description|og:|twitter:)[^>]*>|<link[^>]*icon[^>]*>/g) ?? [];
}

console.log(tags(meetings).join('\n'));
console.log('---DETAIL---');
console.log(tags(detail).join('\n'));

const icon = await fetch('http://127.0.0.1:3000/favicon.ico');
const og = await fetch('http://127.0.0.1:3000/opengraph-image.png');
console.log('favicon', icon.status, icon.headers.get('content-type'));
console.log('og', og.status, og.headers.get('content-type'));
