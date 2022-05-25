import {UniqueId} from "./index";
import ParserJsonld from '@rdfjs/parser-jsonld';
import { Readable } from "stream";

const parser = new ParserJsonld();


export interface Application extends UniqueId {
  name: string;
  description: string;
  author: string;
  url: string;
  thumbnail: string;
  authorizationDate: string; // interop:registeredAt
  lastUpdateDate: string;    // interop:updatedAt
  accessNeedGroup: string    // interop:hasAccessNeedGroup

}

export const buildApplication = (source: string): Application => {
  const input = Readable.from(source);
  const output = parser.import(input);

  output.on('data', quad => {

  });


  return {} as Application;
}

// const name = (source: object): string => {
//
// }
