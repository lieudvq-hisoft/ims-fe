import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Rack } from "@/models/location";
import locationService from "@/services/location";

interface State {
    rackData: Rack;
    rackDataLoading: boolean;
}

const initialState: State = {
    rackData: {} as Rack,
    rackDataLoading: false,
};

const TYPE_PREFIX = "rack";

const getRackData = createAsyncThunk(
    `${TYPE_PREFIX}/getRackData`,
    async (arg: { token: string }) => {
        const result = await locationService.getRackData(
            arg.token,
        );
        return result;
    }
);

const slice = createSlice({
    name: "location",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRackData.pending, (state) => ({
            ...state,
            rackDataLoading: true,
        }));
        builder.addCase(getRackData.fulfilled, (state, { payload }) => ({
            ...state,
            rackData: payload,
            rackDataLoading: false,
        }));
        builder.addCase(getRackData.rejected, (state) => ({
            ...state,
            rackDataLoading: false,
        }));
    },
});

export { getRackData };

export default slice.reducer;
