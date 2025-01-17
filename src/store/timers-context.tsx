import { createContext, ReactNode, useContext, useReducer } from "react";

export type Timer = {
    name: string;
    duration: number;
}

type TimersState = {
    isRinning: boolean;
    timers: Timer[];
}

const initialState: TimersState = {
    isRinning: true,
    timers: []
}

type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer)=>void;
    startTimers: ()=>void;
    stopTimers: ()=>void;
}

type TimerContextProviderProps= {
    children: ReactNode;
}

const TimersContext = createContext<TimersContextValue | null>(null);

export function useTimersContext(){
    const timersCtx = useContext(TimersContext)

    if(timersCtx === null){
        throw new Error('TimersContext is null - that shouldl not be the case!');
    }

    return timersCtx;
}

type AddTimerAction = {
    type: 'ADD_TIMER',
    payload: Timer
}

type StartTimersAction = {
    type:  'START_TIMERS'
}

type StopTimersAction = {
    type:  'STOP_TIMERS'
}


type Action = AddTimerAction | StopTimersAction | StartTimersAction

function timersReducer(state: TimersState, action: Action): TimersState{
    if (action.type === 'START_TIMERS'){
        return {
            ...state,
            isRinning: true
        }
    }
    if (action.type === 'STOP_TIMERS'){
        return {
            ...state,
            isRinning: false
        }
    }
    if (action.type === 'ADD_TIMER'){
        return {
            ...state,
            timers: [
                ...state.timers,
                {
                    name: action.payload.name,
                    duration: action.payload.duration
                }
            ]
        }
    }

    return state
}

export default function TimerContextProvider({children}: TimerContextProviderProps){

    const [timersState, dispatch] = useReducer(timersReducer, initialState);

    const ctx: TimersContextValue = {
        timers: timersState.timers,
        isRinning: timersState.isRinning,
        addTimer(timerData){
            dispatch({type: 'ADD_TIMER', payload: timerData})
        },
        startTimers() {
            dispatch({type: 'START_TIMERS'})
        },
        stopTimers() {
            dispatch({type: 'STOP_TIMERS'})
        },
    }


    return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
}