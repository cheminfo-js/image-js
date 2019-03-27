import { Image, ImageKind } from 'ijs';

describe('convert color', () => {
  it('GREY to GREYA', () => {
    const image = new Image({
      width: 2,
      height: 2,
      data: new Uint8Array([10, 30, 50, 70]),
      kind: ImageKind.GREY
    });

    const converted = image.convertColor(ImageKind.GREYA);
    expect(converted.data).toStrictEqual(
      new Uint8Array([10, 255, 30, 255, 50, 255, 70, 255])
    );
  });

  it('GREYA to GREY', () => {
    const image = new Image({
      width: 2,
      height: 2,
      data: new Uint8Array([10, 100, 30, 100, 50, 100, 70, 100]),
      kind: ImageKind.GREYA
    });

    const converted = image.convertColor(ImageKind.GREY);
    expect(converted.data).toStrictEqual(new Uint8Array([10, 30, 50, 70]));
  });

  it('GREY to RGB', () => {
    const image = new Image({
      width: 2,
      height: 2,
      data: new Uint8Array([10, 30, 50, 70]),
      kind: ImageKind.GREY
    });

    const converted = image.convertColor(ImageKind.RGB);
    expect(converted.data).toStrictEqual(
      new Uint8Array([10, 10, 10, 30, 30, 30, 50, 50, 50, 70, 70, 70])
    );
  });

  it('GREYA to RGB', () => {
    const image = new Image({
      width: 2,
      height: 2,
      data: new Uint8Array([10, 100, 30, 100, 50, 100, 70, 100]),
      kind: ImageKind.GREYA
    });

    const converted = image.convertColor(ImageKind.RGB);
    expect(converted.data).toStrictEqual(
      new Uint8Array([10, 10, 10, 30, 30, 30, 50, 50, 50, 70, 70, 70])
    );
  });

  it('GREY to RGBA', () => {
    const image = new Image({
      width: 2,
      height: 2,
      data: new Uint8Array([10, 30, 50, 70]),
      kind: ImageKind.GREY
    });

    const converted = image.convertColor(ImageKind.RGBA);
    expect(converted.data).toStrictEqual(
      // prettier-ignore
      new Uint8Array([10, 10, 10, 255, 30, 30, 30, 255, 50, 50, 50, 255, 70, 70, 70, 255])
    );
  });

  it('GREYA to RGBA', () => {
    const image = new Image({
      width: 2,
      height: 2,
      data: new Uint8Array([10, 100, 30, 100, 50, 100, 70, 100]),
      kind: ImageKind.GREYA
    });

    const converted = image.convertColor(ImageKind.RGBA);
    expect(converted.data).toStrictEqual(
      // prettier-ignore
      new Uint8Array([10, 10, 10, 100, 30, 30, 30, 100, 50, 50, 50, 100, 70, 70, 70, 100])
    );
  });

  it('RGB to RGBA', () => {
    const image = new Image({
      width: 2,
      height: 1,
      data: new Uint8Array([10, 20, 30, 40, 60, 70]),
      kind: ImageKind.RGB
    });

    const converted = image.convertColor(ImageKind.RGBA);
    expect(converted.data).toStrictEqual(
      new Uint8Array([10, 20, 30, 255, 40, 60, 70, 255])
    );
  });

  it('RGBA to RGB', () => {
    const image = new Image({
      width: 2,
      height: 1,
      data: new Uint8Array([10, 20, 30, 100, 40, 60, 70, 100]),
      kind: ImageKind.RGBA
    });

    const converted = image.convertColor(ImageKind.RGB);
    expect(converted.data).toStrictEqual(
      new Uint8Array([10, 20, 30, 40, 60, 70])
    );
  });
});
