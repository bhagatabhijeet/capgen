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
  identifier: 'Automation-7',
  sender: 'autocoreteam@blackberry.com',
  sent: '2021-02-22T05:17:00-07:00',
  status: 'Actual',
  msgType: 'Update',
  scope: 'Prive',
  restriction:"some restrictions",
  code: 'IPAWSv2.0',
  note: '',
  references:
    'w-nws.webmaster@noaa.gov,NWS-IDP-PROD-4780962-3855431,2021-02-11T03:31:00-07:00',
  info: [
    {
      language: 'en-US',
      category: ['Met'],
      event: 'Winter Weather Advisory',
      responseType: ['Execute'],
      urgency: 'Expected',
      severity: 'Moderate',
      certainty: 'Likely',
      eventCode: [
        {
          valueName: 'SAME',
          value: 'NWS',
        },
        {
          valueName: 'NationalWeatherService',
          value: 'WWY',
        },
      ],
      effective: '2021-02-11T06:03:00-07:00',
      onset: '2021-02-11T14:00:00-07:00',
      expires: '2021-02-12T06:15:00-07:00',
      senderName: 'NWS Missoula MT',
      headline: 'Test for automation',
      description: 'some description here',
      instruction: 'Instruction 1 2 3',
      web: 'http://www.weather.gov',
      parameter: [
        {
          valueName: 'NWSheadline',
          value:
            'WINTER WEATHER ADVISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO 10 AM PST FRIDAY',
        },
        {
          valueName: 'HazardType',
          value: 'Snow',
        },
        {
          valueName: 'VTEC',
          value: '/O.CON.KMSO.WW.Y.0016.210211T2100Z-210212T1800Z/',
        },
        {
          valueName: 'PIL',
          value: 'MSOWSWMSO',
        },
        {
          valueName: 'BLOCKCHANNEL',
          value: 'CMAS',
        },
        {
          valueName: 'BLOCKCHANNEL',
          value: 'EAS',
        },
        {
          valueName: 'BLOCKCHANNEL',
          value: 'NWEM',
        },
        {
          valueName: 'eventEndingTime',
          value: '2021-02-12T11:00:00-07:00',
        },
      ],
      area: [{
        areaDesc:'Orofino/Grangeville Region; Lower Hells Canyon/Salmon River Region',
        circle:["32.9525,-115.5527 0"],
        geocode: [
          {
            valueName: 'UGC',
            value: 'IDZ007',
          },
          {
            valueName: 'UGC',
            value: 'IDZ008',
          },
          {
            valueName: 'SAME',
            value: 16035,
          },
          {
            valueName: 'SAME',
            value: 16049,
          },
        ],
      }],
    },
  ],
});
console.log(capXml);
