import {createReducer, on} from '@ngrx/store';
import {AccessNeed, AccessNeedGroup, ShapeTree} from "../models";
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import * as Actions from "../actions/access-needs.actions"

export const ACCESS_NEEDS_STATE_KEY = 'access-needs';

/**
 * Contains all the received access needs. Children needs are flattened to the top
 * and the 'parent' and 'children' (by ids) are used to reconstruct the hierarchy
 */
export interface AccessNeedsState extends EntityState<AccessNeed> {}
export const needsAdapter = createEntityAdapter<AccessNeed>();

const accessNeedsInitialState: AccessNeedsState = needsAdapter.getInitialState();

export const accessNeedsReducer = createReducer(
  accessNeedsInitialState,
  on(Actions.addAccessNeed, (state, {need}) => needsAdapter.addOne(need, state)),
);

/**
 * Group of all the groups
 */
export const ACCESS_NEEDS_GROUPS_STATE_KEY = 'access-needs-groups';
export interface AccessNeedGroupState extends EntityState<AccessNeedGroup> {}
export const groupsAdapter = createEntityAdapter<AccessNeedGroup>()

const accessNeedsGroupsInitialState: AccessNeedGroupState = groupsAdapter.getInitialState();

export const accessNeedsGroupReducer = createReducer(
  accessNeedsGroupsInitialState,
  on(Actions.addAccessNeedGroup, (state, {group}) => groupsAdapter.addOne(group, state)),
)


/**
 * Group of all the shapetrees that have been loaded into the application through the different access needs
 */
export const SHAPE_TREE_STATE_KEY = 'shapetrees';
export interface ShapetreesState extends EntityState<ShapeTree>{}
export const shapetreeAdapter = createEntityAdapter<ShapeTree>();

const shapeTreeInitialState = shapetreeAdapter.getInitialState();
export const shapetreeReducer = createReducer(
  shapeTreeInitialState,
  on(Actions.addShapeTree, (state, {tree}) => shapetreeAdapter.addOne(tree, state))
)
