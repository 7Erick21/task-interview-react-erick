type GenericObject<T> = {
  [key: string]: T;
};

export const filterEmptyValues = <T>(payloadData: GenericObject<T>) => {
  return Object.fromEntries(
    Object.entries(payloadData).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) =>
        value !== undefined &&
        value !== 'undefined' &&
        value !== null &&
        (typeof value !== 'number' || !isNaN(value)) &&
        (typeof value !== 'string' || value.trim() !== '')
    )
  );
};
