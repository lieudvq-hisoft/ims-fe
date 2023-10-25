import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userService from "@/services/user";
import { User } from "@/models/user";
import { PaginationParam } from "@/models/base";

interface State {
   myAccountInfo: User;
}

const initialState: State = {
   myAccountInfo: {} as User,
};

const TYPE_PREFIX = "user";

const getMyAccountInfo = createAsyncThunk(
   `${TYPE_PREFIX}/getMyAccountInfo`,
   async (arg: { token: string; }) => {
      const result = await userService.getMyAccountInfo(
         arg.token
      );
      return result;
   }
);

// const setMyAccountInfo = createAsyncThunk(
//    `${TYPE_PREFIX}/setMyAccountInfo`,
//    async (arg: { user: User; token: string; }) => {
//       const result = await userService.updateUserAccount(arg.user, arg.token);
//       return result;
//    }
// )

const slice = createSlice({
   name: "customer",
   initialState,
   reducers: {
      setAccountInfo(state, action: PayloadAction<User>) {
         return {
            ...state,
            myAccountInfo: action.payload
         }
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getMyAccountInfo.pending, (state) => ({
         ...state,
      }));
      builder.addCase(getMyAccountInfo.fulfilled, (state, { payload }) => ({
         ...state,
         myAccountInfo: payload,
      }));
      builder.addCase(getMyAccountInfo.rejected, (state) => ({
         ...state,
      }));

      // builder.addCase(setMyAccountInfo.pending, (state) => ({
      //    ...state,
      // }));
      // builder.addCase(setMyAccountInfo.fulfilled, (state, { payload }) => ({
      //    ...state,
      //    myAccountInfo: payload,
      // }));
      // builder.addCase(setMyAccountInfo.rejected, (state) => ({
      //    ...state,
      // }));
   },
});

export { getMyAccountInfo };

export const { setAccountInfo } = slice.actions

export default slice.reducer;
