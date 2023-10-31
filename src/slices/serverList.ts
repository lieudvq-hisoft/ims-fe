import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PaginationParam } from "@/models/base";
import requestService from "@/services/request";
import { ServerListData } from "@/models/serverList";
import serverListService from "@/services/serverList";

interface State {
  serverData: ServerListData;
  serverDataLoading: boolean;
}

const initialState: State = {
  serverData: {} as ServerListData,
  serverDataLoading: false,
};

const TYPE_PREFIX = "server";

const getServerListData = createAsyncThunk(
  `${TYPE_PREFIX}/getServerListData`,
  async (arg: { token: string; paramGet: PaginationParam }) => {
    const result = await serverListService.getServerListData(
      arg.token,
      arg.paramGet
    );
    return result;
  }
);

const slice = createSlice({
  name: "server",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServerListData.pending, (state) => ({
      ...state,
      serverDataLoading: true,
    }));
    builder.addCase(getServerListData.fulfilled, (state, { payload }) => ({
      ...state,
      serverData: payload,
      serverDataLoading: false,
    }));
    builder.addCase(getServerListData.rejected, (state) => ({
      ...state,
      serverDataLoading: false,
    }));
  },
});

export { getServerListData };

export default slice.reducer;
