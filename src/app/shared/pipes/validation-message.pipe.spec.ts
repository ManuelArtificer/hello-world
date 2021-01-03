import { ValidationMessagePipe } from './validation-message.pipe';

describe('ValidationMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new ValidationMessagePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null when errors argument is null', () => {
    const pipe = new ValidationMessagePipe();
    expect(pipe.transform(null)).toBeNull();
  });

  it('should return null when errors argument is empty object', () => {
    const pipe = new ValidationMessagePipe();
    expect(pipe.transform({})).toBeNull();
  });

  it('should return "Pole jest wymagane" when errors argument include prop with name "required"', () => {
    const pipe = new ValidationMessagePipe();
    expect(pipe.transform({ required: true })).toEqual('Pole jest wymagane');
  });
});
