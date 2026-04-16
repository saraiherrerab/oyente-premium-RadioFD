export const RADIO_CONFIG = {
  name: 'Estrella FM',
  tagline: 'Tu música, tu radio',
  streamUrl: 'https://streamingned.com:7190/stream',
  social: {
    website: 'https://example.com',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://x.com',
    youtube: 'https://youtube.com/@nombreradio',
    tiktok: 'https://tiktok.com/@nombreradio',
  },
  viewers: {
    enabled: true,
    count: 1,
  },
  radios: [
    {
      id: 1,
      name: 'Estrella FM',
      streamUrl: 'https://streamingned.com:7190/stream',
      metadataUrl: null,
      logo: require('../../assets/icons/radiologo.png'),
      coverImage: require('../../assets/icons/disco1.jpg'),
    },
    {
      id: 2,
      name: 'Radio 2',
      streamUrl: 'https://example.com/radio2/stream',
      metadataUrl: null,
      logo: require('../../assets/icons/radiologo.png'),
      coverImage: require('../../assets/icons/disco2.jpg'),
    },
    {
      id: 3,
      name: 'Radio 3',
      streamUrl: 'https://example.com/radio3/stream',
      metadataUrl: null,
      logo: require('../../assets/icons/radiologo.png'),
      coverImage: require('../../assets/icons/disco3.jpg'),
    },
  ],
};
