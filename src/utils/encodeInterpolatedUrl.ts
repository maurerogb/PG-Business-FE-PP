export const encodeInterpolatedUrl = (
    basePath: TemplateStringsArray,
    ...interpolated: string[]
) => {
    const encondedInterpolated = interpolated.map((i) => encodeURIComponent(i));
    return basePath.map((path, index) => `${path}${encondedInterpolated[index] ?? ""}`).join("");
};