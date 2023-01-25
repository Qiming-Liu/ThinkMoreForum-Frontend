export default async function handler(req, res) {
  const url = req.query.url.join('/');
  console.log(req.query);

  if (url === 'component/footer') {
    return res.json(footer);
  }
  if (url === 'category') {
    return res.json(category);
  }
  if (
    url === 'category/Games' ||
    url === 'category/Movies' ||
    url === 'category/Technology'
  ) {
    return res.json(games);
  }
  if (url.startsWith('category/') && url.includes('visible_post')) {
    return res.json(categoryPost);
  }
  if (url.startsWith('post/')) {
    return res.json(post);
  }
  if (url === 'post/max_count_comment') {
    return res.json(max_count_comment);
  }
  if (url.startsWith('comment/')) {
    return res.json(comments);
  }
  if (url.endsWith('visible_count')) {
    return res.json(4);
  }
}

//http://localhost:443/v1/public/component/footer
const footer = {
  id: '7c1729cc-bb6a-4abe-8d98-edff57f59c94',
  name: 'footer',
  code: '',
};

//http://localhost:443/v1/public/category/Games
const games = {
  id: '8751f1fa-c724-42c3-8d8d-a7fe438ae57e',
  pinPost: {
    id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
    title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
  },
  headImgUrl: '/category_games.png',
  color: '#ffb549',
  title: 'Games',
  description:
    'The latest video game news, discussions, announcements, industry gossip, sales figures, bargains and reviews. The pulse of the gaming industry.',
  viewCount: 689,
  postCount: 4,
  sortOrder: 0,
  participantCount: 7,
  lastUpdateTimestamp: '2022-04-02T22:02:05.037548+10:30',
};

//http://localhost:443/v1/public/category
const category = [
  {
    id: '8751f1fa-c724-42c3-8d8d-a7fe438ae57e',
    pinPost: {
      id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
      title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
    },
    headImgUrl: '/category_games.png',
    color: '#ffb549',
    title: 'Games',
    description:
      'The latest video game news, discussions, announcements, industry gossip, sales figures, bargains and reviews. The pulse of the gaming industry.',
    viewCount: 181,
    postCount: 4,
    sortOrder: 0,
    participantCount: 7,
    lastUpdateTimestamp: '2022-04-02T22:02:05.037548+10:30',
  },
  {
    id: '3c10ef8a-7e20-4aad-abb3-9ae702043e7b',
    pinPost: {
      id: 'cf20a137-b138-4800-86c1-791f3ffdebc2',
      title:
        'No Time To Die review: Thrilling but inconsistent emotional end to Daniel Craig’s Bond journey',
    },
    headImgUrl: '/category_movies.png',
    color: '#f6d04d',
    title: 'Movies',
    description:
      "Discussions about movies - what to watch, what to avoid and what's coming soon. Keep tabs on your favorite actors and celebs by following the latest rumors and gossip. ",
    viewCount: 50,
    postCount: 4,
    sortOrder: 1,
    participantCount: 7,
    lastUpdateTimestamp: '2022-04-09T16:08:55.456954+09:30',
  },
  {
    id: '10a004b6-a0a1-49a9-996c-3bee384f16f0',
    pinPost: {
      id: '9e1a83f9-bb7c-4224-9723-6a17f7c1a946',
      title: 'React 18 is now available on npm!',
    },
    headImgUrl: '/category_technology.png',
    color: '#41b6e6',
    title: 'Technology',
    description:
      'A place where all your tech troubles can be resolved. Seek advice, share your knowledge, brainstorm, shoot the breeze and enjoy the camaraderie of your IT peers.',
    viewCount: 29,
    postCount: 5,
    sortOrder: 2,
    participantCount: 6,
    lastUpdateTimestamp: '2022-04-09T16:10:33.114662+09:30',
  },
];

