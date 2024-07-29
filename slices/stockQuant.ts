import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productTemplateServices from "@services/productTemplate";
import { StockQuantInfo, StockQuantPaging } from "@models/stockQuant";
import { AppState } from "@store/index";

interface State {
  paging: StockQuantPaging;
  data: StockQuantInfo[];
  pageIndex: number;
  pageSize: number;
  totalPage: number;
  totalSize: number;
  loading: boolean;
}

const initialState: State = {
  paging: {} as StockQuantPaging,
  data: [],
  pageIndex: 1,
  pageSize: 10,
  totalPage: 0,
  totalSize: 10,
  loading: false,
};

const TYPE_PREFIX = "stockQuant";

const getStockQuants = createAsyncThunk(
  `${TYPE_PREFIX}/get`,
  async (arg: { token: string; productTmplId: string }, { getState }) => {
    const state = getState() as AppState;
    const result = await productTemplateServices.getStockQuants(
      arg.token,
      arg.productTmplId,
      state.stockQuant.pageIndex,
      state.stockQuant.pageSize
    );
    return result;
  }
);

const slice = createSlice({
  name: "stockQuant",
  initialState,
  reducers: {
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    resetData: (state) => {
      state.data = [];
      state.paging = {} as StockQuantPaging;
      state.data = [];
      state.pageIndex = 1;
      state.pageSize = 10;
      state.totalPage = 0;
      state.totalSize = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStockQuants.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getStockQuants.fulfilled, (state, { payload }) => ({
      ...state,
      data: payload.data,
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize,
      totalPage: payload.totalPage,
      totalSize: payload.totalSize,
      loading: false,
    }));
    builder.addCase(getStockQuants.rejected, (state) => ({
      ...state,
      loading: false,
    }));
  },
});

export { getStockQuants };
export const { setPageIndex, setPageSize, resetData } = slice.actions;

export default slice.reducer;
