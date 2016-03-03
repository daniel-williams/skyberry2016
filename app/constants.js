
export default {
  subscribe: {
    active: false,
    delay: 5000,
  },

  keys: {
      identity: 'Identity.token',
  },

  blog: {
      host: 'https://www.googleapis.com/blogger/v3/blogs/',
      // id: '863617363126956700',
      // apiKey: 'AIzaSyCBrVr_qmMkn__DOgWIlMvGY7hOI0WEv_o',
      id: '8039519640908438770',
      apiKey: 'AIzaSyC3eV5-8-NLP0B3KQRAPi5dYxUShRhDs2c',
      itemsPerPage: 5,
  },

  portfolio: {
    options: [
        {name: 'Print & Graphic Design', value: 'print'},
        {name: 'Branding & Logo Design', value: 'logo'},
        {name: 'Web & Apps', value: 'web'},
    ],
    selected: 'print',
    placeholder: '/content/images/portfolio-slug.png',
  },

  links: {
      lacey: [
          {title: 'linkedin', alt:'Lacey on LinkedIn', url: 'https://www.linkedin.com/in/laceyjohnston'},
          {title: 'behance', alt:'Lacey on Behance', url: 'https://behance.net/laceyjohnston'},
          {title: 'creativepool', alt: 'Lacey on CreativePool', url: 'http://creativepool.com/laceyjohnston'},
      ],
      daniel: [
          {title: 'linkedin', alt:'Daniel on LinkedIn', url: 'https://linkedin.com/in/danielwilliamsus'},
          {title: 'github', alt:'Daniel on GitHub', url: 'https://github.com/daniel-williams'},
      ],
      skyberry: [
          {title: 'facebook', alt:'Skyberry on Facebook', url: 'http://facebook.com/skyberrystudio'},
          {title: 'twitter', alt:'Skyberry on Twitter', url: 'http://twitter.com/skyberrystudio'},
          {title: 'pinterest', alt:'Skyberry on Pinterest', url: 'http://pinterest.com/skyberrystudio'},
          {title: 'linkedin', alt:'Skyberry on LinkedIn', url: 'https://www.linkedin.com/company/skyberry-studio'},
          {title: 'youtube', alt:'Skyberry on YouTube', url: 'http://youtube.com/skyberrystudio'},
      ],
  },

  routes: {
      token: '/token',
      dashboard: '/dashboard/projects',
      api: '/api',
      files: '/files/',
      images: '/content/images/',
  },

  noop: function() {},
}
