"use client";
import React, { FC, useMemo } from "react";
import { IHabit } from "@/interfaces/habits/IHabit";
import HabitItem from "@/components/habits/HabitItem";
import { useQuery } from "@tanstack/react-query";
import { getDataFromClient } from "@/services/api/getDataFromClient";
import { IHabitChecks } from "@/interfaces/habits/IHabitChecks";

type Props = {
    habits: IHabit[] | undefined
    habitChecks: IHabitChecks[] | undefined
}

export const HabitsList: FC<Props> = ({ habits, habitChecks }) => {

    const { data: queryHabits } = useQuery({
        queryKey: ["habits"],
        queryFn: getDataFromClient.getMyHabits,
        initialData: habits ? habits : undefined,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    const { data: queryHabitChecks } = useQuery({
        queryKey: ["habitChecks"],
        queryFn: getDataFromClient.getMyHabitsChecks,
        initialData: habitChecks ? habitChecks : undefined,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    console.log(queryHabitChecks)

    const mergedHabits = useMemo(() => {
        if (!queryHabits || !queryHabitChecks) return [];
        return queryHabits.map(habit => {
            const match = queryHabitChecks.find(check => check._habitId === habit._id);
            return {
                ...habit,
                habitChecks: match ? match.week : [],
            };
        });
    }, [queryHabits, queryHabitChecks]);


    return (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-5">
            {mergedHabits?.map(item => <HabitItem key={item._id} habit={item} />)}
        </div>
    );
};

