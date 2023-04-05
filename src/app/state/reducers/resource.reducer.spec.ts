import {Resource} from '@janeirodigital/sai-api-messages';
import {resourcesReducer, ResourceState} from './resource.reducer';

describe('resource reducer', () => {
  const resource1 = {
    id: 'resource-1',
  } as unknown as Resource
  const resource2 = {
    id: 'resource-2',
  } as unknown as Resource

  const priorState = {
    entities: {
      'resource-1': resource1
    },
    ids: ['resource-1']
  }


  it('initial state', () => {
    const state: ResourceState = { ids: [], entities: {} }
    const expected = {...state}
    const action = { type: 'foo' };
    expect(resourcesReducer(undefined, action)).toEqual(expected);
  });

  it('resourceReceived', () => {
    const action = {
      type: '[RESOURCE] Resource Received',
      resource: resource2
    }
    const newState = resourcesReducer(priorState, action)
    expect(newState.ids).toEqual(jasmine.arrayContaining(['resource-1', 'resource-2']));
    expect(newState.entities).toEqual(jasmine.objectContaining({
      'resource-1': resource1,
      'resource-2': resource2
    }))
  })
});
