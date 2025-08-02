import { useSelector } from "react-redux";
import { selectAllBrands, selectAllCategories } from "../redux";

export const FormFieldElementOptions = () => {
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  
  return {
    productInfo: [
      {
        formClass: "sm:col-span-full",
        formFor: "title",
        labelName: "Product Name",
        registerOptions: { required: "required" },
        fieldType: "input",
        fieldOptions: {
          type: "text",
          className:
            "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6",
        },
      },
      {
        formClass: "col-span-full",
        formFor: "description",
        labelName: "Description",
        registerOptions: { required: "required" },
        fieldType: "textarea",
        fieldOptions: {
          type: "text",
          rows: 3,
          className:
            "block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-customBlue dark:focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-gray-800",
          defaultValue: "",
        },
      },
      {
        formClass: "col-span-3",
        formFor: "brand",
        labelName: "Brands",
        registerOptions: { required: "required" },
        fieldType: "select",
        fieldOptions: {
          className:
            "text-gray-500 border border-gray-300 dark:bg-gray-800 rounded-md dark:border-gray-700 dark:text-gray-500",
        },
        selectOptions: [
          { value: "", label: "--- choose brand ---" },
          ...brands.map((brand) => ({
            value: brand.label,
            label: brand.label,
          })),
        ],
      },
      {
        formClass: "col-span-3",
        formFor: "category",
        labelName: "Category",
        registerOptions: { required: "required" },
        fieldType: "select",
        fieldOptions: {
          className:
            "text-gray-500 border border-gray-300 dark:bg-gray-800 rounded-md dark:border-gray-700 dark:text-gray-500",
        },
        selectOptions: [
          { value: "", label: "--- choose category ---" },
          ...categories.map((brand) => ({
            value: brand.label,
            label: brand.label,
          })),
        ],
      },
      {
        formClass: "sm:col-span-2",
        formFor: "price",
        labelName: "Price",
        registerOptions: { required: "required", min: 1 },
        fieldType: "input",
        fieldOptions: {
          type: "number",
          className:
            "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6",
        },
      },
      {
        formClass: "sm:col-span-2",
        formFor: "discountPercentage",
        labelName: "Discount",
        registerOptions: { required: "required", min: 0, max: 100 },
        fieldType: "input",
        fieldOptions: {
          type: "number",
          className:
            "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6",
        },
      },
      {
        formClass: "sm:col-span-2",
        formFor: "stock",
        labelName: "Stock",
        registerOptions: { required: "required", min: 0 },
        fieldType: "input",
        fieldOptions: {
          type: "number",
          className:
            "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6",
        },
      },
    ],
    images: [
      {
        formClass: "sm:col-span-full",
        formFor: "thumbnail",
        labelName: "Thumbnail",
        registerOptions: { required: "required" },
        fieldType: "input",
        fieldOptions: {
          type: "text",
          className:
            "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6",
        },
      },
      {
        formClass: "sm:col-span-1",
        formFor: "image-1",
        labelName: "Image 1",
        registerOptions: { required: "required" },
        fieldType: "input",
        fieldOptions: {
          type: "text",
          className:
            "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6",
        },
      },
      {
        formClass: "sm:col-span-1",
        formFor: "image-2",
        labelName: "Image 2",
        registerOptions: { required: "required" },
        fieldType: "input",
        fieldOptions: {
          type: "text",
          className:
            "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6",
        },
      },
      {
        formClass: "sm:col-span-1",
        formFor: "image-3",
        labelName: "Image 3",
        registerOptions: { required: "required" },
        fieldType: "input",
        fieldOptions: {
          type: "text",
          className:
            "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6",
        },
      },
      {
        formClass: "sm:col-span-1",
        formFor: "image-4",
        labelName: "Image 4",
        registerOptions: { required: "required" },
        fieldType: "input",
        fieldOptions: {
          type: "text",
          className:
            "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6",
        },
      },
    ],
    highlights: [
      {
        formClass: "sm:col-span-1",
        formFor: "highlight-1",
        labelName: "Highlight 1",
        registerOptions: { required: "required" },
        fieldType: "input",
        fieldOptions: {
          type: "text",
          className:
            "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6",
        },
      },
      {
        formClass: "sm:col-span-1",
        formFor: "highlight-2",
        labelName: "Highlight 2",
        registerOptions: { required: "required" },
        fieldType: "input",
        fieldOptions: {
          type: "text",
          className:
            "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6",
        },
      },
      {
        formClass: "sm:col-span-1",
        formFor: "highlight-3",
        labelName: "Highlight 3",
        registerOptions: { required: "required" },
        fieldType: "input",
        fieldOptions: {
          type: "text",
          className:
            "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6",
        },
      },
      {
        formClass: "sm:col-span-1",
        formFor: "highlight-4",
        labelName: "Highlight 4",
        registerOptions: { required: "required" },
        fieldType: "input",
        fieldOptions: {
          type: "text",
          className:
            "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6",
        },
      },
    ],
  };
};
