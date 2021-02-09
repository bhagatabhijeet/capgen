import { XMLWriterOptions } from 'xmlbuilder2/lib/interfaces';

export interface Configuration {
  strictMode: boolean;
  comment: boolean;
  xmlOptions: XMLWriterOptions;
}

export interface ParameterNode {
  valueName?: any | null;
  value?: any | null;
}

export interface CapAlertInfoNodeObject {
  [key: string]: any;
  language?: any | null;
  category?: any[] | null;
  event?: any | null;
  responseType?: any[] | null;
  urgency?: any | null;
  severity?: any | null;
  certainty?: any | null;
  audience?: any | null;
  eventCode?: any | null;
  effective?: any | null;
  onset?: any | null;
  expires?: any | null;
  senderName?: any | null;
  headline?: any | null;
  description?: any | null;
  instruction?: any | null;
  web?: any | null;
  contact?: any | null;
  parameter?: ParameterNode[];
}

export interface CapAlertNodeObject {
  [key: string]: any;
  identifier?: any | null;
  sender?: any | null;
  sent?: any | null;
  status?: any | null;
  msgType?: any | null;
  scope?: any | null;
  source?: any | null;
  addresses?: any | null;
  code?: any | any[] | null;
  note?: any | null;
  references?: any | null;
  incidents?: any | null;
  info?: CapAlertInfoNodeObject[];
}

export type ErrorObject = { reason: string };
