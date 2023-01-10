import { DataRegistry } from '@janeirodigital/sai-api-messages';
import { dataRegistriesReducer } from './data-registry.reducer';

describe('data registry reducer', () => {
  const registry1 = {
    id: 'registry-1',
  } as unknown as DataRegistry
  const registry2 = {
    id: 'registry-2',
  } as unknown as DataRegistry
  const priorState = {
    byId: {
      'registry-1': registry1
    },
    allIds: ['registry-1']
  }

  it('initial state', () => {
    const state = { byId: {}, allIds: [] }
    const expected = {...state}
    const action = { type: 'foo' } as any;
    expect(dataRegistriesReducer(undefined, action)).toEqual(expected);
  });


  it('dataRegistriesProvided', () => {
    const registry3 = {
      id: 'registry-3',
    } as unknown as DataRegistry

    const action = {
      type: '[DATA REGISTRIES] Data Registries Received',
      registries: [registry2, registry3]
    }
    const newState = dataRegistriesReducer(priorState, action)
    console.log(newState);
    expect(newState.allIds).toEqual(jasmine.arrayContaining(['registry-1', 'registry-2', 'registry-3']));
    expect(newState.byId).toEqual(jasmine.objectContaining({
      'registry-1': registry1,
      'registry-2': registry2,
      'registry-3': registry3
    }));
  })
});
