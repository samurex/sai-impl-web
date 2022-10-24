import { SocialAgent } from '@janeirodigital/sai-api-messages';
import { socialAgentsReducer } from './social-agent.reducer';

describe('social agents reducer', () => {
  const profile1 = {
    id: 'agent-1',
  } as unknown as SocialAgent
  const profile2 = {
    id: 'agent-2',
  } as unknown as SocialAgent
  const priorState = {
    byId: {
      'agent-1': profile1
    },
    allIds: ['agent-1']
  }

  it('initial state', () => {
    const state = { byId: {}, allIds: [] }
    const expected = {...state}
    const action = { type: 'foo' } as any;
    expect(socialAgentsReducer(undefined, action)).toEqual(expected);
  });

  it('socialAgentProfileReceived', () => {
    const action = {
      type: '[SOCIAL AGENT PROFILES] Single Social Agent Profile Received',
      profile: profile2
    }
    const newState = socialAgentsReducer(priorState, action)
    expect(newState.allIds).toEqual(jasmine.arrayContaining(['agent-1', 'agent-2']));
    expect(newState.byId).toEqual(jasmine.objectContaining({
      'agent-1': profile1,
      'agent-2': profile2
    }));
  })

  it('socialAgentProfilesReceived', () => {
    const profile3 = {
      id: 'agent-3',
    } as unknown as SocialAgent
    const action = {
      type: '[SOCIAL AGENT PROFILES] Social Agent Profiles Received',
      profiles: [profile2, profile3]
    }
    const newState = socialAgentsReducer(priorState, action)
    expect(newState.allIds).toEqual(jasmine.arrayContaining(['agent-1', 'agent-2', 'agent-3']));
    expect(newState.byId).toEqual(jasmine.objectContaining({
      'agent-1': profile1,
      'agent-2': profile2,
      'agent-3': profile3
    }));
  })
});