//http://localhost:443/v1/public/category/8751f1fa-c724-42c3-8d8d-a7fe438ae57e/visible_post?page=0&size=10&sort=createTimestamp,desc
const categoryPost = [
  {
    id: '0928c1ae-9c77-4732-baa5-3a16198483b1',
    postUsers: {
      id: '288004fd-5817-4829-a30d-bfb2f8b1db9b',
      headImgUrl:
        'https://img.thinkmoreapp.com/image/7b5ec130080492d454f4888ce1193507.jpg',
      username: 'Alan',
    },
    category: {
      id: '8751f1fa-c724-42c3-8d8d-a7fe438ae57e',
      title: 'Games',
    },
    headImgUrl:
      'https://img.thinkmoreapp.com/image/7d473562b0956bddac9706cfcbc9e4b5.jpg',
    title: '‘Weird West’ Review: A Clawful of Dollars Under the High Moon',
    context:
      '<h2>Weird West brings the hybrid genre of fantasy and horror Western to PC and consoles through the lens of an immersive sim filled with choices and possibilities.</h2><h2><br></h2><h2>It’s not every day that we receive an immersive sim, let alone one made by veteran developers from games such as Dishonored or Prey, but that’s exactly what WolfEye Studios’ has delivered with Weird West, a bold incursion into a setting which hasn’t received nearly as much attention as it deserves — think of the classic Western tropes and ambience mixed with fantasy and horror elements. It’s a (mostly literary and cinematic) blend that hasn’t been explored much in video games, although recent titles such as Hard West or West of Dead made a significant push for the genre.</h2><h2><br></h2><h2>Of couse, the main selling point here is that Weird West comes from the makers of Dishonored, the 2012 hit video game that masterfully combined first-person action with non-linear levels and the high levels of interaction of immersive sims. I can happily confirm the ex-Arkane devs have successfully transferred much of that DNA into a game that has its own voice and mannerisms.</h2>',
    viewCount: 730,
    followCount: 0,
    commentCount: 2,
    visibility: true,
    createTimestamp: '2022-04-02T21:47:58.584589+10:30',
  },
  {
    id: '9ff9a146-6ec0-4611-b0c1-d221857ffbae',
    postUsers: {
      id: '288004fd-5817-4829-a30d-bfb2f8b1db9b',
      headImgUrl:
        'https://img.thinkmoreapp.com/image/7b5ec130080492d454f4888ce1193507.jpg',
      username: 'Alan',
    },
    category: {
      id: '8751f1fa-c724-42c3-8d8d-a7fe438ae57e',
      title: 'Games',
    },
    headImgUrl:
      'https://img.thinkmoreapp.com/image/e836b16ba631058d3a92bfad6a377c5d.jpg',
    title:
      'Former PlayStation Exclusive Godfall Receives Xbox Rating Ahead of April 7 Release',
    context:
      '<h2>Godfall was first confirmed as a PlayStation 5 console exclusive back at the 2019 The Game Awards show. This game was developed by Counterplay Games and published by Gearbox Software, being a multiplayer focused looter-shooter title with heavy emphasis on melee combat. While it also released on PC as an Epic Games Store exclusive, the console exclusivity deal was timed, with Godfall getting a port to the PS4 console last year. This backport was announced alongside its first expansion Fire &amp; Darkness at E3 2021.</h2><h2><br></h2><h2>With Godfall no longer beholden to be a PS5 console exclusive, this allows for the title to come onto other systems. More specifically, Godfall: Ultimate Edition will be coming to the Xbox One and Xbox Series X later this month, which will provide players the full experience right out of the gate. This includes not only the base game, but also all of its post-launch content including the aforementioned Fire &amp; Darkness expansion.</h2><h2><br></h2><h2>The ESRB has given Godfall\'s Xbox ports a rating ahead of its release on April 7, detailing that it will be rated T for Teen, just like its PlayStation counterpart. It specifically cites "Animated Blood" and "Violence" for its rating of Godfall, which coincides with the melee action gameplay combined with its looter shooter mechanics. The rating summary even picks out an example where the characters will have splatters of blue blood to punctuate the gameplay.</h2><h2><br></h2><h2>This rating for Godfall also mentions how players can interact with each other, due to its co-operative nature. Since this rating is only for the Xbox versions of the game, it only lists that Xbox One and Xbox Series users can play with each other. It doesn\'t list the PC or PlayStation versions of the game under this category so crossplay is unlikely to be implemented at this time.</h2><h2><br></h2><h2>The reputation of Godfall still remains on the mixed to negative spectrum, with some taking umbrage with its loot-based progression and implementation falling short. The game was given further black-eyes due to a series of controversies, such as Godfall: Challenger Edition which contained less content than the base game. This controversy stood out even more than it probably should have since it was a free PS Plus game for December 2021. The release of this game on the Xbox will be interesting to see if it will result in any renewed interest or future developments.</h2><h2><br></h2><h2>Godfall is out now for PC, PS4, PS5, with the Xbox One and Xbox Series X versions launching April 7.</h2>',
    viewCount: 689,
    followCount: 0,
    commentCount: 1,
    visibility: true,
    createTimestamp: '2022-04-02T21:39:23.111844+10:30',
  },
  {
    id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
    postUsers: {
      id: '95ad31db-3e15-4166-b0ef-aa4eb1576f9c',
      headImgUrl:
        'https://img.thinkmoreapp.com/image/a09c38f71e76ad8a538ae9afa0bf5f32.jpg',
      username: 'Zzyang',
    },
    category: {
      id: '8751f1fa-c724-42c3-8d8d-a7fe438ae57e',
      title: 'Games',
    },
    headImgUrl:
      'https://img.thinkmoreapp.com/image/f702ad38837de2ebdf5fc14cb7e22843.jpg',
    title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
    context:
      '<h2>Elden Ring is off to an incredibly strong start as it has already sold 12 million copies worldwide since its February 25 release date.</h2><h2><br></h2><h2>FromSoftware and Bandai Namco shared the news in a press release, stating that Elden Ring has sold more than one million copies in Japan alone and 12 million copies worldwide as of March 14, 2022. These sales are "derived from distribution figures of the package version and sales figures of the downloadable versions."</h2><h2><br></h2><h2><br></h2><h2>"It\'s astonishing to see just how many people have been playing Elden Ring," FromSoftware President and CEO/director Hidetaka Miyazaki said. "I\'d like to extend our heartfelt thanks on behalf of the entire development team. Elden Ring is based on a mythological story written by George R. R. Martin. We hope players enjoy a high level of freedom when adventuring through its vast world, exploring its many secrets and facing up to its many threats. Thank you for your continued support."</h2><h2><br></h2><h2>President and CEO of Bandai Namco Yasuo Miyakawa also shared some words in celebration of Elden Ring\'s success, saying this is only the beginning for the brand new IP.</h2><h2><br></h2><h2>"Much effort was placed into creating ELDEN RING so that we could exceed the expectations of our fans worldwide," Miyakawa said. "In like manner, we will continue our efforts in expanding the brand beyond the game itself, and into everyone’s daily life. We will continue to create enjoyment and fulfillment through entertainment, so that we can come closer and connect to our fans around the world."</h2><h2><br></h2><h2><br></h2><h2>For comparison, Sekiro: Shadows Die Twice - FromSoftware\'s previous game - sold two million copies in 10 days. Bloodborne, which was only released on PS4, sold over 1 million copies within two weeks of its launch back in 2015.</h2><h2><br></h2><h2>In 2015, Famitsu revealed that Dark Souls, Dark Souls with the Artorias of the Abyss expansion, Dark Souls II, and the remastered release Scholar of the First Sin had sold over eight million copies worldwide. For context, Dark Souls 2 was released on March 11, 2014.</h2><h2><br></h2><h2>Dark Souls 3 was Bandai Namco\'s fastest-selling title in its history and it sold over three million copies about a month after its worldwide release in April 2016.</h2><h2><br></h2><h2><br></h2><h2>In our 10/10 review of Elden Ring, we said that it is a "massive iteration on what FromSoftware began with the Souls series, bringing its relentlessly challenging combat to an incredible open world that gives us the freedom to choose our own path."</h2><h2><br></h2><h2>For more, check out our extensive Wiki guide that will help you survive in the Lands Between, how it is Europe\'s biggest new IP since The Division, and where it already ranks on our list of the top 10 open-world games of all time.</h2><h2><br></h2><h2>Source: <a href="https://www.ign.com/articles/elden-ring-has-already-sold-12-million-copies-worldwide" rel="noopener noreferrer" target="_blank">https://www.ign.com/articles/elden-ring-has-already-sold-12-million-copies-worldwide</a></h2>',
    viewCount: 120,
    followCount: 0,
    commentCount: 6,
    visibility: true,
    createTimestamp: '2022-04-02T21:38:23.553062+10:30',
  },
  {
    id: '6bf6fe43-fbd4-4aed-a5b5-ba4fa48c96f8',
    postUsers: {
      id: 'd9957e83-87e5-4516-9b84-2d4bb6532033',
      headImgUrl:
        'https://img.thinkmoreapp.com/image/1ea56f861a5b8233f406a73633684108.jpg',
      username: 'Will',
    },
    category: {
      id: '8751f1fa-c724-42c3-8d8d-a7fe438ae57e',
      title: 'Games',
    },
    headImgUrl:
      'https://img.thinkmoreapp.com/image/e94e34226509fa3b3f09e903bfd33fa0.jpg',
    title: 'Zelda: Breath Of The Wild 2 Release Delayed To Spring 2023',
    context:
      '<h2>Nintendo has announced that The Legend of Zelda: Breath of the Wild 2 has been delayed from its original 2022 window.</h2><h2><br></h2><h2>will not launch on time in 2022. Instead, the game has been given a Spring 2023 window, series producer Eiji Aonuma announced in a video update.</h2><h2><br></h2><h2>"For those of you who have been looking forward to a release this year, we apologize," Aonuma said. "The adventure in the sequel will take place not just on the ground as in the previous game but also in the skies above. However, the expanded world goes beyond that, and there will be an even wider variety of features you can enjoy, including new encounters and new gameplay elements."</h2><h2><br></h2><h2>Aonuma said the delay was necessary to make sure the game\'s experience is "something special" for players. "The entire development team is continuing to work diligently on this game," he said.</h2><h2><br></h2><h2>Breath of the Wild was a launch title for the Switch in 2017. It went on to sell 25.8 million copies worldwide as of December 31, 2021, making it one of the best-selling Switch games ever.</h2><h2><br></h2><h2>Nintendo\'s Bill Trinen has explained that Nintendo is purposefully holding back revealing the name of the sequel because "Zelda names are kind of important." Reading between the lines here, it sounds like the sequel\'s title will allude to some kind of story element.</h2><h2><br></h2><h2>"As for why we\'re holding back on the name, you\'ll just have to stay tuned because, obviously, Zelda names are kind of important," Trinen said. "Those subtitles… they start to give little bits of hints about maybe what\'s going to happen."</h2><h2><br></h2><h2>He added: "[Breath of the Wild 2] is going to be shorthand and it\'s natural for people to want to find a shorthand way to frame it. We\'re still calling it the sequel to Breath of the Wild."</h2><h2><br></h2><h2>During Nintendo\'s E3 2021 briefing, the company revealed a new trailer for the game that may contain some clues about what to expect. Check out GameSpot\'s Breath of the Wild 2 trailer breakdown video to learn more, while you can also see our Breath of the Wild 2 preorder guide.</h2>',
    viewCount: 28,
    followCount: 0,
    commentCount: 4,
    visibility: true,
    createTimestamp: '2022-04-02T21:37:20.053054+10:30',
  },
];

