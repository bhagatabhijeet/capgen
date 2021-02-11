import { builder, create, fragment } from 'xmlbuilder2';
import { XMLBuilder, XMLWriterOptions } from 'xmlbuilder2/lib/interfaces';
import { ErrorObject, CapAlertNodeObject, Configuration } from './interfaces';

export class Capgen {
  err: ErrorObject = { reason: '' };

  config: Configuration;

  private capJsonObject: CapAlertNodeObject;

  constructor(config: Configuration) {
    this.config = config;
    this.capJsonObject = {};
  }

  /**
   * @description createUsing method is the main method that generates the CAP1.2 XML
   * @param capJsonObject CapJsonObject
   */
  createUsing(capJsonObject: CapAlertNodeObject): string | ErrorObject {
    this.capJsonObject = capJsonObject;
    const xml = create({
      version: '1.0',
      standalone: 'yes',
      encoding: 'UTF-8',
    }).ele('urn:oasis:names:tc:emergency:cap:1.2', 'alert');
    const rootNode = xml.root();
    //#region AlertNode
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
      const idNode = this.capElement(capElem, this.capJsonObject);
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
    const optionalSet1 = ['source', 'restriction', 'addresses'];

    for (const capOptElem of optionalSet1) {
      const optionalNode1 = this.capOptionalElement(
        capOptElem,
        this.capJsonObject
      );
      if (optionalNode1 !== '') {
        rootNode.ele(optionalNode1);
      }
    }

    // *** Optional /Conditional NODES ****
    // code *** THERE CAN BE MULTIPLE CODE node
    if (
      this.capJsonObject.hasOwnProperty('code') &&
      this.capJsonObject['code'] !== null
    ) {
      if (Array.isArray(this.capJsonObject['code'])) {
        for (const code of this.capJsonObject['code']) {
          rootNode.ele('code').txt(code);
        }
      } else {
        rootNode.ele('code').txt(this.capJsonObject['code']);
      }
    }

    // *** Optional /Conditional NODES ****
    // note,references,incidents
    const optionalSet2 = ['note', 'references', 'incidents'];

    for (const capOptElem of optionalSet2) {
      const optionalNode1 = this.capOptionalElement(
        capOptElem,
        this.capJsonObject
      );
      if (optionalNode1 !== '') {
        rootNode.ele(optionalNode1);
      }
    }
    //#endregion

    //#region AlertInfo Node
    let AlertInfoNode;
    if (
      this.capJsonObject.hasOwnProperty('info') &&
      this.capJsonObject['info'] !== null
    ) {
      if (Array.isArray(this.capJsonObject.info)) {
        for (const info of this.capJsonObject.info) {
          AlertInfoNode = rootNode.ele('info');

          // Language is defaulted to en-US
          if (info.hasOwnProperty('language') && info['language'] !== null) {
            AlertInfoNode.ele('language').txt(info.language);
          } else {
            AlertInfoNode.ele('language').txt('en-US');
          }

          // category
          if (info.category && info.category.length !== 0) {
            for (const cat of info.category) {
              AlertInfoNode.ele('category').txt(cat);
            }
          } else {
            if (this.config.strictMode) {
              const err: ErrorObject = {
                reason: 'info.category is not provided.',
              };
              return err;
            } else {
              if (this.config.comment) {
                AlertInfoNode.com(`Invalid CAP xml.Reason : 'info.category' is not provided or is null,
                XML is still generated as 'strictMode' configuration is false`);
              }
            }
          }

          // event
          const eventNode = this.capElement('event', info);
          if (typeof eventNode === 'object') {
            return eventNode;
          } else {
            if (!eventNode.startsWith('<!--')) {
              AlertInfoNode.ele(eventNode);
            } else if (this.config.comment) {
              AlertInfoNode.ele(eventNode);
            }
          }

          // responseType
          if (info.responseType && info.responseType.length !== 0) {
            for (const resp of info.responseType) {
              AlertInfoNode.ele('responseType').txt(resp);
            }
          } else {
            if (this.config.strictMode) {
              const err: ErrorObject = {
                reason: 'info.responseType is not provided.',
              };
              return err;
            } else {
              if (this.config.comment) {
                AlertInfoNode.com(`Invalid CAP xml.Reason : 'info.responseType' is not provided or is null,
              XML is still generated as 'strictMode' configuration is false`);
              }
            }
          }

          // *** Mandatory NODES ****
          // urgency, severity, certainty
          const infoMandatoryNodesSet1 = ['urgency', 'severity', 'certainty'];

          for (const capElem of infoMandatoryNodesSet1) {
            const idNode = this.capElement(capElem, info);
            if (typeof idNode === 'object') {
              return idNode;
            } else {
              if (!idNode.startsWith('<!--')) {
                AlertInfoNode.ele(idNode);
              } else if (this.config.comment) {
                AlertInfoNode.ele(idNode);
              }
            }
          }

          // *** Optional /Conditional NODES ****
          //
          const infoOptionalSet1 = [
            'audience',            
          ];

          for (const capOptElem of infoOptionalSet1) {
            const optionalNode1 = this.capOptionalElement(capOptElem, info);
            if (optionalNode1 !== '') {
              AlertInfoNode.ele(optionalNode1);
            }
          }

           // event Code multiple event codes are allowed
           if (info.eventCode && info.eventCode.length !== 0) {
            for (const evt of info.eventCode) {
              AlertInfoNode.ele('eventCode').txt(evt);
            }
          }

          const infoOptionalSet2 = [            
            'effective',
            'onset',
            'expires',
            'senderName',
            'headline',
            'description',
            'instruction',
            'web',
            'contact',
          ];

          for (const capOptElem of infoOptionalSet2) {
            const optionalNode1 = this.capOptionalElement(capOptElem, info);
            if (optionalNode1 !== '') {
              AlertInfoNode.ele(optionalNode1);
            }
          }

          // parameter
          let paramNode;
          if (info.parameter && info.parameter.length !== 0) {
            for (const par of info.parameter) {
              const paramNode = AlertInfoNode.ele('parameter');
              paramNode.ele('valueName').txt(par.valueName);
              paramNode.ele('value').txt(par.value);
            }
          } else {
            if (this.config.strictMode) {
              const err: ErrorObject = {
                reason: 'info.parameter is not provided.',
              };
              return err;
            } else {
              if (this.config.comment) {
                AlertInfoNode.com(`Invalid CAP xml.Reason : 'info.parameter' is not provided or is null,
                XML is still generated as 'strictMode' configuration is false`);
              }
            }
          }

          //#region AlertInfoResource Node
          let infoResourceNode;
          if (info.hasOwnProperty('resource') && info['resource'] !== null) {
            if (Array.isArray(info.resource)) {
              for (const res of info.resource) {
                infoResourceNode = AlertInfoNode.ele('resource');

                // *** Mandatory Nodes
                const resourceMandatoryNodesSet1 = ['resourceDesc', 'mimeType'];

                for (const capElem of resourceMandatoryNodesSet1) {
                  const idNode = this.capElement(capElem, res);
                  if (typeof idNode === 'object') {
                    return idNode;
                  } else {
                    if (!idNode.startsWith('<!--')) {
                      infoResourceNode.ele(idNode);
                    } else if (this.config.comment) {
                      infoResourceNode.ele(idNode);
                    }
                  }
                }

                // *** Optional Nodes
                const resourceOptionslNodesSet1 = [
                  'size',
                  'uri',
                  'derefUri',
                  'digest',
                ];

                for (const capOptElem of resourceOptionslNodesSet1) {
                  const optionalNode1 = this.capOptionalElement(
                    capOptElem,
                    res
                  );
                  if (optionalNode1 !== '') {
                    infoResourceNode.ele(optionalNode1);
                  }
                }
              }
            }
          }
          //#endregion

          //#region AlertInfoArea Node

          let infoAreaNode;
          if (info.hasOwnProperty('area') && info['area'] !== null) {
            if (Array.isArray(info.area)) {
              for (const areaData of info.area) {
                infoAreaNode = AlertInfoNode.ele('area');

                // areaDesc
                const idNode = this.capElement('areaDesc', areaData);
                if (typeof idNode === 'object') {
                  return idNode;
                } else {
                  if (!idNode.startsWith('<!--')) {
                    infoAreaNode.ele(idNode);
                  } else if (this.config.comment) {
                    infoAreaNode.ele(idNode);
                  }
                }

                // polygon
                if (areaData.polygon && areaData.polygon.length !== 0) {
                  for (const poly of areaData.polygon) {
                    infoAreaNode.ele('polygon').txt(poly);
                  }
                }

                // circle
                if (areaData.circle && areaData.circle.length !== 0) {
                  for (const circ of areaData.circle) {
                    infoAreaNode.ele('polygon').txt(circ);
                  }
                }

                // geocode
                if (areaData.geocode && areaData.geocode.length !== 0) {
                  for (const par of areaData.geocode) {
                    const geocodeNode = infoAreaNode.ele('geocode');
                    geocodeNode.ele('valueName').txt(par.valueName);
                    geocodeNode.ele('value').txt(par.value);
                  }
                }

                // *** Optional Nodes
                const areaOptionalNodesSet1 = [
                  'altitude',
                  'ceiling',                  
                ];

                for (const capOptElem of areaOptionalNodesSet1) {
                  const optionalNode1 = this.capOptionalElement(
                    capOptElem,
                    areaData
                  );
                  if (optionalNode1 !== '') {
                    infoAreaNode.ele(optionalNode1);
                  }
                }
              }
            }
          }
          //#endregion
        }
      }
    }
    //#endregion

    return xml.end(this.config.xmlOptions);
  }

