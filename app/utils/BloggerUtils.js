import jquery from 'jquery';


export function mapPosts(posts = []) {
  return posts.map(p => {
    return {
      id: p.id,
      title: p.title,
      url: p.url,
      slug: getSlugFromUrl(p.url),
      content: p.content,
      summary: getContentSummary(p.content),
      date: p.published,
      tags: p.labels
    };
  });
}

export function getSlugFromUrl(url) {
  var name = url.split('/').slice(-1)[0];
  if(name.indexOf('.' >= 0)) {
    name = name.substr(0, name.lastIndexOf('.'));
  }
  return name;
}


function getContentSummary(content) {
  let frag = getDocFragFromString('<div>' + content + '</div>');
  let isBeyondBreak = false;
  let crawlAndHide = function crawlAndHide(node) {

  if(!isBeyondBreak && (node.outerHTML === '<a name="more"></a>' || node.outerHTML === '<!--more-->')) {
    isBeyondBreak = true;
  }
  if(isBeyondBreak) {
    if(node.nextSibling) {
      crawlAndHide(node.nextSibling);
    }
    try {
      node.parentNode.removeChild(node);
    } catch(e) {}
      return;
    }

    if(node.hasChildNodes()) {
      crawlAndHide(node.childNodes[0]);
    }
    if(node.nextSibling) {
      crawlAndHide(node.nextSibling);
    }
  };
  crawlAndHide(frag);

  return frag.firstChild.innerHTML;
}


function getFragment() {
  return document.createDocumentFragment();
}
function getDocFragFromString(frag) {
  return document.createRange().createContextualFragment(frag);
}