//http://localhost:443/v1/public/post/3017f26a-4117-41ac-af3a-a5c9b0bd7d8e
const post = {
  id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
  postUsers: {
    id: '95ad31db-3e15-4166-b0ef-aa4eb1576f9c',
    headImgUrl:
      'https://img.thinkmoreapp.com/image/a09c38f71e76ad8a538ae9afa0bf5f32.jpg',
    username: 'Zzyang',
  },
  category: {
    id: '8751f1fa-c724-42c3-8d8d-a7fe438ae57e',
    title: 'Games',
  },
  headImgUrl:
    'https://img.thinkmoreapp.com/image/f702ad38837de2ebdf5fc14cb7e22843.jpg',
  title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
  context:
    '<h2>Elden Ring is off to an incredibly strong start as it has already sold 12 million copies worldwide since its February 25 release date.</h2><h2><br></h2><h2>FromSoftware and Bandai Namco shared the news in a press release, stating that Elden Ring has sold more than one million copies in Japan alone and 12 million copies worldwide as of March 14, 2022. These sales are "derived from distribution figures of the package version and sales figures of the downloadable versions."</h2><h2><br></h2><h2><br></h2><h2>"It\'s astonishing to see just how many people have been playing Elden Ring," FromSoftware President and CEO/director Hidetaka Miyazaki said. "I\'d like to extend our heartfelt thanks on behalf of the entire development team. Elden Ring is based on a mythological story written by George R. R. Martin. We hope players enjoy a high level of freedom when adventuring through its vast world, exploring its many secrets and facing up to its many threats. Thank you for your continued support."</h2><h2><br></h2><h2>President and CEO of Bandai Namco Yasuo Miyakawa also shared some words in celebration of Elden Ring\'s success, saying this is only the beginning for the brand new IP.</h2><h2><br></h2><h2>"Much effort was placed into creating ELDEN RING so that we could exceed the expectations of our fans worldwide," Miyakawa said. "In like manner, we will continue our efforts in expanding the brand beyond the game itself, and into everyone’s daily life. We will continue to create enjoyment and fulfillment through entertainment, so that we can come closer and connect to our fans around the world."</h2><h2><br></h2><h2><br></h2><h2>For comparison, Sekiro: Shadows Die Twice - FromSoftware\'s previous game - sold two million copies in 10 days. Bloodborne, which was only released on PS4, sold over 1 million copies within two weeks of its launch back in 2015.</h2><h2><br></h2><h2>In 2015, Famitsu revealed that Dark Souls, Dark Souls with the Artorias of the Abyss expansion, Dark Souls II, and the remastered release Scholar of the First Sin had sold over eight million copies worldwide. For context, Dark Souls 2 was released on March 11, 2014.</h2><h2><br></h2><h2>Dark Souls 3 was Bandai Namco\'s fastest-selling title in its history and it sold over three million copies about a month after its worldwide release in April 2016.</h2><h2><br></h2><h2><br></h2><h2>In our 10/10 review of Elden Ring, we said that it is a "massive iteration on what FromSoftware began with the Souls series, bringing its relentlessly challenging combat to an incredible open world that gives us the freedom to choose our own path."</h2><h2><br></h2><h2>For more, check out our extensive Wiki guide that will help you survive in the Lands Between, how it is Europe\'s biggest new IP since The Division, and where it already ranks on our list of the top 10 open-world games of all time.</h2><h2><br></h2><h2>Source: <a href="https://www.ign.com/articles/elden-ring-has-already-sold-12-million-copies-worldwide" rel="noopener noreferrer" target="_blank">https://www.ign.com/articles/elden-ring-has-already-sold-12-million-copies-worldwide</a></h2>',
  viewCount: 120,
  followCount: 0,
  commentCount: 6,
  visibility: true,
  createTimestamp: '2022-04-02T21:38:23.553062+10:30',
};

