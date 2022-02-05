import {NormalizedState} from "./index";
import { IRI, UniqueId } from '@janeirodigital/sai-server/dist/sai-api';

export const insertEntity = <T extends UniqueId>(state: NormalizedState<T>, entry: T): NormalizedState<T> => {
  const byId = {...state.byId, [entry.id]: entry};
  const allIds = [...state.allIds, entry.id];

  return {byId, allIds}
};

export const removeEntity = <T extends UniqueId>(state: NormalizedState<T>, id: IRI): NormalizedState<T> => {

  if (!state.allIds.includes(id)) return state;

  const byId = {...state.byId};
  const allIds = [...state.allIds].filter(_id => _id != id);

  delete byId[id];
  return {byId, allIds}
};
