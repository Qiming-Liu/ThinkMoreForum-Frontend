import * as staticData from '../../../utils/staticData';

export default function handler(req: any, res: any) {
  const access_url = `/${req.query.url.join('/')}`;

  const dataList = [
    staticData.category,
    staticData.max_count_comment,
    staticData.post1,
    staticData.post2,
    staticData.post3,
    staticData.postList,
    staticData.footer,
    staticData.login,
    staticData.notificationList,
    staticData.Alan,
    staticData.followingAlan,
    staticData.followerAlan,
    staticData.postAlan,
    staticData.userAll,
    staticData.roleAll,
  ];

  const static_data = dataList.find((item: any) => item.url === access_url);
  if (static_data) {
    return res.status(200).json(static_data.data);
  }

  console.log('url', access_url);
}