//http://localhost:443/v1/public/comment/3017f26a-4117-41ac-af3a-a5c9b0bd7d8e
const comments = [
  {
    id: '469ae622-d749-4593-b135-d6f2cc8b1553',
    commentUsers: {
      id: '288004fd-5817-4829-a30d-bfb2f8b1db9b',
      headImgUrl:
        'https://img.thinkmoreapp.com/image/7b5ec130080492d454f4888ce1193507.jpg',
      username: 'Alan',
    },
    mentionUsers: null,
    post: {
      id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
      title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
    },
    parentComment: null,
    context: 'laotouhuan!',
    visibility: true,
    createTimestamp: '2022-04-02T21:43:46.49917+10:30',
  },
  {
    id: '20d58e0f-8861-4575-93bd-44be72ce7731',
    commentUsers: {
      id: 'd9957e83-87e5-4516-9b84-2d4bb6532033',
      headImgUrl:
        'https://img.thinkmoreapp.com/image/1ea56f861a5b8233f406a73633684108.jpg',
      username: 'Will',
    },
    mentionUsers: null,
    post: {
      id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
      title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
    },
    parentComment: null,
    context: '👻',
    visibility: true,
    createTimestamp: '2022-04-02T21:43:59.252394+10:30',
  },
  {
    id: '8369573c-dbab-4bc3-8c46-8645c9e84e56',
    commentUsers: {
      id: '9cadfabc-7aa1-4125-b8ee-08df40a0f4fd',
      headImgUrl:
        'https://img.thinkmoreapp.com/image/de6eefdfce6e519f65b76df82c096885.jpg',
      username: 'Zhenhaodd',
    },
    mentionUsers: null,
    post: {
      id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
      title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
    },
    parentComment: null,
    context: 'Good game!!!!!!!',
    visibility: true,
    createTimestamp: '2022-04-02T22:00:31.171686+10:30',
  },
  {
    id: '433bfca4-1a24-4f8c-9922-4e0866feb0fa',
    commentUsers: {
      id: '9cadfabc-7aa1-4125-b8ee-08df40a0f4fd',
      headImgUrl:
        'https://img.thinkmoreapp.com/image/de6eefdfce6e519f65b76df82c096885.jpg',
      username: 'Zhenhaodd',
    },
    mentionUsers: null,
    post: {
      id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
      title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
    },
    parentComment: {
      id: '469ae622-d749-4593-b135-d6f2cc8b1553',
    },
    context: '@Alan What laotou',
    visibility: true,
    createTimestamp: '2022-04-02T22:00:49.124393+10:30',
  },
  {
    id: 'd00a3f9a-e451-4220-baa3-00780c37949c',
    commentUsers: {
      id: 'dd293626-7448-4ce9-90be-a04a76e4c67e',
      headImgUrl:
        'https://img.thinkmoreapp.com/image/65dc5650bf01a0236225257081802b9d.jpg',
      username: 'melissatzt24',
    },
    mentionUsers: null,
    post: {
      id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
      title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
    },
    parentComment: null,
    context: 'Elden Ring is an absolute masterpiece.',
    visibility: true,
    createTimestamp: '2022-04-02T22:00:52.426829+10:30',
  },
  {
    id: 'b6de5dd1-10c6-4da8-9da8-c7b216cf269b',
    commentUsers: {
      id: '2158aafe-ddba-45e2-a512-ee95cbcf4bc0',
      headImgUrl:
        'https://img.thinkmoreapp.com/image/0234e6341035727362960025073c5871.jpg',
      username: 'Gabriel',
    },
    mentionUsers: null,
    post: {
      id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
      title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
    },
    parentComment: null,
    context: 'Wow wonderful game!',
    visibility: true,
    createTimestamp: '2022-04-02T22:02:05.010933+10:30',
  },
];