  private capElement(
    capElementName: string,
    enclosingJSONObject: any
  ): ErrorObject | string {
    let node;
    let returnNode;
    // when strict mode is true
    if (this.config.strictMode) {
      if (
        // !this.capJsonObject.hasOwnProperty(capElementName) ||
        // this.capJsonObject[capElementName] === null
        !enclosingJSONObject.hasOwnProperty(capElementName) ||
        enclosingJSONObject[capElementName] === null
      ) {
        const err: ErrorObject = {
          reason: `'${capElementName}' is not provided or has value null`,
        };
        return err;
      }
    }
    returnNode = create();
    if (
      // this.capJsonObject.hasOwnProperty(capElementName) &&
      // this.capJsonObject[capElementName] !== null
      enclosingJSONObject.hasOwnProperty(capElementName) ||
      enclosingJSONObject[capElementName] === null
    ) {
      // returnNode.ele(capElementName).txt(this.capJsonObject[capElementName]);
      returnNode.ele(capElementName).txt(enclosingJSONObject[capElementName]);
    } else {
      returnNode.com(
        `Invalid CAP xml.Reason : '${capElementName}' is not provided or is null,
          XML is still generated as 'strictMode' configuration is false`
      );
    }
    return returnNode.first().toString();
  }

  private capOptionalElement(
    capElementName: string,
    enclosingJSONObject: any
  ): string {
    let node;
    let returnNode;

    returnNode = create();
    if (
      // this.capJsonObject.hasOwnProperty(capElementName) &&
      // this.capJsonObject[capElementName] !== null
      enclosingJSONObject.hasOwnProperty(capElementName) &&
      enclosingJSONObject[capElementName] !== null
    ) {
      returnNode.ele(capElementName).txt(enclosingJSONObject[capElementName]);
      return returnNode.first().toString();
    } else {
      return '';
    }
  }
}
