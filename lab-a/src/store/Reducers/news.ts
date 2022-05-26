import produce from "immer";
import { SETNEWS } from '../Type/news'
import { NewsAction } from '../Actions/news'

type NewsList = {
  list: Array<object>;
  loading: Boolean;
};

export const initialState: NewsList = {
  list: [],
  loading: false
};

export const counter = (
  state: NewsList = initialState,
  action: NewsAction
) =>
  produce(state, draft => {
    switch (action.type) {
      case SETNEWS:
        draft.loading = true;
        draft.list = action.payload.data;
        break;
      default:
        return state;
    }
  });

