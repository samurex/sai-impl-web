import {createAction, props} from "@ngrx/store";
import {AccessNeed, AccessNeedGroup, ShapeTree} from "../models";

export const addAccessNeedGroup = createAction('[API/Response] Add Access Need Group', props<{group: AccessNeedGroup}>())
export const addAccessNeed = createAction('[API/Response] Add Access Need', props<{need: AccessNeed}>())
export const addShapeTree = createAction('[API/Response] Add ShapeTree', props<{tree: ShapeTree}>())
