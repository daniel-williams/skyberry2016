

export function mapPosts(posts = []) {
  return posts.map(p => {
    return {
      id: p.id,
      title: p.title,
      url: p.url,
      slug: getSlugFromUrl(p.url),
      content: p.content,
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
