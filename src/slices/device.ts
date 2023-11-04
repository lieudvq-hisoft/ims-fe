import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PaginationParam } from "@/models/base";
import { DeviceData } from "@/models/device";
import deviceService from "@/services/device";

interface State {
  deviceData: DeviceData;
  deviceDataLoading: boolean;
}

const initialState: State = {
  deviceData: {} as DeviceData,
  deviceDataLoading: false,
};

const TYPE_PREFIX = "device";

const getDeviceData = createAsyncThunk(
  `${TYPE_PREFIX}/getDeviceData`,
  async (arg: { token: string; paramGet: PaginationParam }) => {
    const result = await deviceService.getDeviceData(arg.token, arg.paramGet);
    return result;
  }
);

const slice = createSlice({
  name: "device",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDeviceData.pending, (state) => ({
      ...state,
      deviceDataLoading: true,
    }));
    builder.addCase(getDeviceData.fulfilled, (state, { payload }) => ({
      ...state,
      deviceData: payload,
      deviceDataLoading: false,
    }));
    builder.addCase(getDeviceData.rejected, (state) => ({
      ...state,
      deviceDataLoading: false,
    }));
  },
});

export { getDeviceData };

export default slice.reducer;
