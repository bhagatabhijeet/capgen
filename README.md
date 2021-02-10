# capgen
A package to generate Common Alerting Protocol XML Payload

# Code
- Simply import Capgen from capgen package. 
- create instance of Capgen class by passing the config object to the constructor.
- generate the cap xml using the 'createUsing' method.


```JS
import { Capgen} from 'capgen';


const config={
  strictMode:false,
  comment:false,
  xmlOptions:{
    headless:true,
    prettyPrint:true
  }
}

const gen = new Capgen(config);
const xml =gen.createUsing({
  
  sender: 'Abhijeet',
  sent: 'Monday 09 feb 2021 21:38:00 +8:00',
  status: 'Active',
  msgType: 'Alert',
  source: 'FeedJar',
  scope: 'Public',
  code: ['2.1', '2.2'],
  info: [
    {
      category: ["A","B"],
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

console.log(xml);
```
