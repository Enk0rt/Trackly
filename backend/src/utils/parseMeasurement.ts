export const parseMeasurement = (
    val: string | unknown,
): { value: number; unit: string } => {
    if (typeof val !== "string") return { value: NaN, unit: "" };

    const match = val.match(/^(\d+(?:\.\d+)?)[\s]*([a-zA-Zа-яА-Я%]*)$/);
    if (!match) return { value: NaN, unit: "" };

    const value = Number(match[1]);
    const unit = match[2];

    return { value, unit };
};
