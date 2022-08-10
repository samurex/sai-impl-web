import {NormalizedState} from "./index";
import { UniqueId } from '@janeirodigital/sai-api-messages';

export const insertEntity = <T extends UniqueId>(state: NormalizedState<T>, entry: T): NormalizedState<T> => {
  const byId = {...state.byId, [entry.id]: entry};
  const allIds = [...state.allIds, entry.id];

  return {byId, allIds}
};

export const removeEntity = <T extends UniqueId>(state: NormalizedState<T>, id: string): NormalizedState<T> => {

  if (!state.allIds.includes(id)) return state;

  const byId = {...state.byId};
  const allIds = [...state.allIds].filter(_id => _id != id);

  delete byId[id];
  return {byId, allIds}
};

export const insertEntities = <T extends UniqueId>(state: NormalizedState<T>, entities: T[]) => {
  for (const entity of entities) state = insertEntity(state, entity);
  return state;
}

export const removeEntities = <T extends UniqueId>(state: NormalizedState<T>, ids: string[]) => {
  for (const id of ids) state = removeEntity(state, id);
  return state;
}
