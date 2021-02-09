import { Capgen } from './capgen';
import { Configuration } from './interfaces';

const configuration:Configuration = {
  strictMode: false,
  comment:true,
  xmlOptions: {
    headless: true,
    prettyPrint: true,
  },
};

const gen = new Capgen(configuration);
const capXml = gen.createUsing({
  identifier: 123,
  sender: 'Abhijeet',
  source:"FeedJar",
  code:["2.1","2.2"]
});
console.log(capXml);
