import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { ContainerResponse, MemoryElement, AllStates } from '../types';

const initialState: AllStates = {};

export const containerStatusSlice = createSlice({
  name: 'containerStatus',
  initialState,
  reducers: {
    getContainerStates: (
      state: AllStates,
      data: PayloadAction<ContainerResponse>
    ) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      for (let i = 0; i < data.payload.length; i++) {
        const currentId: string = data.payload[i].id;
        if (!(data.payload[i].id in state)) {
          state[currentId] = {
            name: data.payload[i].name,
            statusState: data.payload[i].state === 'running',
            dataState: false,
            memoryState: [],
            cpuState: [],
          };
        }
      }
    },
    quitButton: (state: AllStates) => {
      console.log('newState: ', current(state));
    },
    toggleStatus: (state: AllStates, id: PayloadAction<string>) => {
      state[id.payload].statusState = !current(state)[id.payload].statusState;
      // console.log('this is state: ', current(state)[id.payload]);
    },
    toggleData: (state: AllStates, id: PayloadAction<string>) => {
      state[id.payload].dataState = !current(state)[id.payload].dataState;
      // console.log('this is state: ', current(state)[id.payload]);
    },
    addMemory: (state: AllStates, id: PayloadAction<MemoryElement>) => {
      const actualId = id.payload.metric.id.slice(8, 20);
      state[actualId].memoryState = id.payload.values;
    },
    deleteMemory: (state: AllStates, id: PayloadAction<String>) => {
      state[`${id.payload}`]['memoryState'] = [];
    },
    addCpu: (state: AllStates, id: PayloadAction<MemoryElement>) => {
      const actualId = id.payload.id.slice(8, 20);
      console.log('actualId in addCpu: ', actualId);
      state[actualId].cpuState = id.payload.values;
      console.log('state: ', current(state));
    },
    deleteCpu: (state: AllStates, id: PayloadAction<String>) => {
      state[`${id.payload}`]['cpuState'] = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getContainerStates,
  quitButton,
  toggleStatus,
  toggleData,
  addMemory,
  deleteMemory,
  addCpu,
  deleteCpu,
} = containerStatusSlice.actions;

export default containerStatusSlice.reducer;
