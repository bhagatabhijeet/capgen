import { builder, create, fragment } from 'xmlbuilder2';
import { XMLBuilder, XMLWriterOptions } from 'xmlbuilder2/lib/interfaces';
import { ErrorObject, CapJsonObject, Configuration } from './interfaces';

export class Capgen {
  err: ErrorObject = { reason: '' };

  config: Configuration;

  private capJsonObject: CapJsonObject;

  constructor(config: Configuration) {
    this.config = config;
    this.capJsonObject = {};
  }

  /**
   * @description createUsing method is the main method that generates the CAP1.2 XML
   * @param capJsonObject CapJsonObject
   */
  createUsing(capJsonObject: CapJsonObject): string | ErrorObject {
    this.capJsonObject = capJsonObject;
    const xml = create({
      version: '1.0',
      standalone: 'yes',
      encoding: 'UTF-8',
    }).ele('urn:oasis:names:tc:emergency:cap:1.2', 'alert');
    const rootNode = xml.root();

    // *** Mandatory NODES ****
    // identifier, sender, sent, status,msgType,scope,
    const mandatoryNodesSet1 = [
      'identifier',
      'sender',
      'sent',
      'status',
      'msgType',
      'scope',
    ];

    for (const capElem of mandatoryNodesSet1) {
      const idNode = this.capElement(capElem);
      if (typeof idNode === 'object') {
        return idNode;
      } else {
        if (!idNode.startsWith('<!--')) {
          rootNode.ele(idNode);
        } else if (this.config.comment) {
          rootNode.ele(idNode);
        }
      }
    }

    // *** Optional /Conditional NODES ****
    // source,restriction,addresses
    const optionalSet1 = ['source', 'restriction','addresses'];

    for (const capOptElem of optionalSet1) {
      const optionalNode1 = this.capOptionalElement(capOptElem);
      if (optionalNode1 !== '') {
        rootNode.ele(optionalNode1);
      }
    }

    // *** Optional /Conditional NODES ****
    // code *** THERE CAN BE MULTIPLE CODE node
    if (
      this.capJsonObject.hasOwnProperty("code") &&
      this.capJsonObject["code"] !== null
    ) {
      if(Array.isArray(this.capJsonObject["code"])){
        for(const code of this.capJsonObject["code"]){
          rootNode.ele("code").txt(code);
        }
      }
      else
      {
        rootNode.ele("code").txt(this.capJsonObject["code"]);
      }
    }
    
    const optionalSet2 = ['source', 'restriction','addresses'];

    for (const capOptElem of optionalSet1) {
      const optionalNode1 = this.capOptionalElement(capOptElem);
      if (optionalNode1 !== '') {
        rootNode.ele(optionalNode1);
      }
    }


    return xml.end(this.config.xmlOptions);
  }

  private capElement(capElementName: string): ErrorObject | string {
    let node;
    let returnNode;
    // when strict mode is true
    if (this.config.strictMode) {
      if (
        !this.capJsonObject.hasOwnProperty(capElementName) ||
        this.capJsonObject[capElementName] === null
      ) {
        const err: ErrorObject = {
          reason: `'${capElementName}' is not provided or has value null`,
        };
        return err;
      }
    }
    returnNode = create();
    if (
      this.capJsonObject.hasOwnProperty(capElementName) &&
      this.capJsonObject[capElementName] !== null
    ) {
      returnNode.ele(capElementName).txt(this.capJsonObject[capElementName]);
    } else {
      returnNode.com(
        `Invalid CAP xml.Reason : '${capElementName}' is not provided or is null,
          XML is still generated as 'strictMode' configuration is false`
      );
    }
    return returnNode.first().toString();
  }

  private capOptionalElement(capElementName: string): string {
    let node;
    let returnNode;
   
    returnNode = create();
    if (
      this.capJsonObject.hasOwnProperty(capElementName) &&
      this.capJsonObject[capElementName] !== null
    ) {
      returnNode.ele(capElementName).txt(this.capJsonObject[capElementName]);
      return returnNode.first().toString();
    } else {
      return '';
    }
  }
}
