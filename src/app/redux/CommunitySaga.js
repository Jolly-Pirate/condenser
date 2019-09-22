import { call, put, select, takeEvery } from 'redux-saga/effects';
import { api } from '@steemit/steem-js';
import * as communityActions from 'app/redux/CommunityReducer';

export const communityWatches = [
    takeEvery('community/LIST_COMMUNITY_ROLES', listCommunityRoles),
];

/**
    @arg string type the action type
    @arg {object} payload action payload.
*/

export function* listCommunityRoles({ payload: { communityHiveName } }) {
    yield put(communityActions.listCommunityRolesPending(true));
    try {
        const communityRoles = yield call(
            api,
            api.call(
                'bridge.list_community_roles',
                { community: communityHiveName },
                () => {
                    debugger;
                }
            )
        );
        yield put(communityActions.listCommunityRolesSuccess(communityRoles));
    } catch (error) {
        yield put(communityActions.listCommunityRolesError(error));
    }
    yield put(communityActions.listCommunityRolesPending(true));
}
