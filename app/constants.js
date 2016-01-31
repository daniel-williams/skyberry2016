
export default {
  subscribe: {
    active: false,
    delay: 600000000000000,
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
        {name: 'Brand & Identity', value: 'logo'},
        {name: 'Web & Apps', value: 'web'},
    ],
    selected: 'print',
    placeholder: '/content/images/portfolio-slug.png',
  },

  links: {
      lacey: [
          {title: 'linkedin', alt:'Lacey on LinkedIn', url: 'https://www.linkedin.com/in/laceyjohnston'},
          {title: 'behance', alt:'Lacey on Behance', url: 'https://behance.com/laceyjohnston'},
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

  DevIpsum: {
      Bacon: { headline: 'Nose to Tail...', words: ['alcatra', 'andouille', 'bacon', 'ball', 'beef', 'belly', 'biltong', 'boudin', 'bresaola', 'brisket', 'capicola', 'chicken', 'chop', 'chuck', 'corned', 'cow', 'cupim', 'doner', 'drumstick', 'fatback', 'filet', 'flank', 'frankfurter', 'ground', 'ham', 'hamburger', 'hock', 'jerky', 'jowl', 'kevin', 'kielbasa', 'landjaeger', 'leberkas', 'loin', 'meatball', 'meatloaf', 'mignon', 'pancetta', 'pastrami', 'picanha', 'pig', 'porchetta', 'pork', 'prosciutto', 'ribeye', 'ribs', 'round', 'rump', 'salami', 'sausage', 'shank', 'shankle', 'short', 'shoulder', 'sirloin', 'spare', 'steak', 'strip', 'swine', 't-bone', 'tail', 'tenderloin', 'tip', 'tongue', 'tri-tip', 'turducken', 'turkey', 'venison'] },
      StarWars: { headline: 'A Long Time Ago...', words: ['organa', 'dooku', 'hutt', 'hoth', 'binks', 'gonk', 'mara', 'ben', 'quigonn', 'kenobi', 'ventress', 'yoda', 'owen', 'jinn', 'mace', 'solo', 'darth', 'padmé', 'quigon', 'calrissian', 'jade', 'moff', 'droId', 'mandalorians', 'naboo', 'luke', 'maul', 'leia', 'bothan', 'calamari', 'jango', 'palpatine', 'mon', 'windu', 'boba', 'sebulba', 'baba', 'watto', 'han', 'wicket', 'skywalker', 'chewbacca', 'sith', 'k3po', 'coruscant', 'aayla', 'quigonn jar', 'antilles', 'anakin', 'r2d2', 'wedge', 'fett', 'jawa', 'obiwan', 'ahsoka', 'ewok', 'wampa', 'luuke', 'c3p0', 'ackbar', 'amidala', 'thrawn', 'grievous', 'dagobah', 'tusken', 'raider', 'fisto', 'wookiee', 'tatooine', 'biggs', 'yavin', 'alderaan', 'lobot', 'jabba', 'secura', 'mandalore', 'dantooine', 'skywalker luuke', 'mustafar', 'kit', 'lars', 'twilek', 'kessel', 'ponda', 'jar', 'bespin', 'bespin leia', 'gamorrean', 'greedo', 'kamino', 'vader', 'zabrak', 'sidious', 'endor', 'maul hutt', 'kashyyyk', 'utapau', 'mothma', 'c3p0 coruscant', 'lando', 'cade', 'hutt ventress', 'mon quigonn', 'calamari hutt', 'moff coruscant', 'yoda jawa', 'leia mustafar', 'c3po', 'ackbar alderaan', 'r2d2 wedge', 'calrissian darth', 'wampa quigon', 'lobot kit', 'jawa darth', 'luke windu', 'kenobi palpatine'] },
  },
}
