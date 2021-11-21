import { DeleteCharactersPipe } from './delete-characters.pipe';

describe('DeleteCharactersPipe', () => {
  it('create an instance', () => {
    const pipe = new DeleteCharactersPipe();
    expect(pipe).toBeTruthy();
  });
});
