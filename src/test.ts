import { Capgen } from './capgen';
import { Configuration } from './interfaces';

const configuration: Configuration = {
  strictMode: false,
  comment: false,
  xmlOptions: {
    headless: true,
    prettyPrint: true,
  },
};

const gen = new Capgen(configuration);
const capXml = gen.createUsing({
  identifier: 123,
  sender: 'Abhijeet',
  sent: '123456',
  status: 'Active',
  msgType: 'Alert',
  source: 'FeedJar',
  scope: 'Public',
  code: ['2.1', '2.2'],
  info: [
    {
      category: ["A","B"],
      event:'Alert Advisory',
      eventCode:["e1","e2"],
      parameter: [
        {
          valueName: 'same',
          value: 'CEM',
        },
        {
          valueName: 'ISOK',
          value: 'OK',
        },
      ],
      resource:[{
        resourceDesc:"IWS",
        mimeType:"html"
      },
      {
        resourceDesc:"IWS",
        mimeType:"image" ,
        digest:'SHA1'
      }
    ],
    area:[
      {
        areaDesc:"Taylor; Clark",
        geocode:[
          {
            valueName:"UGC",
            value:"WIZ017"
          },
          {
            valueName:"UGC",
            value:"WIZ017"
          },
          {
            valueName:"UGC",
            value:"WIZ017"
          }
        ]
      }
    ]
    },
  ],
});
console.log(capXml);
