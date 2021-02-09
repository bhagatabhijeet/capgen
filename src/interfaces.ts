import { XMLWriterOptions } from 'xmlbuilder2/lib/interfaces';

export interface Configuration {
  strictMode: boolean;
  comment:boolean;
  xmlOptions: XMLWriterOptions;
}

export interface CapJsonObject {
  [key: string]:any;
  identifier?: any | null;
  sender?: any | null;
  sent?: any | null;
  status?: any | null;
  msgType?: any | null;
  scope?: any | null;
}

export type ErrorObject ={reason:string}
