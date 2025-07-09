export const validatePlanTime = (val: string): string => {
    const separator = val.includes(":") ? ":" : ".";
    const [hourStr, minStr] = val.split(separator);
    const hour = Number(hourStr);
    const min = Number(minStr);
    if (
        isNaN(hour) ||
        isNaN(min) ||
        hour < 0 ||
        hour > 23 ||
        min < 0 ||
        min > 59
    ) {
        return null;
    }
    return `${hour.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}`;
};
