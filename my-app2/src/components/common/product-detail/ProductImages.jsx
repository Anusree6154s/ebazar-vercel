import ImageTransformer from "../../user/ImageTransformer";

export default function ProductImages({ productImages }) {
  return (
    <>
      <ImageTransformer
        src={productImages[0]}
        className="  overflow-hidden rounded-lg  border-gray-300 border md:w-[calc(100%/2.1)] lg:w-[calc(100%/3.4)] h-auto aspect-[1/1] "
      />
      {(!!productImages[1] || !!productImages[2]) && (
        <div className="hidden md:grid md:grid-cols-1 md:gap-y-8 md:w-[calc(100%/2.1)] lg:w-[calc(100%/3.4)] h-auto aspect-[1/1]">
          <ImageTransformer
            src={productImages[1]}
            className="aspect-h-1 aspect-w-2 overflow-hidden rounded-lg border-gray-300 border "
          />
          <ImageTransformer
            src={productImages[2]}
            className="aspect-h-1 aspect-w-2 overflow-hidden rounded-lg border-gray-300 border "
          />
        </div>
      )}

      <ImageTransformer
        src={productImages[2]}
        className=" sm:overflow-hidden sm:rounded-lg border-gray-300 border lg:w-[calc(100%/3.4)] hidden h-auto aspect-[1/1] lg:block"
      />
    </>
  );
}
