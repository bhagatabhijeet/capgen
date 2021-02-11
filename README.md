# capgen
A package to generate Common Alerting Protocol XML Payload

CAP 1.2 is a popular Common Alerting protocol/specification.

Find the CAP Specification details at [CAP Stanard ](http://docs.oasis-open.org/emergency/cap/v1.2/CAP-v1.2-os.html)

<p align="center">

[![npm version](https://badge.fury.io/js/capgen.svg)](https://badge.fury.io/js/capgen)
[![GitHub license](https://img.shields.io/github/license/bhagatabhijeet/capgen)](https://github.com/bhagatabhijeet/capgen/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/bhagatabhijeet/capgen)](https://github.com/bhagatabhijeet/capgen/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/bhagatabhijeet/capgen)](https://github.com/bhagatabhijeet/capgen/issues)
[![GitHub forks](https://img.shields.io/github/forks/bhagatabhijeet/capgen)](https://github.com/bhagatabhijeet/capgen/network)
</p>

# Code
- Simply import Capgen from capgen package. NPM URL: https://www.npmjs.com/package/capgen
``` npm install capgen```
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
# ChangeLog
see change log [here](./CHANGELOG.md)