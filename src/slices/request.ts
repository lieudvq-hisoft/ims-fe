import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PaginationParam } from "@/models/base";
import { RequestData } from "@/models/request";
import requestService from "@/services/request";

interface State {
  requestData: RequestData;
  requestDataLoading: boolean;
}

const initialState: State = {
  requestData: {} as RequestData,
  requestDataLoading: false,
};

const TYPE_PREFIX = "request";

const getRequestData = createAsyncThunk(
  `${TYPE_PREFIX}/getRequestData`,
  async (arg: { token: string; paramGet: PaginationParam }) => {
    const result = await requestService.getRequestData(arg.token, arg.paramGet);
    return result;
  }
);

const slice = createSlice({
  name: "request",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRequestData.pending, (state) => ({
      ...state,
      requestDataLoading: true,
    }));
    builder.addCase(getRequestData.fulfilled, (state, { payload }) => ({
      ...state,
      requestData: payload,
      requestDataLoading: false,
    }));
    builder.addCase(getRequestData.rejected, (state) => ({
      ...state,
      requestDataLoading: false,
    }));
  },
});

export { getRequestData };

export default slice.reducer;
