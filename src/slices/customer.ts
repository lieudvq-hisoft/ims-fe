import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "@/services/customer";
import { CustomerList } from "@/models/customer";
import { PaginationParam } from "@/models/base";

interface State {
  customers: CustomerList;
  customersLoading: boolean;
}

const initialState: State = {
  customers: {} as CustomerList,
  customersLoading: false,
};

const TYPE_PREFIX = "customer";

const getCustomerData = createAsyncThunk(
  `${TYPE_PREFIX}/getCustomerData`,
  async (arg: { token: string; paramGet: PaginationParam }) => {
    const result = await customerService.getCustomerData(
      arg.token,
      arg.paramGet
    );
    return result;
  }
);

const slice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCustomerData.pending, (state) => ({
      ...state,
      customersLoading: true,
    }));
    builder.addCase(getCustomerData.fulfilled, (state, { payload }) => ({
      ...state,
      customers: payload,
      customersLoading: false,
    }));
    builder.addCase(getCustomerData.rejected, (state) => ({
      ...state,
      customersLoading: false,
    }));
  },
});

export { getCustomerData };

export default slice.reducer;
