import * as Yup from 'yup';

Yup.addMethod(Yup.string, 'unique', function (message, axiosInstance) {
  return this.test('unique', message, async (value) => {
    const { data } = await axiosInstance(value);
    return data;
  });
});

Yup.addMethod(Yup.string, 'sequence', function (funcList) {
  return this.test(async (value, context) => {
    try {
      for (const func of funcList) {
        await func().validate(value);
      }
    } catch ({ message }) {
      return context.createError({ message });
    }
    return true;
  });
});

export default Yup;