//http://localhost:443/v1/public/post/max_count_comment
const max_count_comment = {
  post: {
    id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
    postUsers: {
      id: '95ad31db-3e15-4166-b0ef-aa4eb1576f9c',
      headImgUrl:
        'https://img.thinkmoreapp.com/image/a09c38f71e76ad8a538ae9afa0bf5f32.jpg',
      username: 'Zzyang',
    },
    category: {
      id: '8751f1fa-c724-42c3-8d8d-a7fe438ae57e',
      title: 'Games',
    },
    headImgUrl:
      'https://img.thinkmoreapp.com/image/f702ad38837de2ebdf5fc14cb7e22843.jpg',
    title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
    context:
      '<h2>Elden Ring is off to an incredibly strong start as it has already sold 12 million copies worldwide since its February 25 release date.</h2><h2><br></h2><h2>FromSoftware and Bandai Namco shared the news in a press release, stating that Elden Ring has sold more than one million copies in Japan alone and 12 million copies worldwide as of March 14, 2022. These sales are "derived from distribution figures of the package version and sales figures of the downloadable versions."</h2><h2><br></h2><h2><br></h2><h2>"It\'s astonishing to see just how many people have been playing Elden Ring," FromSoftware President and CEO/director Hidetaka Miyazaki said. "I\'d like to extend our heartfelt thanks on behalf of the entire development team. Elden Ring is based on a mythological story written by George R. R. Martin. We hope players enjoy a high level of freedom when adventuring through its vast world, exploring its many secrets and facing up to its many threats. Thank you for your continued support."</h2><h2><br></h2><h2>President and CEO of Bandai Namco Yasuo Miyakawa also shared some words in celebration of Elden Ring\'s success, saying this is only the beginning for the brand new IP.</h2><h2><br></h2><h2>"Much effort was placed into creating ELDEN RING so that we could exceed the expectations of our fans worldwide," Miyakawa said. "In like manner, we will continue our efforts in expanding the brand beyond the game itself, and into everyone’s daily life. We will continue to create enjoyment and fulfillment through entertainment, so that we can come closer and connect to our fans around the world."</h2><h2><br></h2><h2><br></h2><h2>For comparison, Sekiro: Shadows Die Twice - FromSoftware\'s previous game - sold two million copies in 10 days. Bloodborne, which was only released on PS4, sold over 1 million copies within two weeks of its launch back in 2015.</h2><h2><br></h2><h2>In 2015, Famitsu revealed that Dark Souls, Dark Souls with the Artorias of the Abyss expansion, Dark Souls II, and the remastered release Scholar of the First Sin had sold over eight million copies worldwide. For context, Dark Souls 2 was released on March 11, 2014.</h2><h2><br></h2><h2>Dark Souls 3 was Bandai Namco\'s fastest-selling title in its history and it sold over three million copies about a month after its worldwide release in April 2016.</h2><h2><br></h2><h2><br></h2><h2>In our 10/10 review of Elden Ring, we said that it is a "massive iteration on what FromSoftware began with the Souls series, bringing its relentlessly challenging combat to an incredible open world that gives us the freedom to choose our own path."</h2><h2><br></h2><h2>For more, check out our extensive Wiki guide that will help you survive in the Lands Between, how it is Europe\'s biggest new IP since The Division, and where it already ranks on our list of the top 10 open-world games of all time.</h2><h2><br></h2><h2>Source: <a href="https://www.ign.com/articles/elden-ring-has-already-sold-12-million-copies-worldwide" rel="noopener noreferrer" target="_blank">https://www.ign.com/articles/elden-ring-has-already-sold-12-million-copies-worldwide</a></h2>',
    viewCount: 121,
    followCount: 0,
    commentCount: 6,
    visibility: true,
    createTimestamp: '2022-04-02T21:38:23.553062+10:30',
  },
  comments: [
    {
      id: '469ae622-d749-4593-b135-d6f2cc8b1553',
      commentUsers: {
        id: '288004fd-5817-4829-a30d-bfb2f8b1db9b',
        headImgUrl:
          'https://img.thinkmoreapp.com/image/7b5ec130080492d454f4888ce1193507.jpg',
        username: 'Alan',
      },
      mentionUsers: null,
      post: {
        id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
        title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
      },
      parentComment: null,
      context: 'laotouhuan!',
      visibility: true,
      createTimestamp: '2022-04-02T21:43:46.49917+10:30',
    },
    {
      id: '20d58e0f-8861-4575-93bd-44be72ce7731',
      commentUsers: {
        id: 'd9957e83-87e5-4516-9b84-2d4bb6532033',
        headImgUrl:
          'https://img.thinkmoreapp.com/image/1ea56f861a5b8233f406a73633684108.jpg',
        username: 'Will',
      },
      mentionUsers: null,
      post: {
        id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
        title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
      },
      parentComment: null,
      context: '👻',
      visibility: true,
      createTimestamp: '2022-04-02T21:43:59.252394+10:30',
    },
    {
      id: '8369573c-dbab-4bc3-8c46-8645c9e84e56',
      commentUsers: {
        id: '9cadfabc-7aa1-4125-b8ee-08df40a0f4fd',
        headImgUrl:
          'https://img.thinkmoreapp.com/image/de6eefdfce6e519f65b76df82c096885.jpg',
        username: 'Zhenhaodd',
      },
      mentionUsers: null,
      post: {
        id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
        title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
      },
      parentComment: null,
      context: 'Good game!!!!!!!',
      visibility: true,
      createTimestamp: '2022-04-02T22:00:31.171686+10:30',
    },
    {
      id: '433bfca4-1a24-4f8c-9922-4e0866feb0fa',
      commentUsers: {
        id: '9cadfabc-7aa1-4125-b8ee-08df40a0f4fd',
        headImgUrl:
          'https://img.thinkmoreapp.com/image/de6eefdfce6e519f65b76df82c096885.jpg',
        username: 'Zhenhaodd',
      },
      mentionUsers: null,
      post: {
        id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
        title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
      },
      parentComment: {
        id: '469ae622-d749-4593-b135-d6f2cc8b1553',
      },
      context: '@Alan What laotou',
      visibility: true,
      createTimestamp: '2022-04-02T22:00:49.124393+10:30',
    },
    {
      id: 'd00a3f9a-e451-4220-baa3-00780c37949c',
      commentUsers: {
        id: 'dd293626-7448-4ce9-90be-a04a76e4c67e',
        headImgUrl:
          'https://img.thinkmoreapp.com/image/65dc5650bf01a0236225257081802b9d.jpg',
        username: 'melissatzt24',
      },
      mentionUsers: null,
      post: {
        id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
        title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
      },
      parentComment: null,
      context: 'Elden Ring is an absolute masterpiece.',
      visibility: true,
      createTimestamp: '2022-04-02T22:00:52.426829+10:30',
    },
    {
      id: 'b6de5dd1-10c6-4da8-9da8-c7b216cf269b',
      commentUsers: {
        id: '2158aafe-ddba-45e2-a512-ee95cbcf4bc0',
        headImgUrl:
          'https://img.thinkmoreapp.com/image/0234e6341035727362960025073c5871.jpg',
        username: 'Gabriel',
      },
      mentionUsers: null,
      post: {
        id: '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e',
        title: 'Elden Ring Has Already Sold 12 Million Copies Worldwide',
      },
      parentComment: null,
      context: 'Wow wonderful game!',
      visibility: true,
      createTimestamp: '2022-04-02T22:02:05.010933+10:30',
    },
  ],
};
